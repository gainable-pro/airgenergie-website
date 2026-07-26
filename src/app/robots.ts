import { MetadataRoute } from 'next';
import { getSeoDomain } from '@/lib/seo-url';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const baseUrl = await getSeoDomain();

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    // Anciennes URLs Wix parasites — à ne pas crawler
                    '/member-profiles',
                    '/member-profiles/',
                    '/booking',
                    '/booking/',
                    '/_api/',
                    '/_partials/',
                    '/wix-',
                    // Paramètres de debug local
                    '/*?domain=',
                ],
            },
            {
                // Bloquer les bots inutiles qui consomment du crawl budget
                userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
