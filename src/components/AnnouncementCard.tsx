import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const { title, date, image, content } = announcement;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full group">
      {image && (
        <div className="relative overflow-hidden w-full bg-gray-200">
          <img 
            src={image} 
            alt={`Gambar untuk ${title}`}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{ aspectRatio: '16/9' }} // Default aspect ratio, bisa disesuaikan
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <CalendarDays size={16} className="mr-2" />
          <span>{date ? new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
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