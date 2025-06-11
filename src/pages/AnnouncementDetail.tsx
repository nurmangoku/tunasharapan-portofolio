import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags'; // <-- BARU
import { ArrowLeft, Share2, CalendarDays } from 'lucide-react';
import { useAnnouncements } from '../contexts/AnnouncementsContext';

const AnnouncementDetail: React.FC = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { getAnnouncementById } = useAnnouncements();
  
  const announcement = announcementId ? getAnnouncementById(announcementId) : undefined;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    if (!announcement) return;
    const shareUrl = window.location.href;
    const textToShare = `Baca pengumuman dari SDN Tunas Harapan: ${announcement.title}. Kunjungi: ${shareUrl}`;
    if (navigator.share) {
      navigator.share({
        title: `Pengumuman SDN Tunas Harapan: ${announcement.title}`,
        text: textToShare,
        url: shareUrl,
      });
    } else {
      alert(`Bagikan link ini: ${shareUrl}`);
    }
  };

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="pt-20 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700">Pengumuman tidak ditemukan.</h1>
            <Link to="/pengumuman" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              &larr; Kembali ke semua pengumuman
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Siapkan data untuk meta tags
  const pageUrl = window.location.href;
  const description = announcement.content ? announcement.content.substring(0, 155) + '...' : "Informasi terbaru dari SDN Tunas Harapan";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MetaTags 
        title={announcement.title}
        description={description}
        imageUrl={announcement.image || 'https://i.ibb.co/bF05sMh/sekolah.jpg'} // Ganti dengan URL gambar default Anda
        url={pageUrl}
      />

      <Header />
      <main className="pt-20 flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-8">
              <Link to="/pengumuman" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300 py-2 px-3 rounded-md hover:bg-blue-100 w-max">
                <ArrowLeft size={20} className="mr-2" />
                Kembali ke Semua Pengumuman
              </Link>
            </div>

            <article className="bg-white rounded-xl shadow-xl overflow-hidden">
              {announcement.image && (
                <img 
                  src={announcement.image} 
                  alt={`Gambar untuk ${announcement.title}`}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              )}
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <CalendarDays size={18} className="mr-2" />
                  <span>Dipublikasikan pada: {announcement.date ? new Date(announcement.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric'}) : ''}</span>
                </div>
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: announcement.content.replace(/\n/g, '<br />') }}
                />
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    <Share2 size={20} className="mr-2" />
                    Bagikan Pengumuman Ini
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementDetail;
