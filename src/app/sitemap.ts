import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '@/data/cities';
import { CITIES_SLUGS, SERVICES_SLUGS } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.airgenergie.com';

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
