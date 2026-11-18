import { getPublishedPosts } from '@/lib/blog-public';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';
import { getSeoAlternates } from '@/lib/seo-url';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
    const alternates = await getSeoAlternates('/blog');
    return {
        title: 'Blog Climatisation, PAC & Entretien (13) | Air G Énergie',
        description: "Guides pratiques, tarifs d'entretien, réglementation Décret 2020-912 et aides financières climatisation et pompe à chaleur dans les Bouches-du-Rhône.",
        alternates,
    };
}

export default async function BlogIndex() {
    const posts = await getPublishedPosts();

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                color: 'white',
                padding: '5rem 0 4rem',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        marginBottom: '1.5rem',
                        fontWeight: '800',
                        lineHeight: '1.15'
                    }}>
                        Blog &amp; Guides <span style={{ color: '#38BDF8' }}>Climatisation, PAC &amp; Entretien (13)</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        lineHeight: '1.6',
                        color: '#E2E8F0'
                    }}>
                        Retrouvez nos conseils d'experts pour bien choisir, entretenir et optimiser votre climatisation ou pompe à chaleur en Provence.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section style={{ padding: '4rem 0', background: '#F8FAFC' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>

                    {posts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <h2 style={{ color: '#0F172A', marginBottom: '1rem' }}>Le blog est en cours de remplissage</h2>
                            <p style={{ color: '#64748B' }}>Revenez très vite pour découvrir nos premiers articles !</p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
