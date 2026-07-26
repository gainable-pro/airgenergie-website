import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { CITIES_SLUGS, SERVICES_SLUGS, unslugify, formatServiceName } from '@/lib/seo-data';
import { getCityData } from '@/data/cities';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';

interface PageProps {
    params: Promise<{ ville: string }>;
}

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { ville } = await params;
    
    if (!CITIES_SLUGS.includes(ville)) {
        return { title: "Air G Energie" };
    }

    const cityName = unslugify(ville);
    const alternates = await getSeoAlternates(`/${ville}`);
    const cityData = getCityData(ville);

    const title = cityData?.metaTitle || `【Devis Gratuit】 Climatisation Réversible à ${cityName} | Air G Energie`;
    const description = cityData?.metaDesc || `Besoin d'un chauffagiste frigoriste certifié à ${cityName} ? Air G Energie vous accompagne : pompe à chaleur, climatisation réversible, gainable et entretien.`;

    return {
        title,
        description,
        alternates,
    };
}

export default async function VilleHubPage({ params }: PageProps) {
    const { ville } = await params;

    if (!CITIES_SLUGS.includes(ville)) {
        return notFound();
    }

    const cityName = unslugify(ville);
    const cityData = getCityData(ville);

    if (!cityData) {
        return notFound();
    }

    const domain = await getSeoDomain();

    // SEO LocalBusiness Schema
    const schemaLocalBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `AIR G Energie - Climatisation à ${cityName}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": "Bouches-du-Rhône",
            "addressCountry": "FR"
        },
        "telephone": "+33-4-13-41-49-01",
        "priceRange": "€€",
        "url": `${domain}/${ville}`,
        "areaServed": {
            "@type": "City",
            "name": cityName
        }
    };

    // SEO FAQPage Schema
    const schemaFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": cityData.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <div className="city-hub-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([schemaLocalBusiness, schemaFAQ]) }}
            />

            <nav style={{ background: '#F8FAFC', padding: '1rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                        <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Accueil</Link>
                        <span>›</span>
                        <Link href="/zones-intervention" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Zones d'intervention</Link>
                        <span>›</span>
                        <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{cityName}</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{
                position: 'relative',
                minHeight: '500px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    opacity: 0.15,
                    backgroundImage: `url(${cityData.heroImage})`,
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
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.9rem' }}>Votre Artisan RGE à {cityName}</span>
                    </div>
                    {/* OPTIMIZED H1 KEYWORD */}
                    <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: '1.2' }}>
                        Climatisation Réversible & Pompe à Chaleur à {cityName}
                    </h1>
                    <p style={{ maxWidth: '700px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                        {cityData.intro}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF6B00', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Devis Gratuit
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERVICES MATRIX */}
            <section className="section-padding" style={{ background: '#F8FAFC' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '3rem' }}>
                        Nos Prestations à {cityName}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {SERVICES_SLUGS.map((serviceSlug) => (
                            <Link 
                                key={serviceSlug} 
                                href={`/${ville}/${serviceSlug}`}
                                style={{
                                    display: 'block',
                                    padding: '2rem',
                                    background: 'white',
                                    borderRadius: '1rem',
                                    textDecoration: 'none',
                                    border: '1px solid #E2E8F0',
                                    transition: 'all 0.3s ease',
                                    color: 'var(--text-dark)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                }}
                                className="service-card-hover"
                            >
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>
                                    {formatServiceName(serviceSlug)}
                                </h3>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                    Voir nos solutions et tarifs pour {formatServiceName(serviceSlug).toLowerCase()} sur le secteur de {cityName}.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FF6B00', fontWeight: '500' }}>
                                    Découvrir <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* RICH CONTENT SECTIONS */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    {/* Grid wrapper for standard flow without complex layout classes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ flex: '1 1 400px' }}>
                                <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{cityData.h2_reversible}</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', lineHeight: '1.8' }}>{cityData.txt_reversible}</p>
                            </div>
                            <div style={{ flex: '1 1 400px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                <img src={cityData.img_reversible} alt={cityData.h2_reversible} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ flex: '1 1 400px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                <img src={cityData.img_gainable} alt={cityData.h2_gainable} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                            <div style={{ flex: '1 1 400px' }}>
                                <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{cityData.h2_gainable}</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', lineHeight: '1.8' }}>{cityData.txt_gainable}</p>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ flex: '1 1 400px' }}>
                                <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{cityData.h2_why_us}</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', lineHeight: '1.8' }}>{cityData.txt_why_us}</p>
                            </div>
                            <div style={{ flex: '1 1 400px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                <img src={cityData.img_install} alt={cityData.h2_why_us} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="section-padding" style={{ background: '#F8FAFC' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '3rem' }}>
                        Questions Fréquentes à {cityName}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cityData.faq.map((item, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>{item.q}</h3>
                                <p style={{ color: 'var(--text-gray)', margin: 0, lineHeight: '1.6' }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: 'var(--text-dark)', textAlign: 'center', color: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>{cityData.h2_cta}</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Contactez notre équipe locale pour un accompagnement personnalisé.
                    </p>
                    <Link href="/contact" className="btn btn-primary" style={{ background: '#FF6B00', border: 'none', padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
                        Demander mon Devis
                    </Link>
                </div>
            </section>
        </div>
    );
}
