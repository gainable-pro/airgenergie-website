export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            leads: {
                Row: {
                    id: number
                    created_at: string
                    full_name: string | null
                    email: string | null
                    phone: string | null
                    city: string | null
                    service_type: string | null
                    message: string | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    city?: string | null
                    service_type?: string | null
                    message?: string | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    city?: string | null
                    service_type?: string | null
                    message?: string | null
                    status?: string | null
                }
            }
            articles: {
                Row: {
                    id: number
                    created_at: string
                    title: string
                    slug: string
                    content: string | null
                    meta_title: string | null
                    meta_desc: string | null
                    city: string | null
                    category: string | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    title: string
                    slug: string
                    content?: string | null
                    meta_title?: string | null
                    meta_desc?: string | null
                    city?: string | null
                    category?: string | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    title?: string
                    slug?: string
                    content?: string | null
                    meta_title?: string | null
                    meta_desc?: string | null
                    city?: string | null
                    category?: string | null
                    status?: string | null
                }
            },
            blog_categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    meta_title: string | null
                    meta_description: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    created_at?: string
                    updated_at?: string
                }
            },
            blog: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string
                    meta_title: string
                    meta_description: string
                    focus_keyword: string | null
                    featured_image: string | null
                    featured_image_alt: string | null
                    category_id: string | null
                    author_id: string | null
                    status: 'draft' | 'published'
                    published_at: string | null
                    created_at: string
                    updated_at: string
                    views_count: number
                    reading_time: number | null
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content: string
                    meta_title: string
                    meta_description: string
                    focus_keyword?: string | null
                    featured_image?: string | null
                    featured_image_alt?: string | null
                    category_id?: string | null
                    author_id?: string | null
                    status?: 'draft' | 'published'
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                    views_count?: number
                    reading_time?: number | null
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string
                    meta_title?: string
                    meta_description?: string
                    focus_keyword?: string | null
                    featured_image?: string | null
                    featured_image_alt?: string | null
                    category_id?: string | null
                    author_id?: string | null
                    status?: 'draft' | 'published'
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                    views_count?: number
                    reading_time?: number | null
                }
            },
            blog_tags: {
                Row: {
                    id: string
                    blog_id: string | null
                    tag: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    blog_id?: string | null
                    tag: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    blog_id?: string | null
                    tag?: string
                    created_at?: string
                }
            }
        }
    }
}
