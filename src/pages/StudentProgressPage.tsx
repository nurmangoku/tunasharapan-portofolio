import React, { useState, FormEvent, useEffect } from 'react';
import { useStudentProgress } from '../contexts/StudentProgressContext';
import { StudentProgressResult } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Search, Loader2, Frown, Info, AlertTriangle } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ProgressResultDisplay: React.FC<{ result: StudentProgressResult }> = ({ result }) => {
    const gradesData = Object.entries(result.grades).map(([subject, score]) => ({
        subject,
        Nilai: score,
    }));

    const averageScore = gradesData.length > 0 ? gradesData.reduce((acc, curr) => acc + curr.Nilai, 0) / gradesData.length : 0;
    const highestScore = gradesData.length > 0 ? Math.max(...gradesData.map(g => g.Nilai)) : 0;
    const lowestScore = gradesData.length > 0 ? Math.min(...gradesData.map(g => g.Nilai)) : 0;
    const subjectsWithHighest = gradesData.filter(g => g.Nilai === highestScore).map(g => g.subject).join(', ');
    const subjectsWithLowest = gradesData.filter(g => g.Nilai === lowestScore).map(g => g.subject).join(', ');


    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mt-8 animate-fade-in">
            <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{result.student_name}</h2>
                <p className="text-gray-600">NISN: {result.student_nisn}</p>
                <p className="text-gray-500 text-sm">{`Laporan Kelas ${result.class_name} - Semester ${result.semester} ${result.academic_year}`}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">Analisis Laporan</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <p><strong>Rata-rata Nilai:</strong> <span className="font-bold text-lg text-blue-600">{averageScore.toFixed(2)}</span></p>
                        <p><strong>Nilai Tertinggi:</strong> <span className="font-bold text-green-600">{highestScore}</span> (pada mapel {subjectsWithHighest})</p>
                        <p><strong>Nilai Terendah:</strong> <span className="font-bold text-red-600">{lowestScore}</span> (pada mapel {subjectsWithLowest})</p>
                    </div>
                    {result.notes && (
                        <div>
                            <h4 className="font-semibold text-gray-700">Catatan dari Wali Kelas:</h4>
                            <p className="text-gray-600 italic mt-1 bg-yellow-50 p-3 rounded-lg border border-yellow-200">"{result.notes}"</p>
                        </div>
                    )}
                </div>

                <div className="min-h-[300px]">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Grafik Nilai Mata Pelajaran</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={gradesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" angle={-15} textAnchor="end" height={50} fontSize={12} interval={0}/>
                            <YAxis domain={[0, 100]} />
                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} />
                            <Legend />
                            <Bar dataKey="Nilai" radius={[4, 4, 0, 0]}>
                                {gradesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


const StudentProgressPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchResults, searchProgress, clearResults, loading, error } = useStudentProgress();

    useEffect(() => {
        return () => { clearResults(); };
    }, [clearResults]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            searchProgress(searchTerm.trim());
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="pt-20 flex-grow">
                <section id="progress-search" className="py-12 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Laporan Progres Siswa</h1>
                            <p className="text-lg text-gray-600">
                                Masukkan Nomor Induk Siswa Nasional (NISN) atau Nama Lengkap Siswa untuk melihat laporan kemajuan akademik terbaru.
                            </p>
                        </div>

                        <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto flex items-center shadow-lg rounded-full">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Ketik NISN atau Nama Siswa..."
                                className="w-full px-5 py-3 border-y border-l border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 flex items-center transition-colors"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Search />}
                                <span className="ml-2 hidden sm:inline">Cari</span>
                            </button>
                        </form>
                        
                        <div className="mt-10 max-w-4xl mx-auto">
                            {loading && (
                                <div className="text-center py-8">
                                    <Loader2 className="mx-auto h-8 w-8 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-gray-600">Mencari data...</p>
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center p-4 bg-red-100 text-red-700 rounded-lg">
                                    <AlertTriangle className="h-5 w-5 mr-3"/>
                                    <p>Terjadi kesalahan saat mencari data: {error.message}</p>
                                </div>
                            )}
                            {!loading && searchResults.length === 0 && searchTerm && !error && (
                                <div className="flex items-center p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                                    <Frown className="h-5 w-5 mr-3"/>
                                    <p>Data tidak ditemukan untuk "{searchTerm}". Pastikan NISN atau Nama sudah benar.</p>
                                </div>
                            )}
                            {!loading && searchResults.length > 0 && (
                                <div className="space-y-6">
                                    {searchResults.map((result, index) => (
                                        <ProgressResultDisplay key={`${result.student_nisn}-${index}`} result={result} />
                                    ))}
                                </div>
                            )}
                             {!loading && searchResults.length === 0 && !searchTerm && !error && (
                                <div className="flex items-center p-4 bg-blue-100 text-blue-800 rounded-lg">
                                    <Info className="h-5 w-5 mr-3"/>
                                    <p>Silakan mulai pencarian untuk menampilkan laporan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default StudentProgressPage;
