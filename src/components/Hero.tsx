
import React from 'react';
import { ChevronDown } from 'lucide-react';
import sekolah from '../assets/sekolah.jpeg';

const Hero = () => {
  const scrollToProfile = () => {
    const element = document.getElementById('profile');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={sekolah}
          alt="Sekolah"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          SD NEGERI TUNAS HARAPAN
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90">
          Membangun Generasi Unggul dan Berkarakter untuk Masa Depan Indonesia
        </p>
        <div className="space-y-4 animate-fade-in">
          <p className="text-lg opacity-80">
            Sekolah Dasar Negeri Terdepan dengan Teknologi Modern
          </p>
          <button
            onClick={scrollToProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Jelajahi Sekolah Kami
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;
