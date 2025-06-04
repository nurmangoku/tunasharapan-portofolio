import React, { useState } from 'react';
import { useYouTubeVideos } from '../../contexts/YouTubeVideosContext';
import YouTubeVideoForm from '../../components/admin/YouTubeVideoForm';
import { YouTubeVideo } from '../../types';
import { PlusCircle, Edit3, Trash2, RefreshCw, ExternalLink } from 'lucide-react'; // ExternalLink mungkin tidak digunakan di sini

const ManageYouTubeVideos: React.FC = () => {
  const { 
    videos, addVideo, updateVideo, deleteVideo, 
    loading: contextLoading, error: contextError, fetchVideos 
  } = useYouTubeVideos();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleAddClick = () => { setEditingVideo(null); setIsFormVisible(true); setFormError(null); };
  const handleEditClick = (video: YouTubeVideo) => { setEditingVideo(video); setIsFormVisible(true); setFormError(null); };
  const handleDeleteClick = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus video "${title}"?`)) {
      try { await deleteVideo(id); } 
      catch (err) { alert("Gagal menghapus video."); }
    }
  };
  const handleSubmitForm = async (formData: Omit<YouTubeVideo, 'id' | 'created_at'>) => {
    setFormError(null); setIsSubmittingForm(true);
    try {
      if (editingVideo) await updateVideo(editingVideo.id, formData);
      else await addVideo(formData);
      setIsFormVisible(false); setEditingVideo(null);
    } catch (err: any) { setFormError(err.message || "Terjadi kesalahan."); } 
    finally { setIsSubmittingForm(false); }
  };
  const handleRefresh = async () => await fetchVideos();

  if (contextLoading && videos.length === 0) return <div className="text-center py-10">Memuat data video...</div>;

  const buttonIconClass = "bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center disabled:opacity-50";
  const buttonPrimaryClass = "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center disabled:opacity-50";
  const formErrorClass = "text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border border-red-300";
  const tableThClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableTdClass = "px-6 py-4"; // Menghapus whitespace-nowrap agar deskripsi bisa wrap

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kelola Video YouTube</h1>
        <div className="flex space-x-2">
          <button onClick={handleRefresh} disabled={contextLoading || isSubmittingForm} className={buttonIconClass} title="Muat Ulang">
            <RefreshCw size={18} className={contextLoading && !isSubmittingForm ? "animate-spin" : ""} />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </button>
          <button onClick={handleAddClick} className={buttonPrimaryClass}>
            <PlusCircle size={18} className="mr-0 sm:mr-2" />
            <span className="hidden sm:inline">Tambah Video</span>
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{editingVideo ? 'Edit Video' : 'Tambah Video Baru'}</h2>
            <button onClick={() => { setIsFormVisible(false); setEditingVideo(null); setFormError(null); }}
              className="text-sm text-gray-500 hover:text-gray-700" title="Tutup Form">× Tutup</button>
          </div>
          {formError && <p className={formErrorClass}>{formError}</p>}
          <YouTubeVideoForm onSubmit={handleSubmitForm} initialData={editingVideo} isSubmittingOverall={isSubmittingForm} />
        </div>
      )}

      {contextError && !isFormVisible && <p className={formErrorClass}>Error: {contextError.message}. <button onClick={handleRefresh} className="underline">Muat ulang</button>.</p>}
      {!contextLoading && !contextError && videos.length === 0 && !isFormVisible && <p className="text-gray-600 text-center py-6 bg-white rounded-lg shadow">Belum ada video.</p>}

      {videos.length > 0 && (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableThClass}>Judul</th>
                  <th className={`${tableThClass} hidden md:table-cell`}>URL Embed</th>
                  <th className={`${tableThClass} hidden lg:table-cell`}>Deskripsi</th>
                  <th className={`${tableThClass} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className={`${tableTdClass} whitespace-nowrap`}>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={video.title}>{video.title}</div>
                    </td>
                    <td className={`${tableTdClass} hidden md:table-cell`}>
                      <a href={video.youtube_embed_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs flex items-center">
                        {/* Menampilkan bagian dari URL agar tidak terlalu panjang */}
                        {video.youtube_embed_url.length > 40 ? video.youtube_embed_url.substring(0,37) + '...' : video.youtube_embed_url}
                        <ExternalLink size={14} className="ml-1 shrink-0"/>
                      </a>
                    </td>
                    <td className={`${tableTdClass} hidden lg:table-cell`}>
                        <div className="text-sm text-gray-700 max-w-xs truncate" title={video.description}>{video.description || '-'}</div>
                    </td>
                    <td className={`${tableTdClass} text-right whitespace-nowrap space-x-2 sm:space-x-3`}>
                      <button onClick={() => handleEditClick(video)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit3 size={18}/></button>
                      <button onClick={() => handleDeleteClick(video.id, video.title)} className="text-red-600 hover:text-red-800" title="Hapus"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageYouTubeVideos;