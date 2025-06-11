import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { StudentBlogPost } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { UploadCloud, XCircle } from 'lucide-react';

interface StudentBlogFormProps {
  onSubmit: (formData: Omit<StudentBlogPost, 'id' | 'created_at'>) => Promise<void>;
  initialData?: StudentBlogPost | null;
  isSubmittingOverall: boolean;
}

const BLOG_IMAGES_BUCKET = 'blog_images';

// Fungsi untuk membuat slug dari judul
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, '-dan-') // Ganti & dengan 'dan'
    .replace(/[^\w\s-]/g, '') // Hapus karakter non-alfanumerik kecuali spasi dan strip
    .replace(/[\s_-]+/g, '-') // Ganti spasi dan underscore dengan satu strip
    .replace(/^-+|-+$/g, ''); // Hapus strip di awal dan akhir
};

const StudentBlogForm: React.FC<StudentBlogFormProps> = ({ onSubmit, initialData, isSubmittingOverall }) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthorName(initialData.author_name);
      setContent(initialData.content);
      setCurrentImageUrl(initialData.cover_image_url || null);
      setImageFile(null); setImagePreview(null);
    } else {
      setTitle(''); setAuthorName(''); setContent(''); setCurrentImageUrl(null); setImageFile(null); setImagePreview(null);
    }
  }, [initialData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("Ukuran file terlalu besar. Maksimal 2MB."); event.target.value = ''; return; }
      setImageFile(file); setCurrentImageUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else { setImageFile(null); setImagePreview(null); }
  };
  
  const deleteOldImageFromStorage = async (imageUrl: string | undefined | null) => {
    if (!imageUrl) return;
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split(`/${BLOG_IMAGES_BUCKET}/`);
      if (pathParts.length > 1) { await supabase.storage.from(BLOG_IMAGES_BUCKET).remove([pathParts[1]]); }
    } catch (e) { console.error('Error deleting old image:', e); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content || !authorName) { alert("Judul, Nama Penulis, dan Isi tidak boleh kosong."); return; }

    let finalImageUrl = currentImageUrl || '';
    if (imageFile) {
      setIsUploadingImage(true);
      try {
        if (initialData && initialData.cover_image_url) { await deleteOldImageFromStorage(initialData.cover_image_url); }
        const fileName = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        const filePath = `public/${fileName}`; 
        await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(filePath, imageFile);
        const { data: publicUrlData } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(filePath);
        finalImageUrl = publicUrlData.publicUrl;
      } catch (error: any) {
        alert(`Gagal mengunggah gambar: ${error.message}`);
        setIsUploadingImage(false); return;
      } finally {
        setIsUploadingImage(false);
      }
    } else if (!currentImageUrl && initialData && initialData.cover_image_url) {
      await deleteOldImageFromStorage(initialData.cover_image_url); finalImageUrl = '';
    }

    const slug = createSlug(title);
    
    await onSubmit({ title, content, author_name: authorName, cover_image_url: finalImageUrl, published_at: new Date().toISOString(), slug });
    
    if (!initialData) { setTitle(''); setAuthorName(''); setContent(''); setCurrentImageUrl(null); setImageFile(null); setImagePreview(null); }
  };

  const isEffectivelySubmitting = isSubmittingOverall || isUploadingImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
        <input type="text" id="blog-title" value={title} onChange={(e) => setTitle(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <div>
        <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Penulis (Siswa)</label>
        <input type="text" id="author-name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <div>
        <label htmlFor="blog-imageFile-input" className="block text-sm font-medium text-gray-700 mb-1">Gambar Utama (Opsional)</label>
        <div className="mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {(imagePreview || currentImageUrl) ? (
            <div className="relative group w-full max-w-xs mx-auto">
              <img src={imagePreview || currentImageUrl || undefined} alt="Preview" className="h-40 w-full object-contain rounded-md mx-auto"/>
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); setCurrentImageUrl(null); }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus foto">
                <XCircle size={20} />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="blog-imageFile-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Unggah file</span>
                  <input id="blog-imageFile-input" name="imageFile" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleFileChange} />
                </label>
                <p className="pl-1">atau tarik dan lepas</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP hingga 2MB</p>
            </div>
          )}
        </div>
        {isUploadingImage && <p className="text-sm text-blue-600 mt-2 text-center">Mengunggah gambar...</p>}
      </div>
      <div>
        <label htmlFor="blog-content" className="block text-sm font-medium text-gray-700 mb-1">Isi Artikel</label>
        <textarea id="blog-content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required 
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <div>
        <button type="submit" disabled={isEffectivelySubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed">
          {isEffectivelySubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Terbitkan Postingan')}
        </button>
      </div>
    </form>
  );
};

export default StudentBlogForm;