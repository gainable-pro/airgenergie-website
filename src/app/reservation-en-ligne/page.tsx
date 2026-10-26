import type { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';
import ReservationClient from './ReservationClient';

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getSeoDomain();
  const alternates = await getSeoAlternates('/reservation-en-ligne');
  return {
    title: "Entretien Climatisation dès 156€ TTC | Réservation en Ligne 48h | Air G Énergie",
    description: "Réservez votre entretien de climatisation dès 156€ TTC dans les Bouches-du-Rhône. Forfaits splits, gainables, PAC et VRV. Créneau en direct sous 48h, artisan certifié RGE et attestation Cerfa officielle.",
    alternates,
    openGraph: {
      title: "Entretien Climatisation dès 156€ TTC | Réservation en Ligne 48h | Air G Énergie",
      description: "Réservez votre entretien de climatisation ou PAC dès 156€ TTC dans les Bouches-du-Rhône (Miramas, Salon, Aix, Marseille, Arles, Martigues). Créneau en direct sous 48h avec attestation Cerfa.",
      url: alternates.canonical,
      siteName: "Air G Énergie",
      images: [{ url: "/images/hero-technician-ac.png", width: 1200, height: 630, alt: "Entretien et réservation climatisation Air G Énergie" }],
      locale: "fr_FR",
      type: "website",
    },
    other: {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
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
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quel est le prix de l'entretien d'une climatisation ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Chez Air G Énergie, l'entretien préventif d'une climatisation mono-split démarre à 156 € TTC. Pour un bi-split (2 unités), le tarif est de 270 € TTC, et 220 € TTC pour un système gainable. Une attestation légale Cerfa est remise à la fin de l'intervention."
                }
              },
              {
                "@type": "Question",
                "name": "L'entretien d'une climatisation ou pompe à chaleur est-il obligatoire ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui. Conformément au décret n° 2020-912 (Code de l'environnement, art. R.224-44-1 à R.224-44-3), l'entretien des systèmes thermodynamiques de 4 kW à 70 kW est obligatoire au moins tous les deux ans. L'attestation Cerfa est requise par vos assurances en cas de sinistre."
                }
              },
              {
                "@type": "Question",
                "name": "Comment fonctionne la réservation en direct sous 48h ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vous sélectionnez votre équipement (mono, multi, gainable, PAC, VRV), choisissez la date et l'horaire de votre choix directement dans l'agenda en temps réel, et réglez en ligne ou sur place. Un artisan frigoriste certifié intervient sous 48h dans toutes les Bouches-du-Rhône."
                }
              }
            ]
          }
        ]
      })
    }
  };
}

export default function ReservationEnLignePage() {
  return <ReservationClient />;
}
