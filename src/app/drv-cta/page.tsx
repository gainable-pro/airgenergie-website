
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Fan, Activity, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: "Solutions Tertiaires : DRV \u0026 CTA | Air G Énergie",
    description: "Installation et maintenance de systèmes CVC pour professionnels, bureaux et commerces. DRV (VRV) et Centrales de Traitement d'Air (CTA).",
};

export default function DrvCtaPage() {
    return (
        <div className="service-page">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1a365d 0%, #2a4365 100%)',
                color: 'white',
                padding: '4rem 0'
            }}>
                {/* Placeholder for professional building/HVAC image - using technical hero as fallback */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.2
                }}>
                    <Image
                        src="/images/cassette-ac.png"
                        alt="Climatisation tertiaire"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                        Solutions Tertiaires \u0026 Industrielles
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Systèmes DRV/VRV et Centrales de Traitement d'Air (CTA) pour grands volumes, bureaux, commerces et bâtiments industriels.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/contact" className="btn btn-primary" style={{ background: '#FF6B00', border: 'none' }}>
                            Étude de Projet Professionnel
                        </Link>
                    </div>
                </div>
            </section>

            {/* DRV/VRV Section */}
            <section className="section-padding" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <Activity size={32} color="#0091DA" />
                                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1a365d' }}>Systèmes DRV / VRV</h2>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', color: '#718096', marginBottom: '1.5rem', fontWeight: 'normal' }}>
                                Débit de Réfrigérant Variable
                            </h3>
                            <p style={{ lineHeight: '1.8', color: '#4a5568', marginBottom: '1.5rem' }}>
                                Le système DRV (ou VRV) est la solution de référence pour les hôtels, bureaux et grands espaces commerciaux. Il permet de connecter jusqu'à 64 unités intérieures sur un seul groupe extérieur, avec une gestion énergétique intelligente.
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', color: '#4a5568', lineHeight: '1.8' }}>
                                <li><strong>Récupération d'énergie :</strong> Chauffez une zone en refroidissant une autre (transfert thermique).</li>
                                <li><strong>Modularité :</strong> Large choix d'unités intérieures (cassettes, gainables, murales).</li>
                                <li><strong>Gestion centralisée :</strong> Contrôle total via GTC/GTB ou écran tactile central.</li>
                            </ul>
                        </div>
                        <div style={{ flex: '1 1 400px', position: 'relative', height: '350px', background: '#EDF2F7', borderRadius: '1rem', overflow: 'hidden' }}>
                            <Image
                                src="/images/drv-system-corrected.png"
                                alt="Système DRV extérieur"
                                fill
                                style={{ objectFit: 'contain', padding: '1rem' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA (Air Handling Unit) Section */}
            <section style={{ background: '#F7FAFC', padding: '5rem 0' }}>
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '4rem' }}>
                        <div style={{ flex: '1 1 400px', position: 'relative', height: '350px', background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <Image
                                src="/images/cta-unit-new.jpg"
                                alt="Centrale de Traitement d'Air (CTA)"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <Fan size={32} color="#0091DA" />
                                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1a365d' }}>Centrales de Traitement d'Air (CTA)</h2>
                            </div>
                            <p style={{ lineHeight: '1.8', color: '#4a5568', marginBottom: '1.5rem' }}>
                                Pour les ERP, laboratoires ou locaux nécessitant un strict contrôle de la qualité de l'air, la CTA est incontournable. Elle assure le renouvellement, le filtrage, le chauffage, le refroidissement et l'humidification de l'air.
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', color: '#4a5568', lineHeight: '1.8' }}>
                                <li><strong>Hygiène :</strong> Filtration haute efficacité (F7, H13/H14) pour un air pur.</li>
                                <li><strong>Free Cooling :</strong> Utilisation de l'air extérieur gratuit quand les températures le permettent.</li>
                                <li><strong>Conformité :</strong> Respect des normes de ventilation des lieux publics (ERP).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secteur d'activité */}
            <section className="section-padding" style={{ padding: '5rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: '#1a365d' }}>Nous équipons vos locaux professionnels</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <Building2 size={40} className="text-primary" />, label: "Bureaux \u0026 Open Spaces" },
                            { icon: <Building2 size={40} className="text-primary" />, label: "Commerces \u0026 Retail" },
                            { icon: <Building2 size={40} className="text-primary" />, label: "Hôtels \u0026 Restaurants" },
                            { icon: <Building2 size={40} className="text-primary" />, label: "Locaux Industriels" },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '2rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}>
                                <div style={{ marginBottom: '1rem', color: '#0091DA' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ textAlign: 'center', padding: '3rem 0', background: 'var(--primary-blue)', color: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>Un projet tertiaire ?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Contactez notre bureau d'études pour une solution sur-mesure.
                    </p>
                    <a href="tel:0413414901" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
                        <Phone size={20} />
                        04 13 41 49 01
                    </a>
                </div>
            </section>
        </div>
    );
}
