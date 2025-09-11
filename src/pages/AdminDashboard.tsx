import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Shield,
  Users,
  AlertTriangle,
  Activity,
  Settings,
  LogOut,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  MapPin,
  Bell,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalIncidents: number;
  resolvedIncidents: number;
  systemHealth: number;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
  location?: string;
}

interface Incident {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  reportedBy: string;
  reportedAt: string;
  location: string;
  description: string;
}

const AdminDashboard = () => {
  const { user, loading, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalIncidents: 23,
    resolvedIncidents: 18,
    systemHealth: 98
  });

  const [mockUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'tourist',
      status: 'active',
      lastActivity: '2 min ago',
      location: 'New York, NY'
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'authority',
      status: 'active',
      lastActivity: '15 min ago',
      location: 'Los Angeles, CA'
    },
    {
      id: '3',
      email: 'mike.johnson@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'tourist',
      status: 'inactive',
      lastActivity: '2 days ago',
      location: 'Chicago, IL'
    }
  ]);

  const [mockIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'Medical Emergency',
      severity: 'high',
      status: 'investigating',
      reportedBy: 'john.doe@example.com',
      reportedAt: '1 hour ago',
      location: 'Central Park, NY',
      description: 'Tourist reported feeling unwell during tour'
    },
    {
      id: '2',
      type: 'Lost Tourist',
      severity: 'medium',
      status: 'open',
      reportedBy: 'jane.smith@example.com',
      reportedAt: '3 hours ago',
      location: 'Times Square, NY',
      description: 'Tourist group member separated from group'
    },
    {
      id: '3',
      type: 'Safety Alert',
      severity: 'low',
      status: 'resolved',
      reportedBy: 'system',
      reportedAt: '1 day ago',
      location: 'Brooklyn Bridge, NY',
      description: 'Weather advisory for outdoor activities'
    }
  ]);

  useEffect(() => {
    if (!loading && (!user || !hasRole('admin'))) {
      navigate('/auth');
    }
  }, [user, loading, hasRole, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !hasRole('admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">You don't have admin privileges to access this dashboard.</p>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Login as Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
                <h1 className="font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">System Management Portal</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="hover-scale animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Incidents</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.totalIncidents - stats.resolvedIncidents}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.resolvedIncidents}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Health</p>
                  <p className="text-2xl font-bold text-green-600">{stats.systemHealth}%</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search users..." className="pl-10" />
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="tourist">Tourist</SelectItem>
                        <SelectItem value="authority">Authority</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Users Table */}
                  <div className="space-y-2">
                    {mockUsers.map((user, index) => (
                      <Card key={user.id} className="hover:shadow-md transition-shadow" style={{animationDelay: `${index * 0.1}s`}}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                {user.firstName[0]}{user.lastName[0]}
                              </div>
                              <div>
                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {user.role}
                                  </Badge>
                                  <Badge variant="outline" className={`text-xs ${getStatusColor(user.status)}`}>
                                    {user.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-right">
                              <div className="text-sm">
                                <p className="text-muted-foreground">Last active:</p>
                                <p className="font-medium">{user.lastActivity}</p>
                                {user.location && (
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {user.location}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Incident Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIncidents.map((incident, index) => (
                    <Card key={incident.id} className="hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{incident.type}</h3>
                              <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity}
                              </Badge>
                              <Badge variant="outline">
                                {incident.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{incident.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Reported by: {incident.reportedBy}</span>
                              <span>{incident.reportedAt}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {incident.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">2.4k</div>
                        <div className="text-sm text-muted-foreground">Daily Active Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                        <div className="text-sm text-muted-foreground">System Uptime</div>
                      </div>
                    </div>
                    <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Analytics Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'API Response Time', value: '125ms', status: 'good' },
                      { name: 'Database Performance', value: '98%', status: 'good' },
                      { name: 'Error Rate', value: '0.02%', status: 'good' },
                      { name: 'Storage Usage', value: '67%', status: 'warning' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{metric.value}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            metric.status === 'good' ? 'bg-green-500' : 
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-users">Maximum Active Users</Label>
                      <Input id="max-users" type="number" defaultValue="5000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alert-threshold">Alert Threshold</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (24 hours)</SelectItem>
                          <SelectItem value="medium">Medium (12 hours)</SelectItem>
                          <SelectItem value="high">High (6 hours)</SelectItem>
                          <SelectItem value="critical">Critical (1 hour)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-retention">Log Retention (days)</Label>
                      <Input id="log-retention" type="number" defaultValue="90" />
                    </div>
                    <div className="pt-4">
                      <Button className="w-full">Save Configuration</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;