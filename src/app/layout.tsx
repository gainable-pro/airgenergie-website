import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  metadataBase: new URL('https://airgenergie.fr'),
  title: "AIR G Energie - Climatisation & Pompe à Chaleur Miramas",
  description: "Expert en climatisation réversible, gainable et pompe à chaleur à Miramas. Installation, entretien et dépannage. Devis gratuit.",
  keywords: "climatisation Miramas, pompe à chaleur, climatisation réversible, gainable, installation climatisation, Bouches-du-Rhône",
  authors: [{ name: "AIR G Energie" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://airgenergie.fr",
    siteName: "AIR G Energie",
    title: "AIR G Energie - Climatisation & Pompe à Chaleur Miramas",
    description: "Expert en climatisation réversible, gainable et pompe à chaleur à Miramas. Installation, entretien et dépannage. Devis gratuit.",
    images: [
      {
        url: "/images/hero-technician-ac.png",
        width: 1200,
        height: 630,
        alt: "AIR G Energie - Expert Climatisation Miramas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIR G Energie - Climatisation & Pompe à Chaleur Miramas",
    description: "Expert en climatisation réversible, gainable et pompe à chaleur à Miramas. Installation, entretien et dépannage. Devis gratuit.",
    images: ["/images/hero-technician-ac.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIR G Energie",
    "url": "https://airgenergie.fr",
    "logo": "https://airgenergie.fr/images/hero-technician-ac.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-4-13-41-49-01",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miramas",
      "postalCode": "13140",
      "addressRegion": "Bouches-du-Rhône",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.facebook.com/airgenergie",
      "https://www.instagram.com/airgenergie"
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
