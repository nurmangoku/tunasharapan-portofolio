import React from 'react';
import { Instagram, UserCircle2 } from 'lucide-react';
import { useTeachers } from '../contexts/TeachersContext';

const Teachers: React.FC = () => {
  const { teachers, loading, error } = useTeachers();

  if (loading) {
    return (
      <section id="teachers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">Memuat data guru...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="teachers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-red-600">Gagal memuat data guru: {error.message}</p>
        </div>
      </section>
    );
  }
  
  if (!teachers || teachers.length === 0) {
    return (
      <section id="teachers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Pengajar</h2>
          <p className="text-lg text-gray-600">Belum ada data guru yang tersedia saat ini.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Pengajar</h2>
          <p className="text-lg text-gray-600">Tenaga pendidik profesional dan berpengalaman</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt={`Foto ${teacher.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none'; // Sembunyikan jika error
                      // Atau ganti dengan placeholder
                      const placeholder = target.parentElement?.querySelector('.placeholder-icon');
                      if(placeholder) (placeholder as HTMLElement).style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Placeholder jika tidak ada gambar atau gambar error */}
                {(!teacher.image) && (
                   <div className="placeholder-icon w-full h-full bg-gray-200 flex items-center justify-center">
                    <UserCircle2 size={80} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{teacher.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{teacher.position}</p>
                <p className="text-gray-700 text-sm mb-4 flex-grow">{teacher.subject}</p>
                <div className="mt-auto pt-3 border-t border-gray-200">
                  {teacher.instagram_url ? (
                    <a
                      href={teacher.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition-colors flex items-center text-sm group"
                      aria-label={`Instagram ${teacher.name}`}
                    >
                      <Instagram size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                      Lihat Instagram
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm flex items-center">
                      <Instagram size={18} className="mr-2 opacity-50" />
                      Tidak ada Instagram
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;