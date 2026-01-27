import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types/supabase';

// Type definition for a Blog Post with its Category
export type BlogPostWithCategory = Database['public']['Tables']['blog']['Row'] & {
    blog_categories: { name: string; slug: string } | null;
};

/**
 * Fetch all published posts, ordered by most recent.
 * @param limit Optional limit
 */
export async function getPublishedPosts(limit?: number) {
    let query = supabase
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

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching published posts:', error);
        return [];
    }

    return (data as any) as BlogPostWithCategory[];
}

/**
 * Fetch all published posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<{ category: { id: string; name: string } | null; posts: BlogPostWithCategory[] }> {
    // First get the category ID
    const { data: category } = await supabase
        .from('blog_categories')
        .select('id, name')
        .eq('slug', categorySlug)
        .single();

    if (!category) return { category: null, posts: [] };

    // Then fetch posts
    const { data: posts, error } = await supabase
        .from('blog')
        .select(`
            *,
            blog_categories (
                name,
                slug
            )
        `)
        .eq('category_id', (category as any).id)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching category posts:', error);
        return { category, posts: [] };
    }

    return { category, posts: (posts as any) as BlogPostWithCategory[] };
}

/**
 * Fetch a single published post by its slug.
 */
export async function getPostBySlug(slug: string) {
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

    if (error) {
        // console.error('Error fetching post by slug:', error);
        return null;
    }

    return (data as any) as BlogPostWithCategory;
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
