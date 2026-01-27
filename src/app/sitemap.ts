import { MetadataRoute } from 'next';
import { citiesList } from '@/data/cities';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://airgenergie.fr';

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
        '/mentions-legales', // Assuming it exists or will exist
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // City pages (Dynamic)
    const cityRoutes = citiesList.map((city) => ({
        url: `${baseUrl}/ville/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority for local SEO landing pages
    }));

    return [...routes, ...cityRoutes];
}
