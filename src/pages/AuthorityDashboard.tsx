import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Users, AlertTriangle, MapPin, Clock, Phone, 
  FileText, TrendingUp, Search, Filter, LogOut, AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

const AuthorityDashboard = () => {
  const { user, loading, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeIncidents, setActiveIncidents] = useState(3);
  const [totalTourists, setTotalTourists] = useState(127);

  useEffect(() => {
    if (!loading && (!user || !hasRole('authority') && !hasRole('admin'))) {
      navigate('/auth');
    }
  }, [user, loading, hasRole, navigate]);
  
  const mockTourists = [
    {
      id: "T001",
      name: "Ravi Kumar",
      location: "Shillong, Meghalaya",
      safetyScore: 85,
      status: "safe",
      lastSeen: "2 minutes ago",
      digitalId: "DID-RK-2024-001"
    },
    {
      id: "T002", 
      name: "Sarah Johnson",
      location: "Kaziranga National Park",
      safetyScore: 65,
      status: "caution",
      lastSeen: "15 minutes ago",
      digitalId: "DID-SJ-2024-002"
    },
    {
      id: "T003",
      name: "Amit Patel", 
      location: "Unknown",
      safetyScore: 25,
      status: "danger",
      lastSeen: "45 minutes ago",
      digitalId: "DID-AP-2024-003"
    }
  ];

  const mockIncidents = [
    {
      id: "INC001",
      touristId: "T003",
      touristName: "Amit Patel",
      type: "Location Lost",
      priority: "high",
      location: "Last seen: Elephant Falls",
      timestamp: "45 minutes ago",
      status: "investigating"
    },
    {
      id: "INC002", 
      touristId: "T002",
      touristName: "Sarah Johnson",
      type: "Geo-fence Alert",
      priority: "medium",
      location: "Kaziranga Buffer Zone",
      timestamp: "2 hours ago", 
      status: "resolved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "default";
      case "caution": return "secondary"; 
      case "danger": return "destructive";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <Card className="safety-card p-8">
          <div className="text-center space-y-4">
            <Shield className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <p className="text-lg font-medium">Verifying authority access...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!user || (!hasRole('authority') && !hasRole('admin'))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
        <Card className="safety-card max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-16 h-16 text-danger mx-auto mb-4" />
            <CardTitle className="text-2xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Authority credentials required to access this dashboard.
              </AlertDescription>
            </Alert>
            <p className="text-muted-foreground">
              This portal is restricted to authorized personnel only.
            </p>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Authority Control Center</h1>
          <p className="text-muted-foreground">Real-time tourist safety monitoring and incident response</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tourists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTourists}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{activeIncidents}</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">4.2m</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">87%</div>
            <p className="text-xs text-muted-foreground">Overall safety</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tourists">Tourists</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Live Tourist Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative">
                  <div className="text-center space-y-2">
                    <MapPin className="w-8 h-8 text-primary mx-auto" />
                    <p className="font-medium">Interactive Tourist Map</p>
                    <p className="text-sm text-muted-foreground">{totalTourists} tourists being tracked</p>
                  </div>
                  {/* Simulate tourist markers */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-12 w-3 h-3 bg-danger rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockIncidents.filter(inc => inc.status === "investigating").map(incident => (
                  <div key={incident.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertTriangle className="w-4 h-4 text-warning mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{incident.type}</span>
                        <Badge variant={getPriorityColor(incident.priority)} className="text-xs">
                          {incident.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.touristName}</p>
                      <p className="text-xs text-muted-foreground">{incident.location}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Respond
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tourists" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search tourists by name or ID..." 
                className="w-full"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Tourist List */}
          <Card>
            <CardHeader>
              <CardTitle>Tourist Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTourists.map(tourist => (
                  <div key={tourist.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {tourist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{tourist.name}</span>
                          <Badge variant={getStatusColor(tourist.status)} className="text-xs">
                            {tourist.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tourist.location}</p>
                        <p className="text-xs text-muted-foreground">ID: {tourist.digitalId}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className={`text-lg font-bold ${
                        tourist.safetyScore >= 75 ? 'text-success' : 
                        tourist.safetyScore >= 50 ? 'text-warning' : 'text-danger'
                      }`}>
                        {tourist.safetyScore}
                      </div>
                      <p className="text-xs text-muted-foreground">{tourist.lastSeen}</p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Incident Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockIncidents.map(incident => (
                  <div key={incident.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className={`w-5 h-5 mt-1 ${
                        incident.priority === 'high' ? 'text-danger' : 'text-warning'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{incident.type}</span>
                          <Badge variant={getPriorityColor(incident.priority)} className="text-xs">
                            {incident.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{incident.touristName}</p>
                        <p className="text-xs text-muted-foreground">{incident.location}</p>
                        <p className="text-xs text-muted-foreground">{incident.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      {incident.status === "investigating" && (
                        <Button size="sm">Take Action</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Safety Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-success/10 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">Safety Analytics</p>
                    <p className="text-sm text-muted-foreground">87% average safety score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-bold text-success">4.2 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Incidents Resolved</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tourist Satisfaction</span>
                    <span className="font-bold text-success">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthorityDashboard;