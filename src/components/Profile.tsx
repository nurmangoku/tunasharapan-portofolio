
import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';
import guru from "../assets/guru.jpg";

const Profile = () => {
  return (
    <section id="profile" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Profil Sekolah</h2>
          <p className="text-lg text-gray-600">Mengenal lebih dekat SDN Tunas Harapan</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={guru}
              alt="Gedung Sekolah"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Tentang Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              SDN Tunas Harapan adalah sekolah dasar negeri yang terletak di Jl. Jend. H. Amir Machmud No. 108 RT.03 RW.023 
              Kel. Cibeureum Kec. Cimahi Selatan - Kota Cimahi. Dengan fasilitas 
              modern dan tenaga pengajar berpengalaman, kami membentuk karakter siswa yang unggul 
              dan religius.
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
            Terwujudnya Murid Yang Aktif dan Kreatif, Sehat, Religius dan Inovatif (ASRI)
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Target className="text-green-600 w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Misi</h3>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li>1. Membentuk Murid Yang Aktif dan Kreatif Melalui diKegiatan Kamis Membaca Bersuara (AKRAB)</li>
              <li>2. Membentuk Murid Yang Sehat Jasmani dan Rohani Melalui Kegiatan Selasa Berolahraga (SEHATI)</li>
              <li>3. Meningkatkan Iman dan Taqwa Murid Melalui Kegiatan Berdzikir (SAJADAH)</li>
              <li>4. Membentuk Murid Yang Inovatif Melalui Kegiatan Pramuka Tunas Harapan dan Gerakan Makan Makanan Tradisional (PRIMA)
              </li>
              <li>5. Merancang Pembelajaran Yang Menarik, Menyenangkan dan Mampu Memotivasi Murid Dengan Perkembangan Iptek (CERDAS)</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Award className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">Akreditasi A</h4>
            <p className="text-gray-600">Terakreditasi A dari BAN-PDM</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Users className="text-blue-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">200+ Siswa</h4>
            <p className="text-gray-600">Siswa aktif dari berbagai kelas</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Target className="text-green-500 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">100% Lulus</h4>
            <p className="text-gray-600">Lulusan melanjutkan ke jenjang yang lebih tinggi</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
