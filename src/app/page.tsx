import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, Award, MapPin, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
  description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h. Entreprise locale certifiée RGE.",
  openGraph: {
    title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
    description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h. Entreprise locale certifiée RGE.",
    url: "https://www.airgenergie.com",
    siteName: "AIR G Energie",
    images: [
      {
        url: "/images/hero-technician-ac.png",
        width: 1200,
        height: 630,
        alt: "AIR G Energie - Installation Climatisation Miramas",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Climatisation Miramas & Salon-de-Provence | Air G Énergie",
    description: "Installation climatisation réversible à Miramas, Istres, Salon-de-Provence. Devis gratuit sous 24h.",
    images: ["/images/hero-technician-ac.png"],
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Content Section (Text Above Video) */}
      <section style={{ padding: '4rem 0 2rem 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              color: 'var(--text-dark)',
            }}>
              Votre Spécialiste Climatisation dans les Bouches-du-Rhône
            </h1>

            <p style={{
              fontSize: '1.5rem',
              marginBottom: '2.5rem',
              color: 'var(--text-gray)',
              fontWeight: '500'
            }}>
              Installation • Entretien • Dépannage
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <a
                href="tel:0413414901"
                className="btn"
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  fontSize: '1.2rem',
                  padding: '1rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0,145,218,0.2)',
                  borderRadius: '0.5rem'
                }}
              >
                <Phone size={22} />
                04 13 41 49 01
              </a>

              <Link
                href="/contact"
                className="btn"
                style={{
                  background: 'white',
                  color: 'var(--text-dark)',
                  border: '2px solid var(--text-dark)',
                  fontSize: '1.2rem',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem'
                }}
              >
                Devis Gratuit
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', color: 'var(--text-gray)', fontSize: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={20} style={{ color: 'var(--primary-blue)' }} />
                <span>Devis sous 24h</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} style={{ color: 'var(--primary-blue)' }} />
                <span>Certifié RGE</span>
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
        paddingBottom: '4rem' // Add some bottom spacing
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


      {/* Company Presentation Section - Enriched */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
              AIR G Energie, Votre Spécialiste Climatisation à Miramas
            </h2>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)', textAlign: 'left' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--primary-blue)' }}>AIR G Energie</strong> est une entreprise locale spécialisée dans l&apos;installation, l&apos;entretien et le dépannage de systèmes de climatisation et de chauffage dans les Bouches-du-Rhône. Basés à <Link href='/ville/miramas' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Miramas</Link>, nous intervenons rapidement sur tout le département grâce à notre proximité et notre connaissance du terrain.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                Depuis notre création, nous avons accompagné des centaines de particuliers et de professionnels dans leurs projets de confort thermique. Notre expertise couvre tous les types d&apos;installations : <Link href='/climatisation' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>climatisation réversible</Link>, <Link href='/gainable' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>climatisation gainable</Link>, et <Link href='/pompe-a-chaleur' style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>pompes à chaleur</Link> air-air et air-eau.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #0091DA 0%, #00B4D8 100%)',
                padding: '2rem',
                borderRadius: '1rem',
                color: 'white',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>Nos valeurs</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                    <strong>Proximité</strong>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: 0 }}>Basés à Miramas, nous intervenons en moins de 30 minutes sur notre zone</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                    <strong>Réactivité</strong>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: 0 }}>Devis sous 24h, intervention rapide, SAV disponible</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                    <strong>Qualité</strong>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: 0 }}>Marques premium, installation soignée, garantie décennale</p>
                  </div>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>Nos certifications et garanties</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle size={24} style={{ color: 'var(--primary-blue)', flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)' }}>Certification RGE</strong>
                      <p style={{ fontSize: '0.95rem', marginTop: '0.25rem', marginBottom: 0 }}>Reconnu Garant de l&apos;Environnement, obligatoire pour les aides financières</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle size={24} style={{ color: 'var(--primary-blue)', flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)' }}>Garantie Décennale</strong>
                      <p style={{ fontSize: '0.95rem', marginTop: '0.25rem', marginBottom: 0 }}>Toutes nos installations sont couvertes pendant 10 ans</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle size={24} style={{ color: 'var(--primary-blue)', flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)' }}>Marques Premium</strong>
                      <p style={{ fontSize: '0.95rem', marginTop: '0.25rem', marginBottom: 0 }}>Daikin, Mitsubishi Electric, Toshiba, Atlantic</p>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>
                Que vous soyez un particulier souhaitant équiper votre maison d&apos;une climatisation réversible, ou un professionnel recherchant une solution de chauffage performante, <strong>AIR G Energie vous accompagne de A à Z</strong> : étude thermique gratuite, dimensionnement précis, installation propre et soignée, mise en service complète, et suivi après-vente réactif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
            Notre zone d&apos;intervention
          </h2>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)', textAlign: 'center', marginBottom: '2rem' }}>
              Depuis notre atelier de <strong>Miramas</strong>, nous couvrons l&apos;ensemble des <strong>Bouches-du-Rhône</strong> avec des temps d&apos;intervention optimisés. Notre proximité nous permet d&apos;être réactifs pour vos urgences et de limiter les frais de déplacement.
            </p>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Villes principales d&apos;intervention</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                  <Link href='/ville/miramas' style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: '600' }}>Miramas</Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.25rem', marginBottom: 0 }}>Base - 5 min</p>
                </div>
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                  <Link href='/ville/salon-de-provence' style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: '600' }}>Salon-de-Provence</Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.25rem', marginBottom: 0 }}>15 min</p>
                </div>
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                  <Link href='/ville/istres' style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: '600' }}>Istres</Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.25rem', marginBottom: 0 }}>15 min</p>
                </div>
                <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }} />
                  <Link href='/ville/aix-en-provence' style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: '600' }}>Aix-en-Provence</Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.25rem', marginBottom: 0 }}>30 min</p>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-gray)', textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
                Nous intervenons également à : Martigues, Vitrolles, Grans, La Fare-les-Oliviers, Saint-Chamas, Marseille, Côte Bleue et toutes communes environnantes.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/zones-intervention" className="btn btn-primary">
                Voir toutes nos zones d&apos;intervention
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
            Nos Services à Miramas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Climatisation Card */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <Image src="/images/ac-unit.png" alt="Climatisation réversible" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Climatisation</h3>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                Installation de climatisation réversible. Confort été comme hiver.
              </p>
              <Link href="/climatisation" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                En savoir plus
              </Link>
            </div>

            {/* Gainable Card */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', border: '2px solid var(--primary-blue)' }}>
              <div style={{ background: 'var(--primary-blue)', color: 'white', padding: '0.25rem 1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                ⭐ POPULAIRE
              </div>
              <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <Image src="/images/gainable-vents.png" alt="Climatisation gainable - Grilles de soufflage" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Climatisation Gainable</h3>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                Climatisation invisible et silencieuse. Confort discret garanti.
              </p>
              <Link href="/gainable" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Découvrir
              </Link>
            </div>

            {/* Pompe à Chaleur Card */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <Image src="/images/heat-pump.png" alt="Pompe à chaleur" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Pompe à Chaleur</h3>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                Chauffage économique et écologique. Jusqu'à 70% d'économies.
              </p>
              <Link href="/pompe-a-chaleur" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section style={{ background: 'var(--bg-light)', padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Ils Nous Font Confiance
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', color: '#FBBC04' }}>★★★★★</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)', margin: 0 }}>4.9/5</p>
              <p style={{ fontSize: '1rem', color: 'var(--text-gray)', margin: 0 }}>Basé sur les avis Google</p>
            </div>
          </div>
          <a
            href="https://share.google/sLKMxADrGA36sYOhR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Voir tous nos avis Google
          </a>
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
            Pourquoi Choisir AIR G Energie ?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ background: 'var(--primary-blue)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <MapPin size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Entreprise Locale</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Basés à Miramas, nous connaissons votre secteur</p>
            </div>

            <div>
              <div style={{ background: 'var(--text-gray)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Clock size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Réactivité</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Devis sous 24h, intervention rapide</p>
            </div>

            <div>
              <div style={{ background: 'var(--text-gray)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Garantie Décennale</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Travaux garantis, assurance complète</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
            Nos engagements
          </h2>

          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-gray)', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Chez AIR G Energie, nous nous engageons à vous offrir une expérience client irréprochable, de la première prise de contact jusqu&apos;au suivi après-vente.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Devis Gratuit sous 24h</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                Nous vous répondons rapidement avec un devis détaillé et transparent. Pas de frais cachés, pas de surprise.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧹</div>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Installation Propre et Soignée</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                Protection de votre intérieur, perçages aspirés, chantier laissé impeccable. Votre satisfaction est notre priorité.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>SAV Réactif</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                Un problème ? Notre équipe intervient rapidement. Entretien, dépannage, conseil : nous restons à vos côtés.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Accompagnement Aides Financières</h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: '1.7' }}>
                Nous vous guidons gratuitement dans vos démarches MaPrimeRénov&apos;, CEE et autres aides. Maximisez vos économies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Actualités & Conseils
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', maxWidth: '700px', margin: '0 auto' }}>
              Retrouvez prochainement nos articles, guides pratiques et actualités sur la climatisation et le chauffage en Provence.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            padding: '3rem 2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📰</div>
            <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Blog en préparation
            </h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Nous préparons des contenus exclusifs pour vous aider à mieux comprendre vos besoins en climatisation et chauffage : guides d&apos;achat, comparatifs, conseils d&apos;entretien, et actualités réglementaires.
            </p>
            <p style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>
              🔔 Bientôt disponible
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
