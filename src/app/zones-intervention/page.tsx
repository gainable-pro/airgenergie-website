import Link from 'next/link';
import { MapPin, Phone, CheckCircle } from 'lucide-react';

export const metadata = {
    title: "Zones d'Intervention - Climatisation Bouches-du-Rhône | Air G Énergie",
    description: "Air G Énergie intervient dans tout le département des Bouches-du-Rhône : Miramas, Istres, Salon-de-Provence, Saint-Chamas, Marseille et environs.",
};

export default function ZonesInterventionPage() {
    const cities = [
        { name: "Miramas", slug: "miramas", description: "Notre ville d'origine, intervention ultra-rapide" },
        { name: "Istres", slug: "istres", description: "Spécialiste climatisation secteur étang de Berre" },
        { name: "Salon-de-Provence", slug: "salon-de-provence", description: "Installation et entretien climatisation" },
        { name: "Saint-Chamas", slug: "saint-chamas", description: "Proximité et réactivité garanties" },
    ];

    const otherCities = [
        "Aix-en-Provence", "Martigues", "Vitrolles", "Grans", "La Fare-les-Oliviers",
        "Marseille", "Côte Bleue", "Port-de-Bouc", "Fos-sur-Mer", "Arles"
    ];

    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>
                        Nos Zones d'Intervention
                    </h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto', opacity: 0.95 }}>
                        Air G Énergie intervient dans tout le département des Bouches-du-Rhône pour vos installations de climatisation
                    </p>
                </div>
            </section>

            {/* Main Cities */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
                        Villes Principales
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {cities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/ville/${city.slug}`}
                                style={{
                                    textDecoration: 'none',
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    border: '2px solid var(--border-color)',
                                    transition: 'all 0.3s ease',
                                    display: 'block'
                                }}
                                className="city-card"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                                    <MapPin size={24} />
                                    <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-dark)' }}>{city.name}</h3>
                                </div>
                                <p style={{ color: 'var(--text-gray)', margin: 0 }}>{city.description}</p>
                                <div style={{ marginTop: '1rem', color: 'var(--primary-blue)', fontWeight: 'bold' }}>
                                    En savoir plus →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Cities */}
            <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
                        Autres Communes Desservies
                    </h2>
                    <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--text-gray)' }}>
                        Nous intervenons également dans de nombreuses autres communes des Bouches-du-Rhône
                    </p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        justifyContent: 'center',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        {otherCities.map((city) => (
                            <div
                                key={city}
                                style={{
                                    background: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '2rem',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-dark)',
                                    fontSize: '1rem'
                                }}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                        Votre Ville N'est Pas Listée ?
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                        Contactez-nous ! Nous intervenons dans tout le département des Bouches-du-Rhône
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={20} />
                            04 13 41 49 01
                        </a>
                        <Link href="/contact" className="btn btn-outline">
                            Demander un Devis
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
