import React, { useState, useEffect, FormEvent } from 'react';
import { YouTubeVideo } from '../../types';

interface YouTubeVideoFormProps {
  onSubmit: (formData: Omit<YouTubeVideo, 'id' | 'created_at'>) => Promise<void>;
  initialData?: YouTubeVideo | null;
  isSubmittingOverall: boolean;
}

const YouTubeVideoForm: React.FC<YouTubeVideoFormProps> = ({ onSubmit, initialData, isSubmittingOverall }) => {
  const [title, setTitle] = useState('');
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number | string>('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setYoutubeEmbedUrl(initialData.youtube_embed_url);
      setDescription(initialData.description || '');
      setDisplayOrder(initialData.display_order !== undefined && initialData.display_order !== null ? initialData.display_order : '');
    } else {
      setTitle('');
      setYoutubeEmbedUrl('');
      setDescription('');
      setDisplayOrder('');
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeEmbedUrl) {
      alert("Judul dan URL Embed YouTube tidak boleh kosong.");
      return;
    }
    // Validasi sederhana untuk URL embed YouTube
    if (!youtubeEmbedUrl.includes("youtube.com/embed/")) { // FIX: Validasi URL Embed yang lebih tepat
        alert("Format URL Embed YouTube tidak valid. Pastikan URL berasal dari opsi 'Embed' YouTube dan mengandung 'youtube.com/embed/'. Contoh: https://www.youtube.com/embed/VIDEO_ID");
        return;
    }

    let orderValue: number | undefined = undefined;
    if (displayOrder !== '' && displayOrder !== null && displayOrder !== undefined) {
        const parsedOrder = parseInt(String(displayOrder), 10);
        if (!isNaN(parsedOrder)) orderValue = parsedOrder;
    }

    await onSubmit({ 
      title, 
      youtube_embed_url: youtubeEmbedUrl, 
      description: description || undefined, 
      display_order: orderValue 
    });
    
    if (!initialData) { 
      setTitle(''); setYoutubeEmbedUrl(''); setDescription(''); setDisplayOrder('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="video-title" className="block text-sm font-medium text-gray-700 mb-1">Judul Video</label>
        <input type="text" id="video-title" value={title} onChange={(e) => setTitle(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="video-embed-url" className="block text-sm font-medium text-gray-700 mb-1">URL Embed YouTube</label>
        <input type="url" id="video-embed-url" value={youtubeEmbedUrl} onChange={(e) => setYoutubeEmbedUrl(e.target.value)} required 
               placeholder="https://www.youtube.com/embed/VIDEO_ID" 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
        <p className="mt-1 text-xs text-gray-500">Salin URL dari atribut `src` pada kode iframe yang disediakan oleh YouTube (Share &gt; Embed).</p>
      </div>
      <div>
        <label htmlFor="video-description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (Opsional)</label>
        <textarea id="video-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} 
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="video-display-order" className="block text-sm font-medium text-gray-700 mb-1">Urutan Tampilan (Opsional, angka)</label>
        <input type="number" id="video-display-order" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} 
               placeholder="Contoh: 1 (kosongkan jika tidak perlu)" 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <button type="submit" disabled={isSubmittingOverall} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {isSubmittingOverall ? (initialData ? 'Menyimpan...' : 'Menambahkan...') : (initialData ? 'Simpan Video' : 'Tambah Video')}
        </button>
      </div>
    </form>
  );
};

export default YouTubeVideoForm;