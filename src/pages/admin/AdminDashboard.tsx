import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg text-gray-700">
          Selamat datang di panel admin, {user?.email || 'Admin'}!
        </p>
        <p className="mt-2 text-gray-600">
          Dari sini Anda dapat mengelola berbagai aspek website sekolah. Silakan pilih menu di samping untuk memulai.
        </p>
      </div>
      {/* Tambahkan ringkasan atau statistik di sini jika perlu */}
    </div>
  );
};

export default AdminDashboard;