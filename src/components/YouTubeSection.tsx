import React from 'react';
import { useYouTubeVideos } from '../contexts/YouTubeVideosContext';
import { Youtube as YoutubeIcon, ExternalLink } from 'lucide-react';

const YouTubeSection: React.FC = () => {
  const { videos, loading, error } = useYouTubeVideos();

  // Hanya tampilkan maksimal 3 video atau sesuai kebutuhan
  const videosToDisplay = videos.slice(0, 3);

  if (loading && videos.length === 0) { 
    return (
      <section id="youtube-videos" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">Memuat video...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="youtube-videos" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-red-600">Gagal memuat video: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!videosToDisplay || videosToDisplay.length === 0) {
    return null; 
  }

  return (
    <section id="youtube-videos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <YoutubeIcon size={40} className="mr-3 text-red-600" />
            Galeri Video Sekolah
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat berbagai kegiatan dan momen menarik sekolah kami melalui video.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videosToDisplay.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-xl overflow-hidden group transform transition-all duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9 bg-black"> {/* Tambahkan bg-black untuk iframe */}
                <iframe
                  className="w-full h-full"
                  src={video.youtube_embed_url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Updated allow string
                  allowFullScreen
                  loading="lazy" // Tambahkan lazy loading
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" title={video.title}>{video.title}</h3>
                {video.description && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{video.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Tampilkan tombol "Lihat Semua" jika ada lebih dari 3 video total */}
        {videos.length > 3 && (
             <div className="text-center mt-12">
                <a 
                    href="https://www.youtube.com/@NamaChannelAnda" // GANTI DENGAN LINK CHANNEL YOUTUBE SEKOLAH ANDA
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Lihat Semua Video di YouTube
                    <ExternalLink size={18} className="ml-2"/>
                </a>
            </div>
        )}
      </div>
    </section>
  );
};

export default YouTubeSection;