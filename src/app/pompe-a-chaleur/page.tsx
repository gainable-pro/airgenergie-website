import ZigZagSection from '@/components/ui/ZigZagSection';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

import type { Metadata } from 'next';
import { getSeoAlternates } from '@/lib/seo-url';

export async function generateMetadata(): Promise<Metadata> {
    const alternates = await getSeoAlternates('/pompe-a-chaleur');
    return {
        title: "Pompe à Chaleur Miramas, Salon, Istres | PAC Air-Air & Air-Eau | Air G Énergie",
        description: "Installation pompe à chaleur (PAC) air-air et air-eau. Économisez jusqu'à 70% sur votre facture. Devis gratuit. Labellisé Entreprise Garantie 2025.",
        alternates,
        openGraph: {
            title: "Pompe à Chaleur Air/Eau | Installation & Remplacement | Air G Energie",
            description: "Optez pour une pompe à chaleur air/eau performante. Économies d'énergie et installation par des experts labellisés Garantie 2025 à Miramas et alentours.",
            url: alternates.canonical,
            siteName: "AIR G Energie",
            images: [
                {
                    url: "/images/real-outdoor-units-daikin.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Installation pompe à chaleur Daikin unités extérieures",
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Pompe à Chaleur (PAC) | Économies d'Énergie",
            description: "Divisez votre facture de chauffage par 3. Installation de Pompes à Chaleur Air/Air et Air/Eau.",
            images: ["/images/real-outdoor-units-daikin.jpg"],
        },
    };
}

export default function HeatPumpPage() {
    return (
        <div>
            {/* Hero Service */}
            <section style={{ background: '#0F172A', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ color: 'white' }}>Chauffez mieux, payez moins</h1>
                    <p style={{ maxWidth: 600, margin: '0 auto 2rem', color: '#CBD5E1' }}>
                        La Pompe à Chaleur (PAC) est la solution de chauffage la plus rentable aujourd&apos;hui. Elle capte les calories gratuites de l&apos;air pour chauffer votre maison.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Calculer mes économies
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Qu&apos;est-ce qu&apos;une pompe à chaleur ?</h2>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
                            Une <strong>pompe à chaleur (PAC)</strong> est un système de chauffage ultra-performant qui capte les calories présentes naturellement dans l&apos;air extérieur pour chauffer votre logement. Même par -10°C, l&apos;air contient de l&apos;énergie que la PAC transforme en chaleur.
                        </p>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)' }}>
                            En Provence, où les hivers sont doux (rarement en dessous de 0°C à <Link href='/ville/miramas' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Miramas</Link> ou <Link href='/ville/salon-de-provence' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Salon-de-Provence</Link>), la pompe à chaleur est <strong>LE système de chauffage le plus économique</strong>. Elle consomme 3 à 4 fois moins d&apos;énergie qu&apos;un radiateur électrique classique.
                        </p>

                        <div style={{
                            background: 'linear-gradient(135deg, #0091DA 0%, #00B4D8 100%)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            color: 'white',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>PAC Air-Air vs PAC Air-Eau : quelle différence ?</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '0.75rem' }}>🌬️ PAC Air-Air</h4>
                                    <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                                        = <Link href='/climatisation' style={{ color: 'white', textDecoration: 'underline' }}>Climatisation réversible</Link>. Souffle de l&apos;air chaud ou froid. Installation rapide. Idéal pour remplacer des radiateurs électriques.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '0.75rem' }}>💧 PAC Air-Eau</h4>
                                    <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                                        Chauffe l&apos;eau de vos radiateurs ou plancher chauffant. Remplace une chaudière fioul/gaz. Peut produire l&apos;eau chaude sanitaire.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Savings Section */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Économies réalisées avec une pompe à chaleur</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '3rem' }}>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)', textAlign: 'center' }}>
                            Le <strong>COP (Coefficient de Performance)</strong> mesure l&apos;efficacité d&apos;une PAC. Un COP de 4 signifie que pour 1 kWh d&apos;électricité consommé, la PAC produit 4 kWh de chaleur. Les 3 kWh supplémentaires sont gratuits, captés dans l&apos;air !
                        </p>

                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Comparatif coûts annuels de chauffage (maison 100m²)</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Système</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Coût annuel</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Économie vs PAC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>Radiateurs électriques</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>1 800€</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#DC2626' }}>+1 200€/an</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>Chaudière gaz</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>1 400€</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#DC2626' }}>+800€/an</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>Chaudière fioul</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>2 200€</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#DC2626' }}>+1 600€/an</td>
                                    </tr>
                                    <tr style={{ background: '#DBEAFE' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>✅ Pompe à Chaleur</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>600€</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#059669', fontWeight: 'bold' }}>Référence</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginTop: '1rem', textAlign: 'center' }}>
                                *Estimations basées sur une maison 100m² en Provence, tarifs 2024
                            </p>
                        </div>

                        <div style={{ background: '#FFF7ED', padding: '1.5rem', borderRadius: '0.75rem', borderLeft: '4px solid #F59E0B' }}>
                            <h3 style={{ color: '#92400E', marginBottom: '0.75rem' }}>💰 Retour sur investissement</h3>
                            <p style={{ color: '#78350F', marginBottom: 0 }}>
                                Avec une économie de 1 200€/an par rapport à des radiateurs électriques, une PAC air-air (coût 6 000€ après aides) est rentabilisée en <strong>5 ans</strong>. Durée de vie moyenne : 15-20 ans. Soit 10-15 ans de chauffage quasi-gratuit !
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 1. PAC Air/Air */}
            <ZigZagSection
                title="Pompe à Chaleur Air / Air"
                description="C'est tout simplement une climatisation réversible. Elle souffle du chaud l'hiver et du froid l'été. C'est le système le plus réactif pour monter en température rapidement."
                imagePlacement="left"
                imageSrc="/images/pac-air-air.png"
                imageAlt="Pompe à chaleur air-air unité extérieure"
                features={[
                    "Chauffage très économique (COP > 4)",
                    "Climatisation en bonus pour l'été",
                    "Idéal en rénovation électrique"
                ]}
            />

            {/* 2. PAC Air/Eau (Coming Soon or Brief mention if relevant for them) */}
            {/* NOTE: User brief emphasized Clim Reversible (Air/Air), but usually PAC implies Air/Water replacement. 
           I'll keep it focused on the benefits user requested: Savings. */}
            {/* 2. PAC Air/Eau */}
            <ZigZagSection
                title="Pompe à Chaleur Air / Eau"
                description="Le remplacement idéal de votre vieille chaudière fioul ou gaz. Elle se connecte directement sur vos radiateurs existants ou votre plancher chauffant."
                imagePlacement="right"
                imageSrc="/images/pac-air-eau.png"
                imageAlt="Pompe à chaleur air-eau installation complète"
                features={[
                    "Conservez vos radiateurs actuels",
                    "Eau chaude sanitaire incluse (selon modèles)",
                    "Éligible aux aides MaPrimeRénov (sous conditions)"
                ]}
            />

            {/* Savings visual */}
            <section className="section-padding" style={{ textAlign: 'center', background: '#e0f2fe' }}>
                <div className="container">
                    <h2>Divisez votre facture par 3</h2>
                    <p>Pour 1kW d&apos;électricité payé, la PAC en restitue jusqu&apos;à 4kW de chaleur.</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem', alignItems: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ height: '200px', width: '80px', background: '#94a3b8', margin: '0 auto', borderRadius: '8px 8px 0 0' }}></div>
                            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Radiateur Élec</p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{ height: '140px', width: '80px', background: '#64748b', margin: '0 auto', borderRadius: '8px 8px 0 0' }}></div>
                            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Chaudière Gaz</p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{ height: '60px', width: '80px', background: '#2CA5FF', margin: '0 auto', borderRadius: '8px 8px 0 0', position: 'relative' }}>
                                <span style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', color: '#0369a1', fontWeight: 'bold' }}>-70%</span>
                                <ArrowDown style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', color: '#0369a1' }} size={20} />
                            </div>
                            <p style={{ fontWeight: 'bold', marginTop: '1rem', color: '#0369a1' }}>Pompe à Chaleur</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial Aid Section */}
            <section className="section-padding">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Aides financières pour installer une pompe à chaleur</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-gray)', textAlign: 'center' }}>
                            L&apos;État encourage fortement l&apos;installation de pompes à chaleur pour remplacer les systèmes de chauffage polluants. Plusieurs aides cumulables peuvent réduire significativement votre investissement.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>🏠 MaPrimeRénov&apos;</h3>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
                                    Aide de l&apos;État pour remplacer un chauffage fossile (fioul, gaz) par une PAC.
                                </p>
                                <ul style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    <li><strong>Ménages modestes :</strong> jusqu&apos;à 4 000€</li>
                                    <li><strong>Ménages intermédiaires :</strong> jusqu&apos;à 3 000€</li>
                                    <li><strong>Ménages aisés :</strong> jusqu&apos;à 2 000€</li>
                                </ul>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>⚡ CEE (Certificats d&apos;Économie d&apos;Énergie)</h3>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
                                    Prime versée par les fournisseurs d&apos;énergie (EDF, Engie, etc.).
                                </p>
                                <ul style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    <li><strong>PAC air-air :</strong> 500€ à 800€</li>
                                    <li><strong>PAC air-eau :</strong> 2 500€ à 4 000€</li>
                                    <li>Montant selon revenus et zone géographique</li>
                                </ul>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>💰 TVA Réduite 10%</h3>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
                                    Automatique pour les logements de plus de 2 ans.
                                </p>
                                <ul style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    <li>TVA à 10% au lieu de 20%</li>
                                    <li>Économie : environ 600€ sur une PAC à 6 000€</li>
                                    <li>Aucune démarche particulière</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ background: '#DBEAFE', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>🎯 Exemple concret</h3>
                            <p style={{ color: 'var(--text-dark)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                                <strong>PAC air-air multi-split (4 pièces) :</strong> 8 000€ TTC<br />
                                - CEE : -800€<br />
                                - TVA réduite : -600€<br />
                                = <strong style={{ color: 'var(--primary-blue)', fontSize: '1.3rem' }}>6 600€ reste à charge</strong>
                            </p>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginTop: '1rem' }}>
                                💡 Nous vous accompagnons gratuitement dans toutes vos démarches administratives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Questions fréquentes sur les pompes à chaleur</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Une PAC fonctionne-t-elle quand il fait froid ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Oui ! Les PAC modernes fonctionnent jusqu&apos;à -15°C voire -25°C pour les modèles haut de gamme. En Provence, où les températures descendent rarement en dessous de 0°C, la PAC est parfaitement adaptée. Son rendement est même optimal dans notre climat doux : un COP de 4 à 5 en hiver provençal, contre 2,5 à 3 dans le Grand Est.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Quelle est la différence entre PAC air-air et air-eau ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                La <strong>PAC air-air</strong> (climatisation réversible) souffle directement de l&apos;air chaud ou froid via des unités murales. Installation rapide, idéale pour remplacer des radiateurs électriques. La <strong>PAC air-eau</strong> chauffe l&apos;eau de votre circuit de chauffage central (radiateurs, plancher chauffant). Elle remplace une chaudière fioul ou gaz. Plus coûteuse à l&apos;installation, mais éligible à plus d&apos;aides (MaPrimeRénov&apos; jusqu&apos;à 4 000€).
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Combien coûte une pompe à chaleur ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                <strong>PAC air-air :</strong> 2 500€ à 4 500€ pour un split simple, 6 000€ à 12 000€ pour un multi-split 3-4 pièces. <strong>PAC air-eau :</strong> 10 000€ à 16 000€ selon la puissance et le type de radiateurs. Ces tarifs incluent le matériel, la pose et la mise en service. Déduisez ensuite les aides : CEE (500€ à 4 000€), MaPrimeRénov&apos; (jusqu&apos;à 4 000€ pour PAC air-eau), et TVA réduite 10%.
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Puis-je bénéficier des aides si je remplace des radiateurs électriques ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Pour une PAC air-air, vous êtes éligible aux <strong>CEE (500€ à 800€)</strong> et à la <strong>TVA réduite 10%</strong>. MaPrimeRénov&apos; n&apos;est pas disponible pour les PAC air-air. Pour une PAC air-eau, nous assurons des installations conformes aux normes les plus strictes. <strong>Garantie de qualité :</strong> faire appel à un installateur qualifié et labellisé (comme AIR G Energie, labellisé Entreprise Garantie 2025 et Expert Gainable.fr).
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>La PAC est-elle bruyante ?</h3>
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                                Les unités intérieures sont très silencieuses (19-25 dB en mode nuit). Le groupe extérieur émet 45-55 dB, soit le niveau d&apos;une conversation normale. Nous respectons la réglementation acoustique (pas plus de 5 dB d&apos;émergence chez les voisins) et positionnons stratégiquement l&apos;unité extérieure : éloignée des chambres, sur plots anti-vibrations, avec écran acoustique si nécessaire. Les modèles Inverter récents sont particulièrement silencieux.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="text-center section-padding">
                <Link href="/contact" className="btn btn-primary">
                    Je veux un devis Pompe à Chaleur
                </Link>
            </section>
        </div>
    );
}
