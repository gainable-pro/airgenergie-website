import { getCityData, getAllCitySlugs } from '@/data/cities';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ZigZagSection from '@/components/ui/ZigZagSection';
import { MapPin, Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate Static Params for SSG
export async function generateStaticParams() {
    const slugs = getAllCitySlugs();
    return slugs.map((slug) => ({ slug }));
}

// Generate Metadata dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const city = getCityData(slug);

    if (!city) {
        return {
            title: "Climatisation Local | Air G Energie",
        };
    }

    const heroImage = city.heroImage || (slug === 'miramas' ? '/images/city-miramas-hero.png' : '/images/hero-technician-ac.png');
    const canonicalUrl = `https://www.airgenergie.com/ville/${slug}`;

    return {
        title: city.metaTitle,
        description: city.metaDesc,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: city.metaTitle,
            description: city.metaDesc,
            url: canonicalUrl,
            siteName: "AIR G Energie",
            images: [
                {
                    url: heroImage,
                    width: 1200,
                    height: 630,
                    alt: `Climatisation ${city.name} - AIR G Energie`,
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: city.metaTitle,
            description: city.metaDesc,
            images: [heroImage],
        },
    };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const city = getCityData(slug);

    if (!city) {
        return notFound();
    }

    // Determine hero image based on city
    const heroImage = city.heroImage || (slug === 'miramas' ? '/images/city-miramas-hero.png' : '/images/hero-technician-ac.png');

    // Schema LocalBusiness
    const schemaLocalBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `AIR G Energie - Climatisation ${city.name}`,
        "image": `https://www.airgenergie.com${heroImage}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "addressRegion": "Bouches-du-Rhône",
            "addressCountry": "FR"
        },
        "telephone": "+33-4-13-41-49-01",
        "priceRange": "€€",
        "openingHours": "Mo-Fr 08:00-18:00",
        "url": `https://www.airgenergie.com/ville/${slug}`,
        "areaServed": {
            "@type": "City",
            "name": city.name
        }
    };

    // Schema FAQ
    const schemaFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": city.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <div className="city-page">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
            />

            {/* Breadcrumbs */}
            <nav style={{ background: '#F8FAFC', padding: '1rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                        <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Accueil</Link>
                        <span>›</span>
                        <Link href="/zones-intervention" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Zones d'intervention</Link>
                        <span>›</span>
                        <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{city.name}</span>
                    </div>
                </div>
            </nav>

            {/* City Hero - Blue Gradient like Homepage */}
            <section style={{
                position: 'relative',
                minHeight: '500px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)'
            }}>
                {/* Background Image */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.2
                }}>
                    <Image
                        src={heroImage}
                        alt={`Climatisation ${city.name}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        priority
                    />
                </div>

                {/* Blue overlay for readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(0, 145, 218, 0.4) 0%, rgba(0, 107, 166, 0.2) 60%, rgba(0, 107, 166, 0.4) 100%)'
                }} />

                {/* Content */}
                <div className="container" style={{
                    position: 'relative',
                    padding: '4rem 0',
                    zIndex: 1
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#FF6B00' }}>
                        <MapPin size={20} />
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.9rem' }}>Zone d&apos;intervention : {city.name}</span>
                    </div>
                    <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: '1.2' }}>{city.h1}</h1>
                    <p style={{ maxWidth: '700px', fontSize: '1.125rem', color: 'rgba(255,255,255,0.95)', marginBottom: '2rem', lineHeight: '1.7' }}>
                        {city.intro}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF6B00', border: 'none' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', border: 'none' }}>
                            Devis Gratuit
                        </Link>
                    </div>
                </div>
            </section>

            {/* Installation Section with Image */}
            <ZigZagSection
                title={city.h2_install}
                description={city.txt_install}
                imagePlacement="left"
                imageSrc={city.img_install}
                imageAlt={`Installation climatisation ${city.name}`}
                features={[
                    "Installation adaptée à votre quartier",
                    "Respect des contraintes locales",
                    "Marques premium (Daikin, Mitsubishi, Toshiba)",
                    "Dimensionnement précis selon votre logement"
                ]}
            />

            {/* Reversible Section with Comfort Image */}
            <ZigZagSection
                title={city.h2_reversible}
                description={city.txt_reversible}
                imagePlacement="right"
                imageSrc={city.img_reversible}
                imageAlt={`Confort climatisation ${city.name}`}
                features={[
                    "Fraîcheur en été, chaleur en hiver",
                    "Jusqu'à 60% d'économies sur le chauffage",
                    "Système économique et écologique",
                    "Idéal pour le climat provençal"
                ]}
            />

            {/* Gainable Section */}
            <ZigZagSection
                title={city.h2_gainable}
                description={city.txt_gainable}
                imagePlacement="left"
                imageSrc={city.img_gainable}
                imageAlt={`Climatisation gainable ${city.name}`}
                features={[
                    "Solution invisible et élégante",
                    "Intégration dans combles ou faux-plafonds",
                    "Régulation pièce par pièce (zoning)",
                    "Confort optimal et économies maximales"
                ]}
            />

            {/* Maintenance Section */}
            <ZigZagSection
                title={city.h2_maintenance}
                description={city.txt_maintenance}
                imagePlacement="right"
                imageSrc={city.img_maintenance}
                imageAlt={`Entretien climatisation ${city.name}`}
                features={[
                    "Intervention rapide en urgence",
                    "Entretien annuel obligatoire",
                    "Contrats d'entretien disponibles",
                    "Dépannage toutes marques"
                ]}
                ctaLinkSecondary="/entretien"
                ctaTextSecondary="Réserver votre entretien"
            />

            {/* Local Expertise Section */}
            <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>{city.h2_why_us}</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                        {city.txt_why_us}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                            <CheckCircle size={32} style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Certifié RGE</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Accédez aux aides financières (MaPrimeRénov', CEE)</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                            <CheckCircle size={32} style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Garantie Décennale</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Protection sur le long terme de votre installation</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                            <CheckCircle size={32} style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Entreprise Locale</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Proximité, réactivité et connaissance du terrain</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}>
                        Questions Fréquentes sur la Climatisation à {city.name}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {city.faq.map((item, idx) => (
                            <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '0.5rem', borderLeft: '4px solid var(--primary-blue)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{item.q}</h3>
                                <p style={{ color: 'var(--text-gray)', lineHeight: '1.7', margin: 0 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>{city.h2_cta}</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
                        Intervention rapide à {city.name} • Devis gratuit sous 24h • Certifié RGE
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF6B00', border: 'none' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', border: 'none' }}>
                            Demander un Devis Gratuit
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
