import ZigZagSection from '@/components/ui/ZigZagSection';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export const metadata = {
    title: "Pompe à Chaleur (PAC) | Économies d'Énergie",
    description: "Divisez votre facture de chauffage par 3. Installation de Pompes à Chaleur Air/Air et Air/Eau en remplacement de chaudière.",
};

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

            {/* Final CTA */}
            <section className="text-center section-padding">
                <Link href="/contact" className="btn btn-primary">
                    Je veux un devis Pompe à Chaleur
                </Link>
            </section>
        </div>
    );
}
