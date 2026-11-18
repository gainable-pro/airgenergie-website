import { MetadataRoute } from 'next';
import { CITIES_SLUGS, SERVICES_SLUGS } from '@/lib/seo-data';
import { CANONICAL_DOMAIN } from '@/lib/seo-url';
import { getPublishedPosts } from '@/lib/blog-public';

export const revalidate = 3600;

const LAST_CONTENT_UPDATE = new Date('2026-11-18T00:00:00Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = CANONICAL_DOMAIN;

    // Static pillar pages
    const routes: MetadataRoute.Sitemap = [
        { route: '', freq: 'weekly' as const, priority: 1.0 },
        { route: '/reservation-en-ligne', freq: 'weekly' as const, priority: 0.95 },
        { route: '/entretien', freq: 'monthly' as const, priority: 0.85 },
        { route: '/climatisation', freq: 'monthly' as const, priority: 0.9 },
        { route: '/gainable', freq: 'monthly' as const, priority: 0.9 },
        { route: '/pompe-a-chaleur', freq: 'monthly' as const, priority: 0.9 },
        { route: '/drv-cta', freq: 'monthly' as const, priority: 0.8 },
        { route: '/zones-intervention', freq: 'monthly' as const, priority: 0.8 },
        { route: '/blog', freq: 'weekly' as const, priority: 0.8 },
        { route: '/contact', freq: 'monthly' as const, priority: 0.8 },
    ].map(({ route, freq, priority }) => ({
        url: `${baseUrl}${route}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: freq,
        priority,
    }));

    // Dedicated booking / maintenance service pages
    const serviceDetailRoutes: MetadataRoute.Sitemap = [
        'preventive', 'curative', 'double-split', 'tri-split', 'gainable',
        'console', 'cassette', 'vrv', 'thermodynamique', 'pac-air-eau',
        'reprogrammation-thermostat', 'entretien-vmc', 'diagnostic', 'devis',
    ].map((service) => ({
        url: `${baseUrl}/reservation-en-ligne/${service}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Published Blog Articles from Supabase
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await getPublishedPosts();
        blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.published_at || post.created_at),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));
    } catch {
        blogRoutes = [];
    }

    // SEO Matrix City Hubs
    const hubRoutes: MetadataRoute.Sitemap = CITIES_SLUGS.map((ville) => ({
        url: `${baseUrl}/${ville}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }));

    // SEO Matrix City × Service Combinations
    const matrixRoutes: MetadataRoute.Sitemap = CITIES_SLUGS.flatMap((ville) =>
        SERVICES_SLUGS.map((service) => ({
            url: `${baseUrl}/${ville}/${service}`,
            lastModified: LAST_CONTENT_UPDATE,
            changeFrequency: 'monthly' as const,
            priority: service === 'entretien' ? 0.8 : 0.7,
        }))
    );

    return [...routes, ...serviceDetailRoutes, ...blogRoutes, ...hubRoutes, ...matrixRoutes];
}
