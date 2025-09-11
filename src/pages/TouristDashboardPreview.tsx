import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  Heart,
  Bell,
  Settings,
  Navigation,
  Activity
} from 'lucide-react';
import LocationTracker from '@/components/LocationTracker';
import EmergencyPanel from '@/components/EmergencyPanel';

interface SafetyMetrics {
  score: number;
  status: 'safe' | 'caution' | 'danger';
  factors: string[];
}

const TouristDashboardPreview = () => {
  const [safetyMetrics] = useState<SafetyMetrics>({
    score: 85,
    status: 'safe',
    factors: ['Location verified', 'Emergency contacts active', 'GPS tracking enabled']
  });
  const [currentLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: 'New York, NY'
  });

  // Mock data for preview
  const mockUser = {
    email: 'tourist@example.com',
    user_metadata: {
      first_name: 'John',
      last_name: 'Doe'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600';
      case 'caution': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Tourist Dashboard Preview</h1>
                <p className="text-muted-foreground">
                  Welcome, {mockUser.user_metadata.first_name} {mockUser.user_metadata.last_name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Badge variant="outline">Preview Mode</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Safety Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Safety Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold flex items-center space-x-2">
                    <span className={getScoreColor(safetyMetrics.score)}>
                      {safetyMetrics.score}
                    </span>
                    <Badge className={getStatusColor(safetyMetrics.status)}>
                      {safetyMetrics.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress value={safetyMetrics.score} className="w-32" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Contributing factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {safetyMetrics.factors.map((factor, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-2xl font-bold">72</p>
                          <p className="text-xs text-muted-foreground">Heart Rate</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-2xl font-bold">2.3</p>
                          <p className="text-xs text-muted-foreground">Miles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-2xl font-bold">45</p>
                          <p className="text-xs text-muted-foreground">Active Min</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-2xl font-bold">3</p>
                          <p className="text-xs text-muted-foreground">Check-ins</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm">Safety check-in at Central Park</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm">Location shared with emergency contacts</p>
                          <p className="text-xs text-muted-foreground">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Bell className="h-4 w-4 text-yellow-500" />
                        <div className="flex-1">
                          <p className="text-sm">Safety alert resolved</p>
                          <p className="text-xs text-muted-foreground">6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Current Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationTracker location={currentLocation} />
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Address:</strong> {currentLocation.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Lat: {currentLocation.lat}, Lng: {currentLocation.lng}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Safe Places</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                          <p className="font-medium">Police Station</p>
                          <p className="text-sm text-muted-foreground">0.3 miles away</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                          <p className="font-medium">Hospital</p>
                          <p className="text-sm text-muted-foreground">0.7 miles away</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                          <p className="font-medium">Embassy</p>
                          <p className="text-sm text-muted-foreground">1.2 miles away</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">8/10</p>
                        <p className="text-sm text-muted-foreground">Safety Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">5</p>
                        <p className="text-sm text-muted-foreground">Locations Visited</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">12h</p>
                        <p className="text-sm text-muted-foreground">Active Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Daily Check-ins</span>
                        <span>3/5</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Emergency Contacts</span>
                        <span>2/3</span>
                      </div>
                      <Progress value={67} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Safety Features</span>
                        <span>4/4</span>
                      </div>
                      <Progress value={100} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <EmergencyPanel />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check In
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Share Location
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Local Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-xs font-medium">Weather Alert</p>
                    <p className="text-xs text-muted-foreground">Heavy rain expected</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-xs font-medium">Traffic Update</p>
                    <p className="text-xs text-muted-foreground">Road closure on 5th Ave</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboardPreview;