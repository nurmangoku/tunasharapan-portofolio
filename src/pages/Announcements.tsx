import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '../contexts/AnnouncementsContext'; // <-- BARU: Impor hook

// sampleAnnouncements dihapus dari sini

const AnnouncementsPage = () => {
  const { announcements } = useAnnouncements(); // <-- BARU: Gunakan hook

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

            {announcements.length > 0 ? ( // <-- BARU: Gunakan 'announcements' dari context
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.map((announcement) => ( // <-- BARU: Gunakan 'announcements' dari context
                  <Link key={announcement.id} to={`/pengumuman/${announcement.id}`} className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                    <AnnouncementCard
                      id={announcement.id}
                      title={announcement.title}
                      date={announcement.date}
                      image={announcement.image}
                      content={announcement.content}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-xl font-medium text-gray-900">Belum Ada Pengumuman</h3>
                <p className="mt-1 text-sm text-gray-500">Silakan cek kembali nanti untuk informasi terbaru.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
