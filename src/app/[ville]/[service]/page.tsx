import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { CITIES_SLUGS, SERVICES_SLUGS, unslugify, formatServiceName } from '@/lib/seo-data';
import { getSeoVariations } from '@/lib/spintax';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';

interface PageProps {
    params: Promise<{ ville: string; service: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { ville, service } = await params;
    
    if (!CITIES_SLUGS.includes(ville) || !SERVICES_SLUGS.includes(service)) {
        return { title: "Air G Energie" };
    }

    const cityName = unslugify(ville);
    const serviceName = formatServiceName(service);
    const spine = getSeoVariations(ville, service);

    const alternates = await getSeoAlternates(`/${ville}/${service}`);

    const isEntretien = service === 'entretien';
    const customTitle = isEntretien
        ? `Entretien Climatisation à ${cityName} dès 156€ | Réservation en direct 48h - Air G Énergie`
        : `${serviceName} à ${cityName} - Artisan RGE & Devis Gratuit | Air G Energie`;
    const customDesc = isEntretien
        ? `Entretien et nettoyage de climatisation à ${cityName} dès 156€ TTC. Désinfection complète, contrôle fluide frigorigène et attestation légale Cerfa. Réservez votre créneau en 2 min.`
        : spine.heroSubtitle.substring(0, 155);

    return {
        title: customTitle,
        description: customDesc,
        alternates,
        openGraph: {
            title: customTitle,
            description: customDesc,
            url: alternates.canonical,
            siteName: "AIR G Energie",
            locale: "fr_FR",
            type: "website",
        }
    };
}

export default async function DynamicSeoMatrixPage({ params }: PageProps) {
    const { ville, service } = await params;

    // Validate slugs to avoid rendering for invalid combinations
    if (!CITIES_SLUGS.includes(ville) || !SERVICES_SLUGS.includes(service)) {
        return notFound();
    }

    const cityName = unslugify(ville);
    const serviceName = formatServiceName(service);
    const spine = getSeoVariations(ville, service);

    const domain = await getSeoDomain();

    // Schema LocalBusiness
    const schemaLocalBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `AIR G Energie - ${serviceName} à ${cityName}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": "Bouches-du-Rhône",
            "addressCountry": "FR"
        },
        "telephone": "+33-4-13-41-49-01",
        "priceRange": "€€",
        "url": `${domain}/${ville}/${service}`,
        "areaServed": {
            "@type": "City",
            "name": cityName
        }
    };

    return (
        <div className="city-service-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
            />

            {/* Breadcrumbs */}
            <nav style={{ background: '#F8FAFC', padding: '1rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                        <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Accueil</Link>
                        <span>›</span>
                        <Link href={`/${ville}`} style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>{cityName}</Link>
                        <span>›</span>
                        <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{serviceName}</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '400px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    opacity: 0.1,
                    backgroundImage: 'url(/images/hero-technician-ac.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
                <div className="container" style={{
                    position: 'relative',
                    padding: '4rem 0',
                    zIndex: 1
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#FF6B00' }}>
                        <MapPin size={20} />
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.9rem' }}>Zone d'intervention : {cityName}</span>
                    </div>
                    <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: '1.2' }}>
                        {spine.heroTitle}
                    </h1>
                    <p style={{ maxWidth: '700px', fontSize: '1.125rem', color: 'rgba(255,255,255,0.95)', marginBottom: '2rem', lineHeight: '1.7' }}>
                        {spine.heroSubtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {service === 'entretien' ? (
                            <Link href="/reservation-en-ligne" className="btn" style={{ background: '#FF6B00', color: 'white', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)' }}>
                                📅 Réserver en ligne (dès 156€)
                            </Link>
                        ) : null}
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: service === 'entretien' ? 'rgba(255,255,255,0.15)' : '#FF6B00', border: 'none' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', border: 'none' }}>
                            Demander un Devis
                        </Link>
                    </div>
                </div>
            </section>

            {/* Spintax Content Section */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '1rem', borderLeft: '5px solid var(--primary-blue)' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Expertise Locale sur {cityName}</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                            {spine.geoContext}
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {spine.benefits.map((benefit, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <CheckCircle size={24} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                                    <p style={{ color: 'var(--text-dark)', fontWeight: '500', margin: 0 }}>{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Callout */}
            <section className="section-padding" style={{ background: 'var(--bg-light)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>{spine.trustCallout}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                        Notre équipe de techniciens frigoristes certifiés est prête à intervenir.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {service === 'entretien' ? (
                            <Link href="/reservation-en-ligne" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: '#FF6B00', border: 'none', boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)' }}>
                                📅 Réserver mon entretien à {cityName} (dès 156€)
                            </Link>
                        ) : null}
                        <Link href="/contact" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: service === 'entretien' ? '#FFFFFF' : 'var(--primary-blue)', color: service === 'entretien' ? 'var(--text-dark)' : 'white', border: service === 'entretien' ? '1px solid #CBD5E1' : 'none' }}>
                            Demander un devis gratuit
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
