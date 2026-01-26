import Script from 'next/script';

interface SchemaOrgProps {
    type: 'Organization' | 'LocalBusiness' | 'FAQPage';
    data: any;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    return (
        <Script
            id={`schema-${type.toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
