import { headers } from 'next/headers';

export async function getSeoDomain(): Promise<string> {
    const headersList = await headers();
    
    // Support local testing via middleware domain override header
    const domainOverride = headersList.get('x-domain-override');
    if (domainOverride === 'com') {
        return 'https://www.airgenergie.com';
    } else if (domainOverride === 'fr') {
        return 'https://www.airgenergie.fr';
    }

    const host = headersList.get('host') || 'www.airgenergie.fr';
    const hostLower = host.toLowerCase();
    
    // Si l'hôte correspond spécifiquement au domaine .com (en attendant la redirection DNS complète)
    if (hostLower.includes('airgenergie.com')) {
        return 'https://www.airgenergie.com';
    }
    return 'https://www.airgenergie.fr';
}

export async function getSeoAlternates(path: string) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const normalizedPath = cleanPath === '/' ? '' : cleanPath;
    
    // Le domaine canonique est TOUJOURS .fr pour consolider toute l'autorité SEO sur airgenergie.fr
    return {
        canonical: `https://www.airgenergie.fr${normalizedPath}`,
        languages: {
            'fr-FR': `https://www.airgenergie.fr${normalizedPath}`,
            'fr': `https://www.airgenergie.fr${normalizedPath}`,
            'x-default': `https://www.airgenergie.fr${normalizedPath}`,
        }
    };
}

