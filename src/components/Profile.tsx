
import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

const Profile = () => {
  return (
    <section id="profile" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Profil Sekolah</h2>
          <p className="text-lg text-gray-600">Mengenal lebih dekat SMK Nusantara</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"
              alt="Gedung Sekolah"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Tentang Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              SMK Nusantara adalah institusi pendidikan kejuruan yang berkomitmen menghasilkan 
              lulusan berkualitas tinggi, siap kerja, dan berjiwa entrepreneur. Dengan fasilitas 
              modern dan tenaga pengajar berpengalaman, kami membentuk karakter siswa yang unggul 
              dan berdaya saing global.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Eye className="text-blue-600 w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Visi</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Menjadi Sekolah Menengah Kejuruan unggulan yang menghasilkan lulusan berkualitas, 
              berkarakter, dan siap bersaing di era globalisasi dengan berlandaskan nilai-nilai 
              Pancasila dan budaya Indonesia.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Target className="text-green-600 w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Misi</h3>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li>• Menyelenggarakan pendidikan kejuruan berkualitas</li>
              <li>• Mengembangkan kompetensi siswa sesuai kebutuhan industri</li>
              <li>• Membentuk karakter siswa yang berakhlak mulia</li>
              <li>• Menjalin kerjasama dengan dunia usaha dan industri</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Award className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">Akreditasi A</h4>
            <p className="text-gray-600">Terakreditasi A dari BAN-S/M</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Users className="text-blue-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">1500+ Siswa</h4>
            <p className="text-gray-600">Siswa aktif dari berbagai jurusan</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Target className="text-green-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">95% Tersalur</h4>
            <p className="text-gray-600">Lulusan bekerja atau melanjutkan kuliah</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
