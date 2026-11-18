import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types/supabase';
import { STATIC_BLOG_GUIDES } from '@/data/blog-guides';

// Type definition for a Blog Post with its Category
export type BlogPostWithCategory = Database['public']['Tables']['blog']['Row'] & {
    blog_categories: { name: string; slug: string } | null;
};

/**
 * Merge Supabase posts with static GEO pillar guides (Supabase wins on matching slug).
 */
function mergePosts(dbPosts: BlogPostWithCategory[]): BlogPostWithCategory[] {
    const bySlug = new Map<string, BlogPostWithCategory>();
    for (const guide of STATIC_BLOG_GUIDES) {
        bySlug.set(guide.slug, guide);
    }
    for (const post of dbPosts) {
        bySlug.set(post.slug, post);
    }
    return Array.from(bySlug.values()).sort((a, b) => {
        const da = new Date(a.published_at || a.created_at).getTime();
        const db = new Date(b.published_at || b.created_at).getTime();
        return db - da;
    });
}

/**
 * Fetch all published posts (Supabase + static GEO pillar guides), ordered by most recent.
 * @param limit Optional limit
 */
export async function getPublishedPosts(limit?: number) {
    let dbPosts: BlogPostWithCategory[] = [];
    try {
        const { data, error } = await supabase
            .from('blog')
            .select(`
                *,
                blog_categories (
                    name,
                    slug
                )
            `)
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (!error && data) {
            dbPosts = (data as any) as BlogPostWithCategory[];
        }
    } catch {
        dbPosts = [];
    }

    const merged = mergePosts(dbPosts);
    return limit ? merged.slice(0, limit) : merged;
}

/**
 * Fetch all published posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<{ category: { id: string; name: string } | null; posts: BlogPostWithCategory[] }> {
    let category: { id: string; name: string } | null = null;
    let dbPosts: BlogPostWithCategory[] = [];

    try {
        const { data: catData } = await supabase
            .from('blog_categories')
            .select('id, name')
            .eq('slug', categorySlug)
            .single();

        if (catData) {
            category = catData as { id: string; name: string };
            const { data: posts, error } = await supabase
                .from('blog')
                .select(`
                    *,
                    blog_categories (
                        name,
                        slug
                    )
                `)
                .eq('category_id', category.id)
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (!error && posts) {
                dbPosts = (posts as any) as BlogPostWithCategory[];
            }
        }
    } catch {
        // Fallback to static guides below
    }

    const staticMatches = STATIC_BLOG_GUIDES.filter(
        (g) => g.blog_categories?.slug === categorySlug
    );

    if (!category && staticMatches.length > 0 && staticMatches[0].blog_categories) {
        category = {
            id: staticMatches[0].category_id || categorySlug,
            name: staticMatches[0].blog_categories.name,
        };
    }

    if (!category) return { category: null, posts: [] };

    const bySlug = new Map<string, BlogPostWithCategory>();
    for (const g of staticMatches) bySlug.set(g.slug, g);
    for (const p of dbPosts) bySlug.set(p.slug, p);

    const merged = Array.from(bySlug.values()).sort((a, b) => {
        const da = new Date(a.published_at || a.created_at).getTime();
        const db = new Date(b.published_at || b.created_at).getTime();
        return db - da;
    });

    return { category, posts: merged };
}

/**
 * Fetch a single published post by its slug.
 */
export async function getPostBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('blog')
            .select(`
                *,
                blog_categories (
                    name,
                    slug
                )
            `)
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (!error && data) {
            return (data as any) as BlogPostWithCategory;
        }
    } catch {
        // Fallback to static GEO guide
    }

    return STATIC_BLOG_GUIDES.find((g) => g.slug === slug) || null;
}

/**
 * Fetch all categories with their post counts (optional)
 * For now, just all categories.
 */
export async function getCategories() {
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data;
}
