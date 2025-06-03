import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Newspaper, Users, BookOpen, MessageSquare, Settings, Building2 } from 'lucide-react'; // Tambahkan ikon yang relevan

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout error:", error);
      // Tampilkan notifikasi error jika perlu
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pengumuman', path: '/admin/pengumuman', icon: Newspaper },
    // { name: 'Guru', path: '/admin/guru', icon: Users },
    // { name: 'Profil Sekolah', path: '/admin/profil-sekolah', icon: Building2 },
    // { name: 'SPMB', path: '/admin/spmb', icon: BookOpen },
    // { name: 'Review', path: '/admin/review', icon: MessageSquare },
    // { name: 'Kontak', path: '/admin/kontak', icon: Settings },
    // Tambahkan item navigasi lain di sini
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6 fixed h-full shadow-lg">
        <div className="text-2xl font-semibold text-center">Admin Panel</div>
        <nav className="space-y-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-2.5 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
              // activeClassName="bg-gray-700 text-white" // Untuk styling active link jika menggunakan NavLink
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 right-0 px-6">
           {user && <p className="text-sm text-gray-400 mb-2 truncate">Logged in as: {user.email}</p>}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 md:p-10"> {/* ml-64 sesuai lebar sidebar */}
        <Outlet /> {/* Konten halaman admin akan dirender di sini */}
      </main>
    </div>
  );
};

export default AdminLayout;