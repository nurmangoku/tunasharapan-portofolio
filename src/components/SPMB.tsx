
import React from 'react';
import { FileText, Calendar, CheckCircle, Users, ClipboardList, Award } from 'lucide-react';

const SPMB = () => {
  const steps = [
    {
      icon: FileText,
      title: "Pengumpulan Berkas",
      description: "Siapkan dan kumpulkan semua dokumen yang diperlukan"
    },
    {
      icon: ClipboardList,
      title: "Pendaftaran Online",
      description: "Daftar melalui website resmi sekolah"
    },
    {
      icon: Users,
      title: "Seleksi Administrasi",
      description: "Verifikasi kelengkapan berkas pendaftaran"
    },
    {
      icon: CheckCircle,
      title: "Pengumuman",
      description: "Hasil seleksi diumumkan melalui website"
    },
    {
      icon: Calendar,
      title: "Daftar Ulang",
      description: "Melakukan registrasi ulang bagi yang diterima"
    }
  ];

  const requirements = [
    "1. Kartu Keluarga",
    "2. Akte Kelahiran",
    "3. KTP Orang Tua",
    "4. Titik Koordinat Rumah",
    "5. Kartu bantuan (KKS, PKH) khusus jalur afirmasi"
  ];

  return (
    <section id="spmb" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">SPMB (Seleksi Penerimaan Murid Baru)</h2>
          <p className="text-lg text-gray-600">Informasi lengkap proses pendaftaran</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Alur Pendaftaran */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Alur Pendaftaran</h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="bg-blue-600 text-white p-3 rounded-full flex-shrink-0">
                    <step.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Persyaratan */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Persyaratan Pendaftaran</h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop"
                alt="Persyaratan SPMB"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-600 text-white rounded-2xl">
              <h4 className="text-xl font-bold mb-4">Jadwal Penting</h4>
              <div className="flex">
              <div className="space-y-2 mx-7">
                <h5><strong>Tahap I – Jalur Afirmasi & Mutasi:</strong></h5>
                  <p><strong>Pendaftaran:</strong> 2–5 Juni 2025</p>
                  <p><strong>Pengumuman:</strong> 10 Juni 2025</p>
                  <p><strong>Daftar Ulang:</strong> 11–13 Juni 2025</p> 
              </div>
              <div className="space-y-2">
                <h5><strong>Tahap II – Jalur Domisili:</strong></h5>
                  <p><strong>Pendaftaran:</strong> 14–19 Juni 2025</p>
                  <p><strong>Pengumuman:</strong> 20 Juni 2025</p>
                  <p><strong>Daftar Ulang:</strong> 23–25 Juni 2025</p> 
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SPMB;
