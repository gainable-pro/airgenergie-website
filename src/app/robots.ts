import { MetadataRoute } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-url';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: [
                    'Googlebot',
                    'Bingbot',
                    'Applebot',
                    'OAI-SearchBot',
                    'PerplexityBot',
                    'Claude-SearchBot',
                ],
                allow: '/',
                disallow: ['/admin/', '/api/', '/_api/', '/_partials/', '/*?domain='],
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/_api/',
                    '/_partials/',
                    '/wix-',
                    '/*?domain=',
                ],
            },
            {
                // Bloquer les crawlers SEO tiers consommant du crawl budget
                userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
                disallow: '/',
            },
        ],
        sitemap: `${CANONICAL_DOMAIN}/sitemap.xml`,
    };
}
