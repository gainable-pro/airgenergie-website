import { getPostBySlug } from '@/lib/blog-public';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';
import { getSeoAlternates } from '@/lib/seo-url';

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return { title: 'Article non trouvé | Air G Énergie' };
    }

    const alternates = await getSeoAlternates(`/blog/${params.slug}`);

    return {
        title: post.meta_title || post.title + ' | Blog Air G Énergie',
        description: post.meta_description || post.excerpt || `Lisez notre article sur ${post.title}`,
        alternates,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || '',
            images: post.featured_image ? [post.featured_image] : [],
            url: alternates.canonical,
        }
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const date = new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Custom CSS for article content
    const articleContentStyles = `
        .article-content { color: #334155; line-height: 1.8; font-size: 1.1rem; }
        .article-content h2 { color: #0F172A; font-size: 1.8rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; }
        .article-content h3 { color: #0F172A; font-size: 1.4rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.8rem; }
        .article-content p { margin-bottom: 1.5rem; }
        .article-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .article-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .article-content li { margin-bottom: 0.5rem; }
        .article-content a { color: #0091DA; text-decoration: underline; }
        .article-content img { max-width: 100%; height: auto; border-radius: 0.75rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .article-content blockquote { border-left: 4px solid #0091DA; padding-left: 1rem; margin-left: 0; font-style: italic; color: #475569; background: #F8FAFC; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
        .article-content iframe { width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; margin: 2rem 0; }
    `;

    return (
        <article className="article-page">
            <style dangerouslySetInnerHTML={{ __html: articleContentStyles }} />

            {/* Header / Hero */}
            <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '4rem 0 3rem' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', marginBottom: '2rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                        <ArrowLeft size={16} /> Retour au blog
                    </Link>

                    {post.blog_categories && (
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{
                                background: '#E0F2FE',
                                color: '#0091DA',
                                padding: '0.4rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                display: 'inline-block'
                            }}>
                                {post.blog_categories.name}
                            </span>
                        </div>
                    )}

                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem' }}>
                        {post.title}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#64748B', fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} />
                            <span>{date}</span>
                        </div>
                        {post.reading_time && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={18} />
                                <span>{post.reading_time} min de lecture</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container" style={{ maxWidth: '900px', margin: '-2rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
                {post.featured_image && (
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '500px',
                            objectFit: 'cover',
                            borderRadius: '1rem',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem 5rem' }}>
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
            </div>

            {/* CTA Footer */}
            <div style={{ background: '#F0F9FF', padding: '4rem 0', textAlign: 'center', borderTop: '1px solid #BAE6FD' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '1rem' }}>Besoin d'un conseil personnalisé ?</h3>
                    <p style={{ fontSize: '1.1rem', color: '#0369a1', marginBottom: '2rem' }}>
                        Nos experts sont à votre disposition pour répondre à toutes vos questions sur la climatisation et les énergies renouvelables.
                    </p>
                    <Link href="/contact" className="btn btn-primary" style={{
                        background: '#0284c7',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '0.5rem',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 4px 6px rgba(2, 132, 199, 0.3)'
                    }}>
                        Contactez-nous
                    </Link>
                </div>
            </div>
        </article>
    );
}
