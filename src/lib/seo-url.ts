export const CANONICAL_DOMAIN = 'https://www.airgenergie.fr';

export async function getSeoDomain(): Promise<string> {
    return CANONICAL_DOMAIN;
}

export async function getSeoAlternates(path: string) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const normalizedPath = cleanPath === '/' ? '' : cleanPath;

    // Le domaine canonique est TOUJOURS https://www.airgenergie.fr pour consolider 100 % de l'autorité SEO
    return {
        canonical: `${CANONICAL_DOMAIN}${normalizedPath}`,
        languages: {
            'fr-FR': `${CANONICAL_DOMAIN}${normalizedPath}`,
            'fr': `${CANONICAL_DOMAIN}${normalizedPath}`,
            'x-default': `${CANONICAL_DOMAIN}${normalizedPath}`,
        },
    };
}

