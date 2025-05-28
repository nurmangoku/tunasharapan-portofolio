
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Rangga",
      class: "Kelas 5",
      image: "/images/rangga.jpeg",
      rating: 5,
      text: "Aku senang sekolah di SDN Tunas Harapan, soalnya kelasnya bersih dan ada taman yang bagus. Kalau istirahat, aku suka main di lapangan yang luas. Gurunya juga baik-baik, apalagi Pak Nurman, suka ngajak diskusi sambil bercanda. Belajar di sini tuh kayak di rumah sendiri."
    },
    {
      name: "Airlangga",
      class: "Kelas 5",
      image: "/images/airlangga.jpeg",
      rating: 5,
      text: "Kesan kesan selama belajar di sdn tunas Harapan,,sangat menyenangkan metode belajar mengajar nya engga bikin tegang,,ibu bapak gurunya nya ramah2."
    },
    {
      name: "Meta",
      class: "Kelas 5",
      image: "/images/meta.jpeg",
      rating: 5,
      text: "Sekolahku keren banget! Perpustakaannya nyaman, banyak buku, dan kadang aku baca sambil duduk di pojokan. Lab komputer juga lengkap, jadi waktu pelajaran TIK seru banget. Belajar jadi gak ngebosenin."
    },
    {
      name: "Taufik",
      class: "Kelas 5",
      image: "/images/taufik.jpeg",
      rating: 5,
      text: "Di SDN Tunas Harapan banyak kegiatan seru, kayak pramuka, senam, sama lomba-lomba di hari besar. Aku paling suka pas ikut lomba mewarnai bareng teman-teman. Belajarnya juga gak bikin stres karena gurunya ramah."
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimoni Siswa</h2>
          <p className="text-lg text-gray-600">Apa kata siswa-siswi tentang SDN Tunas Harapan</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{review.name}</h4>
                      <p className="text-blue-600 text-sm">{review.class}</p>
                    </div>
                    <Quote className="text-blue-200 w-8 h-8" />
                  </div>
                  
                  <div className="flex space-x-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Bergabunglah dengan Kami</h3>
            <p className="text-gray-600 mb-6">
              SDN Tunas Harapan adalah tempat terbaik untuk memulai perjalanan belajar yang menyenangkan dan bermakna. 
              Bergabunglah dengan kami dan raih masa depan yang cerah!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
