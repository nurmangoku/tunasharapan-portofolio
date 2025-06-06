import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnnouncementsPage from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import StudentProgressPage from "./pages/StudentProgressPage"; // <-- BARU

// Context Providers
import { AnnouncementsProvider } from "./contexts/AnnouncementsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TeachersProvider } from "./contexts/TeachersContext";
import { YouTubeVideosProvider } from "./contexts/YouTubeVideosContext";
import { SubjectsProvider } from "./contexts/SubjectsContext"; // <-- BARU
import { StudentProgressProvider } from "./contexts/StudentProgressContext"; // <-- BARU

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageYouTubeVideos from "./pages/admin/ManageYouTubeVideos";
import ManageSubjects from "./pages/admin/ManageSubjects"; // <-- BARU
import ManageReports from "./pages/admin/ManageReports"; // <-- BARU

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
        <TeachersProvider>
          <YouTubeVideosProvider>
            <SubjectsProvider>
              <StudentProgressProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      {/* Rute Publik */}
                      <Route path="/" element={<Index />} />
                      <Route path="/pengumuman" element={<AnnouncementsPage />} />
                      <Route path="/pengumuman/:announcementId" element={<AnnouncementDetail />} />
                      <Route path="/progres-siswa" element={<StudentProgressPage />} /> {/* <-- BARU */}
                      
                      {/* Rute Admin */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="dashboard" element={<AdminDashboard />} />
                          <Route path="pengumuman" element={<ManageAnnouncements />} />
                          <Route path="guru" element={<ManageTeachers />} />
                          <Route path="video" element={<ManageYouTubeVideos />} />
                          <Route path="mapel" element={<ManageSubjects />} /> {/* <-- BARU */}
                          <Route path="laporan-nilai" element={<ManageReports />} /> {/* <-- BARU */}
                        </Route>
                      </Route>

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </StudentProgressProvider>
            </SubjectsProvider>
          </YouTubeVideosProvider>
        </TeachersProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;