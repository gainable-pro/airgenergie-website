import { getPostsByCategory } from '@/lib/blog-public';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

// Generate Metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await getPostsByCategory(params.slug);

    if (!category) {
        return { title: 'Catégorie non trouvée | Air G Énergie' };
    }

    return {
        title: `Blog ${category.name} | Conseils Climatisation`,
        description: `Découvrez tous nos articles et guides sur le thème : ${category.name}. Air G Énergie, votre expert en Provence.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category, posts } = await getPostsByCategory(params.slug);

    if (!category) {
        notFound();
    }

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                color: 'white',
                padding: '4rem 0 3rem',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', marginBottom: '1.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Tout le blog
                    </Link>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontWeight: '800',
                        lineHeight: '1.2'
                    }}>
                        Catégorie : <span style={{ color: '#0091DA' }}>{category.name}</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, color: '#E2E8F0' }}>
                        {posts.length} article{posts.length > 1 ? 's' : ''} disponible{posts.length > 1 ? 's' : ''}
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
                        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                            <p style={{ color: '#64748B' }}>Aucun article dans cette catégorie pour le moment.</p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
