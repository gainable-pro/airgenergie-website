import type { Metadata } from 'next';
import { getSeoAlternates, CANONICAL_DOMAIN } from '@/lib/seo-url';
import EntretienPageFr from '@/components/templates/fr/EntretienPageFr';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/entretien');
  return {
    title: "Entretien Clim & PAC Obligatoire (13) | Guide, Protocole & Contrats",
    description: "Tout savoir sur l'entretien obligatoire de climatisation et PAC (Décret n° 2020-912, Cerfa, protocole en 10 points, contrats pros VRV) dans les Bouches-du-Rhône.",
    alternates,
    openGraph: {
      title: "Entretien Climatisation & PAC Obligatoire (13) | Guide & Contrats | Air G Énergie",
      description: "Obligations légales Décret 2020-912, protocole technique complet, différence préventif vs curatif vapeur et contrats annuels pros dans les Bouches-du-Rhône.",
      url: alternates.canonical,
      siteName: "Air G Énergie",
      images: [{ url: "/images/hero-maintenance.png", width: 1200, height: 630, alt: "Guide entretien climatisation et pompe à chaleur Air G Énergie" }],
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default function EntretienPage() {
  const domain = CANONICAL_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${domain}/entretien/#webpage`,
        "url": `${domain}/entretien`,
        "name": "Entretien Climatisation & Pompe à Chaleur Obligatoire dans les Bouches-du-Rhône — Guide, Protocole & Contrats",
        "inLanguage": "fr-FR",
        "isPartOf": { "@id": `${domain}/#organization` },
        "about": { "@id": `${domain}/reservation-en-ligne/#service` },
        "dateModified": "2026-11-18"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": domain },
          { "@type": "ListItem", "position": 2, "name": "Guide Entretien & Contrats", "item": `${domain}/entretien` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Que dit le décret n° 2020-912 sur l'entretien obligatoire d'une climatisation ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le décret n° 2020-912 du 28 juillet 2020 impose un entretien périodique au moins tous les 2 ans pour tout système thermodynamique (climatisation réversible ou pompe à chaleur) d'une puissance nominale comprise entre 4 kW et 70 kW. L'entretien doit être réalisé par un professionnel titulaire de l'attestation de capacité fluides frigorigènes, qui remet une attestation officielle dans les 15 jours."
            }
          },
          {
            "@type": "Question",
            "name": "Qui doit payer l'entretien d'une climatisation : le locataire ou le propriétaire ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sauf clause contraire du bail, l'entretien courant et la visite périodique obligatoire d'une climatisation ou pompe à chaleur relèvent des charges locatives (à la charge de l'occupant). Le propriétaire conserve à sa charge les réparations lourdes et le remplacement de l'équipement."
            }
          },
          {
            "@type": "Question",
            "name": "À quelle fréquence entretenir sa climatisation en Provence (Bouches-du-Rhône) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bien que la loi impose un minimum d'une visite tous les 2 ans (entre 4 et 70 kW), une visite annuelle avant l'été ou avant l'hiver est fortement recommandée dans les Bouches-du-Rhône. Le Mistral, les pollens, les poussières et l'usage intensif réversible encrassent plus vite les échangeurs et réduisent le rendement jusqu'à 30 %."
            }
          },
          {
            "@type": "Question",
            "name": "Quelles sont les obligations d'entretien pour les commerces, hôtels et bureaux (VRV/DRV) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Au-delà du décret 2020-912, les installations contenant plus de 5 tonnes équivalent CO2 de fluide frigorigène (souvent à partir de 2 kg de R410A ou ~7,4 kg de R32) sont soumises à un contrôle d'étanchéité annuel obligatoire consigné sur Cerfa F-Gaz (n° 15497). Air G Énergie propose des contrats dédiés avec remise -20 % pour les systèmes VRV/DRV."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EntretienPageFr />
    </>
  );
}
