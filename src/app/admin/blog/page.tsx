'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Database } from '@/types/supabase';
import { Edit, Plus, Trash2, Eye } from 'lucide-react';

// Define the type joining blog and categories
type BlogPost = Database['public']['Tables']['blog']['Row'] & {
    blog_categories: { name: string } | null;
};

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        // data structure returned by Supabase join
        // we need to specify the type slightly differently or cast it
        const { data, error } = await supabase
            .from('blog')
            .select(`
                *,
                blog_categories (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            // Supabase returns related tables as objects or arrays. 
            // Since category_id is a single reference and we use select, it returns an object if logic assumes one-to-one (which it is, belongs_to)
            // but Typescript might need a cast if the generated types don't perfectly infer join result automatically in this client setup.
            setPosts((data as any) || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) return;

        const { error } = await supabase.from('blog').delete().eq('id', id);

        if (error) {
            alert('Erreur lors de la suppression : ' + error.message);
        } else {
            fetchPosts();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '0.5rem' }}>Blog CMS</h1>
                    <p style={{ color: '#64748B' }}>Gérez vos articles, guides et actualités</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/admin/blog/categories" className="btn btn-secondary" style={{
                        backgroundColor: 'white',
                        color: '#475569',
                        border: '1px solid #CBD5E1',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        Gérer les catégories
                    </Link>
                    <Link href="/admin/blog/new" className="btn btn-primary" style={{
                        backgroundColor: '#FF6B00',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 6px rgba(255, 107, 0, 0.2)'
                    }}>
                        <Plus size={18} /> Nouvel Article
                    </Link>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Article</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Catégorie</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statut</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vues</th>
                            <th style={{ padding: '1rem', textAlign: 'right', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Chargement des articles...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '4rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Aucun article pour le moment.</p>
                                        <Link href="/admin/blog/new" style={{ color: '#FF6B00', fontWeight: 600 }}>
                                            Créer votre premier article →
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.2s' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '0.15rem' }}>{post.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                                            {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {post.blog_categories ? (
                                            <span style={{ fontSize: '0.8rem', background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#475569', fontWeight: 500 }}>
                                                {post.blog_categories.name}
                                            </span>
                                        ) : (
                                            <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Non classé</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '4px 8px',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            backgroundColor: post.status === 'published' ? '#DCFCE7' : '#FEF3C7',
                                            color: post.status === 'published' ? '#166534' : '#D97706',
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', marginRight: '6px' }}></span>
                                            {post.status === 'published' ? 'PUBLIÉ' : 'BROUILLON'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B' }}>
                                            <Eye size={16} />
                                            <span>{post.views_count || 0}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <Link href={`/admin/blog/${post.id}`} style={{
                                                padding: '0.5rem',
                                                borderRadius: '6px',
                                                color: '#3B82F6',
                                                transition: 'background-color 0.2s'
                                            }} title="Modifier">
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                style={{
                                                    padding: '0.5rem',
                                                    borderRadius: '6px',
                                                    color: '#EF4444',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                title="Supprimer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
