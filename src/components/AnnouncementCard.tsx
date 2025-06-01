import React from 'react';
import { CalendarDays } from 'lucide-react';

interface AnnouncementCardProps {
  id: string;
  title: string;
  date: string;
  image: string; // Sudah 'image' sesuai permintaan Anda
  content: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, date, image, content }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full group">
      <div className="relative overflow-hidden">
        <img 
          src={image} // Sudah 'image'
          alt={`Gambar untuk ${title}`}
          className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://placehold.co/600x400/E2E8F0/4A5568?text=Gambar+Tidak+Tersedia';
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <CalendarDays size={16} className="mr-2" />
          <span>{date}</span>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4 flex-grow text-sm">
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
        <div className="mt-auto pt-2">
            <span className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm transition-colors duration-300">
                Baca Selengkapnya &rarr;
            </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;