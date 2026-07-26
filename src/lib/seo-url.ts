import { headers } from 'next/headers';

export async function getSeoDomain(): Promise<string> {
    const headersList = await headers();
    
    // Support local testing via middleware domain override header
    const domainOverride = headersList.get('x-domain-override');
    if (domainOverride === 'fr') {
        return 'https://www.airgenergie.fr';
    } else if (domainOverride === 'com') {
        return 'https://www.airgenergie.com';
    }

    const host = headersList.get('host') || 'www.airgenergie.com';
    const hostLower = host.toLowerCase();
    
    // Si l'hôte correspond au domaine .fr
    if (hostLower.includes('airgenergie.fr') || hostLower.includes('rgenergie.fr')) {
        return 'https://www.airgenergie.fr';
    }
    return 'https://www.airgenergie.com';
}

export async function getSeoAlternates(path: string) {
    const domain = await getSeoDomain();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const normalizedPath = cleanPath === '/' ? '' : cleanPath;
    
    return {
        canonical: `${domain}${normalizedPath}`,
        languages: {
            'fr-FR': `https://www.airgenergie.fr${normalizedPath}`,
            'fr': `https://www.airgenergie.com${normalizedPath}`,
            'x-default': `https://www.airgenergie.com${normalizedPath}`,
        }
    };
}
