import { getCityData } from '@/data/cities';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate Metadata dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const city = getCityData(slug);

    if (!city) {
        return {
            title: "Climatisation Local | Air Energie",
        };
    }

    return {
        title: city.metaTitle,
        description: city.metaDesc,
    };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const city = getCityData(slug);

    if (!city) {
        return notFound();
    }

    return (
        <div className="city-page">
            {/* City Hero - Light Gray with Image Overlay */}
            <section style={{
                position: 'relative',
                minHeight: '500px',
                overflow: 'hidden',
                background: '#F8FAFC'
            }}>
                {/* Background Image */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.15
                }}>
                    <Image
                        src="/images/hero-technician-ac.png"
                        alt="Technicien AIR G Energie"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>

                {/* Light overlay for readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(248, 250, 252, 0.95) 0%, rgba(248, 250, 252, 0.85) 60%, rgba(248, 250, 252, 0.95) 100%)'
                }} />

                {/* Content */}
                <div className="container" style={{
                    position: 'relative',
                    padding: '4rem 0',
                    zIndex: 1
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                        <MapPin size={20} />
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Zone d&apos;intervention : {city.name}</span>
                    </div>
                    <h1 style={{ color: 'var(--text-dark)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>{city.h1}</h1>
                    <p style={{ maxWidth: '700px', fontSize: '1.125rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                        {city.intro}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn btn-outline">
                            Devis Gratuit
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content Structure */}
            <section className="section-padding">
                <div className="container" style={{ maxWidth: '900px' }}>

                    {/* Section 1: Installation */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2>{city.h2_install}</h2>
                        <p>{city.txt_install}</p>
                    </div>

                    {/* Section 2: Reversible */}
                    <div style={{ marginBottom: '4rem', padding: '2rem', background: '#F8FAFC', borderRadius: '1rem' }}>
                        <h2>{city.h2_reversible}</h2>
                        <p>{city.txt_reversible}</p>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><CheckCircle size={18} className="text-accent" /> Été au frais</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle size={18} className="text-accent" /> Hiver au chaud</li>
                        </ul>
                    </div>

                    {/* Section 3: Gainable */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2>{city.h2_gainable}</h2>
                        <p>{city.txt_gainable}</p>
                    </div>

                    {/* Section 4: Maintenance */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h2>{city.h2_maintenance}</h2>
                        <p>{city.txt_maintenance}</p>
                    </div>

                    {/* Section 5: Excellence Locale */}
                    <div style={{ marginBottom: '4rem', borderLeft: '4px solid #FF6B00', paddingLeft: '2rem' }}>
                        <h2>{city.h2_why_us}</h2>
                        <p>{city.txt_why_us}</p>
                    </div>

                    {/* FAQ specific to city */}
                    <div style={{ marginTop: '4rem' }}>
                        <h3>Questions Fréquentes à {city.name}</h3>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {city.faq.map((item, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#0A2342' }}>{item.q}</p>
                                    <p style={{ color: '#64748B', fontSize: '0.95rem' }}>{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Final CTA */}
            <section style={{ background: '#FF6B00', padding: '3rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>{city.h2_cta}</h2>
                    <p style={{ color: 'white', marginBottom: '2rem', opacity: 0.9 }}>
                        Réponse sous 24h garantie. Intervention rapide sur {city.name}.
                    </p>
                    <Link href="/contact" className="btn" style={{ background: 'white', color: '#FF6B00' }}>
                        Contacter un expert à {city.name}
                    </Link>
                </div>
            </section>
        </div>
    );
}
