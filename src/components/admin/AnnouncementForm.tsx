import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Announcement } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { UploadCloud, Image as ImageIcon, XCircle } from 'lucide-react'; // ImageIcon diimpor di sini

interface AnnouncementFormProps {
  onSubmit: (formData: Omit<Announcement, 'id' | 'created_at' | 'link'>) => Promise<void>;
  initialData?: Announcement | null;
  isSubmittingOverall: boolean; // Prop ini yang diharapkan
}

const ANNOUNCEMENT_IMAGES_BUCKET = 'announcementimages'; 

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onSubmit, initialData, isSubmittingOverall }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ''); 
      setContent(initialData.content);
      setExcerpt(initialData.excerpt || '');
      setCurrentImageUrl(initialData.image || null);
      setImageFile(null);
      setImagePreview(null);
    } else {
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setContent('');
      setExcerpt('');
      setCurrentImageUrl(null);
      setImageFile(null);
      setImagePreview(null);
    }
  }, [initialData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setCurrentImageUrl(null); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };
  
  const deleteOldImageFromStorage = async (imageUrl: string | undefined | null) => {
    if (!imageUrl) return;
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split(`/${ANNOUNCEMENT_IMAGES_BUCKET}/`);
      if (pathParts.length > 1) {
        const imagePath = pathParts[1];
        const { error: deleteError } = await supabase.storage
          .from(ANNOUNCEMENT_IMAGES_BUCKET)
          .remove([imagePath]);
        if (deleteError) {
          console.error('Error deleting old image from storage:', deleteError);
        } else {
          console.log('Old image deleted from storage successfully');
        }
      }
    } catch (e) {
      console.error('Error parsing or deleting old image URL:', e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !date || !content) {
      alert("Judul, Tanggal, dan Isi tidak boleh kosong.");
      return;
    }

    let finalImageUrl = currentImageUrl || ''; 

    if (imageFile) {
      setIsUploadingImage(true);
      try {
        if (initialData && initialData.image && initialData.image !== currentImageUrl) {
           await deleteOldImageFromStorage(initialData.image);
        }

        const fileName = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        const filePath = `public/${fileName}`; 
        
        const { error: uploadError } = await supabase.storage
          .from(ANNOUNCEMENT_IMAGES_BUCKET)
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false, 
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from(ANNOUNCEMENT_IMAGES_BUCKET)
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrlData.publicUrl;
        setCurrentImageUrl(finalImageUrl);
        setImageFile(null);
        setImagePreview(null);

      } catch (error: any) {
        console.error('Error uploading image or getting public URL:', error);
        alert(`Gagal mengunggah gambar: ${error.message}`);
        setIsUploadingImage(false);
        return;
      } finally {
        setIsUploadingImage(false);
      }
    } else if (!currentImageUrl && initialData && initialData.image) {
      await deleteOldImageFromStorage(initialData.image);
      finalImageUrl = ''; 
    }

    await onSubmit({ title, date, image: finalImageUrl, content, excerpt });
    
    if (!initialData) {
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        if (!imageFile) setCurrentImageUrl(null);
        setContent('');
        setExcerpt('');
    }
  };

  const isEffectivelySubmitting = isSubmittingOverall || isUploadingImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Pengumuman</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Publikasi</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="imageFile-input" className="block text-sm font-medium text-gray-700 mb-1">Gambar Pengumuman</label>
        <div className="mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {(imagePreview || currentImageUrl) ? (
            <div className="relative group w-full max-w-xs mx-auto">
              <img 
                src={imagePreview || currentImageUrl || undefined} 
                alt="Preview Pengumuman" 
                className="h-40 w-full object-contain rounded-md mx-auto"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setCurrentImageUrl(null); 
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hapus gambar terpilih/saat ini"
              >
                <XCircle size={20} />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="imageFile-input"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Unggah file</span>
                  <input id="imageFile-input" name="imageFile" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleFileChange} />
                </label>
                <p className="pl-1">atau tarik dan lepas</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP hingga 2MB</p>
            </div>
          )}
        </div>
        {isUploadingImage && <p className="text-sm text-blue-600 mt-2">Mengunggah gambar...</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Cuplikan (Excerpt)</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          placeholder="Ringkasan singkat (opsional, akan digenerate jika kosong)"
          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Isi Lengkap Pengumuman</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isEffectivelySubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isEffectivelySubmitting ? (initialData ? 'Menyimpan...' : 'Menambahkan...') : (initialData ? 'Simpan Perubahan' : 'Tambah Pengumuman')}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;