import React, { useState, FormEvent } from 'react';
import { useSubjects } from '../../contexts/SubjectsContext';
import { Subject } from '../../types';
import { Edit, Trash, Plus } from 'lucide-react';

const ManageSubjects: React.FC = () => {
  const { subjects, addSubject, updateSubject, deleteSubject, loading, error } = useSubjects();
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingSubject) {
        await updateSubject(editingSubject.id, { name, short_name: shortName });
      } else {
        await addSubject({ name, short_name: shortName });
      }
      handleReset();
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setName(subject.name);
    setShortName(subject.short_name || '');
  };

  const handleDelete = async (id: string, subjectName: string) => {
    if (window.confirm(`Yakin ingin menghapus mata pelajaran "${subjectName}"?`)) {
      try {
        await deleteSubject(id);
      } catch (err) {
        alert(`Error: ${(err as Error).message}`);
      }
    }
  };
  
  const handleReset = () => {
    setEditingSubject(null);
    setName('');
    setShortName('');
  };

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Mata Pelajaran</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{editingSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700">Nama Mata Pelajaran</label>
                    <input type="text" id="subject-name" value={name} onChange={e => setName(e.target.value)} required placeholder="Contoh: Pendidikan Agama Islam"
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="subject-short-name" className="block text-sm font-medium text-gray-700">Nama Pendek/Singkatan (Opsional)</label>
                    <input type="text" id="subject-short-name" value={shortName} onChange={e => setShortName(e.target.value)} placeholder="Contoh: PAI"
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="flex justify-end space-x-3">
                    {editingSubject && <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Batal Edit</button>}
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center">
                        <Plus className={`-ml-1 mr-2 h-5 w-5 ${editingSubject ? 'hidden' : 'inline'}`} />
                        {editingSubject ? 'Simpan Perubahan' : 'Tambah'}
                    </button>
                </div>
            </form>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <h3 className="text-lg font-semibold p-4 border-b">Daftar Mata Pelajaran</h3>
            {loading && <p className="p-4">Memuat...</p>}
            {error && <p className="p-4 text-red-500">Error: {error.message}</p>}
            <ul className="divide-y divide-gray-200">
                {subjects.map(subject => (
                    <li key={subject.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                        <div>
                            <p className="font-medium text-gray-900">{subject.name}</p>
                            <p className="text-sm text-gray-500">{subject.short_name || 'Tidak ada singkatan'}</p>
                        </div>
                        <div className="space-x-3">
                            <button onClick={() => handleEdit(subject)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={18}/></button>
                            <button onClick={() => handleDelete(subject.id, subject.name)} className="text-red-600 hover:text-red-800" title="Hapus"><Trash size={18}/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default ManageSubjects;
