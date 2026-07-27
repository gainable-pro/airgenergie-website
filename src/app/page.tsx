import type { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';
import HomePageCom from '@/components/templates/com/HomePageCom';
import HomePageFr from '@/components/templates/fr/HomePageFr';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/');

  return {
    title: "Climatisation & PAC Bouches-du-Rhône (70 km) | Air G Énergie",
    description: "Installation, entretien et dépannage climatisation réversible & pompe à chaleur sur plus de 70 km (Miramas, Salon, Aix, Marseille, Arles, Martigues, Istres). Devis gratuit.",
    alternates,
    openGraph: {
      title: "Climatisation & PAC Bouches-du-Rhône (70 km) | Air G Énergie",
      description: "Installation, entretien et dépannage climatisation réversible & pompe à chaleur sur plus de 70 km (Miramas, Salon, Aix, Marseille, Arles, Martigues, Istres). Devis gratuit.",
      url: alternates.canonical,
      siteName: "AIR G Energie",
      images: [
        {
          url: "/images/hero-technician-ac.png",
          width: 1200,
          height: 630,
          alt: "AIR G Energie - Climatisation Bouches-du-Rhône",
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Climatisation & PAC Bouches-du-Rhône (70 km) | Air G Énergie",
      description: "Installation, entretien et dépannage climatisation réversible & pompe à chaleur sur plus de 70 km (Miramas, Salon, Aix, Marseille, Arles, Martigues, Istres). Devis gratuit.",
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
