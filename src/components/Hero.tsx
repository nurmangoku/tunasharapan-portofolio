import React from 'react';
import { ChevronDown, Newspaper, ExternalLink } from 'lucide-react';
import sekolah from '../assets/sekolah.jpeg'; 
import { Link } from 'react-router-dom';

const heroAnnouncements = [
  {
    id: '1',
    title: 'Pengumuman Libur Sekolah Menyambut Idul Fitri',
    excerpt: 'Diberitahukan kepada seluruh siswa dan orang tua murid SDN Tunas Harapan, bahwa kegiatan belajar mengajar akan diliburkan...',
    link: '/pengumuman/1',
  },
  {
    id: '2',
    title: 'Jadwal Ujian Akhir Semester Genap',
    excerpt: 'Berikut adalah jadwal pelaksanaan Ujian Akhir Semester (UAS) Genap untuk tahun ajaran 2024/2025...',
    link: '/pengumuman/2',
  }
];


const Hero = () => {
  const scrollToProfile = () => {
    const element = document.getElementById('profile');
    if (element) {
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="absolute inset-0">
        <img
          src={sekolah}
          alt="Gedung Sekolah SDN Tunas Harapan"
          className="w-full h-full object-cover"
           onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = 'https://placehold.co/1920x1080/334155/FFFFFF?text=SDN+Tunas+Harapan';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/70 to-indigo-900/80"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in leading-tight">
          SD NEGERI TUNAS HARAPAN
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 animate-fade-in opacity-90 max-w-2xl mx-auto">
          Membangun Generasi Unggul, Berkarakter, dan Berprestasi untuk Masa Depan Indonesia yang Gemilang
        </p>
        <div className="space-y-4 animate-fade-in mb-12">
          <button
            onClick={scrollToProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Jelajahi Sekolah Kami
          </button>
        </div>
      </div>

      {heroAnnouncements.length > 0 && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8 md:mt-12 animate-fade-in-up animation-delay-300">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20">
            <div className="flex items-center text-white mb-5">
              <Newspaper size={28} className="mr-3 text-blue-300"/>
              <h3 className="text-2xl font-semibold">Pengumuman Terbaru</h3>
            </div>
            <div className="space-y-4">
              {heroAnnouncements.slice(0, 2).map(ann => (
                <div key={ann.id} className="bg-white/20 p-4 rounded-lg hover:bg-white/30 transition-colors duration-300 group">
                  <Link to={ann.link} className="block">
                    <h4 className="font-semibold text-white text-lg mb-1 group-hover:text-blue-200 transition-colors">{ann.title}</h4>
                    <p className="text-sm text-gray-200 truncate mb-2">{ann.excerpt}</p>
                    <div className="text-xs text-blue-300 group-hover:text-blue-100 mt-1 inline-flex items-center font-medium transition-colors">
                        Baca Selengkapnya <ExternalLink size={14} className="ml-1.5"/>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* FIX: Menggunakan heroAnnouncements.length untuk kondisi */}
            {heroAnnouncements.length > 0 && ( 
                 <Link to="/pengumuman" className="block text-center mt-6 text-blue-300 hover:text-white font-semibold transition-colors duration-300 py-2 px-4 rounded-md hover:bg-white/20 text-sm">
                     Lihat Semua Pengumuman &rarr;
                 </Link>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-8">
        <ChevronDown className="text-white w-10 h-10 opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
