import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Data pengumuman
const sampleAnnouncements = [
   {
    id: '1',
    title: 'HARI LAHIR PANCASILA',
    date: '01 Juni 2025',
    image: '/images/pengumuman1.jpeg',
    content: 'Dengan segenap semangat kebangsaan yang membara, marilah kita sambut fajar peringatan Hari Lahir Pancasila. Momen bersejarah ini bukan sekadar perayaan seremonial, melainkan panggilan jiwa untuk kembali merenungkan dan mengamalkan nilai-nilai luhur yang terkandung di dalamnya. Sebagaimana tunas-tunas muda di SD Negeri Tunas Harapan yang senantiasa bersemi membawa asa, mari kita rajut kembali benang-benang persatuan, kita eratkan simpul-simpul kesatuan, demi Indonesia yang lebih kokoh dan bermartabat. Selamat Hari Pancasila! Semoga semangatnya senantiasa menerangi langkah kita dalam membangun bangsa.',
  },
   {
    id: '2',
    title: 'Agenda SD NEGERI TUNAS HARAPAN Pekan ini',
    date: '29 Mei 2025',
    image: '/images/pengumuman2.jpeg',
    content: 'Oke, Tunas Harapan Squad, check it out! Pekan ini ada beberapa info penting nih: Kamis kemarin, 29 Mei 2025, kita udah nikmatin libur Hari Isa Al Masih, lanjut Jumat, 30 Mei 2025, full chill dengan cuti bersama. Nah, get ready buat Senin besok, 02 Juni 2025, karena ada momen spesial pengumuman kelulusan buat kakak-kakak keren Kelas 6, sementara adik-adik Kelas 1-5 tetap semangat Belajar Dari Rumah (BDR) ya! Terus, jangan lupa, mulai hari ini, 01 Juni sampai 10 Juni 2025, waktunya fokus dan do your best buat Penilaian Sumatif Akhir Tahun (PSAT) Kelas 1-5. Semangat semuanya!',
  },
];

const AnnouncementsPage = () => {
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

            {sampleAnnouncements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleAnnouncements.map((announcement) => (
                  <Link key={announcement.id} to={`/pengumuman/${announcement.id}`} className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                    <AnnouncementCard
                      id={announcement.id}
                      title={announcement.title}
                      date={announcement.date}
                      image={announcement.image} // Memastikan 'image' yang dikirim
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