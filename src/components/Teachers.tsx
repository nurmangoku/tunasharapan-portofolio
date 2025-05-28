
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Teachers = () => {
  const teachers = [
    {
      name: "Dede Jaenudin, S.Pd.SD.",
      position: "Kepala Sekolah",
      subject: "Manajemen Pendidikan",
      image: "/images/dede.jpeg",
      email: ""
    },
    {
      name: "Ai Maryani, S.Pd.",
      position: "Guru",
      subject: "Kelas 1",
      image: "/images/ai.jpeg",
      email: ""
    },
    {
      name: "Irman Artobatama, S.Pd.",
      position: "Guru",
      subject: "Kelas 2",
      image: "/images/irman.jpeg",
      email: ""
    },
    {
      name: "Henni Widari, S.Pd.",
      position: "Guru",
      subject: "Kelas 3",
      image: "/images/heni.jpeg",
      email: ""
    },
    {
      name: "Rani Stefani, S.Pd.",
      position: "Guru",
      subject: "Kelas 4",
      image: "/images/rani.jpeg",
      email: ""
    },
    {
      name: "Indra Lukman Purnama, S.Pd.",
      position: "Guru",
      subject: "Kelas 5",
      image: "/images/indra.jpeg",
      email: ""
    },
    {
      name: "Via Parizsal, S.Pd.",
      position: "Guru",
      subject: "Kelas 5",
      image: "/images/via.jpeg",
      email: ""
    },
    {
      name: "Yati Mulyati, S.Pd.",
      position: "Guru",
      subject: "PJOK",
      image:"/images/yati.jpeg",
      email: ""
    },
    {
      name: "Nurman Tajir, S.Pd.I.",
      position: "Guru",
      subject: "Pendidikan Agama Islam",
      image: "/images/nurman.jpeg",
      email: ""
    },
    {
      name: "Dani Sukandar",
      position: "Tenaga Kependidikan",
      subject: "Operator",
      image: "/images/dani.jpeg",
      email: ""
    },
    {
      name: "Dudi Hamaludin",
      position: "Penjaga Sekolah",
      subject: "Keamanan dan Kebersihan",
      image: "/images/dudi.jpeg",
      email: ""
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
                    //href={`mailto:${teacher.email}`}
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
