import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, MessageSquare, MapPin, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyPanel = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyTimer, setEmergencyTimer] = useState(0);
  const { toast } = useToast();

  const emergencyContacts = [
    { name: "Local Police", number: "100", type: "police" },
    { name: "Tourist Helpline", number: "1363", type: "tourist" },
    { name: "Emergency Contact", number: "+91 98765 43210", type: "personal" }
  ];

  const activateEmergency = () => {
    setIsEmergencyActive(true);
    setEmergencyTimer(Date.now());
    
    toast({
      title: "🚨 Emergency Alert Activated",
      description: "Location shared with authorities. Help is on the way!",
      variant: "destructive",
    });

    // Simulate emergency response
    setTimeout(() => {
      toast({
        title: "📍 Location Shared",
        description: "Your location has been sent to emergency contacts.",
      });
    }, 2000);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyTimer(0);
    
    toast({
      title: "Emergency Cancelled",
      description: "Emergency alert has been cancelled.",
    });
  };

  return (
    <Card className="safety-card border-2 border-danger/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-danger">
          <AlertTriangle className="w-5 h-5" />
          Emergency Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* SOS Button */}
        <div className="text-center space-y-3">
          {!isEmergencyActive ? (
            <Button
              onClick={activateEmergency}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-danger to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg shadow-lg emergency-pulse"
              size="lg"
            >
              SOS
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-danger to-red-600 mx-auto flex items-center justify-center text-white font-bold animate-pulse">
                ACTIVE
              </div>
              <Button
                onClick={cancelEmergency}
                variant="outline"
                className="border-danger text-danger hover:bg-danger hover:text-white"
              >
                Cancel Emergency
              </Button>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            {isEmergencyActive 
              ? "Emergency alert active - authorities notified" 
              : "Press in case of emergency"
            }
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Emergency Contacts</h4>
          <div className="grid gap-2">
            {emergencyContacts.map((contact, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-between h-12 px-4"
                onClick={() => {
                  toast({
                    title: `Calling ${contact.name}`,
                    description: `Dialing ${contact.number}...`,
                  });
                }}
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{contact.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{contact.number}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-10">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Emergency Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <p className="text-sm text-muted-foreground">
                  A message with your current location will be sent to your emergency contacts.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Message Sent",
                      description: "Emergency message sent to all contacts.",
                    });
                  }}
                >
                  Send Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-10">
                <Mic className="w-4 h-4 mr-2" />
                Voice Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Voice Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-danger" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Record a voice message to send with your location
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      🔴 Start Recording
                    </Button>
                    <Button className="w-full" disabled>
                      Send Recording
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyPanel;