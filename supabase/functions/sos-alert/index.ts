import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SOSRequest {
  latitude?: number
  longitude?: number
  message?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { latitude, longitude, message }: SOSRequest = await req.json()

    console.log(`SOS Alert triggered by user: ${user.id}`)

    // Create incident record
    const { data: incident, error: incidentError } = await supabaseClient
      .from('incidents')
      .insert({
        user_id: user.id,
        type: 'sos',
        latitude,
        longitude,
        occurred_at: new Date().toISOString(),
        status: 'active',
      })
      .select()
      .single()

    if (incidentError) {
      console.error('Failed to create incident:', incidentError)
      return new Response(
        JSON.stringify({ error: 'Failed to create incident' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create critical alert for the user
    const { error: alertError } = await supabaseClient
      .from('alerts')
      .insert({
        user_id: user.id,
        type: 'sos',
        message: message || 'Emergency SOS alert triggered',
        priority: 'critical',
      })

    if (alertError) {
      console.error('Failed to create alert:', alertError)
    }

    // Get user's emergency contacts
    const { data: emergencyContacts } = await supabaseClient
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', user.id)

    // Get user profile for contact info
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('first_name, last_name, phone')
      .eq('user_id', user.id)
      .single()

    const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Tourist'
    const locationText = latitude && longitude ? `Location: ${latitude}, ${longitude}` : 'Location: Unknown'

    console.log(`SOS processed for ${userName}. Emergency contacts: ${emergencyContacts?.length || 0}`)
    console.log(`Incident ID: ${incident.id}`)

    // In a real implementation, you would send SMS/notifications here
    // For demo purposes, we'll log the actions
    if (emergencyContacts && emergencyContacts.length > 0) {
      for (const contact of emergencyContacts) {
        console.log(`Would notify ${contact.name} (${contact.phone}): ${userName} has triggered an SOS alert. ${locationText}`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        incidentId: incident.id,
        message: 'SOS alert processed successfully',
        notifiedContacts: emergencyContacts?.length || 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('SOS Alert error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})