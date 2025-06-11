import React from 'react';
import { useStudentBlogs } from '../contexts/StudentBlogsContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Calendar, Image as ImageIcon } from 'lucide-react';

const BlogListPage: React.FC = () => {
    const { posts, loading, error } = useStudentBlogs();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="pt-20 flex-grow">
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Blog Siswa</h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kumpulan karya tulis dan cerita inspiratif dari siswa-siswi SDN Tunas Harapan.</p>
                        </div>
                        {loading && <p className="text-center">Memuat postingan...</p>}
                        {error && <p className="text-center text-red-500">Gagal memuat: {error.message}</p>}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <Link to={`/blog/${post.slug}`} key={post.id} className="block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                                    <div className="relative h-56 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        {post.cover_image_url 
                                            ? <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                                            : <ImageIcon size={48} />
                                        }
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600">{post.title}</h2>
                                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                                            <span className="flex items-center"><User size={14} className="mr-1.5"/>{post.author_name}</span>
                                            <span className="flex items-center"><Calendar size={14} className="mr-1.5"/>{new Date(post.published_at!).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogListPage;