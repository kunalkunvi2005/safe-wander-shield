import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, AlertTriangle, CheckCircle2 } from "lucide-react";

interface LocationProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const LocationTracker = ({ location }: LocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [trackingStatus, setTrackingStatus] = useState<"active" | "inactive">("active");
  const [isInSafeZone, setIsInSafeZone] = useState(true);
  
  // Simulate geo-fencing and risk zones
  const riskZones = [
    { name: "Construction Site", risk: "high", distance: "0.2km" },
    { name: "Dense Forest Area", risk: "medium", distance: "1.5km" }
  ];

  const safeZones = [
    { name: "Tourist Information Center", distance: "0.8km" },
    { name: "Police Station", distance: "1.2km" },
    { name: "Hotel District", distance: "0.5km" }
  ];

  useEffect(() => {
    // Simulate map initialization
    if (mapRef.current) {
      // In a real implementation, this would initialize Google Maps or Mapbox
      mapRef.current.innerHTML = `
        <div class="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div class="text-center space-y-2 z-10">
            <div class="w-8 h-8 bg-primary rounded-full animate-pulse mx-auto"></div>
            <p class="text-sm font-medium">Live Location: ${location.address}</p>
            <p class="text-xs text-muted-foreground">Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}</p>
          </div>
        </div>
      `;
    }
  }, [location]);

  return (
    <div className="space-y-4">
      {/* Map Display */}
      <div ref={mapRef} className="rounded-lg border"></div>

      {/* Tracking Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${trackingStatus === 'active' ? 'bg-success animate-pulse' : 'bg-neutral'}`}></div>
          <span className="text-sm font-medium">
            Location Tracking {trackingStatus === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <Badge variant={isInSafeZone ? "default" : "destructive"} className="text-xs">
          {isInSafeZone ? (
            <>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Safe Zone
            </>
          ) : (
            <>
              <AlertTriangle className="w-3 h-3 mr-1" />
              Risk Zone
            </>
          )}
        </Badge>
      </div>

      {/* Nearby Safety Points */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="p-3">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Nearby Safe Zones
          </h4>
          <div className="space-y-2">
            {safeZones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{zone.name}</span>
                <Badge variant="outline" className="text-xs">{zone.distance}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-3 border-warning/20 bg-warning/5">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Risk Areas Nearby
          </h4>
          <div className="space-y-2">
            {riskZones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{zone.name}</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={zone.risk === 'high' ? 'destructive' : 'secondary'} 
                    className="text-xs"
                  >
                    {zone.risk}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{zone.distance}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setTrackingStatus(trackingStatus === 'active' ? 'inactive' : 'active')}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {trackingStatus === 'active' ? 'Pause' : 'Resume'} Tracking
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <MapPin className="w-4 h-4 mr-2" />
          Directions
        </Button>
      </div>
    </div>
  );
};

export default LocationTracker;