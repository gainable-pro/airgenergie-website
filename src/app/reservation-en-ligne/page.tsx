import type { Metadata } from 'next';
import { getSeoAlternates, CANONICAL_DOMAIN } from '@/lib/seo-url';
import ReservationClient from './ReservationClient';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/reservation-en-ligne');
  return {
    title: "Entretien Clim & PAC dès 156€ TTC (13) | Réservation 48h",
    description: "Réservez votre entretien climatisation, gainable, PAC ou VMC en ligne dans les Bouches-du-Rhône dès 156€ TTC. Créneau 48h, artisan RGE, attestation Cerfa incluse.",
    alternates,
    openGraph: {
      title: "Entretien Clim & PAC dès 156€ TTC (13) | Réservation 48h | Air G Énergie",
      description: "Réservez votre entretien de climatisation ou PAC dès 156€ TTC dans les Bouches-du-Rhône (Miramas, Salon, Aix, Marseille, Arles, Martigues, Istres). Créneau sous 48h avec attestation Cerfa.",
      url: alternates.canonical,
      siteName: "Air G Énergie",
      images: [{ url: "/images/hero-technician-ac.png", width: 1200, height: 630, alt: "Réservation entretien climatisation et PAC Air G Énergie Bouches-du-Rhône" }],
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default function ReservationEnLignePage() {
  const domain = CANONICAL_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${domain}/reservation-en-ligne/#service`,
        "name": "Réservation en ligne — Entretien Climatisation, PAC & VMC (Bouches-du-Rhône)",
        "serviceType": "Entretien et maintenance CVC",
        "url": `${domain}/reservation-en-ligne`,
        "provider": { "@id": `${domain}/#organization` },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Bouches-du-Rhône" },
          { "@type": "City", "name": "Miramas" },
          { "@type": "City", "name": "Salon-de-Provence" },
          { "@type": "City", "name": "Aix-en-Provence" },
          { "@type": "City", "name": "Marseille" },
          { "@type": "City", "name": "Istres" },
          { "@type": "City", "name": "Martigues" },
          { "@type": "City", "name": "Arles" },
          { "@type": "City", "name": "Vitrolles" },
          { "@type": "City", "name": "Marignane" },
          { "@type": "City", "name": "Aubagne" },
          { "@type": "City", "name": "Carry-le-Rouet" },
          { "@type": "City", "name": "Sausset-les-Pins" },
          { "@type": "City", "name": "La Ciotat" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Forfaits Entretien Climatisation, Pompe à Chaleur & VMC TTC",
          "itemListElement": [
            { "@type": "Offer", "name": "Entretien climatisation préventif (Mono-split)", "price": "156", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/preventive`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation Curatif vapeur 100°C", "price": "192", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/curative`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation Bi-split (2 unités)", "price": "270", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/double-split`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation Tri-split (3 unités)", "price": "380", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/tri-split`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation gainable & Airzone", "price": "220", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/gainable`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation console basse", "price": "165", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/console`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien climatisation cassette 4 voies", "price": "180", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/cassette`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien Pompe à Chaleur Air/Eau", "price": "270", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/pac-air-eau`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien ballon thermodynamique", "price": "174", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/thermodynamique`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Entretien annuel VMC simple & double flux", "price": "230", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/entretien-vmc`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Re-programmation thermostat gainable & Airzone", "price": "200", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/reprogrammation-thermostat`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Diagnostic & Rapport de panne officiel assurance", "price": "100", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/diagnostic`, "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Étude thermique & Devis d'installation", "price": "0", "priceCurrency": "EUR", "url": `${domain}/reservation-en-ligne/devis`, "availability": "https://schema.org/InStock" },
            {
              "@type": "Offer",
              "name": "Entretien Système VRV / DRV (Tertiaire & ERP — Remise -20 %)",
              "priceCurrency": "EUR",
              "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "description": "Tarification à la composition sur mesure avec remise automatique de 20 % sur chaque unité" },
              "url": `${domain}/reservation-en-ligne/vrv`,
              "availability": "https://schema.org/InStock"
            }
          ]
        },
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
            "name": "Réservation Entretien Climatisation, PAC & VMC"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": domain },
          { "@type": "ListItem", "position": 2, "name": "Réservation entretien en ligne", "item": `${domain}/reservation-en-ligne` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quel est le prix de l'entretien d'une climatisation dans les Bouches-du-Rhône ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Chez Air G Énergie, l'entretien préventif d'une climatisation mono-split coûte 156 € TTC (192 € TTC en curatif vapeur 100°C). Le forfait bi-split est à 270 € TTC, le tri-split à 380 € TTC, le gainable à 220 € TTC, la console à 165 € TTC, la cassette à 180 € TTC, la pompe à chaleur Air/Eau à 270 € TTC et la VMC à 230 € TTC. Déplacement et attestation Cerfa inclus."
            }
          },
          {
            "@type": "Question",
            "name": "L'entretien d'une climatisation ou pompe à chaleur est-il obligatoire ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui. Selon le décret n° 2020-912 (Code de l'environnement, art. R.224-44-1 à R.224-44-3), l'entretien des systèmes thermodynamiques de 4 kW à 70 kW est obligatoire au moins tous les deux ans. L'attestation d'entretien Cerfa est exigée par votre assurance en cas de sinistre et par les fabricants pour maintenir la garantie."
            }
          },
          {
            "@type": "Question",
            "name": "Comment fonctionne la réservation en direct sous 48h ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vous sélectionnez votre équipement (mono-split, multi-split, gainable, PAC Air/Eau, ballon thermodynamique, VMC ou VRV), choisissez la date et le créneau en temps réel dans notre agenda synchronisé, puis validez votre réservation en ligne sécurisée via Stripe. Un frigoriste certifié Air G Énergie intervient sous 48h ouvrées."
            }
          },
          {
            "@type": "Question",
            "name": "Dans quelles villes des Bouches-du-Rhône intervenez-vous pour l'entretien ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nos techniciens basés à Miramas (13140) interviennent dans un rayon de 50 à 70 km pour l'entretien et le dépannage : Miramas, Salon-de-Provence, Istres, Martigues, Aix-en-Provence, Marseille, Arles, Vitrolles, Marignane, Fos-sur-Mer, Carry-le-Rouet, Sausset-les-Pins, Pélissanne, Lançon-de-Provence, Saint-Rémy-de-Provence et les Alpilles. Les études et diagnostics s'étendent jusqu'à 100 km."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la différence entre entretien préventif (156 €) et curatif vapeur (192 €) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'entretien préventif (156 € TTC) assure la maintenance annuelle complète : nettoyage des filtres, désinfection biocide de l'évaporateur, nettoyage du groupe extérieur, contrôle des pressions et attestation Cerfa. Le forfait curatif (192 € TTC) ajoute un décrassage intensif à la vapeur sèche 100°C sous pression avec bâche ClimWasher+ pour éliminer moisissures incrustées, mauvaises odeurs et dépôts noirs sur la turbine."
            }
          },
          {
            "@type": "Question",
            "name": "Quelles marques de climatisation et pompe à chaleur entretenez-vous ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Air G Énergie assure la maintenance multimarques : Daikin, Mitsubishi Electric, Toshiba, Atlantic, Heiwa, Fujitsu, Hitachi, Samsung, LG, Panasonic ainsi que les systèmes de régulation gainable Airzone et Delta Dore."
            }
          },
          {
            "@type": "Question",
            "name": "Que se passe-t-il si ma climatisation est en panne le jour de l'entretien ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Un test de bon fonctionnement est systématiquement réalisé avant tout nettoyage. Si une panne matérielle ou une fuite est constatée, le technicien vous propose de convertir l'intervention en diagnostic officiel avec rapport écrit pour votre assurance (100 € TTC) afin d'établir un devis de réparation précis."
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
      <ReservationClient />
    </>
  );
}
