
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, ShieldCheck, Wrench } from 'lucide-react';

export const metadata: Metadata = {
    title: "Entretien \u0026 SAV Climatisation | Air G Énergie",
    description: "Contrat d'entretien climatisation et pompe à chaleur. Dépannage rapide toutes marques. Prolongez la durée de vie de votre matériel. Devis gratuit.",
};

export default function EntretienPage() {
    return (
        <div className="service-page">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
                color: 'white',
                padding: '4rem 0'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.15
                }}>
                    <Image
                        src="/images/hero-maintenance.png"
                        alt="Technicien maintenance climatisation"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                        Entretien \u0026 Dépannage Climatisation
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Assurez la longévité et la performance de votre installation avec nos contrats de maintenance préventive et notre service de dépannage réactif.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF6B00', border: 'none' }}>
                            <Phone size={20} />
                            Dépannage Urgent : 04 13 41 49 01
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Maintenance Section */}
            <section className="section-padding" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a365d' }}>Pourquoi entretenir votre climatisation ?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                            Un entretien régulier n'est pas seulement une obligation légale pour certains appareils, c'est surtout la garantie d'un air sain et d'économies durables.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                icon: <ShieldCheck size={40} color="#0091DA" />,
                                title: "Longévité accrue",
                                text: "Un système bien entretenu dure jusqu'à 30% plus longtemps, rentabilisant votre investissement initial."
                            },
                            {
                                icon: <CheckCircle size={40} color="#0091DA" />,
                                title: "Air Intérieur Sain",
                                text: "Nous nettoyons et désinfectons les filtres et les échangeurs pour éliminer bactéries, moisissures et allergènes."
                            },
                            {
                                icon: <Wrench size={40} color="#0091DA" />,
                                title: "Économies d'Énergie",
                                text: "Un appareil encrassé surconsomme de l'électricité. L'entretien maintient le rendement optimal (COP)."
                            },
                            {
                                icon: <Clock size={40} color="#0091DA" />,
                                title: "Moins de Pannes",
                                text: "La maintenance préventive permet de détecter les pièces d'usure avant qu'elles ne causent une panne majeure."
                            }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '1rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                borderTop: '4px solid #0091DA'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2d3748' }}>{item.title}</h3>
                                <p style={{ color: '#718096', lineHeight: '1.6' }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Maintenance Points Checklist */}
            <section style={{ background: '#F7FAFC', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1a365d' }}>Les points clés de notre visite d'entretien</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    "Nettoyage et désinfection des échangeurs (intérieur/extérieur)",
                                    "Nettoyage des filtres à air et remplacement si nécessaire",
                                    "Contrôle de l'étanchéité du circuit frigorifique (obligatoire)",
                                    "Vérification des connexions électriques et serrages",
                                    "Contrôle de l'évacuation des condensats (prévention fuites)",
                                    "Mesure des pressions et des températures de fonctionnement",
                                    "Vérification du bon fonctionnement de la régulation"
                                ].map((point, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', color: '#4a5568' }}>
                                        <div style={{ minWidth: '24px' }}>
                                            <CheckCircle size={24} color="#48BB78" />
                                        </div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: '1 1 400px', position: 'relative', height: '400px', background: '#E2E8F0', borderRadius: '1rem', overflow: 'hidden' }}>
                            <Image
                                src="/images/hero-maintenance.png"
                                alt="Entretien climatisation détail"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ textAlign: 'center', padding: '5rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Besoin d'un contrat d'entretien ou d'un dépannage ?</h2>
                    <p style={{ fontSize: '1.2rem', color: '#718096', marginBottom: '2rem' }}>
                        Nos équipes interviennent rapidement à Miramas, Istres, Salon-de-Provence et alentours.
                    </p>
                    <Link href="/contact" className="btn btn-primary" style={{ transform: 'scale(1.1)', padding: '1rem 2.5rem' }}>
                        Prendre Rendez-vous
                    </Link>
                </div>
            </section>
        </div>
    );
}
