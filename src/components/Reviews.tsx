
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Andi Pratama",
      class: "Alumni 2023 - TKJ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "SMK Nusantara memberikan pendidikan yang sangat berkualitas. Fasilitas laboratorium komputer yang lengkap dan guru-guru yang sangat kompeten membuat saya siap menghadapi dunia kerja. Sekarang saya bekerja di perusahaan IT ternama."
    },
    {
      name: "Sari Indah",
      class: "Alumni 2023 - Multimedia",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "Program multimedia di SMK Nusantara sangat mengikuti perkembangan teknologi terkini. Saya belajar banyak tentang desain grafis, video editing, dan animasi. Berkat bekal ilmu dari sekolah, saya bisa langsung bekerja sebagai content creator."
    },
    {
      name: "Budi Setiawan",
      class: "Alumni 2022 - Otomotif",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "Jurusan teknik otomotif di SMK Nusantara benar-benar mempersiapkan siswa untuk siap kerja. Praktik langsung dengan kendaraan terbaru dan kerjasama dengan bengkel resmi membuat pengalaman belajar sangat berharga."
    },
    {
      name: "Maya Kusuma",
      class: "Alumni 2022 - Akuntansi",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "Program akuntansi di SMK Nusantara sangat komprehensif. Selain teori, kami juga diajari praktek menggunakan software akuntansi terbaru. Guru-guru sangat sabar dalam membimbing dan selalu siap membantu siswa yang kesulitan."
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimoni Alumni</h2>
          <p className="text-lg text-gray-600">Apa kata alumni tentang SMK Nusantara</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Bergabunglah dengan Alumni Sukses Kami</h3>
            <p className="text-gray-600 mb-6">
              Ribuan alumni SMK Nusantara telah berhasil berkarir di berbagai bidang. 
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
