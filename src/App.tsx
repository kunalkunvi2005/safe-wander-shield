import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TouristDashboard from "./pages/TouristDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TouristDashboardPreview from "./pages/TouristDashboardPreview";
import AdminDashboardPreview from "./pages/AdminDashboardPreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<TouristDashboard />} />
            <Route path="/authority" element={<AuthorityDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/tourist-preview" element={<TouristDashboardPreview />} />
            <Route path="/admin-preview" element={<AdminDashboardPreview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;