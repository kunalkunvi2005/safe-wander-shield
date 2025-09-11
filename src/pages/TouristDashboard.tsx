import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
  LogOut,
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

const TouristDashboard = () => {
  const { user, loading, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const [safetyMetrics, setSafetyMetrics] = useState<SafetyMetrics>({
    score: 85,
    status: 'safe',
    factors: ['Location verified', 'Emergency contacts active', 'GPS tracking enabled']
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: 'New York, NY'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600';
      case 'caution': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <h1 className="font-semibold">Tourist Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.email?.split('@')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Safety Status Card */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-background animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Safety Status
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                {safetyMetrics.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Safety Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(safetyMetrics.score)}`}>
                {safetyMetrics.score}/100
              </span>
            </div>
            <Progress value={safetyMetrics.score} className="h-2" />
            <div className="space-y-2">
              {safetyMetrics.factors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center p-4 hover-scale animate-fade-in">
                    <CardContent className="pt-0">
                      <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-500">72</div>
                      <div className="text-xs text-muted-foreground">Heart Rate</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 hover-scale animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <CardContent className="pt-0">
                      <Navigation className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-500">2.4</div>
                      <div className="text-xs text-muted-foreground">km walked</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 hover-scale animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <CardContent className="pt-0">
                      <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-500">3h</div>
                      <div className="text-xs text-muted-foreground">Active time</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 hover-scale animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <CardContent className="pt-0">
                      <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-500">4</div>
                      <div className="text-xs text-muted-foreground">Check-ins</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: '2 min ago', message: 'Location verified: Times Square', status: 'safe' },
                        { time: '15 min ago', message: 'Check-in completed successfully', status: 'safe' },
                        { time: '1 hour ago', message: 'Entered safe zone: Central Park', status: 'safe' },
                        { time: '2 hours ago', message: 'Emergency contact updated', status: 'info' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'safe' ? 'bg-green-500' : 
                            activity.status === 'caution' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Current Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationTracker location={currentLocation} />
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">{currentLocation.address}</p>
                      <p className="text-xs text-muted-foreground">
                        Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Nearby Places */}
                <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <CardHeader>
                    <CardTitle>Nearby Safe Places</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: 'Police Station', distance: '0.3 km', type: 'emergency' },
                        { name: 'Tourist Information Center', distance: '0.5 km', type: 'info' },
                        { name: 'Hospital', distance: '1.2 km', type: 'medical' },
                        { name: 'Embassy', distance: '2.1 km', type: 'official' }
                      ].map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <p className="text-sm font-medium">{place.name}</p>
                            <p className="text-xs text-muted-foreground">{place.distance}</p>
                          </div>
                          <Badge variant="outline">{place.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Today's Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">5</div>
                          <div className="text-sm text-muted-foreground">Places visited</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">100%</div>
                          <div className="text-sm text-muted-foreground">Safety compliance</div>
                        </div>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-muted-foreground text-center">Daily activity: 75% complete</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Panel */}
            <EmergencyPanel />

            {/* Quick Actions */}
            <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check In
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Weather & Alerts */}
            <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="text-lg">Local Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">All Clear</p>
                      <p className="text-xs text-green-600">No active alerts in your area</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TouristDashboard;