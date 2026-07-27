import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from 'next/link';
import Image from 'next/image';
import { getSeoDomain, getSeoAlternates } from "@/lib/seo-url";

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getSeoDomain();
  const alternates = await getSeoAlternates('/');

  return {
    metadataBase: new URL(domain),
    title: "Air G Énergie - Climatisation & Pompe à Chaleur Bouches-du-Rhône (13)",
    description: "Expert artisan en installation, entretien et dépannage de climatisation réversible, gainable et pompe à chaleur dans toutes les Bouches-du-Rhône (Miramas, Salon, Aix, Marseille, Istres, Arles, Martigues). Devis gratuit.",
    keywords: "climatisation Bouches-du-Rhône, climatisation Miramas, climatisation Salon-de-Provence, climatisation Aix-en-Provence, climatisation Marseille, pompe à chaleur 13, gainable réversible, entretien climatisation, dépannage climatisation",
    authors: [{ name: "Air G Énergie" }],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: domain,
      siteName: "Air G Énergie",
      title: "Air G Énergie - Climatisation & Pompe à Chaleur Bouches-du-Rhône (13)",
      description: "Expert artisan en installation, entretien et dépannage de climatisation réversible, gainable et pompe à chaleur dans toutes les Bouches-du-Rhône. Devis gratuit sous 24h.",
      images: [
        {
          url: "/images/hero-technician-ac.png",
          width: 1200,
          height: 630,
          alt: "Air G Énergie - Expert Climatisation Bouches-du-Rhône",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Air G Énergie - Climatisation & Pompe à Chaleur Bouches-du-Rhône (13)",
      description: "Expert artisan en installation, entretien et dépannage de climatisation réversible, gainable et pompe à chaleur dans toutes les Bouches-du-Rhône. Devis gratuit.",
      images: ["/images/hero-technician-ac.png"],
    },
    alternates,
    other: {
      'geo.region': 'FR-13',
      'geo.placename': 'Miramas, Bouches-du-Rhône, Provence-Alpes-Côte d\'Azur',
      'geo.position': '43.5825;5.0011',
      'ICBM': '43.5825, 5.0011',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'FjUew4ck6TLq7BEywClYpvr161vLXX3O57rBQ21sDhk',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domain = await getSeoDomain();

  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "@id": `${domain}/#organization`,
    "name": "Air G Énergie",
    "url": domain,
    "logo": `${domain}/images/hero-technician-ac.png`,
    "image": `${domain}/images/hero-technician-ac.png`,
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.5825,
      "longitude": 5.0011
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Bouches-du-Rhône" },
      { "@type": "City", "name": "Miramas" },
      { "@type": "City", "name": "Salon-de-Provence" },
      { "@type": "City", "name": "Aix-en-Provence" },
      { "@type": "City", "name": "Marseille" },
      { "@type": "City", "name": "Istres" },
      { "@type": "City", "name": "Martigues" },
      { "@type": "City", "name": "Arles" },
      { "@type": "City", "name": "Carry-le-Rouet" },
      { "@type": "City", "name": "Sausset-les-Pins" },
      { "@type": "City", "name": "La Ciotat" },
      { "@type": "City", "name": "Mouriès" },
      { "@type": "City", "name": "Maussane-les-Alpilles" },
      { "@type": "City", "name": "Vitrolles" },
      { "@type": "City", "name": "Marignane" }
    ],
    "knowsAbout": [
      "Climatisation réversible",
      "Climatisation gainable",
      "Pompe à chaleur Air/Eau",
      "Ballon thermodynamique",
      "Système VRV / DRV",
      "Entretien et dépannage climatisation",
      "Bilan thermique et dimensionnement"
    ]
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
