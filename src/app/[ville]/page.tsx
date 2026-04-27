import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { CITIES_SLUGS, SERVICES_SLUGS, unslugify, formatServiceName } from '@/lib/seo-data';

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
    const canonicalUrl = `https://www.airgenergie.com/${ville}`;

    return {
        title: `Installation & Entretien Climatisation et PAC à ${cityName} | Air G Energie`,
        description: `Besoin d'un chauffagiste frigoriste certifié à ${cityName} ? Air G Energie vous accompagne : pompe à chaleur, climatisation réversible, gainable et entretien.`,
        alternates: {
            canonical: canonicalUrl,
        }
    };
}

export default async function VilleHubPage({ params }: PageProps) {
    const { ville } = await params;

    if (!CITIES_SLUGS.includes(ville)) {
        return notFound();
    }

    const cityName = unslugify(ville);

    return (
        <div className="city-hub-page">
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

            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#FF6B00', background: 'rgba(255, 107, 0, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                            <MapPin size={20} />
                            <span style={{ fontWeight: '600' }}>Notre équipe intervient à {cityName}</span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                            Expert Chauffage & Climatisation à {cityName}
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                            Air G Énergie est votre partenaire local de confiance pour tous vos projets de confort thermique. Découvrez nos prestations spécialement pensées pour les logements et professionnels de {cityName}.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {SERVICES_SLUGS.map((serviceSlug) => (
                            <Link 
                                key={serviceSlug} 
                                href={`/${ville}/${serviceSlug}`}
                                style={{
                                    display: 'block',
                                    padding: '2rem',
                                    background: '#F8FAFC',
                                    borderRadius: '1rem',
                                    textDecoration: 'none',
                                    border: '1px solid #E2E8F0',
                                    transition: 'all 0.3s ease',
                                    color: 'var(--text-dark)'
                                }}
                                className="service-card-hover"
                            >
                                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>
                                    {formatServiceName(serviceSlug)}
                                </h2>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                    Voir nos solutions et tarifs pour {formatServiceName(serviceSlug).toLowerCase()} sur le secteur de {cityName}.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FF6B00', fontWeight: '500' }}>
                                    En savoir plus <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
