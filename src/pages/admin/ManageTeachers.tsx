import React, { useState } from 'react';
import { useTeachers } from '../../contexts/TeachersContext';
import TeacherForm from '../../components/admin/TeacherForm';
import { Teacher } from '../../types';
import { PlusCircle, Edit3, Trash2, RefreshCw, Instagram, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageTeachers: React.FC = () => {
  const { 
    teachers, addTeacher, updateTeacher, deleteTeacher, 
    loading: contextLoading, error: contextError, fetchTeachers 
  } = useTeachers();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleAddClick = () => {
    setEditingTeacher(null); setIsFormVisible(true); setFormError(null);
  };
  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher); setIsFormVisible(true); setFormError(null);
  };
  const handleDeleteClick = async (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus data guru "${name}"? Foto terkait juga akan dihapus.`)) {
      try { await deleteTeacher(id); } 
      catch (err) { alert("Gagal menghapus data guru."); }
    }
  };
  const handleSubmitForm = async (formData: Omit<Teacher, 'id' | 'created_at'>) => {
    setFormError(null); setIsSubmittingForm(true);
    try {
      if (editingTeacher) await updateTeacher(editingTeacher.id, formData);
      else await addTeacher(formData);
      setIsFormVisible(false); setEditingTeacher(null);
    } catch (err: any) { setFormError(err.message || "Terjadi kesalahan."); } 
    finally { setIsSubmittingForm(false); }
  };
  const handleRefresh = async () => await fetchTeachers();

  if (contextLoading && teachers.length === 0) return <div className="text-center py-10">Memuat data guru...</div>;

  // Kelas-kelas Tailwind yang sebelumnya di <style jsx> sudah diterapkan langsung pada elemen.
  const buttonIconClass = "bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center disabled:opacity-50";
  const buttonPrimaryClass = "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-150 ease-in-out flex items-center disabled:opacity-50";
  const formErrorClass = "text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border border-red-300";
  const tableThClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableTdClass = "px-6 py-4 whitespace-nowrap";


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kelola Data Guru</h1>
        <div className="flex space-x-2">
          <button onClick={handleRefresh} disabled={contextLoading || isSubmittingForm} className={buttonIconClass} title="Muat Ulang">
            <RefreshCw size={18} className={contextLoading && !isSubmittingForm ? "animate-spin" : ""} />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </button>
          <button onClick={handleAddClick} className={buttonPrimaryClass}>
            <PlusCircle size={18} className="mr-0 sm:mr-2" />
            <span className="hidden sm:inline">Tambah Guru</span>
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {editingTeacher ? 'Edit Data Guru' : 'Tambah Guru Baru'}
            </h2>
            <button onClick={() => { setIsFormVisible(false); setEditingTeacher(null); setFormError(null); }}
              className="text-sm text-gray-500 hover:text-gray-700" title="Tutup Form">&times; Tutup</button>
          </div>
          {formError && <p className={formErrorClass}>{formError}</p>}
          <TeacherForm onSubmit={handleSubmitForm} initialData={editingTeacher} isSubmittingOverall={isSubmittingForm} />
        </div>
      )}

      {contextError && !isFormVisible && <p className={formErrorClass}>Error memuat data: {contextError.message}. Coba <button onClick={handleRefresh} className="underline font-semibold">muat ulang</button>.</p>}
      {!contextLoading && !contextError && teachers.length === 0 && !isFormVisible && <p className="text-gray-600 text-center py-6 bg-white rounded-lg shadow">Belum ada data guru.</p>}

      {teachers.length > 0 && (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableThClass}>Foto</th>
                  <th className={tableThClass}>Nama</th>
                  <th className={tableThClass}>Jabatan</th>
                  <th className={`${tableThClass} hidden md:table-cell`}>Mapel/Tugas</th>
                  <th className={`${tableThClass} hidden lg:table-cell`}>Instagram</th>
                  <th className={`${tableThClass} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className={tableTdClass}>
                      {teacher.image ? <img src={teacher.image} alt={teacher.name} className="h-10 w-10 object-cover rounded-full"/>
                                     : <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400"><ImageIcon size={20}/></div>}
                    </td>
                    <td className={tableTdClass}><div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={teacher.name}>{teacher.name}</div></td>
                    <td className={tableTdClass}><div className="text-sm text-gray-700">{teacher.position}</div></td>
                    <td className={`${tableTdClass} hidden md:table-cell`}><div className="text-sm text-gray-700 max-w-xs truncate" title={teacher.subject}>{teacher.subject}</div></td>
                    <td className={`${tableTdClass} hidden lg:table-cell`}>
                      {teacher.instagram_url ? <a href={teacher.instagram_url} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800"><Instagram size={18}/></a> : <span className="text-gray-400">-</span>}
                    </td>
                    <td className={`${tableTdClass} text-right space-x-2 sm:space-x-3`}>
                      <button onClick={() => handleEditClick(teacher)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit3 size={18}/></button>
                      <button onClick={() => handleDeleteClick(teacher.id, teacher.name)} className="text-red-600 hover:text-red-800" title="Hapus"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Blok <style jsx> dihapus */}
    </div>
  );
};

export default ManageTeachers;