import ZigZagSection from '@/components/ui/ZigZagSection';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Climatisation Gainable Miramas, Salon, Istres | Installation Invisible | Air G Énergie",
    description: "Climatisation gainable invisible avec zoning intelligent. Esthétique préservée, confort optimal. Devis gratuit. Prix 10-18k€ TTC. Certifié RGE.",
    openGraph: {
        title: "Climatisation Gainable Premium | Le Confort invisible",
        description: "La solution de climatisation la plus esthétique. Diffuseurs discrets, silence absolu et régulation pièce par pièce.",
        url: "https://airgenergie.fr/gainable",
        siteName: "AIR G Energie",
        images: [
            {
                url: "/images/real-gainable-kitchen-vents.jpg",
                width: 1200,
                height: 630,
                alt: "Installation climatisation gainable avec grilles discrètes",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Climatisation Gainable Premium | Le Confort invisible",
        description: "La solution de climatisation la plus esthétique. Diffuseurs discrets, silence absolu.",
        images: ["/images/real-gainable-kitchen-vents.jpg"],
    },
};

export default function GainablePage() {
    return (
        <div>
            {/* Hero Service */}
            <section style={{ background: '#0F172A', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'white' }}>Le confort absolu, sans rien voir</h1>
                    <p style={{ maxWidth: 600, margin: '0 auto 2rem', color: '#CBD5E1' }}>
                        Le gainable est la &quot;Rolls&quot; de la climatisation. Plus de blocs aux murs, juste une température parfaite et un silence d&apos;or.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Étudier mon projet Gainable
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Qu&apos;est-ce que la climatisation gainable ?</h2>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
                            La <strong>climatisation gainable</strong> est la solution haut de gamme pour climatiser votre maison tout en préservant l&apos;esthétique de votre intérieur. Contrairement aux splits muraux visibles, le système gainable est entièrement dissimulé dans vos combles ou faux-plafonds. Seules de discrètes grilles de diffusion, intégrées au plafond, témoignent de sa présence. Très prisée à <Link href='/ville/miramas' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Miramas</Link>, <Link href='/ville/aix-en-provence' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Aix-en-Provence</Link> et <Link href='/ville/istres' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Istres</Link>, cette solution offre un confort optimal sans compromettre votre décoration.
                        </p>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                            Résultat : <strong>aucun appareil visible sur vos murs</strong>, juste de fines grilles de diffusion au plafond. C&apos;est la solution privilégiée pour les maisons neuves, les rénovations haut de gamme, et tous ceux qui refusent de sacrifier leur décoration intérieure.
                        </p>

                        <div style={{
                            background: 'linear-gradient(135deg, #0091DA 0%, #00B4D8 100%)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            color: 'white',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Pour qui est fait le gainable ?</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🏡</span>
                                    <span><strong>Maison neuve ou en construction</strong> : Intégration parfaite dès la conception</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🔨</span>
                                    <span><strong>Rénovation complète</strong> : Profitez des travaux pour installer le réseau de gaines</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🎨</span>
                                    <span><strong>Amateurs de design</strong> : Préservez l&apos;esthétique de votre intérieur</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🏠</span>
                                    <span><strong>Grande surface (100m²+)</strong> : Solution économique pour climatiser toute la maison</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Les avantages du gainable</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👁️</div>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Esthétique Préservée</h3>
                            <p style={{ color: 'var(--text-gray)' }}>
                                Aucune unité murale visible. Seules de discrètes grilles de diffusion au plafond ou en partie haute des murs. Idéal pour les intérieurs design et les architectures contemporaines.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌡️</div>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Confort Homogène</h3>
                            <p style={{ color: 'var(--text-gray)' }}>
                                Diffusion douce de l&apos;air dans toutes les pièces. Pas de courant d&apos;air direct, pas de zones froides ou chaudes. Température uniforme dans toute la maison.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔇</div>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Silence Absolu</h3>
                            <p style={{ color: 'var(--text-gray)' }}>
                                L&apos;unité principale étant dans les combles, vous ne l&apos;entendez pas. Dans les pièces de vie : silence quasi-total (moins de 25 dB). Parfait pour les chambres.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Valorisation Immobilière</h3>
                            <p style={{ color: 'var(--text-gray)' }}>
                                Une climatisation gainable avec zoning est un argument de vente majeur. Elle peut augmenter la valeur de votre bien de 5 à 10% selon les estimations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 1. What is Gainable */}
            <ZigZagSection
                title="Comment ça marche ?"
                description="Tout le système est caché dans vos combles ou faux-plafonds. L'air frais (ou chaud) redescend doucement par de fines grilles d'aération. C'est la solution préférée des architectes d'intérieur."
                imagePlacement="left"
                imageSrc="/images/ducted-system.png"
                imageAlt="Installation climatisation gainable avec gaines et grilles"
                features={[
                    "Aucun appareil apparent sur les murs",
                    "Diffusion douce : pas de courant d'air direct",
                    "Silence quasi-total dans les pièces de vie"
                ]}
            />

            {/* 2. Zoning / Regulation */}
            <ZigZagSection
                title="Régulation Pièce par Pièce (Zoning)"
                description="Fini les disputes sur la température ! Avec le système de Zoning (Airzone ou Delta Dore), chaque chambre a son propre thermostat. M. veut 19°C, Mme veut 22°C ? C'est possible."
                imagePlacement="right"
                imageSrc="/images/gainable-vents.png"
                imageAlt="Grilles de soufflage climatisation gainable"
                features={[
                    "Thermostats individuels dans chaque pièce",
                    "Réduction de la consommation (ne chauffez que ce que vous utilisez)",
                    "Compatible pilotage Smartphone à distance"
                ]}
            />

            {/* 3. Use Cases */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center">Est-ce possible chez moi ?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <h3>Maison Neuve / Rénovation Lourde</h3>
                            <p>C&apos;est le moment idéal. Nous intégrons les réseaux dans les plans avant la pose du placo.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <h3>Maison avec Combles Perdus</h3>
                            <p>Si vous avez de la place sous le toit, nous pouvons installer l&apos;unité et passer les gaines facilement par le haut.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <h3>Appartement avec Faux-Plafond</h3>
                            <p>Possible si vous avez (ou créez) un faux-plafond dans le couloir pour distribuer vers les chambres.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Installation gainable : pré-requis et déroulement</h2>

                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                            L&apos;installation d&apos;une climatisation gainable nécessite un espace technique (combles, faux-plafond) pour accueillir l&apos;unité intérieure et le réseau de gaines. Voici ce qu&apos;il faut savoir :
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>📏 Espace Requis</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    Combles accessibles (hauteur min. 80cm) ou faux-plafond (min. 30cm). L&apos;unité intérieure mesure environ 100x60x30cm selon la puissance.
                                </p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>⏱️ Durée Travaux</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    2 à 4 jours selon la configuration. Maison neuve : 2-3 jours. Rénovation avec percements : 3-4 jours. Installation propre et soignée garantie.
                                </p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>💶 Prix Indicatif</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    10 000€ à 18 000€ TTC pour une maison 120-150m² avec zoning. Inclut matériel, pose, gaines, grilles et mise en service. Aides déductibles.
                                </p>
                            </div>
                        </div>

                        <div style={{ background: '#FFF7ED', padding: '1.5rem', borderRadius: '0.75rem', borderLeft: '4px solid #F59E0B' }}>
                            <h3 style={{ color: '#92400E', marginBottom: '0.75rem' }}>💡 Conseil d&apos;expert</h3>
                            <p style={{ color: '#78350F', marginBottom: 0 }}>
                                Le gainable est particulièrement rentable pour les maisons de plus de 100m². En dessous, un <Link href='/climatisation' style={{ color: '#92400E', textDecoration: 'underline' }}>multi-split</Link> peut être plus économique. Nous étudions gratuitement la meilleure solution pour votre projet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Gainable vs autres solutions : le comparatif</h2>

                    <div style={{ maxWidth: '1000px', margin: '0 auto', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '0.75rem', overflow: 'hidden' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, #0091DA 0%, #00B4D8 100%)', color: 'white' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Critère</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Gainable</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Multi-Split</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Split Mural</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Esthétique</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Confort</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Prix</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>10-18k€</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>3k€ - 8k€</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>1.5k€ - 4.5k€</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Installation</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>2-4 jours</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>1-2 jours</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>1 jour</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Silence</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                                </tr>
                                <tr style={{ background: '#F8FAFC' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Idéal pour</td>
                                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>50m² - 200m²</td>
                                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Maison 80-120m²</td>
                                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Appart / 1-2 pièces</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Questions fréquentes sur le gainable</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Peut-on installer du gainable en rénovation ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Oui, à condition d&apos;avoir des combles accessibles ou de créer un faux-plafond. Dans une rénovation lourde (avec travaux de placo), c&apos;est le moment idéal. Pour une rénovation légère, nous étudions la faisabilité lors de la visite technique gratuite. Parfois, une solution mixte (gainable + splits muraux) est plus adaptée.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Qu&apos;est-ce que le zoning intelligent ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Le zoning (Airzone, Delta Dore) permet de contrôler la température pièce par pièce avec des thermostats individuels. Chaque zone peut être programmée indépendamment : 19°C dans les chambres, 22°C dans le salon, arrêt dans les pièces inoccupées. Résultat : <strong>jusqu&apos;à 30% d&apos;économies d&apos;énergie</strong> et un confort personnalisé pour chaque membre de la famille.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Combien coûte une climatisation gainable ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Pour une maison de 120-150m² avec 4-5 pièces et zoning, comptez <strong>10 000€ à 18 000€ TTC</strong> installation comprise. Ce tarif inclut l&apos;unité intérieure gainable, le groupe extérieur, le réseau de gaines isolées, les grilles de diffusion design, le système de zoning, et la mise en service complète. Les aides financières (CEE, MaPrimeRénov&apos;) peuvent réduire ce coût de 1 500€ à 3 000€.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Le gainable consomme-t-il plus qu&apos;un split ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Non, au contraire ! Avec le zoning, vous ne climatisez que les pièces occupées, ce qui réduit la consommation. De plus, les pertes de charge dans les gaines sont compensées par des unités haute performance (SCOP 4 à 5). Sur une saison, un gainable avec zoning consomme souvent <strong>moins qu&apos;un multi-split</strong> qui climatise toutes les pièces en permanence.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Peut-on piloter le gainable à distance ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Absolument ! Les systèmes modernes (Airzone Cloud, Delta Dore Tydom) permettent de piloter votre climatisation gainable depuis votre smartphone, où que vous soyez. Vous pouvez ajuster la température de chaque zone, programmer des plages horaires, et même activer le mode vacances. Certains systèmes sont compatibles avec Alexa et Google Home pour un contrôle vocal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="text-center section-padding">
                <Link href="/contact" className="btn btn-primary" style={{ transform: 'scale(1.2)' }}>
                    Demander une étude de faisabilité
                </Link>
            </section>
        </div>
    );
}
