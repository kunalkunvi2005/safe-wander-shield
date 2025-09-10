import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states for tourist
  const [touristForm, setTouristForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    isLogin: true
  });

  // Form states for authority
  const [authorityForm, setAuthorityForm] = useState({
    email: "",
    password: "",
    isLogin: true
  });

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirect based on user role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);
        
        if (roles?.some(r => r.role === 'authority' || r.role === 'admin')) {
          navigate('/authority');
        } else {
          navigate('/');
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleTouristSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (touristForm.isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: touristForm.email,
          password: touristForm.password
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully logged in as tourist.",
        });
        navigate('/');
      } else {
        // Registration
        if (touristForm.password !== touristForm.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        if (touristForm.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        const { data, error } = await supabase.auth.signUp({
          email: touristForm.email,
          password: touristForm.password,
          options: {
            data: {
              first_name: touristForm.firstName,
              last_name: touristForm.lastName,
              phone: touristForm.phone,
              nationality: touristForm.nationality
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthoritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (authorityForm.isLogin) {
        // Authority login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authorityForm.email,
          password: authorityForm.password
        });

        if (error) throw error;

        // Check if user has authority role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id);

        if (!roles?.some(r => r.role === 'authority' || r.role === 'admin')) {
          await supabase.auth.signOut();
          throw new Error("Access denied. This account is not authorized for the authority portal.");
        }

        toast({
          title: "Authority access granted",
          description: "Successfully logged in to authority portal.",
        });
        navigate('/authority');
      } else {
        setError("Authority registration is restricted. Please contact system administrator.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Smart Tourist Safety</h1>
          </div>
          <p className="text-muted-foreground">Choose your access type to continue</p>
        </div>

        <Tabs defaultValue="tourist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tourist" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tourist
            </TabsTrigger>
            <TabsTrigger value="authority" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Authority
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="tourist">
            <Card className="safety-card">
              <CardHeader>
                <CardTitle className="text-center">
                  {touristForm.isLogin ? "Tourist Login" : "Tourist Registration"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTouristSubmit} className="space-y-4">
                  {!touristForm.isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={touristForm.firstName}
                            onChange={(e) => setTouristForm(prev => ({ ...prev, firstName: e.target.value }))}
                            required={!touristForm.isLogin}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={touristForm.lastName}
                            onChange={(e) => setTouristForm(prev => ({ ...prev, lastName: e.target.value }))}
                            required={!touristForm.isLogin}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={touristForm.phone}
                          onChange={(e) => setTouristForm(prev => ({ ...prev, phone: e.target.value }))}
                          required={!touristForm.isLogin}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          type="text"
                          value={touristForm.nationality}
                          onChange={(e) => setTouristForm(prev => ({ ...prev, nationality: e.target.value }))}
                          required={!touristForm.isLogin}
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={touristForm.email}
                      onChange={(e) => setTouristForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={touristForm.password}
                        onChange={(e) => setTouristForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  {!touristForm.isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={touristForm.confirmPassword}
                        onChange={(e) => setTouristForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required={!touristForm.isLogin}
                      />
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : (touristForm.isLogin ? "Login" : "Register")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setTouristForm(prev => ({ ...prev, isLogin: !prev.isLogin }));
                      setError("");
                    }}
                  >
                    {touristForm.isLogin ? "Need an account? Register here" : "Already have an account? Login here"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authority">
            <Card className="safety-card">
              <CardHeader>
                <CardTitle className="text-center">Authority Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuthoritySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-email">Email</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      value={authorityForm.email}
                      onChange={(e) => setAuthorityForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        value={authorityForm.password}
                        onChange={(e) => setAuthorityForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-neutral to-primary text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Login"}
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Authority registration is restricted. Contact system administrator for access.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;