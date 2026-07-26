import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, Award, MapPin, Calendar } from 'lucide-react';
import PartnersBanner from '@/components/ui/PartnersBanner';

export default function HomePageFr() {
  return (
    <div>
      {/* Hero Content Section - High SEO impact */}
      <section style={{ padding: '4rem 0 2rem 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--primary-blue)',
              background: 'rgba(0,145,218,0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Chauffage & Climatisation Réversible
            </span>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.15',
              color: '#0F172A',
              letterSpacing: '-0.03em'
            }}>
              Artisan Climatisation à Miramas & Salon-de-Provence
            </h1>

            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2.5rem',
              color: 'var(--text-gray)',
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              Installation de <strong>climatisation réversible</strong>, pose de <strong>climatisation gainable</strong> invisible et contrats d&apos;<strong>entretien</strong> ou <strong>dépannage</strong> rapide de climatisation en villa dans toutes les Bouches-du-Rhône.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <Link
                href="/entretien#reserve"
                className="btn"
                style={{
                  background: '#48BB78',
                  color: 'white',
                  fontSize: '1.15rem',
                  padding: '1rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 6px rgba(72,187,120,0.2)',
                  borderRadius: '0.5rem',
                  fontWeight: '600'
                }}
              >
                <Calendar size={20} />
                Réserver un Entretien
              </Link>

              <Link
                href="/contact"
                className="btn"
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  fontSize: '1.15rem',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0,145,218,0.2)'
                }}
              >
                Devis Gratuit de Pose
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', color: 'var(--text-gray)', fontSize: '0.95rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>Devis et Étude sous 24h</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>Artisan RGE - Garantie Décennale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Video/Image only (Now Below Text) */}
      <section style={{
        position: 'relative',
        width: '100%',
        background: '#F8FAFC',
        paddingBottom: '4rem'
      }}>
        {/* Video container - Constrained width */}
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          lineHeight: 0,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          borderRadius: '1rem',
          overflow: 'hidden'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Partners Banner (Aspiré/Construit) */}
      <PartnersBanner />

      {/* High Quality Content Section - .FR Specific */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: '#0F172A', fontWeight: '800', textAlign: 'center' }}>
              Votre Confort Thermique par un Installateur RGE qualifié
            </h2>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Chez <strong>Air G Énergie</strong>, nous faisons de la qualité d&apos;installation notre marque de fabrique. Que ce soit pour équiper une villa neuve, rénover un appartement en centre-ville ou optimiser un local commercial, nos solutions de <strong>climatisation réversible</strong> et de <strong>pompe à chaleur</strong> s&apos;adaptent parfaitement aux exigences thermiques de notre région provençale.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                Nous maîtrisons les dernières technologies en matière de <strong>climatisation gainable</strong> (système discret et silencieux intégré en faux-plafond avec régulation pièce par pièce Airzone) ainsi que les monosplits et multisplits traditionnels de grandes marques. Notre certification <strong>RGE (Reconnu Garant de l&apos;Environnement)</strong> vous permet d&apos;accéder aux primes d&apos;État pour la pose de vos pompes à chaleur air-eau.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
                padding: '2.5rem',
                borderRadius: '1.25rem',
                color: 'white',
                margin: '2.5rem 0',
                boxShadow: '0 10px 20px rgba(0,107,166,0.15)'
              }}>
                <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '700' }}>
                  Nos Points Forts en Climatisation Résidentielle :
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>📍 Ancrage Local</strong>
                    <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>Basés à Miramas, nous couvrons Salon, Istres, Grans et les Bouches-du-Rhône avec rapidité.</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>🛡️ Garantie Décennale</strong>
                    <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>Toutes nos installations de systèmes aérothermiques sont garanties 10 ans.</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>⚙️ Devis Transparent</strong>
                    <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>Pas de surcoût, diagnostic honnête et tarifs d&apos;entretien forfaitaires affichés à l&apos;avance.</span>
                  </div>
                </div>
              </div>

              <h3 style={{ color: '#0F172A', fontSize: '1.6rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem' }}>
                Entretien et Dépannage de Climatisation
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Un système de clim mal entretenu perd en efficacité, augmente vos factures énergétiques et peut présenter des risques sanitaires (bactéries, moisissures). Notre équipe propose des interventions d&apos;<strong>entretien préventif et curatif</strong> méticuleuses : désinfection à la vapeur des évaporateurs, traitement antibactérien, vérification d&apos;étanchéité des fluides frigorigènes et nettoyage complet des grilles de reprise et de soufflage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '1rem', color: '#0F172A', fontWeight: '800' }}>
            Nos Domaines d&apos;Expertise
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.05rem' }}>
            Des prestations de qualité réalisées dans le respect des normes en vigueur et du confort de votre habitation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Climatisation */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ position: 'relative', height: '180px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <Image src="/images/ac-unit.png" alt="Climatisation réversible de villa" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#0F172A', fontWeight: '700' }}>Climatisation Réversible</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Idéale pour rafraîchir en été et chauffer en hiver. Régulation électronique de la température et réduction de la facture énergétique par rapport à un chauffage électrique classique.
                </p>
              </div>
              <Link href="/climatisation" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                En savoir plus
              </Link>
            </div>

            {/* Gainable */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', border: '2px solid var(--primary-blue)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: 'var(--primary-blue)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700' }}>
                  Tendance
                </span>
                <div style={{ position: 'relative', height: '180px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <Image src="/images/gainable-vents.png" alt="Climatisation gainable installée" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#0F172A', fontWeight: '700' }}>Climatisation Gainable</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Système entièrement dissimulé dans les combles. Seules des grilles de diffusion discrètes sont visibles. Idéal pour les villas afin de préserver l&apos;esthétique de votre décoration.
                </p>
              </div>
              <Link href="/gainable" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                Découvrir
              </Link>
            </div>

            {/* Entretien */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ position: 'relative', height: '180px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <Image src="/images/hero-maintenance.png" alt="Entretien de climatisation réversible" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#0F172A', fontWeight: '700' }}>Entretien & Réservation</h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Réservez en ligne votre entretien préventif ou votre diagnostic panne. Tarifs clairs, créneaux garantis pour prolonger l&apos;efficacité de vos climatiseurs.
                </p>
              </div>
              <Link href="/entretien" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                Réserver mon créneau
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area / Zones */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#0F172A', fontWeight: '800' }}>
              Zone d&apos;intervention de nos techniciens
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '3rem' }}>
              Installés à <strong>Miramas</strong>, nous nous déplaçons rapidement dans toutes les communes des Bouches-du-Rhône :
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                <MapPin size={24} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#0F172A' }}>Miramas</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Bureaux et Atelier - Proximité Immédiate</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                <MapPin size={24} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#0F172A' }}>Salon-de-Provence</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Déplacement en 15 minutes</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                <MapPin size={24} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#0F172A' }}>Istres</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Interventions rapides</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                <MapPin size={24} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#0F172A' }}>Grans</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Interventions et Devis gratuits</span>
              </div>
            </div>

            <Link href="/zones-intervention" className="btn btn-outline">
              Consulter nos autres villes partenaires (Fontvieille, Velaux, Sénas...)
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ background: '#F8FAFC', padding: '4.5rem 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '1.5rem' }}>
            Avis de nos clients
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', color: '#FBBC04' }}>★★★★★</span>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', display: 'block', color: '#0F172A' }}>4.9 / 5</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Moyenne Google Business Profile</span>
            </div>
          </div>
          <a
            href="https://share.google/sLKMxADrGA36sYOhR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Consulter les avis clients
          </a>
        </div>
      </section>
    </div>
  );
}
