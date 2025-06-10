import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Newspaper, Users, Video, Book, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try { await logout(); navigate('/admin/login'); } 
    catch (error) { console.error("Logout error:", error); }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pengumuman', path: '/admin/pengumuman', icon: Newspaper },
    { name: 'Guru', path: '/admin/guru', icon: Users },
    { name: 'Video', path: '/admin/video', icon: Video },
    { name: 'Mata Pelajaran', path: '/admin/mapel', icon: Book }, // <-- BARU
    { name: 'Laporan Nilai', path: '/admin/laporan-nilai', icon: FileText }, // <-- BARU
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <header className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <div className="text-xl font-semibold">Admin Panel</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </header>
      <aside className={`
        w-full md:w-64 bg-gray-800 text-white p-6 space-y-6 
        fixed md:sticky md:top-0 h-screen shadow-lg z-30 
        transform md:transform-none transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 overflow-y-auto
      `}>
        <div className="text-2xl font-semibold text-center hidden md:block">Admin Panel</div>
        <nav className="space-y-1 mt-4 md:mt-0">
          {navItems.map(item => (
            <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150
                ${location.pathname.startsWith(item.path) ? 'bg-gray-700 text-white font-semibold' : ''}
              `}>
              <item.icon size={20} className="mr-3 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 right-0 px-6">
           {user && <p className="text-xs text-gray-400 mb-2 truncate">Login sebagai: {user.email}</p>}
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-md transition duration-150 ease-in-out">
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;