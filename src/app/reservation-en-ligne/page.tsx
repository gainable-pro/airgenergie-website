import type { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';
import ReservationClient from './ReservationClient';

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getSeoDomain();
  const alternates = await getSeoAlternates('/reservation-en-ligne');
  return {
    title: "Réservation en Ligne | Climatisation & PAC Bouches-du-Rhône | Air G Énergie",
    description: "Réservez votre entretien de climatisation ou étude de pompe à chaleur en ligne dans les Bouches-du-Rhône. Planification en temps réel, tarifs transparents TTC et paiement sécurisé Stripe.",
    alternates,
    openGraph: {
      title: "Réservation en Ligne | Climatisation & PAC Bouches-du-Rhône | Air G Énergie",
      description: "Réservez votre entretien de climatisation ou étude de pompe à chaleur en ligne dans les Bouches-du-Rhône (Miramas, Salon, Aix, Marseille, Arles, Martigues).",
      url: alternates.canonical,
      siteName: "Air G Énergie",
      images: [{ url: "/images/hero-technician-ac.png", width: 1200, height: 630, alt: "Réservation climatisation Air G Énergie" }],
      locale: "fr_FR",
      type: "website",
    },
    other: {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["HVACBusiness", "LocalBusiness"],
        "@id": `${domain}/reservation-en-ligne/#service`,
        "name": "Air G Énergie — Réservation en ligne",
        "url": `${domain}/reservation-en-ligne`,
        "telephone": "+33-4-13-41-49-01",
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Miramas",
          "addressLocality": "Miramas",
          "postalCode": "13140",
          "addressRegion": "Bouches-du-Rhône",
          "addressCountry": "FR"
        },
        "areaServed": [
          "Bouches-du-Rhône", "Miramas", "Salon-de-Provence", "Aix-en-Provence",
          "Marseille", "Istres", "Martigues", "Arles", "Carry-le-Rouet", "Sausset-les-Pins",
          "La Ciotat", "Mouriès", "Maussane-les-Alpilles", "Vitrolles", "Marignane"
        ],
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${domain}/reservation-en-ligne`,
            "inLanguage": "fr",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Reservation",
            "name": "Réservation Entretien Climatisation & PAC"
          }
        }
      })
    }
  };
}

export default function ReservationEnLignePage() {
  return <ReservationClient />;
}
