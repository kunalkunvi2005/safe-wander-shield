import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Phone, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import EmergencyPanel from "./EmergencyPanel";
import LocationTracker from "./LocationTracker";

interface SafetyScore {
  score: number;
  status: "safe" | "caution" | "danger";
  factors: string[];
}

const SafetyDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 25.5788,
    lng: 91.8933,
    address: "Shillong, Meghalaya"
  });
  
  const [safetyScore, setSafetyScore] = useState<SafetyScore>({
    score: 85,
    status: "safe",
    factors: ["Following planned route", "Good weather conditions", "Regular check-ins"]
  });

  const [lastActivity, setLastActivity] = useState<string>("2 minutes ago");

  const getScoreColor = (score: number) => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 75) return "safety-gradient-high";
    if (score >= 50) return "safety-gradient-medium";
    return "safety-gradient-low";
  };

  const mockAlerts = [
    {
      id: 1,
      type: "info",
      message: "Welcome to Shillong! Remember to check-in every 2 hours.",
      time: "10 minutes ago"
    },
    {
      id: 2,
      type: "warning", 
      message: "Weather advisory: Light rain expected in the evening.",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tourist Safety Monitor
        </h1>
        <p className="text-muted-foreground">Real-time safety tracking and emergency assistance</p>
      </div>

      {/* Safety Score Card */}
      <Card className="safety-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Current Safety Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full ${getScoreGradient(safetyScore.score)} mx-auto flex items-center justify-center text-white shadow-lg`}>
              <div className="text-center">
                <div className="text-3xl font-bold">{safetyScore.score}</div>
                <div className="text-sm opacity-90">Score</div>
              </div>
            </div>
          </div>
          
          <Badge 
            variant={safetyScore.status === "safe" ? "default" : safetyScore.status === "caution" ? "secondary" : "destructive"}
            className="text-sm px-3 py-1"
          >
            {safetyScore.status.toUpperCase()}
          </Badge>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Safety Factors:</p>
            <div className="space-y-1">
              {safetyScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Status */}
      <Card className="safety-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">{currentLocation.address}</span>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {lastActivity}
            </Badge>
          </div>
          <LocationTracker location={currentLocation} />
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>Lat: {currentLocation.lat.toFixed(4)}</div>
            <div>Lng: {currentLocation.lng.toFixed(4)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Panel */}
      <EmergencyPanel />

      {/* Recent Alerts */}
      <Card className="safety-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAlerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <AlertTriangle className={`w-4 h-4 mt-0.5 ${alert.type === 'warning' ? 'text-warning' : 'text-primary'}`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          <Phone className="w-4 h-4 mr-2" />
          Check In
        </Button>
        <Button variant="outline" className="h-12">
          <MapPin className="w-4 h-4 mr-2" />
          Share Location
        </Button>
      </div>
    </div>
  );
};

export default SafetyDashboard;