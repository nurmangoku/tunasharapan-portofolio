
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informasi Sekolah */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SMK Nusantara</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sekolah Menengah Kejuruan terdepan yang berkomitmen menghasilkan lulusan 
              berkualitas, berkarakter, dan siap bersaing di era globalisasi.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">
                  Jl. Pendidikan No. 123, Kota Nusantara, Indonesia 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">info@smknusantara.ac.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">www.smknusantara.ac.id</span>
              </div>
            </div>
          </div>

          {/* Link Cepat */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profile" className="text-gray-300 hover:text-white transition-colors">
                  Profil Sekolah
                </a>
              </li>
              <li>
                <a href="#teachers" className="text-gray-300 hover:text-white transition-colors">
                  Tim Pengajar
                </a>
              </li>
              <li>
                <a href="#spmb" className="text-gray-300 hover:text-white transition-colors">
                  SPMB
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-gray-300 hover:text-white transition-colors">
                  Testimoni
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Jam Operasional</h5>
              <p className="text-gray-300 text-sm">Senin - Jumat: 07:00 - 16:00</p>
              <p className="text-gray-300 text-sm">Sabtu: 07:00 - 12:00</p>
              <p className="text-gray-300 text-sm">Minggu: Tutup</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SMK Nusantara. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
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
