import React, { useState } from 'react';
import { useStudentBlogs } from '../../contexts/StudentBlogsContext';
import StudentBlogForm from '../../components/admin/StudentBlogForm';
import { StudentBlogPost } from '../../types';
import { PlusCircle, Edit3, Trash2, RefreshCw, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageStudentBlogs: React.FC = () => {
  const { posts, addPost, updatePost, deletePost, loading, error, fetchPosts } = useStudentBlogs();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<StudentBlogPost | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleAddClick = () => { setEditingPost(null); setIsFormVisible(true); setFormError(null); };
  const handleEditClick = (post: StudentBlogPost) => { setEditingPost(post); setIsFormVisible(true); setFormError(null); };
  const handleDeleteClick = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus postingan "${title}"?`)) {
      try { await deletePost(id); } catch (err) { alert("Gagal menghapus postingan."); }
    }
  };
  const handleSubmitForm = async (formData: Omit<StudentBlogPost, 'id' | 'created_at'>) => {
    setFormError(null); setIsSubmittingForm(true);
    try {
      if (editingPost) await updatePost(editingPost.id, formData);
      else await addPost(formData);
      setIsFormVisible(false); setEditingPost(null);
    } catch (err: any) { setFormError(err.message || "Terjadi kesalahan."); } 
    finally { setIsSubmittingForm(false); }
  };
  
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Blog Siswa</h1>
        <button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center">
          <PlusCircle size={18} className="mr-2" /> Tambah Postingan
        </button>
      </div>
      {isFormVisible && (
        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-md">
          <StudentBlogForm onSubmit={handleSubmitForm} initialData={editingPost} isSubmittingOverall={isSubmittingForm} />
        </div>
      )}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 max-w-sm truncate" title={post.title}>{post.title}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-700">{post.author_name}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-700">{new Date(post.published_at!).toLocaleDateString('id-ID')}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                     <Link to={`/blog/${post.slug}`} target="_blank" className="text-green-600 hover:text-green-800" title="Lihat Postingan"><ExternalLink size={18}/></Link>
                     <button onClick={() => handleEditClick(post)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit3 size={18}/></button>
                     <button onClick={() => handleDeleteClick(post.id, post.title)} className="text-red-600 hover:text-red-800" title="Hapus"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentBlogs;
