'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Database } from '@/types/supabase';
import { Edit, Plus, Trash2 } from 'lucide-react';

type Article = Database['public']['Tables']['articles']['Row'];

export default function ArticlesList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setArticles(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const deleteArticle = async (id: number) => {
        if (!confirm('Supprimer cet article ?')) return;
        await supabase.from('articles').delete().eq('id', id);
        fetchArticles();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#0F172A' }}>Articles de Blog</h1>
                <Link href="/admin/articles/new" className="btn btn-primary">
                    <Plus size={18} /> Nouvel Article
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B' }}>TITRE</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B' }}>VILLE / CAT</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B' }}>STATUT</th>
                            <th style={{ padding: '1rem', textAlign: 'right', color: '#64748B' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</td></tr>
                        ) : articles.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Aucun article.</td></tr>
                        ) : (
                            articles.map((art) => (
                                <tr key={art.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{art.title}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>
                                            {art.city || 'Général'}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                                            {art.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            color: art.status === 'published' ? '#166534' : '#D97706',
                                            fontWeight: 'bold', fontSize: '0.9rem'
                                        }}>
                                            {art.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <Link href={`/admin/articles/edit/${art.id}`} style={{ marginRight: '1rem', color: '#2CA5FF' }}>
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => deleteArticle(art.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
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
