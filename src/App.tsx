import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SplashScreen from "./pages/SplashScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import MapScreen from "./pages/MapScreen";
import MechanicScreen from "./pages/MechanicScreen";
import TrackingScreen from "./pages/TrackingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import RatingScreen from "./pages/RatingScreen";
import ProfileScreen from "./pages/ProfileScreen";
import HistoryScreen from "./pages/HistoryScreen";
import SupportScreen from "./pages/SupportScreen";
import VehiclesScreen from "./pages/VehiclesScreen";
import PersonalDetailsScreen from "./pages/PersonalDetailsScreen";
import PaymentMethodsScreen from "./pages/PaymentMethodsScreen";
import NotificationsScreen from "./pages/NotificationsScreen";
import PrivacySecurityScreen from "./pages/PrivacySecurityScreen";
import AppSettingsScreen from "./pages/AppSettingsScreen";
import TermsPoliciesScreen from "./pages/TermsPoliciesScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/onboarding" element={<OnboardingScreen />} />
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute><MapScreen /></ProtectedRoute>} />
                <Route path="/mechanic" element={<ProtectedRoute><MechanicScreen /></ProtectedRoute>} />
                <Route path="/tracking" element={<ProtectedRoute><TrackingScreen /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />
                <Route path="/rating" element={<ProtectedRoute><RatingScreen /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
                <Route path="/profile/vehicles" element={<ProtectedRoute><VehiclesScreen /></ProtectedRoute>} />
                <Route path="/profile/details" element={<ProtectedRoute><PersonalDetailsScreen /></ProtectedRoute>} />
                <Route path="/profile/payment" element={<ProtectedRoute><PaymentMethodsScreen /></ProtectedRoute>} />
                <Route path="/profile/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
                <Route path="/profile/privacy" element={<ProtectedRoute><PrivacySecurityScreen /></ProtectedRoute>} />
                <Route path="/profile/settings" element={<ProtectedRoute><AppSettingsScreen /></ProtectedRoute>} />
                <Route path="/terms" element={<ProtectedRoute><TermsPoliciesScreen /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><HistoryScreen /></ProtectedRoute>} />
                <Route path="/support" element={<ProtectedRoute><SupportScreen /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
