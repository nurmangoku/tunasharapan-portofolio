import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnnouncementsPage from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import { AnnouncementsProvider } from "./contexts/AnnouncementsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TeachersProvider } from "./contexts/TeachersContext"; // <-- BARU

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageTeachers from "./pages/admin/ManageTeachers"; // <-- BARU

const queryClient = new QueryClient();

const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen"><p>Memeriksa status otentikasi...</p></div>;
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AnnouncementsProvider>
        <TeachersProvider> {/* <-- BARU */}
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pengumuman" element={<AnnouncementsPage />} />
                <Route path="/pengumuman/:announcementId" element={<AnnouncementDetail />} />
                
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="pengumuman" element={<ManageAnnouncements />} />
                    <Route path="guru" element={<ManageTeachers />} /> {/* <-- BARU */}
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TeachersProvider> {/* <-- BARU */}
      </AnnouncementsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;