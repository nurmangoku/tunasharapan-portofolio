import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"; // Tambah Navigate, Outlet
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnnouncementsPage from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import { AnnouncementsProvider } from "./contexts/AnnouncementsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // <-- BARU: Impor Auth

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements"

const queryClient = new QueryClient();

// Komponen untuk melindungi rute admin
const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication status...</div>; // Atau spinner
  }

  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider> {/* <-- BARU: Bungkus dengan AuthProvider paling luar */}
      <AnnouncementsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Rute Publik */}
              <Route path="/" element={<Index />} />
              <Route path="/pengumuman" element={<AnnouncementsPage />} />
              <Route path="/pengumuman/:announcementId" element={<AnnouncementDetail />} />
              
              {/* Rute Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute />}> {/* Lindungi rute di dalam AdminLayout */}
                <Route element={<AdminLayout />}> {/* Layout untuk semua halaman admin */}
                  <Route index element={<AdminDashboard />} /> {/* /admin akan mengarah ke dashboard */}
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="pengumuman" element={<ManageAnnouncements />} />
                  {/* Tambahkan rute admin lainnya di sini */}
                  {/* Contoh: <Route path="guru" element={<ManageTeachers />} /> */}
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;