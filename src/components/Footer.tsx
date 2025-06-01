import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Globe } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  // ... (kode Footer.tsx yang sudah ada tidak diubah)
  // Anda bisa menambahkan link ke halaman Pengumuman di sini jika mau
  // Contoh:
  // <li>
  //   <Link to="/pengumuman" className="text-gray-300 hover:text-white transition-colors">
  //     Pengumuman
  //   </Link>
  // </li>
  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"> {/* Gap disesuaikan */}
          {/* Informasi Sekolah */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">SDN TUNAS HARAPAN</h3> {/* Margin bottom disesuaikan */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sekolah Dasar Negeri terdepan yang berkomitmen menghasilkan lulusan 
              berkualitas, berkarakter, dan siap bersaing di era globalisasi.
            </p>
            <div className="space-y-4"> {/* Spasi antar item disesuaikan */}
              <div className="flex items-start space-x-3"> {/* items-start untuk alamat panjang */}
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Jl. Jend. H. Amir Machmud No. 108 RT.03 RW.023 Kel. Cibeureum Kec. Cimahi Selatan - Kota Cimahi
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">0831 6590 6773 (Dani Sukandar)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">0877 2201 3139 (Indra Lukman Purnama, S.Pd)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">0822 1647 0242 (Al Maryani, S.Pd)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">sdntunasharapancmh@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                {/* Ganti dengan Link jika ini adalah link internal */}
                <a href="https://sdntunasharapan.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition-colors">
                  sdntunasharapan.vercel.app
                </a>
              </div>
            </div>
          </div>

          {/* Link Cepat */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Link Cepat</h4> {/* Margin bottom disesuaikan */}
            <ul className="space-y-3"> {/* Spasi antar item disesuaikan */}
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });}} className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => { e.preventDefault(); document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });}} className="text-gray-300 hover:text-white transition-colors">
                  Profil Sekolah
                </a>
              </li>
               <li>
                <Link to="/pengumuman" className="text-gray-300 hover:text-white transition-colors">
                  Pengumuman
                </Link>
              </li>
              <li>
                <a href="#teachers" onClick={(e) => { e.preventDefault(); document.getElementById('teachers')?.scrollIntoView({ behavior: 'smooth' });}} className="text-gray-300 hover:text-white transition-colors">
                  Tim Pengajar
                </a>
              </li>
              <li>
                <a href="#spmb" onClick={(e) => { e.preventDefault(); document.getElementById('spmb')?.scrollIntoView({ behavior: 'smooth' });}} className="text-gray-300 hover:text-white transition-colors">
                  SPMB
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });}} className="text-gray-300 hover:text-white transition-colors">
                  Testimoni
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial & Jam Operasional */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Ikuti Kami</h4> {/* Margin bottom disesuaikan */}
            <div className="flex space-x-4 mb-8"> {/* Margin bottom untuk spasi ke jam operasional */}
              <a
                href="#" // Ganti dengan link Facebook Anda
                aria-label="Facebook SDN Tunas Harapan"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#" // Ganti dengan link Instagram Anda
                aria-label="Instagram SDN Tunas Harapan"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#" // Ganti dengan link Youtube Anda
                aria-label="Youtube SDN Tunas Harapan"
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors transform hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div>
              <h5 className="text-base font-semibold mb-3">Jam Operasional Kantor</h5> {/* Margin bottom disesuaikan */}
              <p className="text-gray-300 text-sm">Senin - Jumat: 07:00 - 17:00 WIB</p>
              <p className="text-gray-300 text-sm">Sabtu & Minggu: Tutup</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SDN Tunas Harapan. Didesain oleh Nurman Tajir. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;