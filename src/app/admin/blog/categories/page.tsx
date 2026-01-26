'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types/supabase';
import { Trash2, Plus, Info } from 'lucide-react';

type Category = Database['public']['Tables']['blog_categories']['Row'];

export default function CategoriesManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_categories')
            .select('*')
            .order('name');

        if (data) setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const slug = name.toLowerCase()
            .replace(/[éèêë]/g, 'e')
            .replace(/[àâ]/g, 'a')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // @ts-ignore
        const { error } = await supabase.from('blog_categories').insert([
            { name, slug, description, meta_title: name, meta_description: description }
        ]);

        if (error) {
            alert('Erreur: ' + error.message);
        } else {
            setName('');
            setDescription('');
            fetchCategories();
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('Supprimer cette catégorie ?')) return;
        const { error } = await supabase.from('blog_categories').delete().eq('id', id);
        if (error) alert('Erreur: ' + error.message);
        else fetchCategories();
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '0.5rem' }}>Catégories</h1>
                <p style={{ color: '#64748B' }}>Gérez les catégories de votre blog</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Form */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} color="#FF6B00" /> Nouvelle Catégorie
                    </h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Nom</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Tutos & Astuces"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description pour le SEO..."
                                rows={3}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#0F172A', color: 'white', border: 'none',
                                padding: '0.8rem', borderRadius: '6px', cursor: 'pointer',
                                fontWeight: 600, marginTop: '0.5rem'
                            }}
                        >
                            Ajouter la catégorie
                        </button>
                    </form>
                </div>

                {/* List */}
                <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase' }}>Nom</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase' }}>Slug</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#0F172A' }}>{cat.name}</td>
                                    <td style={{ padding: '1rem', color: '#64748B', fontFamily: 'monospace' }}>{cat.slug}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => deleteCategory(cat.id)}
                                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.5rem' }}
                                            title="Supprimer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
