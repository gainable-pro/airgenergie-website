import type { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';
import HomePageCom from '@/components/templates/com/HomePageCom';
import HomePageFr from '@/components/templates/fr/HomePageFr';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/');

  return {
    title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
    description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h. Artisan local labellisé Garantie 2025 et Expert Gainable.fr.",
    alternates,
    openGraph: {
      title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
      description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h. Artisan local labellisé Garantie 2025 et Expert Gainable.fr.",
      url: alternates.canonical,
      siteName: "AIR G Energie",
      images: [
        {
          url: "/images/hero-technician-ac.png",
          width: 1200,
          height: 630,
          alt: "AIR G Energie - Installation Climatisation Miramas",
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
      description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h.",
      images: ["/images/hero-technician-ac.png"],
    },
  };
}

export default async function HomePage() {
  const domain = await getSeoDomain();
  
  if (domain.includes('airgenergie.fr') || domain.includes('rgenergie.fr')) {
    return <HomePageFr />;
  }
  
  return <HomePageCom />;
}
