import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnnouncementsPage from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import StudentProgressPage from "./pages/StudentProgressPage";
import BlogListPage from "./pages/BlogListPage"; // <-- BARU
import BlogDetailPage from "./pages/BlogDetailPage"; // <-- BARU

// Context Providers
import { AnnouncementsProvider } from "./contexts/AnnouncementsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TeachersProvider } from "./contexts/TeachersContext";
import { YouTubeVideosProvider } from "./contexts/YouTubeVideosContext";
import { SubjectsProvider } from "./contexts/SubjectsContext";
import { StudentProgressProvider } from "./contexts/StudentProgressContext";
import { StudentBlogsProvider } from "./contexts/StudentBlogsContext"; // <-- BARU

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageYouTubeVideos from "./pages/admin/ManageYouTubeVideos";
import ManageSubjects from "./pages/admin/ManageSubjects";
import ManageReports from "./pages/admin/ManageReports";
import ManageStudentBlogs from "./pages/admin/ManageStudentBlogs"; // <-- BARU

const queryClient = new QueryClient();

const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen"><p>Memeriksa status otentikasi...</p></div>;
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AnnouncementsProvider>
          <TeachersProvider>
            <YouTubeVideosProvider>
              <SubjectsProvider>
                <StudentProgressProvider>
                  <StudentBlogsProvider> {/* <-- BARU */}
                    <TooltipProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          {/* Rute Publik */}
                          <Route path="/" element={<Index />} />
                          <Route path="/pengumuman" element={<AnnouncementsPage />} />
                          <Route path="/pengumuman/:announcementId" element={<AnnouncementDetail />} />
                          <Route path="/progres-siswa" element={<StudentProgressPage />} /> 
                          <Route path="/blog" element={<BlogListPage />} /> {/* <-- BARU */}
                          <Route path="/blog/:slug" element={<BlogDetailPage />} /> {/* <-- BARU */}
                          
                          {/* Rute Admin */}
                          <Route path="/admin/login" element={<AdminLogin />} />
                          <Route path="/admin" element={<ProtectedRoute />}>
                            <Route element={<AdminLayout />}>
                              <Route index element={<AdminDashboard />} />
                              <Route path="dashboard" element={<AdminDashboard />} />
                              <Route path="pengumuman" element={<ManageAnnouncements />} />
                              <Route path="guru" element={<ManageTeachers />} />
                              <Route path="video" element={<ManageYouTubeVideos />} />
                              <Route path="mapel" element={<ManageSubjects />} />
                              <Route path="laporan-nilai" element={<ManageReports />} />
                              <Route path="blog" element={<ManageStudentBlogs />} /> {/* <-- BARU */}
                            </Route>
                          </Route>

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </TooltipProvider>
                  </StudentBlogsProvider> {/* <-- BARU */}
                </StudentProgressProvider>
              </SubjectsProvider>
            </YouTubeVideosProvider>
          </TeachersProvider>
        </AnnouncementsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;