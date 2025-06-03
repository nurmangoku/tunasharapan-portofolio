import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Share2, CalendarDays } from 'lucide-react';
import { useAnnouncements } from '../contexts/AnnouncementsContext'; // <-- BARU: Impor hook

// sampleAnnouncements dihapus dari sini, karena akan diambil dari context

const AnnouncementDetail = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { getAnnouncementById } = useAnnouncements(); // <-- BARU: Gunakan hook
  
  // Pastikan announcementId tidak undefined sebelum memanggil getAnnouncementById
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
      })
      .then(() => console.log('Berhasil dibagikan'))
      .catch((error) => {
        console.log('Gagal membagikan:', error);
        alert(`Salin dan bagikan tautan ini:\n${textToShare}`);
      });
    } else {
      try {
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = textToShare;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert(`Tautan pengumuman telah disalin ke clipboard:\n${announcement.title}`);
      } catch (err) {
        alert(`Bagikan pengumuman ini:\n${textToShare}`);
      }
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
              <img 
                src={announcement.image}
                alt={`Gambar untuk ${announcement.title}`}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/800x400/E2E8F0/4A5568?text=Gambar+Tidak+Tersedia';
                }}
              />
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <CalendarDays size={18} className="mr-2" />
                  <span>Dipublikasikan pada: {announcement.date}</span>
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
