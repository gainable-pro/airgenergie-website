'use client';

import Link from 'next/link';
import type { BlogPostWithCategory } from '@/lib/blog-public';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    post: BlogPostWithCategory;
}

export default function BlogCard({ post }: BlogCardProps) {
    // Default image if none provided
    const imageUrl = post.featured_image || '/images/hero-maintenance.png';

    // Format date
    const date = new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <article style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #F1F5F9'
        }} className="blog-card">

            {/* Image */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Link href={`/blog/${post.slug}`}>
                    <img
                        src={imageUrl}
                        alt={post.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        className="blog-card-img"
                    />
                </Link>
                {post.blog_categories && (
                    <span style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--primary-blue, #0091DA)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        {post.blog_categories.name}
                    </span>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', color: '#64748B', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        <span>{date}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4',
                        color: '#0F172A'
                    }} className="blog-card-title">
                        {post.title}
                    </h2>
                </Link>

                {/* Excerpt */}
                <p style={{
                    color: '#64748B',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    flex: 1
                }}>
                    {post.excerpt || post.content?.substring(0, 120) + '...'}
                </p>

                {/* Link */}
                <Link href={`/blog/${post.slug}`} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--primary-blue, #0091DA)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    marginTop: 'auto'
                }} className="read-more">
                    Lire l'article <ArrowRight size={16} />
                </Link>
            </div>

            <style jsx global>{`
                .blog-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .blog-card:hover .blog-card-img {
                    transform: scale(1.05);
                }
                .blog-card-title:hover {
                    color: var(--primary-blue, #0091DA) !important;
                }
            `}</style>
        </article>
    );
}
