'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Wand2, Save } from 'lucide-react';
import { createInsert } from '@/lib/supabase-helpers';

export default function NewArticle() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        city: '',
        category: 'Climatisation',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateWithAI = async () => {
        if (!formData.city) {
            alert("Veuillez entrer une ville pour guider l'IA.");
            return;
        }
        setAiLoading(true);

        try {
            const res = await fetch('/api/generate-article', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city: formData.city,
                    category: formData.category
                })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Fill form with AI content
            setFormData({
                ...formData,
                title: data.title,
                slug: data.slug,
                content: data.content
            });
        } catch (err) {
            alert("Erreur IA: " + (err as Error).message);
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const articleData = createInsert('articles', {
            title: formData.title,
            slug: formData.slug,
            city: formData.city,
            category: formData.category,
            content: formData.content,
            status: 'draft'
        });

        const { error } = await supabase.from('articles').insert([articleData as any]);

        if (error) {
            console.error(error);
            alert('Erreur: ' + error.message);
        } else {
            router.push('/admin/articles');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>Nouvel Article</h1>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginTop: '1rem' }}>

                {/* AI Control Panel */}
                <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #BAE6FD' }}>
                    <h3 style={{ marginTop: 0, color: '#0369A1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Wand2 size={20} /> Assistant IA
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#0C4A6E' }}>
                        Entrez une ville et une catégorie ci-dessous, puis cliquez sur &quot;Générer&quot; pour créer un brouillon optimisé SEO.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                        >
                            <option value="Climatisation">Climatisation</option>
                            <option value="Pompe à Chaleur">Pompe à Chaleur</option>
                            <option value="Gainable">Gainable</option>
                            <option value="Entretien">Entretien</option>
                        </select>

                        <input
                            type="text"
                            name="city"
                            placeholder="Ville (ex: Miramas)"
                            value={formData.city}
                            onChange={handleChange}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1', flex: 1 }}
                        />

                        <button
                            type="button"
                            onClick={generateWithAI}
                            disabled={aiLoading}
                            className="btn"
                            style={{ background: '#0284C7', color: 'white', opacity: aiLoading ? 0.7 : 1 }}
                        >
                            {aiLoading ? 'Génération...' : "✨ Générer l'article"}
                        </button>
                    </div>
                </div>

                {/* Main Editor Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Titre H1</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontWeight: 'bold' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Slug (URL)</label>
                        <input
                            type="text"
                            name="slug"
                            required
                            value={formData.slug}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontFamily: 'monospace', color: '#64748B' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Contenu (Markdown)</label>
                        <textarea
                            name="content"
                            rows={15}
                            value={formData.content}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontFamily: 'monospace', lineHeight: '1.5' }}
                        ></textarea>
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                            Le contenu supporte le Markdown basique (# Titres, **gras**, - listes).
                        </p>
                    </div>

                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <Save size={18} /> {loading ? 'Enregistrement...' : 'Enregistrer le brouillon'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
