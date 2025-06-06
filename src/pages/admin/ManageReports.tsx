import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Papa from 'papaparse';
import { useSubjects } from '../../contexts/SubjectsContext';
import { Upload, File, CheckCircle, AlertTriangle } from 'lucide-react';

const ManageReports: React.FC = () => {
    const { subjects } = useSubjects();
    const [className, setClassName] = useState('');
    const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
    const [academicYear, setAcademicYear] = useState('2024/2025');
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCsvFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile || !className || !academicYear) {
            alert('Harap isi semua field dan pilih file CSV.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage(null);

        // Langkah 1: Buat record laporan akademik baru
        const { data: reportData, error: reportError } = await supabase
            .from('academic_reports')
            .insert({ class_name: className, semester, academic_year: academicYear })
            .select()
            .single();

        if (reportError || !reportData) {
            console.error("Error creating report:", reportError);
            setStatusMessage({ type: 'error', message: `Gagal membuat laporan: ${reportError?.message}` });
            setIsSubmitting(false);
            return;
        }

        const reportId = reportData.id;

        // Langkah 2: Parse CSV dan siapkan data nilai siswa
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const subjectNames = subjects.map(s => s.name);
                const studentGradesData = results.data.map((row: any) => {
                    const grades: Record<string, number> = {};
                    
                    // Cocokkan header CSV dengan daftar mata pelajaran
                    for (const header in row) {
                        if (subjectNames.includes(header)) {
                             const score = parseFloat(row[header]);
                            if (!isNaN(score)) {
                                grades[header] = score;
                            }
                        }
                    }

                    return {
                        report_id: reportId,
                        student_nisn: row.NISN || row.nisn,
                        student_name: row.Nama || row.nama,
                        grades,
                        notes: row.Catatan || row.catatan || undefined,
                    };
                }).filter(student => student.student_nisn && student.student_name);

                if (studentGradesData.length === 0) {
                    setStatusMessage({ type: 'error', message: 'Tidak ada data siswa yang valid ditemukan di file CSV. Pastikan header CSV (NISN, Nama, dan nama mata pelajaran) sudah benar.' });
                    setIsSubmitting(false);
                    await supabase.from('academic_reports').delete().eq('id', reportId);
                    return;
                }

                // Langkah 3: Insert data nilai siswa ke Supabase
                const { error: gradesError } = await supabase
                    .from('student_grades')
                    .insert(studentGradesData);

                if (gradesError) {
                    console.error("Error inserting student grades:", gradesError);
                    setStatusMessage({ type: 'error', message: `Gagal mengunggah data nilai: ${gradesError.message}` });
                    await supabase.from('academic_reports').delete().eq('id', reportId);
                } else {
                    setStatusMessage({ type: 'success', message: `Berhasil! Laporan untuk ${className} dengan ${studentGradesData.length} data siswa telah diunggah.` });
                    setClassName('');
                    setCsvFile(null);
                    const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
                    if(fileInput) fileInput.value = "";
                }
                setIsSubmitting(false);
            },
            error: (err) => {
                console.error("Error parsing CSV:", err);
                setStatusMessage({ type: 'error', message: `Gagal mem-parsing file CSV: ${err.message}` });
                setIsSubmitting(false);
                supabase.from('academic_reports').delete().eq('id', reportId);
            }
        });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Unggah Laporan Nilai</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="class_name" className="block text-sm font-medium text-gray-700">Nama Kelas</label>
                        <input type="text" id="class_name" value={className} onChange={(e) => setClassName(e.target.value)} required placeholder="Contoh: Kelas 6A" 
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value as 'Ganjil' | 'Genap')} 
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option>Ganjil</option>
                                <option>Genap</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="academic_year" className="block text-sm font-medium text-gray-700">Tahun Ajaran</label>
                            <input type="text" id="academic_year" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required placeholder="Contoh: 2024/2025" 
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">File Data Siswa (.csv)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <File className="mx-auto h-12 w-12 text-gray-400"/>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="csv-file-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                        <span>Pilih file untuk diunggah</span>
                                        <input id="csv-file-input" name="csv-file" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} required />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">{csvFile ? csvFile.name : 'CSV (dipisahkan koma)'}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            Pastikan header CSV: `NISN`, `Nama`, dan nama mata pelajaran yang sesuai (contoh: `PAI`, `Matematika`). Kolom `Catatan` bersifat opsional.
                        </p>
                    </div>
                    <button type="submit" disabled={isSubmitting} 
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                        <Upload className="mr-2 h-5 w-5"/>
                        {isSubmitting ? 'Mengunggah...' : 'Unggah Laporan'}
                    </button>
                </form>
                {statusMessage && (
                    <div className={`mt-6 p-4 rounded-md text-sm ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {statusMessage.type === 'success' ? <CheckCircle className="h-5 w-5"/> : <AlertTriangle className="h-5 w-5"/>}
                            </div>
                            <div className="ml-3">
                                <p>{statusMessage.message}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageReports;
