import ZigZagSection from '../../components/ui/ZigZagSection';
import Link from 'next/link';

export const metadata = {
    title: "Installation Climatisation Réversible | Miramas & Salon",
    description: "Fini les nuits trop chaudes. Installez une climatisation silencieuse et économique à Miramas. Devis gratuit sous 24h.",
};

export default function ClimatisationPage() {
    return (
        <div>
            {/* Hero Service */}
            <section style={{ background: '#0F172A', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'white' }}>Profitez de votre maison, même en pleine canicule</h1>
                    <p style={{ maxWidth: 600, margin: '0 auto 2rem', color: '#CBD5E1' }}>
                        Ne subissez plus les records de chaleur. Équipez votre logement d&apos;une solution durable qui rafraîchit l&apos;été et chauffe l&apos;hiver.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Obtenir mon devis gratuit
                    </Link>
                </div>
            </section>

            {/* 1. Split Mural - The Standard Choice */}
            <ZigZagSection
                title="Le Split Mural : L'efficacité immédiate"
                description="Idéal pour équiper une chambre ou un salon sans gros travaux. Le mural s'installe vite et vous offre une fraîcheur instantanée de jour comme de nuit."
                imagePlacement="left"
                features={[
                    "Installation rapide (souvent 1 jour)",
                    "Silencieux (mode nuit ultra-discret)",
                    "Pilotage via télécommande ou Wifi",
                    "Filtres purificateurs d'air inclus"
                ]}
            />

            {/* 2. Console - Discreet like a radiator */}
            <ZigZagSection
                title="La Console : Discrétion façon radiateur"
                description="Vous n'aimez pas voir un appareil en hauteur ? La console basse se pose comme un radiateur classique, s'intégrant parfaitement sous une fenêtre ou dans des combles."
                imagePlacement="right"
                features={[
                    "Flux d'air double (haut/bas) pour un confort homogène",
                    "Parfait pour remplacer des radiateurs électriques",
                    "Design compact et intégration facile",
                    "Performance énergétique élevée (A++)"
                ]}
            />

            {/* 3. Cassette 1 voie - For larger spaces */}
            <ZigZagSection
                title="La Cassette : Pour les grands volumes"
                description="Souvent réservée aux bureaux ou aux très grands séjours avec faux-plafond. Elle libère totalement vos murs pour votre décoration."
                imagePlacement="left"
                features={[
                    "Distribution de l'air à 360° ou 4 voies",
                    "Intégration plafond (gain de place)",
                    "Idéal pour les surfaces ouvertes / Open Space"
                ]}
            />

            {/* 4. Multi-Split - One unit for all */}
            <ZigZagSection
                title="Multi-Split : Tout une maison, un seul moteur"
                description="Équipez 2, 3, 4 ou 5 pièces avec un seul groupe extérieur. Vous préservez l'esthétique de votre façade tout en climatisant l'ensemble de votre foyer."
                imagePlacement="right"
                features={[
                    "1 Groupe Extérieur = jusqu'à 5 unités intérieures",
                    "Contrôle individuel de la température par pièce",
                    "Économies d'énergie globales",
                    "Moins d'encombrement sur la terrasse/balcon"
                ]}
            />

            {/* FAQ / Installation Process */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center">Comment se passe l&apos;installation ?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <span style={{ fontSize: '3rem', color: '#CBD5E1', fontWeight: 'bold' }}>1</span>
                            <h3>Visite Technique</h3>
                            <p>Nous venons chez vous vérifier la faisabilité et les métrés pour un devis précis sans surprise.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <span style={{ fontSize: '3rem', color: '#CBD5E1', fontWeight: 'bold' }}>2</span>
                            <h3>Installation Propre</h3>
                            <p>Nos techniciens protègent votre intérieur. Les perçages sont aspirés. Le chantier est laissé impeccable.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <span style={{ fontSize: '3rem', color: '#CBD5E1', fontWeight: 'bold' }}>3</span>
                            <h3>Mise en Service</h3>
                            <p>Tests d&apos;étanchéité, explications de la télécommande et configuration du Wifi si souhaité.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="text-center section-padding">
                <Link href="/contact" className="btn btn-primary" style={{ transform: 'scale(1.2)' }}>
                    Demander mon rendez-vous
                </Link>
            </section>
        </div>
    );
}
