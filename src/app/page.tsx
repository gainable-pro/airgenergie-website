import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, Award, MapPin, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Full Width Image with Text Overlay */}
      <section style={{
        position: 'relative',
        height: '600px',
        overflow: 'hidden',
        background: '#0091DA'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3
        }}>
          <Image
            src="/images/hero-technician-ac.png"
            alt="Technicien AIR G Energie - Entretien climatisation"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 145, 218, 0.85) 0%, rgba(0, 107, 166, 0.85) 100%)'
        }} />

        {/* Content */}
        <div className="container" style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Votre Spécialiste Climatisation à Miramas
            </h1>

            <p style={{
              fontSize: '1.5rem',
              marginBottom: '2.5rem',
              color: 'white',
              opacity: 0.95
            }}>
              Installation • Entretien • Dépannage
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <a
                href="tel:0413414901"
                className="btn"
                style={{
                  background: 'white',
                  color: 'var(--primary-blue)',
                  fontSize: '1.2rem',
                  padding: '1rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <Phone size={22} />
                04 13 41 49 01
              </a>

              <Link
                href="/contact"
                className="btn"
                style={{
                  background: 'var(--text-dark)',
                  color: 'white',
                  fontSize: '1.2rem',
                  padding: '1rem 2rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                Devis Gratuit
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{ display: 'flex', gap: '2rem', color: 'white', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={20} />
                <span>Devis sous 24h</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} />
                <span>Certifié RGE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Presentation Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
              AIR G Energie, Votre Partenaire Climatisation à Miramas
            </h2>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-gray)', textAlign: 'left' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--primary-blue)' }}>AIR G Energie</strong> est une entreprise locale implantée à <strong>Miramas</strong>, spécialisée dans la climatisation, le chauffage et les solutions de confort thermique.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                Nous accompagnons nos clients particuliers et professionnels dans leurs projets : de l'étude personnalisée à l'installation, jusqu'à l'entretien et au dépannage. Notre savoir-faire couvre tous types de solutions, notamment la <strong>climatisation gainable</strong> et la <strong>climatisation réversible</strong>, reconnues pour leur efficacité et leur discrétion.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                Présente dans tout le département des <strong>Bouches-du-Rhône</strong>, notre équipe intervient rapidement à Salon-de-Provence, Aix-en-Provence, Istres, Martigues, Vitrolles, et sur la Côte Bleue.
              </p>

              <p style={{ marginBottom: '2rem' }}>
                Notre priorité est simple : offrir des installations fiables, durables et adaptées à chaque besoin. <strong>Réactivité, proximité et professionnalisme</strong> font d'AIR G Energie un partenaire de confiance pour vos projets.
              </p>

              <div style={{
                background: 'var(--bg-light)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--primary-blue)',
                marginTop: '2rem'
              }}>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                  Zones d'intervention
                </p>
                <p style={{ margin: 0 }}>
                  Miramas • Salon-de-Provence • Aix-en-Provence • Istres • Martigues • Vitrolles • Grans • La Fare-les-Oliviers • Saint-Chamas • Marseille • Côte Bleue
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: 'var(--bg-light)', padding: '2rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <Image src="/images/certifications.png" alt="Certifications professionnelles AIR G Energie" width={800} height={200} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
            Nos Services à Miramas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
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
              <div style={{ background: 'var(--primary-blue)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Award size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Certifié RGE</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Éligibilité aux aides financières</p>
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

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Un Projet de Climatisation à Miramas ?
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
            Contactez-nous pour un devis gratuit sous 24h
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="tel:0413414901" className="btn" style={{ background: 'white', color: 'var(--primary-blue)', fontSize: '1.2rem', padding: '1rem 2rem' }}>
              <Phone size={24} />
              04 13 41 49 01
            </a>
            <Link href="/contact" className="btn" style={{ background: 'var(--text-dark)', color: 'white', fontSize: '1.2rem', padding: '1rem 2rem' }}>
              Formulaire de Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
