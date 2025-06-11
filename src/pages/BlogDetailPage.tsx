import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStudentBlogs } from '../contexts/StudentBlogsContext';
import { StudentBlogPost } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { User, Calendar } from 'lucide-react';

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getPostBySlug, loading } = useStudentBlogs();
    const [post, setPost] = useState<StudentBlogPost | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const postData = await getPostBySlug(slug);
                    if (postData) {
                        setPost(postData);
                    } else {
                        setError("Postingan yang Anda cari tidak ditemukan.");
                    }
                } catch (err: any) {
                    setError(err.message || "Gagal memuat postingan.");
                }
            }
        }
        fetchPost();
    }, [slug, getPostBySlug]);

    if (loading) return <div className="flex justify-center items-center h-screen">Memuat...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;
    if (!post) return <div className="flex justify-center items-center h-screen">Postingan tidak ditemukan.</div>;

    const pageUrl = window.location.href;
    const description = post.content ? post.content.substring(0, 155) + '...' : "Artikel dari Blog Siswa SDN Tunas Harapan";

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <MetaTags 
                title={post.title}
                description={description}
                imageUrl={post.cover_image_url || 'https://i.ibb.co/bF05sMh/sekolah.jpg'} // Ganti dengan URL gambar default
                url={pageUrl}
            />
            <Header />
            <main className="pt-20 flex-grow">
                 <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <article>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                            <div className="flex items-center text-gray-500 mb-8 space-x-6">
                                <span className="flex items-center"><User size={16} className="mr-2"/>Oleh: {post.author_name}</span>
                                <span className="flex items-center"><Calendar size={16} className="mr-2"/>{new Date(post.published_at!).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            {post.cover_image_url && (
                                <img src={post.cover_image_url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8"/>
                            )}
                            <div className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:text-blue-500" 
                                 dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogDetailPage;