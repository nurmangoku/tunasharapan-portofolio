// posisi: src/components/Reviews.tsx
// isi kode:

import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Rangga",
      class: "Kelas 5",
      image: "/images/rangga.jpeg", // Pastikan path gambar ini benar atau ganti dengan placeholder
      rating: 5,
      text: "Saya selama sekolah di SD Negeri Tunas Harapan banyak mendapatkan ilmu, pengalaman, teman baik, serta lingkungan yg nyaman.Dan banyak mata pelajaran yang awalnya saya tidak mengerti dan sekarang menjadi lebih memahami .Dan berkat bimbingan dan penuh kesabaran oleh para ibu/bapak guru, saya juga berkesempatan bisa mengikuti lomba pupuh dan adzan."
    },
    {
      name: "Airlangga",
      class: "Kelas 5",
      image: "/images/airlangga.jpeg", // Pastikan path gambar ini benar atau ganti dengan placeholder
      rating: 5,
      text: "Kesan kesan selama belajar di sdn tunas Harapan,,sangat menyenangkan metode belajar mengajar nya engga bikin tegang,,ibu bapak gurunya nya ramah2."
    },
    {
      name: "Meta",
      class: "Kelas 5",
      image: "/images/meta.jpeg", // Pastikan path gambar ini benar atau ganti dengan placeholder
      rating: 5,
      text: "Sekolahku keren banget! Perpustakaannya nyaman, banyak buku, dan kadang aku baca sambil duduk di pojokan. Lab komputer juga lengkap, jadi waktu pelajaran TIK seru banget. Belajar jadi gak ngebosenin."
    },
    {
      name: "Taufik",
      class: "Kelas 5",
      image: "/images/taufik.jpeg", // Pastikan path gambar ini benar atau ganti dengan placeholder
      rating: 5,
      text: "Di SDN Tunas Harapan banyak kegiatan seru, kayak pramuka, senam, sama lomba-lomba di hari besar. Aku paling suka pas ikut lomba mewarnai bareng teman-teman. Belajarnya juga gak bikin stres karena gurunya ramah."
    }
  ];

  const handleDaftarSekarangClick = () => {
    const nomorWhatsApp = "6287722013139"; // GANTI DENGAN NOMOR WHATSAPP TUJUAN (gunakan format internasional tanpa + atau 0 di depan)
    const pesan = "Halo, saya tertarik untuk mendaftar di SDN Tunas Harapan. Mohon informasinya lebih lanjut.";
    const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimoni Siswa</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Apa kata siswa-siswi tentang pengalaman belajar mereka yang menyenangkan di SDN Tunas Harapan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={review.image || `https://placehold.co/64x64/E2E8F0/4A5568?text=${review.name.charAt(0)}`}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Mencegah loop jika placeholder juga gagal
                    target.src = `https://placehold.co/64x64/E2E8F0/4A5568?text=${review.name.charAt(0)}`;
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{review.name}</h4>
                      <p className="text-blue-600 text-sm font-medium">{review.class}</p>
                    </div>
                    <Quote className="text-blue-300 w-10 h-10 opacity-75" />
                  </div>
                  
                  <div className="flex space-x-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed italic text-sm">
                    "{review.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center"> {/* Penambahan margin top */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">Bergabunglah dengan Keluarga Besar Kami!</h3>
            <p className="mb-8 text-lg opacity-90">
              SDN Tunas Harapan adalah tempat terbaik untuk memulai perjalanan belajar yang menyenangkan dan bermakna. 
              Kami siap membantu putra-putri Anda meraih masa depan yang cerah!
            </p>
            <button 
              onClick={handleDaftarSekarangClick}
              className="bg-white hover:bg-gray-100 text-blue-700 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Daftar Sekarang via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
