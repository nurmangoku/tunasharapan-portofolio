import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '../contexts/AnnouncementsContext';

const AnnouncementsPage: React.FC = () => {
  const { announcements, loading, error } = useAnnouncements();

  if (loading && announcements.length === 0) return <p>Memuat pengumuman...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="pt-20 flex-grow">
        <section id="announcements-page" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8 md:mb-12">
              <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300 text-sm md:text-base py-2 px-3 rounded-md hover:bg-blue-100">
                <ArrowLeft size={20} className="mr-2" />
                Kembali ke Beranda
              </Link>
            </div>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Pengumuman Sekolah</h1>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Informasi terbaru, agenda kegiatan, dan berita penting dari SDN Tunas Harapan.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement) => (
                <Link key={announcement.id} to={`/pengumuman/${announcement.id}`} className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                  <AnnouncementCard announcement={announcement} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;