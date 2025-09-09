-- Create enums for controlled vocabularies
create type public.incident_type as enum ('sos', 'geofence', 'anomaly');
create type public.incident_status as enum ('active', 'resolved', 'investigating');
create type public.alert_type as enum ('geofence', 'weather', 'safety_update', 'check_in', 'battery_low', 'sos', 'system');
create type public.alert_priority as enum ('low', 'medium', 'high', 'critical');
create type public.geofence_type as enum ('restricted', 'high_risk', 'safe');

-- Emergency contacts
create table if not exists public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  phone text not null,
  relationship text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.emergency_contacts enable row level security;

create policy "Users can manage their own emergency contacts"
  on public.emergency_contacts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Authorities can view emergency contacts"
  on public.emergency_contacts
  for select
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create trigger set_emergency_contacts_updated_at
before update on public.emergency_contacts
for each row execute function public.update_updated_at_column();

-- Location history
create table if not exists public.location_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  latitude double precision not null,
  longitude double precision not null,
  accuracy double precision,
  speed double precision,
  heading double precision,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.location_history enable row level security;

create policy "Users can manage their own location history"
  on public.location_history
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Authorities can view all location history"
  on public.location_history
  for select
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create index if not exists idx_location_history_user_time on public.location_history(user_id, recorded_at desc);

create trigger set_location_history_updated_at
before update on public.location_history
for each row execute function public.update_updated_at_column();

-- Geofences
create table if not exists public.geofences (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type geofence_type not null,
  polygon jsonb not null,
  risk_level int not null default 1,
  alert_message text,
  is_active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.geofences enable row level security;

create policy "Anyone authenticated can view active geofences"
  on public.geofences
  for select
  to authenticated
  using (is_active = true);

create policy "Authorities can manage geofences"
  on public.geofences
  for all
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'))
  with check (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create trigger set_geofences_updated_at
before update on public.geofences
for each row execute function public.update_updated_at_column();

-- Incidents
create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type incident_type not null,
  latitude double precision,
  longitude double precision,
  address text,
  occurred_at timestamptz not null default now(),
  status incident_status not null default 'active',
  assigned_officer uuid,
  evidence jsonb,
  resolution text,
  e_fir_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.incidents enable row level security;

create policy "Users can create incidents for themselves"
  on public.incidents
  for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own incidents"
  on public.incidents
  for select
  using (auth.uid() = user_id);

create policy "Authorities can view all incidents"
  on public.incidents
  for select
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create policy "Authorities can update all incidents"
  on public.incidents
  for update
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create trigger set_incidents_updated_at
before update on public.incidents
for each row execute function public.update_updated_at_column();

-- Alerts
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type alert_type not null,
  message text not null,
  priority alert_priority not null default 'low',
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.alerts enable row level security;

create policy "Users can view their own alerts"
  on public.alerts
  for select
  using (auth.uid() = user_id);

create policy "Users can mark their own alerts as read"
  on public.alerts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can create their own alerts"
  on public.alerts
  for insert
  with check (auth.uid() = user_id);

create policy "Authorities can create alerts for any user"
  on public.alerts
  for insert
  with check (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create policy "Authorities can view all alerts"
  on public.alerts
  for select
  using (has_role(auth.uid(), 'authority') or has_role(auth.uid(), 'admin'));

create trigger set_alerts_updated_at
before update on public.alerts
for each row execute function public.update_updated_at_column();

-- Realtime setup
alter table public.location_history replica identity full;
alter table public.incidents replica identity full;
alter table public.alerts replica identity full;

-- Add to realtime publication
alter publication supabase_realtime add table public.location_history;
alter publication supabase_realtime add table public.incidents;
alter publication supabase_realtime add table public.alerts;