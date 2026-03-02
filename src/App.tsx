import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { MemberLayout } from "@/components/MemberLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Cohorts from "./pages/Cohorts";
import Communication from "./pages/Communication";
import CalendarPage from "./pages/CalendarPage";
import Reports from "./pages/Reports";
import Administration from "./pages/Administration";
import Rotas from "./pages/admin/Rotas";
import LinksAdmin from "./pages/admin/LinksAdmin";
import Login from "./pages/Login";
import MemberHome from "./pages/member/MemberHome";
import MyEvents from "./pages/member/MyEvents";
import Learning from "./pages/member/Learning";
import MyRotas from "./pages/member/MyRotas";
import MemberLinks from "./pages/member/MemberLinks";
import MyDetails from "./pages/member/MyDetails";
import MyCommunication from "./pages/member/MyCommunication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isAdmin, isMember } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (isMember) {
    return (
      <MemberLayout>
        <Routes>
          <Route path="/portal" element={<MemberHome />} />
          <Route path="/portal/events" element={<MyEvents />} />
          <Route path="/portal/learning" element={<Learning />} />
          <Route path="/portal/rotas" element={<MyRotas />} />
          <Route path="/portal/links" element={<MemberLinks />} />
          <Route path="/portal/details" element={<MyDetails />} />
          <Route path="/portal/communication" element={<MyCommunication />} />
          <Route path="*" element={<Navigate to="/portal" replace />} />
        </Routes>
      </MemberLayout>
    );
  }

  // Admin routes
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cohorts" element={<Cohorts />} />
        <Route path="/rotas" element={<Rotas />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/links" element={<LinksAdmin />} />
        <Route path="/admin" element={<Administration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
