import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Teacher } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { UploadCloud, Image as ImageIcon, XCircle, Instagram } from 'lucide-react';

interface TeacherFormProps {
  onSubmit: (formData: Omit<Teacher, 'id' | 'created_at'>) => Promise<void>;
  initialData?: Teacher | null;
  isSubmittingOverall: boolean;
}

// MODIFIKASI: Nama bucket disesuaikan
const TEACHER_PHOTOS_BUCKET = 'teacherphotos'; 

const TeacherForm: React.FC<TeacherFormProps> = ({ onSubmit, initialData, isSubmittingOverall }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [subject, setSubject] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number | string>('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPosition(initialData.position);
      setSubject(initialData.subject);
      setInstagramUrl(initialData.instagram_url || '');
      setDisplayOrder(initialData.display_order !== undefined && initialData.display_order !== null ? initialData.display_order : '');
      setCurrentImageUrl(initialData.image || null);
      setImageFile(null);
      setImagePreview(null);
    } else {
      setName('');
      setPosition('');
      setSubject('');
      setInstagramUrl('');
      setDisplayOrder('');
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
      reader.onloadend = () => setImagePreview(reader.result as string);
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
      const pathParts = url.pathname.split(`/${TEACHER_PHOTOS_BUCKET}/`); // Menggunakan konstanta
      if (pathParts.length > 1) {
        const imagePath = pathParts[1];
        await supabase.storage.from(TEACHER_PHOTOS_BUCKET).remove([imagePath]); // Menggunakan konstanta
      }
    } catch (e) { console.error('Error deleting old image:', e); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !position || !subject) {
      alert("Nama, Jabatan, dan Mapel/Tugas tidak boleh kosong.");
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
        await supabase.storage.from(TEACHER_PHOTOS_BUCKET).upload(filePath, imageFile, { upsert: false }); // Menggunakan konstanta
        const { data: publicUrlData } = supabase.storage.from(TEACHER_PHOTOS_BUCKET).getPublicUrl(filePath); // Menggunakan konstanta
        finalImageUrl = publicUrlData.publicUrl;
        setCurrentImageUrl(finalImageUrl);
        setImageFile(null);
        setImagePreview(null);
      } catch (error: any) {
        alert(`Gagal mengunggah foto: ${error.message}`);
        setIsUploadingImage(false);
        return;
      } finally {
        setIsUploadingImage(false);
      }
    } else if (!currentImageUrl && initialData && initialData.image) {
      await deleteOldImageFromStorage(initialData.image);
      finalImageUrl = '';
    }

    let orderValue: number | undefined = undefined;
    if (displayOrder !== '' && displayOrder !== null && displayOrder !== undefined) {
        const parsedOrder = parseInt(String(displayOrder), 10);
        if (!isNaN(parsedOrder)) {
            orderValue = parsedOrder;
        }
    }
    
    await onSubmit({ 
      name, 
      position, 
      subject, 
      image: finalImageUrl, 
      instagram_url: instagramUrl || undefined,
      display_order: orderValue 
    });
    
    if (!initialData) {
      setName(''); setPosition(''); setSubject(''); setInstagramUrl(''); setDisplayOrder('');
      if (!imageFile) setCurrentImageUrl(null);
    }
  };

  const isEffectivelySubmitting = isSubmittingOverall || isUploadingImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="teacher-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input type="text" id="teacher-name" value={name} onChange={(e) => setName(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="teacher-position" className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
        <input type="text" id="teacher-position" value={position} onChange={(e) => setPosition(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="teacher-subject" className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran / Bidang Tugas</label>
        <input type="text" id="teacher-subject" value={subject} onChange={(e) => setSubject(e.target.value)} required 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="teacher-instagram" className="block text-sm font-medium text-gray-700 mb-1">URL Instagram (Opsional)</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Instagram className="h-5 w-5 text-gray-400" />
          </div>
          <input type="url" id="teacher-instagram" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/username" 
                 className="mt-1 block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
        </div>
      </div>
      <div>
        <label htmlFor="teacher-display-order" className="block text-sm font-medium text-gray-700 mb-1">Urutan Tampilan (Opsional, angka)</label>
        <input type="number" id="teacher-display-order" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} placeholder="Contoh: 1 (kosongkan jika tidak perlu)" 
               className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="teacher-imageFile-input" className="block text-sm font-medium text-gray-700 mb-1">Foto Guru</label>
        <div className="mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {(imagePreview || currentImageUrl) ? (
            <div className="relative group w-full max-w-xs mx-auto">
              <img src={imagePreview || currentImageUrl || undefined} alt="Preview Guru" className="h-40 w-full object-contain rounded-md mx-auto"/>
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); setCurrentImageUrl(null); }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus foto">
                <XCircle size={20} />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="teacher-imageFile-input" 
                       className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Unggah file</span>
                  <input id="teacher-imageFile-input" name="imageFile" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleFileChange} />
                </label>
                <p className="pl-1">atau tarik dan lepas</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP hingga 2MB</p>
            </div>
          )}
        </div>
        {isUploadingImage && <p className="text-sm text-blue-600 mt-2">Mengunggah foto...</p>}
      </div>
      <div>
        <button type="submit" disabled={isEffectivelySubmitting} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {isEffectivelySubmitting ? (initialData ? 'Menyimpan...' : 'Menambahkan...') : (initialData ? 'Simpan Perubahan' : 'Tambah Guru')}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
