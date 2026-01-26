'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, ArrowLeft, Loader2, Link as LinkIcon, Youtube as YoutubeIcon } from 'lucide-react';
import Link from 'next/link';

// Simple Tiptap Toolbar
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('URL de l\'image');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addYoutube = () => {
        const url = prompt('Entrez l\'URL YouTube');
        if (url) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    };


    return (
        <div style={{ padding: '0.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', background: '#F8FAFC' }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'editor-btn is-active' : 'editor-btn'}>Bold</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'editor-btn is-active' : 'editor-btn'}>Italic</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'editor-btn is-active' : 'editor-btn'}>H2</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'editor-btn is-active' : 'editor-btn'}>H3</button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'editor-btn is-active' : 'editor-btn'}>List</button>
            <button onClick={addLink} className={editor.isActive('link') ? 'editor-btn is-active' : 'editor-btn'}><LinkIcon size={16} /></button>
            <button onClick={addImage} className="editor-btn"><ImageIcon size={16} /></button>
            <button onClick={addYoutube} className="editor-btn"><YoutubeIcon size={16} /></button>
            <style jsx>{`
                .editor-btn {
                    padding: 4px 8px;
                    border: 1px solid #CBD5E1;
                    background: white;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    color: #475569;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .editor-btn:hover { background: #E2E8F0; }
                .editor-btn.is-active { background: #0F172A; color: white; border-color: #0F172A; }
            `}</style>
        </div>
    );
};

interface BlogEditorProps {
    post?: any; // Existing post for edit mode
}

export default function BlogEditor({ post }: BlogEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    // Form States
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [categoryId, setCategoryId] = useState(post?.category_id || '');
    const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [metaTitle, setMetaTitle] = useState(post?.meta_title || '');
    const [metaDesc, setMetaDesc] = useState(post?.meta_description || '');
    const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('blog_categories').select('*');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    // Auto-generate slug from title if creating new
    useEffect(() => {
        if (!post && title) {
            setSlug(title.toLowerCase()
                .replace(/[éèêë]/g, 'e')
                .replace(/[àâ]/g, 'a')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            );
        }
    }, [title, post]);

    // Tiptap Editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension.configure({ inline: true }),
            LinkExtension.configure({ openOnClick: false }),
            Youtube.configure({ inline: false })
        ],
        content: post?.content || '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    // Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setImageFile(file);
        // Preview
        setFeaturedImage(URL.createObjectURL(file));
    };

    const uploadImageToStorage = async (file: File, slug: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = featuredImage;

            // Upload image if new file selected
            if (imageFile) {
                imageUrl = await uploadImageToStorage(imageFile, slug);
            }

            const postData = {
                title,
                slug,
                content: editor?.getHTML() || '',
                excerpt,
                meta_title: metaTitle,
                meta_description: metaDesc,
                category_id: categoryId || null,
                status,
                featured_image: imageUrl,
                reading_time: Math.ceil((editor?.getText().split(' ').length || 0) / 200) // Estimate reading time
            };

            if (post) {
                // UPDATE
                // @ts-ignore
                const { error } = await supabase
                    .from('blog')
                    .update(postData)
                    .eq('id', post.id);
                if (error) throw error;
            } else {
                // INSERT
                // @ts-ignore
                const { error } = await supabase
                    .from('blog')
                    .insert([postData]);
                if (error) throw error;
            }

            router.push('/admin/blog');
            router.refresh();

        } catch (error: any) {
            alert('Erreur: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/blog" style={{ display: 'flex', alignItems: 'center', color: '#64748B', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Retour
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                        {post ? 'Modifier l\'article' : 'Nouvel article'}
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 'bold', color: status === 'published' ? '#166534' : '#D97706' }}
                    >
                        <option value="draft">BROUILLON</option>
                        <option value="published">PUBLIÉ</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            backgroundColor: '#FF6B00', color: 'white', border: 'none',
                            padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {post ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Content Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Title & Slug */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Titre de l'article</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Comment choisir sa climatisation..."
                                style={{ width: '100%', padding: '0.8rem', fontSize: '1.1rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: '#64748B' }}>Slug URL (auto-généré)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#64748B' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                        <MenuBar editor={editor} />
                        <EditorContent editor={editor} style={{ minHeight: '400px', fontSize: '1rem', lineHeight: '1.6' }} />
                    </div>

                    {/* Excerpt */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Résumé (Excerpt)</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                            placeholder="Court résumé pour les listes et le SEO..."
                        />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Organization */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0F172A' }}>Organisation</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>Catégorie</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                                required
                            >
                                <option value="">Choisir une catégorie...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0F172A' }}>Image Principale</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ width: '100%', marginBottom: '1rem' }}
                        />
                        {featuredImage && (
                            <div style={{ position: 'relative', width: '100%', height: '150px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={featuredImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    {/* SEO */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0F172A' }}>Référencement (SEO)</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: '#64748B' }}>Meta Title ({metaTitle.length}/60)</label>
                            <input
                                type="text"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: '#64748B' }}>Meta Description ({metaDesc.length}/160)</label>
                            <textarea
                                value={metaDesc}
                                onChange={(e) => setMetaDesc(e.target.value)}
                                rows={4}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
