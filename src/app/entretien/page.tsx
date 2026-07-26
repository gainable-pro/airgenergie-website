import type { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';
import EntretienPageCom from '@/components/templates/com/EntretienPageCom';
import EntretienPageFr from '@/components/templates/fr/EntretienPageFr';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/entretien');
  return {
    title: "Entretien & SAV Climatisation | Air G Énergie",
    description: "Entretien de climatisation à partir de 154 € — splits, gainables, cassettes, VRV/DRV, PAC. Devis gratuit, intervention rapide dans un rayon de 50 km autour de Miramas (13).",
    alternates,
    other: {
      'application/ld+json': JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://airgenergie.fr/#business",
          "name": "Air G Énergie",
          "description": "Entreprise spécialisée dans l'installation, l'entretien et le dépannage de systèmes de climatisation, pompes à chaleur et VRV/DRV en Provence.",
          "url": "https://airgenergie.fr",
          "telephone": "+33-9-XX-XX-XX-XX",
          "image": "https://airgenergie.fr/images/hero-technician.png",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Miramas",
            "postalCode": "13140",
            "addressRegion": "Provence-Alpes-Côte d'Azur",
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.5847,
            "longitude": 5.0005
          },
          "areaServed": [
            "Miramas", "Istres", "Salon-de-Provence", "Martigues", "Fos-sur-Mer",
            "Vitrolles", "Marignane", "Aix-en-Provence", "Marseille", "Arles",
            "Saint-Rémy-de-Provence", "Tarascon", "Avignon"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Catalogue Entretien & SAV Climatisation",
            "itemListElement": [
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#devis",
                "name": "Étude & Devis d'installation",
                "description": "Déplacement gratuit pour étudier votre projet d'installation de climatisation ou pompe à chaleur. Rayon 100 km autour de Miramas.",
                "price": "0",
                "priceCurrency": "EUR",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "description": "Gratuit"
                },
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "100000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=devis"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#diagnostic",
                "name": "Diagnostic & Rapport de panne",
                "description": "Recherche de panne, diagnostic technique et rapport écrit. Devis de réparation inclus.",
                "price": "100",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "100000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=diagnostic"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#preventive",
                "name": "Entretien climatisation préventif — Split mural",
                "description": "Nettoyage des filtres, désinfection, vérification de pression et nettoyage échangeur extérieur (1 unité).",
                "price": "156",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=preventive"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#curative",
                "name": "Entretien climatisation curatif approfondi",
                "description": "Nettoyage en profondeur avec turbine, dégraissage, traitement fongicide et désinfection complète.",
                "price": "192",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=curative"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#gainable",
                "name": "Entretien climatisation gainable",
                "description": "Entretien unité en combles ou faux-plafond, nettoyage plénum, contrôle des grilles et filtres.",
                "price": "220",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=gainable"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#cassette",
                "name": "Entretien climatisation cassette 4 voies",
                "description": "Nettoyage complet de cassette de soufflage 4 voies encastrée (bureaux, commerces).",
                "price": "180",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=cassette"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#console",
                "name": "Entretien climatisation console basse",
                "description": "Nettoyage complet de climatiseur console posé au sol.",
                "price": "154",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=console"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#thermodynamique",
                "name": "Entretien ballon thermodynamique",
                "description": "Contrôle étanchéité fluide, nettoyage évaporateur, vérification de l'anode.",
                "price": "174",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=thermodynamique"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#pac-air-eau",
                "name": "Entretien Pompe à Chaleur Air/Eau",
                "description": "Nettoyage unité extérieure, contrôle pression hydraulique et vases d'expansion.",
                "price": "270",
                "priceCurrency": "EUR",
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=pac-air-eau"
              },
              {
                "@type": "Offer",
                "@id": "https://airgenergie.fr/entretien#vrv",
                "name": "Entretien Système VRV / DRV — Résidentiel & Tertiaire",
                "description": "Entretien technique VRV/DRV pour hôtels, résidences, commerces, banques. Tarif remisé -10% selon composition (splits, gainables, cassettes, consoles).",
                "price": "0",
                "priceCurrency": "EUR",
                "priceSpecification": { "@type": "PriceSpecification", "description": "Sur devis, remise -10% VRV incluse" },
                "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.5847, "longitude": 5.0005 }, "geoRadius": "50000" },
                "availability": "https://schema.org/InStock",
                "url": "https://airgenergie.fr/entretien?service=vrv"
              }
            ]
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://airgenergie.fr" },
            { "@type": "ListItem", "position": 2, "name": "Entretien & SAV", "item": "https://airgenergie.fr/entretien" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Quel est le prix d'un entretien de climatisation ?",
              "acceptedAnswer": { "@type": "Answer", "text": "L'entretien d'un split mural commence à 156 € TTC (préventif), 192 € pour un curatif approfondi. Gainable : 220 €, Cassette : 180 €, Console : 154 €. Tarif VRV/DRV : sur devis avec remise -10%." }
            },
            {
              "@type": "Question",
              "name": "Quelle est la zone d'intervention d'Air G Énergie ?",
              "acceptedAnswer": { "@type": "Answer", "text": "Air G Énergie intervient dans un rayon de 50 km autour de Miramas (13) pour les entretiens et dépannages. Les études de faisabilité et diagnostics s'étendent jusqu'à 100 km (Avignon, Toulon, Nîmes)." }
            },
            {
              "@type": "Question",
              "name": "Que se passe-t-il si mon système est en panne lors de l'entretien ?",
              "acceptedAnswer": { "@type": "Answer", "text": "Un contrôle de performance est systématiquement effectué avant l'intervention. En cas de défaut détecté, Air G Énergie se réserve le droit de convertir la prestation en diagnostic facturable à 100 € ou d'annuler l'intervention." }
            }
          ]
        }
      ])
    }
  };
}

export default async function EntretienPage() {
  const domain = await getSeoDomain();

  if (domain.includes('airgenergie.fr') || domain.includes('rgenergie.fr')) {
    return <EntretienPageFr />;
  }

  return <EntretienPageCom />;
}

