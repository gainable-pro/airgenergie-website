import ZigZagSection from '../../components/ui/ZigZagSection';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSeoAlternates } from '@/lib/seo-url';

export async function generateMetadata(): Promise<Metadata> {
    const alternates = await getSeoAlternates('/climatisation');
    return {
        title: "Climatisation Réversible Miramas, Salon, Istres | Installation & Prix | Air G Énergie",
        description: "Installation climatisation réversible en Provence : Split, Console, Gainable, Multi-split. Devis gratuit, labellisé Garantie 2025. Prix à partir de 2500€ TTC.",
        alternates,
    };
}

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

            {/* Introduction Section - Why Reversible AC */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Pourquoi choisir la climatisation réversible en Provence ?</h2>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
                            Avec des étés qui dépassent régulièrement les 35°C à <Link href='/ville/miramas' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Miramas</Link>, <Link href='/ville/salon-de-provence' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Salon-de-Provence</Link> ou <Link href='/ville/istres' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Istres</Link>, la climatisation n&apos;est plus un luxe mais une nécessité pour votre confort quotidien. Mais pourquoi se limiter au rafraîchissement quand vous pouvez aussi chauffer votre logement en hiver ?
                        </p>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                            La <strong>climatisation réversible</strong> (aussi appelée <Link href='/pompe-a-chaleur' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>pompe à chaleur air-air</Link>) est une solution 2-en-1 qui rafraîchit l&apos;été et chauffe l&apos;hiver. Avec un coefficient de performance (COP) pouvant atteindre 4, elle produit 4 fois plus d&apos;énergie qu&apos;elle n&apos;en consomme. Résultat : <strong>jusqu&apos;à 60% d&apos;économies</strong> par rapport à des radiateurs électriques classiques.
                        </p>

                        <div style={{
                            background: 'linear-gradient(135deg, #0091DA 0%, #00B4D8 100%)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            color: 'white',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Les avantages de la climatisation réversible</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                                    <span><strong>Confort été/hiver</strong> : Une seule installation pour toute l&apos;année</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                                    <span><strong>Économies d&apos;énergie</strong> : Jusqu&apos;à 60% de réduction sur votre facture de chauffage</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                                    <span><strong>Installation rapide</strong> : Généralement 1 journée pour un split mural</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                                    <span><strong>Éligible aux aides</strong> : MaPrimeRénov&apos;, CEE, TVA réduite 10%</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                                    <span><strong>Silencieux</strong> : Mode nuit à partir de 19 dB (moins qu&apos;un chuchotement)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide: Which AC for your home */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Quelle climatisation pour votre logement ?</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Appartement (50-80m²)</h3>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>
                                <strong>Solution recommandée :</strong> Split mural ou console
                            </p>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                Installation simple et rapide. Idéal pour climatiser 1 à 2 pièces principales (salon + chambre). Budget indicatif : 2 500€ à 4 500€ TTC installé.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Maison (100-150m²)</h3>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>
                                <strong>Solution recommandée :</strong> Multi-split ou gainable
                            </p>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                Multi-split pour 3-4 pièces avec un seul groupe extérieur. <Link href='/gainable' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Gainable</Link> pour une solution invisible. Budget : 6 000€ à 12 000€ TTC.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Grande maison (150m²+)</h3>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>
                                <strong>Solution recommandée :</strong> Gainable avec zoning
                            </p>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                Système centralisé avec contrôle pièce par pièce. Confort optimal et esthétique préservée. Budget : 10 000€ à 18 000€ TTC selon configuration.
                            </p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                            <strong>Besoin d&apos;un conseil personnalisé ?</strong> Nos techniciens se déplacent gratuitement pour étudier votre projet.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Demander une visite technique gratuite
                        </Link>
                    </div>
                </div>
            </section>


            {/* 1. Split Mural - The Standard Choice */}
            <ZigZagSection
                title="Le Split Mural : L'efficacité immédiate"
                description="Idéal pour équiper une chambre ou un salon sans gros travaux. Le mural s'installe vite et vous offre une fraîcheur instantanée de jour comme de nuit."
                imagePlacement="left"
                imageSrc="/images/split-mural.png"
                imageAlt="Climatisation split mural dans salon moderne"
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
                imageSrc="/images/console-ac.png"
                imageAlt="Climatisation console au sol"
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
                imageSrc="/images/cassette-ac.png"
                imageAlt="Climatisation cassette plafond 4 voies"
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
                imageSrc="/images/multi-split.png"
                imageAlt="Système multi-split avec unités intérieures et extérieures"
                features={[
                    "1 Groupe Extérieur = jusqu'à 5 unités intérieures",
                    "Contrôle individuel de la température par pièce",
                    "Économies d'énergie globales",
                    "Moins d'encombrement sur la terrasse/balcon"
                ]}
            />

            {/* Professional Installation Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Installation professionnelle : l&apos;importance du dimensionnement</h2>

                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
                            Une climatisation mal dimensionnée peut consommer jusqu&apos;à 30% d&apos;énergie en plus et tomber en panne prématurément. C&apos;est pourquoi chez <strong>AIR G Energie</strong>, nous réalisons systématiquement une <strong>étude thermique gratuite</strong> avant toute installation.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>🏆 Label Garantie 2025</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    Entreprise labellisée Les Entreprises Garanties 2025 et Expert Vérifié Gainable.fr. Gage suprême de qualité et de rigueur d&apos;installation.
                                </p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>🛡️ Garantie Décennale</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    Toutes nos installations sont couvertes par une garantie décennale. Votre investissement est protégé pendant 10 ans.
                                </p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', border: '2px solid #E2E8F0' }}>
                                <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>⭐ Marques Premium</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                    Nous travaillons exclusivement avec des marques reconnues : Daikin, Mitsubishi Electric, Toshiba, Atlantic. Fiabilité garantie.
                                </p>
                            </div>
                        </div>

                        <div style={{ background: '#FFF7ED', padding: '1.5rem', borderRadius: '0.75rem', borderLeft: '4px solid #F59E0B' }}>
                            <h3 style={{ color: '#92400E', marginBottom: '0.75rem' }}>💡 Le saviez-vous ?</h3>
                            <p style={{ color: '#78350F', marginBottom: 0 }}>
                                Une climatisation bien dimensionnée et installée par un professionnel qualifié peut durer <strong>15 à 20 ans</strong>. L&apos;économie réalisée sur votre facture d&apos;énergie permet généralement de rentabiliser l&apos;investissement en <strong>3 à 5 ans</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Questions fréquentes sur la climatisation</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Combien coûte une climatisation réversible ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Le prix varie selon le type d&apos;installation : <strong>2 500€ à 4 500€ TTC</strong> pour un split mural simple, <strong>6 000€ à 12 000€ TTC</strong> pour un multi-split 3-4 pièces, et <strong>10 000€ à 18 000€ TTC</strong> pour une climatisation gainable complète. Ces tarifs incluent le matériel, la pose et la mise en service. Déduisez ensuite les aides financières (jusqu&apos;à 2 000€ avec MaPrimeRénov&apos; et CEE).
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Quelle puissance pour ma surface ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                En règle générale, comptez <strong>100 watts par m²</strong> pour une pièce bien isolée (soit 2,5 kW pour 25m²). Mais attention : ce calcul est approximatif. L&apos;orientation, l&apos;isolation, la hauteur sous plafond et le nombre de fenêtres influencent fortement le dimensionnement. C&apos;est pourquoi nous réalisons toujours une visite technique gratuite pour calculer précisément vos besoins.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>L&apos;entretien de la climatisation est-il obligatoire ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Oui, depuis 2020, l&apos;entretien annuel est <strong>obligatoire pour les climatisations de plus de 2 kg de fluide frigorigène</strong> (environ 4 kW, soit la majorité des installations). Cet entretien comprend le nettoyage des filtres, la vérification de l&apos;étanchéité du circuit et le contrôle des performances. Tarif indicatif : 120€ à 180€ TTC/an. Un contrat d&apos;entretien vous garantit un rendez-vous prioritaire et des tarifs préférentiels.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Quelles aides financières pour installer une climatisation ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Les climatisations réversibles (pompes à chaleur air-air) sont éligibles aux <strong>Certificats d&apos;Économie d&apos;Énergie (CEE)</strong>, qui peuvent atteindre 500€ à 800€ selon vos revenus. Si vous remplacez un chauffage électrique ou fioul, vous pouvez aussi bénéficier de <strong>MaPrimeRénov&apos;</strong> (jusqu&apos;à 2 000€ pour les ménages modestes). Enfin, la <strong>TVA réduite à 10%</strong> s&apos;applique automatiquement pour les logements de plus de 2 ans. Nous vous accompagnons gratuitement dans vos démarches.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Quel est le délai pour installer une climatisation ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Après la visite technique et l&apos;acceptation du devis, comptez <strong>1 à 2 semaines</strong> en période normale (hors haute saison). En mai-juin-juillet, les délais peuvent s&apos;allonger à 3-4 semaines en raison de la forte demande. <strong>Conseil :</strong> anticipez votre projet dès le printemps pour profiter de votre climatisation dès les premières chaleurs. L&apos;installation elle-même prend généralement 1 journée pour un split simple, 2 jours pour un multi-split.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>La climatisation est-elle bruyante ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Les climatisations modernes sont extrêmement silencieuses. Les unités intérieures descendent à <strong>19-22 dB en mode nuit</strong> (moins qu&apos;un chuchotement). Les groupes extérieurs sont plus audibles (45-55 dB) mais nous les positionnons stratégiquement pour minimiser les nuisances. Nous respectons scrupuleusement la réglementation acoustique et privilégions les emplacements éloignés des chambres et des voisins.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


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
