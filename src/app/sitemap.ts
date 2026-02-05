import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '@/data/cities';

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

    // City pages (Dynamic)
    const citySlugs = getAllCitySlugs();
    const cityRoutes = citySlugs.map((slug) => ({
        url: `${baseUrl}/ville/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...cityRoutes];
}
