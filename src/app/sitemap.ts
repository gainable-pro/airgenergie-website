import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '@/data/cities';
import { CITIES_SLUGS, SERVICES_SLUGS } from '@/lib/seo-data';
import { getSeoDomain } from '@/lib/seo-url';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = await getSeoDomain();

    // Static pages
    const routes = [
        '',
        '/contact',
        '/climatisation',
        '/gainable',
        '/pompe-a-chaleur',
        '/entretien',
        '/zones-intervention',
        '/blog',
        '/drv-cta',
        '/reservation-en-ligne',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // New SEO Matrix Hubs
    const hubRoutes = CITIES_SLUGS.map((ville) => ({
        url: `${baseUrl}/${ville}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // New SEO Matrix Combinations
    const matrixRoutes = CITIES_SLUGS.flatMap(ville => {
        return SERVICES_SLUGS.map(service => ({
            url: `${baseUrl}/${ville}/${service}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    });

    return [...routes, ...hubRoutes, ...matrixRoutes];
}
