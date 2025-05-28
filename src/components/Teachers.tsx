
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Teachers = () => {
  const teachers = [
    {
      name: "Dr. Ahmad Suharto, S.Pd., M.Pd.",
      position: "Kepala Sekolah",
      subject: "Manajemen Pendidikan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      email: "ahmad.suharto@smknusantara.ac.id"
    },
    {
      name: "Siti Nurhaliza, S.Kom., M.T.",
      position: "Guru",
      subject: "Teknik Komputer & Jaringan",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      email: "siti.nurhaliza@smknusantara.ac.id"
    },
    {
      name: "Budi Santoso, S.T., M.Eng.",
      position: "Guru",
      subject: "Teknik Otomotif",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      email: "budi.santoso@smknusantara.ac.id"
    },
    {
      name: "Maya Sari, S.E., M.M.",
      position: "Guru",
      subject: "Akuntansi & Keuangan",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      email: "maya.sari@smknusantara.ac.id"
    },
    {
      name: "Rizki Pratama, S.Pd., M.Pd.",
      position: "Guru",
      subject: "Multimedia",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      email: "rizki.pratama@smknusantara.ac.id"
    },
    {
      name: "Dewi Lestari, S.Pd., M.Pd.",
      position: "Guru",
      subject: "Bahasa Indonesia",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face",
      email: "dewi.lestari@smknusantara.ac.id"
    },
    {
      name: "Andi Wijaya, S.Si., M.Pd.",
      position: "Guru",
      subject: "Matematika",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
      email: "andi.wijaya@smknusantara.ac.id"
    },
    {
      name: "Fatimah Zahra, S.Pd., M.Pd.",
      position: "Guru",
      subject: "Bahasa Inggris",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      email: "fatimah.zahra@smknusantara.ac.id"
    },
    {
      name: "Hendra Gunawan, S.Pd.I., M.Pd.I.",
      position: "Guru",
      subject: "Pendidikan Agama Islam",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
      email: "hendra.gunawan@smknusantara.ac.id"
    },
    {
      name: "Linda Permata, S.Pd., M.Pd.",
      position: "Guru",
      subject: "Seni Budaya",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      email: "linda.permata@smknusantara.ac.id"
    },
    {
      name: "Tommy Prasetyo, S.Pd., M.Pd.",
      position: "Guru",
      subject: "Pendidikan Jasmani",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop&crop=face",
      email: "tommy.prasetyo@smknusantara.ac.id"
    }
  ];

  return (
    <section id="teachers" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Pengajar</h2>
          <p className="text-lg text-gray-600">Tenaga pendidik profesional dan berpengalaman</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{teacher.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{teacher.position}</p>
                <p className="text-gray-600 text-sm mb-4">{teacher.subject}</p>
                <div className="flex items-center space-x-3">
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Mail size={18} />
                  </a>
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
