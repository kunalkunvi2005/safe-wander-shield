import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, MapPin, Smartphone, Monitor, ArrowRight } from "lucide-react";
import SafetyDashboard from "@/components/SafetyDashboard";
import { Link } from "react-router-dom";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "tourist">("landing");

  if (currentView === "tourist") {
    return <SafetyDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Smart Tourist Safety System</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Safety Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Tourist Safety
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground">
              Redefined
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive safety monitoring system combining AI, blockchain, and geo-fencing 
              technologies to ensure tourist safety through real-time tracking and emergency response.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8"
              onClick={() => setCurrentView("tourist")}
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Tourist Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/authority">
              <Button variant="outline" size="lg" className="px-8">
                <Monitor className="w-5 h-5 mr-2" />
                Authority Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Tourist Safety Features
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced technology stack ensuring comprehensive safety coverage for modern travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="safety-card hover-scale animate-fade-in group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white animate-pulse">
                    <Shield className="w-5 h-5" />
                  </div>
                  Digital ID & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    Blockchain-secured digital identity
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    Real-time GPS location tracking
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    Automated check-in reminders
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    Travel itinerary integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="safety-card hover-scale animate-fade-in group relative overflow-hidden" style={{animationDelay: '0.1s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-white animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  Geo-fencing & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                    Smart geo-fence boundaries
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                    Risk zone identification
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                    Weather & safety alerts
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                    Local guidelines & tips
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="safety-card hover-scale animate-fade-in group relative overflow-hidden border-2 border-red-500/20" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white animate-pulse">
                    <Users className="w-5 h-5" />
                  </div>
                  Emergency Response
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    One-touch SOS button
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    Automatic location sharing
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    Voice message recording
                  </li>
                  <li className="flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    Emergency contact alerts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "24/7 Monitoring", desc: "Round-the-clock safety", color: "from-blue-500 to-cyan-500" },
              { icon: MapPin, title: "Smart Alerts", desc: "Location-based warnings", color: "from-green-500 to-emerald-500" },
              { icon: Users, title: "Emergency Network", desc: "Instant response system", color: "from-red-500 to-pink-500" },
              { icon: Smartphone, title: "Mobile First", desc: "Optimized for mobile", color: "from-purple-500 to-indigo-500" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border hover-scale animate-fade-in group"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-8 mt-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold">Powered by Advanced Technology</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI, blockchain, and geospatial technologies working together
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "AI & Machine Learning", desc: "Anomaly detection" },
              { name: "Blockchain Security", desc: "Digital identity" },
              { name: "Geo-fencing", desc: "Location monitoring" },
              { name: "Real-time Analytics", desc: "Live dashboards" }
            ].map((tech, index) => (
              <Card key={index} className="text-center p-4 safety-card">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-3 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo CTA */}
        <section className="text-center space-y-6 mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border">
          <h3 className="text-2xl font-bold">Ready to Experience Smart Safety?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our comprehensive safety monitoring system designed for the modern tourist ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary text-white"
              onClick={() => setCurrentView("tourist")}
            >
              Try Tourist Dashboard
            </Button>
            <Link to="/authority">
              <Button variant="outline" size="lg">
                View Authority Portal
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold">Smart Tourist Safety System</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Smart Tourist Safety System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;