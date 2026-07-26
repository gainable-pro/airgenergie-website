import { Metadata } from 'next';
import { getSeoAlternates } from '@/lib/seo-url';

export async function generateMetadata(): Promise<Metadata> {
    const alternates = await getSeoAlternates('/contact');
    return {
        title: "Contact & Devis Gratuit | Air G Énergie",
        description: "Contactez Air G Énergie pour vos projets de climatisation, gainable et pompe à chaleur. Devis gratuit sous 24h. Intervention rapide.",
        alternates,
    };
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
