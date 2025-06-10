import React, { useState, FormEvent, useEffect } from 'react';
import { useStudentProgress } from '../contexts/StudentProgressContext';
import { StudentProgressResult } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// FIX: Menambahkan Star, TrendingUp, CheckCircle
import { Search, Loader2, Frown, Info, AlertTriangle, Sparkles, Star, TrendingUp, CheckCircle } from 'lucide-react'; 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Komponen untuk Analisis AI
const AIAnalysisDisplay: React.FC<{ result: StudentProgressResult }> = ({ result }) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    useEffect(() => {
        const generateAnalysis = async () => {
            setIsAnalyzing(true);
            setAnalysisError(null);
            
            const prompt = `
Anda adalah perwakilan dari sekolah SDN Tunas Harapan yang memberikan analisis laporan kemajuan belajar siswa. Tugas Anda adalah membuat analisis dalam format naratif yang mudah dipahami oleh orang tua. Nada tulisan harus positif, suportif, dan membangun, dengan fokus pada pertumbuhan siswa. Gunakan kata ganti "kami" saat merujuk pada pihak sekolah.

**Data Siswa:**
- Nama: ${result.student_name}
- NISN: ${result.student_nisn}
- Laporan: Kelas ${result.class_name}, Semester ${result.semester}, Tahun Ajaran ${result.academic_year}
- Nilai Mata Pelajaran (JSON): ${JSON.stringify(result.grades)}
- Data Kehadiran (jumlah hari, JSON): ${JSON.stringify(result.attendance || {})}
- Penilaian Sikap: ${result.attitude || 'Tidak ada data'}
- Catatan Wali Kelas: ${result.notes || 'Tidak ada'}

**Struktur Analisis yang Diinginkan (gunakan format Markdown):**

1.  **Ringkasan Umum:** Awali dengan ringkasan singkat dan positif tentang performa umum siswa di semester ini, sebutkan penilaian sikapnya.
2.  **Kekuatan Akademik:** Identifikasi 2-3 mata pelajaran dengan nilai tertinggi. Jelaskan bahwa siswa menunjukkan kekuatan dan pemahaman yang sangat baik di bidang ini. Berikan pujian.
3.  **Area yang Perlu Ditingkatkan:** Identifikasi 1-2 mata pelajaran dengan nilai terendah. Gunakan bahasa yang suportif, seperti "area yang bisa menjadi fokus untuk ditingkatkan" atau "potensi untuk tumbuh lebih jauh", bukan "kelemahan" atau "nilai buruk".
4.  **Analisis Kehadiran & Sikap:** Jika ada data absensi 'Alpa' > 0, hubungkan secara halus dengan performa belajar. Contoh: "Mempertahankan kehadiran penuh akan sangat membantu ananda dalam memahami pelajaran secara konsisten." Jika sikapnya "Cukup", berikan saran lembut untuk lebih aktif atau fokus di kelas.
5.  **Saran Konstruktif:** Berikan 2-3 saran konkret dan dapat ditindaklanjuti. Untuk area peningkatan, sarankan untuk "meminta latihan tambahan dari guru mata pelajaran" atau "berdiskusi lebih lanjut dengan kami di sekolah".
6.  **Penutup yang Memotivasi:** Akhiri dengan kalimat yang positif dan memotivasi dari pihak sekolah.
`;

            try {
                const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
                if (!apiKey) throw new Error("Kunci API Gemini tidak ditemukan. Pastikan variabel VITE_GEMINI_API_KEY sudah diatur di file .env Anda.");

                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                
                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Permintaan API gagal dengan status ${response.status}: ${errorBody}`);
                }
                
                const data = await response.json();
                
                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts[0].text) {
                    const generatedText = data.candidates[0].content.parts[0].text;
                    setAnalysis(generatedText);
                } else {
                    if (data.candidates && data.candidates.length > 0 && data.candidates[0].finishReason === 'SAFETY') {
                        throw new Error("Respon diblokir karena pengaturan keamanan.");
                    }
                    throw new Error("Respon dari AI tidak valid atau kosong.");
                }

            } catch (err: any) {
                console.error("Error generating AI analysis:", err);
                setAnalysisError(err.message || "Gagal menghasilkan analisis AI.");
            } finally {
                setIsAnalyzing(false);
            }
        };

        generateAnalysis();
    }, [result]);

    if (isAnalyzing) {
        return (
            <div className="mt-6 p-6 bg-slate-100 rounded-lg animate-pulse">
                <div className="flex items-center text-slate-600">
                    <Sparkles className="h-5 w-5 mr-3 animate-ping" />
                    <p className="font-semibold">AI sedang membuat analisis...</p>
                </div>
            </div>
        );
    }
    
    if (analysisError) {
        return (
             <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
                <p>Gagal membuat analisis: {analysisError}</p>
            </div>
        );
    }

    return (
        <div className="mt-6 prose prose-blue max-w-none p-6 bg-slate-50 rounded-lg border border-slate-200">
             <div className="flex items-center text-slate-700 font-semibold mb-4 not-prose">
                <Sparkles className="h-5 w-5 mr-3 text-blue-500" />
                <h2>Analisis dan Saran dari AI</h2>
            </div>
            <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
        </div>
    );
};


const ProgressResultDisplay: React.FC<{ result: StudentProgressResult }> = ({ result }) => {
    const gradesData = Object.entries(result.grades).map(([subject, score]) => ({ subject, Nilai: score }));
    const averageScore = gradesData.length > 0 ? gradesData.reduce((acc, curr) => acc + curr.Nilai, 0) / gradesData.length : 0;
    const highestScore = gradesData.length > 0 ? Math.max(...gradesData.map(g => g.Nilai)) : 0;
    const lowestScore = gradesData.length > 0 ? Math.min(...gradesData.map(g => g.Nilai)) : 0;
    const subjectsWithHighest = gradesData.filter(g => g.Nilai === highestScore).map(g => g.subject).join(', ');
    const subjectsWithLowest = gradesData.filter(g => g.Nilai === lowestScore).map(g => g.subject).join(', ');

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mt-8 animate-fade-in">
            <div className="border-b pb-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{result.student_name}</h2>
                <p className="text-gray-600">NISN: {result.student_nisn}</p>
                <p className="text-gray-500 text-sm mt-1">{`Laporan Kelas ${result.class_name} - Semester ${result.semester} ${result.academic_year}`}</p>
            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Ringkasan Laporan</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
                             <div className="flex items-center"><Star className="h-5 w-5 mr-3 text-blue-500" /><p><strong>Sikap:</strong> <span className="font-bold text-blue-600">{result.attitude || 'N/A'}</span></p></div>
                             <div className="flex items-center"><TrendingUp className="h-5 w-5 mr-3 text-green-500" /><p><strong>Rata-rata Nilai:</strong> <span className="font-bold text-lg text-green-600">{averageScore.toFixed(2)}</span></p></div>
                             <div className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-gray-500" /><p><strong>Absensi:</strong> Sakit: {result.attendance?.Sakit || 0}, Izin: {result.attendance?.Izin || 0}, Alpa: {result.attendance?.Alpa || 0}</p></div>
                        </div>
                        {result.notes && (
                            <div>
                                <h4 className="font-semibold text-gray-700">Catatan dari Wali Kelas:</h4>
                                <p className="text-gray-600 italic mt-1 bg-yellow-50 p-3 rounded-lg border border-yellow-200">"{result.notes}"</p>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-3 min-h-[350px]">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Grafik Nilai Mata Pelajaran</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={gradesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" angle={-25} textAnchor="end" height={70} fontSize={12} interval={0}/>
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
                <AIAnalysisDisplay result={result} />
            </div>
        </div>
    );
};


const StudentProgressPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchResults, searchProgress, clearResults, loading, error } = useStudentProgress();
    useEffect(() => { return () => { clearResults(); }; }, [clearResults]);
    const handleSearch = (e: FormEvent) => { e.preventDefault(); if (searchTerm.trim()) searchProgress(searchTerm.trim()); };
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
                                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Ketik NISN atau Nama Siswa..."
                                className="w-full px-5 py-3 border-y border-l border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                            />
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 flex items-center transition-colors">
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