import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "AIR G Energie - Climatisation & Pompe à Chaleur Miramas",
  description: "Expert en climatisation réversible, gainable et pompe à chaleur à Miramas. Installation, entretien et dépannage. Devis gratuit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header style={{ background: 'white', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.png" alt="AIR G Energie" width={200} height={60} priority style={{ height: 'auto' }} />
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```
