import React, { useState } from 'react';
import { useAnnouncements } from '../../contexts/AnnouncementsContext';
import AnnouncementForm from '../../components/admin/AnnouncementForm';
import { Announcement } from '../../types';
import { PlusCircle, Edit3, Trash2, RefreshCw, Eye, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageAnnouncements: React.FC = () => {
  const { 
    announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, 
    loading: contextLoading, error: contextError, fetchAnnouncements 
  } = useAnnouncements();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleAddClick = () => { setEditingAnnouncement(null); setIsFormVisible(true); setFormError(null); };
  const handleEditClick = (announcement: Announcement) => { setEditingAnnouncement(announcement); setIsFormVisible(true); setFormError(null); };
  const handleDeleteClick = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus pengumuman "${title}"? Gambar terkait juga akan dihapus.`)) {
      try { await deleteAnnouncement(id); } catch (err) { alert("Gagal menghapus pengumuman."); }
    }
  };
  const handleSubmitForm = async (formData: Omit<Announcement, 'id' | 'created_at' | 'link'>) => {
    setFormError(null); setIsSubmittingForm(true);
    try {
      if (editingAnnouncement) await updateAnnouncement(editingAnnouncement.id, formData);
      else await addAnnouncement(formData);
      setIsFormVisible(false); setEditingAnnouncement(null);
    } catch (err: any) { setFormError(err.message || "Terjadi kesalahan."); } 
    finally { setIsSubmittingForm(false); }
  };
  const handleRefresh = async () => await fetchAnnouncements();

  if (contextLoading && announcements.length === 0) return <div className="text-center py-10">Memuat data pengumuman...</div>;

  return (
    <div className="space-y-8">
      {/* ... JSX header halaman ... */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kelola Pengumuman</h1>
        <div className="flex space-x-2">
            <button
                onClick={handleRefresh}
                disabled={contextLoading || isSubmittingForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center disabled:opacity-50"
                title="Muat Ulang Data">
                <RefreshCw size={18} className={contextLoading && !isSubmittingForm ? "animate-spin" : ""} />
                <span className="hidden sm:inline ml-2">Refresh</span>
            </button>
            <button
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center">
                <PlusCircle size={18} className="mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Tambah Baru</span>
            </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{editingAnnouncement ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</h2>
            <button onClick={() => { setIsFormVisible(false); setEditingAnnouncement(null); setFormError(null); }}
              className="text-sm text-gray-500 hover:text-gray-700" title="Tutup Form">&times; Tutup</button>
          </div>
          {formError && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border border-red-300">{formError}</p>}
          <AnnouncementForm onSubmit={handleSubmitForm} initialData={editingAnnouncement} isSubmittingOverall={isSubmittingForm} />
        </div>
      )}

      {contextError && !isFormVisible && (
        <p className="text-red-600 bg-red-100 p-4 rounded-md text-sm border border-red-300">
            Error memuat data: {contextError.message}. Coba <button onClick={handleRefresh} className="underline font-semibold">muat ulang</button>.
        </p>
      )}
      
      {!contextLoading && !contextError && announcements.length === 0 && !isFormVisible && (
        <p className="text-gray-600 text-center py-6 bg-white rounded-lg shadow">Belum ada pengumuman. Silakan tambahkan pengumuman baru.</p>
      )}

      {announcements.length > 0 && (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Cuplikan</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ann.image ? (
                        <img src={ann.image} alt={ann.title.substring(0,20)} className="h-10 w-16 object-cover rounded"/>
                      ) : (
                        <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <ImageIcon size={20}/> {/* Penggunaan ImageIcon */}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={ann.title}>{ann.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{new Date(ann.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-700 truncate max-w-xs">{ann.excerpt || (ann.content && typeof ann.content === 'string' ? ann.content.substring(0,50) + "..." : '')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 sm:space-x-3">
                      <Link to={`/pengumuman/${ann.id}`} target="_blank" className="text-green-600 hover:text-green-800 inline-block" title="Lihat">
                        <Eye size={18} />
                      </Link>
                      <button onClick={() => handleEditClick(ann)} className="text-blue-600 hover:text-blue-800" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDeleteClick(ann.id, ann.title)} className="text-red-600 hover:text-red-800" title="Hapus">
                        <Trash2 size={18} />
                      </button>
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

export default ManageAnnouncements;