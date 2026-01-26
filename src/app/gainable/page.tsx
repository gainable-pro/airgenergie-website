import ZigZagSection from '@/components/ui/ZigZagSection';
import Link from 'next/link';

export const metadata = {
    title: "Climatisation Gainable Premium | Le Confort invisible",
    description: "La solution de climatisation la plus esthétique. Diffuseurs discrets, silence absolu et régulation pièce par pièce (Zone Control).",
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

            {/* 1. What is Gainable */}
            <ZigZagSection
                title="Comment ça marche ?"
                description="Tout le système est caché dans vos combles ou faux-plafonds. L&apos;air frais (ou chaud) redescend doucement par de fines grilles d&apos;aération. C&apos;est la solution préférée des architectes d&apos;intérieur."
                imagePlacement="left"
                features={[
                    "Aucun appareil apparent sur les murs",
                    "Diffusion douce : pas de courant d'air direct",
                    "Silence quasi-total dans les pièces de vie"
                ]}
            />

            {/* 2. Zoning / Regulation */}
            <ZigZagSection
                title="Régulation Pièce par Pièce (Zoning)"
                description="Fini les disputes sur la température ! Avec le système de Zoning (Airzone ou Delta Dore), chaque chambre a son propre thermostat. M. veut 19°C, Mme veut 22°C ? C&apos;est possible."
                imagePlacement="right"
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

            {/* Final CTA */}
            <section className="text-center section-padding">
                <Link href="/contact" className="btn btn-primary" style={{ transform: 'scale(1.2)' }}>
                    Demander une étude de faisabilité
                </Link>
            </section>
        </div>
    );
}
