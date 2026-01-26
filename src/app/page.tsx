import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, Award, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Conversion Focused */}
      <section style={{
        background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
        color: 'white',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2', color: 'white' }}>
              Votre Spécialiste Climatisation à Miramas
            </h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.95 }}>
              Installation • Entretien • Dépannage
            </p>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
              Devis sous 24h • Intervention Rapide • Garantie Décennale
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:0413414901" className="btn" style={{
                background: 'white',
                color: 'var(--primary-blue)',
                fontSize: '1.2rem',
                padding: '1rem 2rem',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)'
              }}>
                <Phone size={24} />
                04 13 41 49 01
              </a>
              <Link href="/contact" className="btn" style={{
                background: 'var(--text-dark)',
                color: 'white',
                fontSize: '1.2rem',
                padding: '1rem 2rem'
              }}>
                Devis en Ligne
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={20} />
                <span>500+ Installations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} />
                <span>Réponse sous 2h</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div style={{ position: 'relative', height: '500px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <Image
              src="/images/hero-airgenergie.png"
              alt="Technicien AIR G Energie - Installation climatisation Miramas"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section style={{ background: 'white', padding: '3rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <Image src="/images/certifications.png" alt="Certifications professionnelles" width={800} height={200} />
          </div>
        </div>
      </section>

      {/* Urgence Section */}
      {/* Google Reviews Section */}
      <section style={{ background: 'white', padding: '3rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
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

      {/* Urgence Section */}
      <section style={{ background: 'var(--bg-light)', padding: '2rem 0', borderBottom: '2px solid var(--primary-blue)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
            Besoin d'un Dépannage Rapide ?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
            Intervention rapide dans tout le secteur de Miramas
          </p>
          <a href="tel:0413414901" className="btn btn-primary" style={{ fontSize: '1.3rem', padding: '1rem 2.5rem' }}>
            <Phone size={24} />
            Appeler Maintenant
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
            Nos Services à Miramas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {/* Climatisation Card */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <Image src="/images/ac-unit.png" alt="Climatisation" fill style={{ objectFit: 'cover' }} />
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
                <Image src="/images/gainable-vents.png" alt="Climatisation Gainable - Grilles de soufflage" fill style={{ objectFit: 'cover' }} />
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
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
              <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <Image src="/images/heat-pump.png" alt="Pompe à Chaleur" fill style={{ objectFit: 'cover' }} />
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

      {/* Why Choose Us Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-dark)' }}>
            Pourquoi Choisir AIR G Energie ?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ background: 'var(--primary-blue)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Award size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Certifié RGE</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Éligibilité aux aides financières</p>
            </div>

            <div>
              <div style={{ background: 'var(--text-gray)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Clock size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Réactivité</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Devis sous 24h, prise de rendez-vous rapide</p>
            </div>

            <div>
              <div style={{ background: 'var(--primary-blue)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <MapPin size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Proximité</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Basés à Miramas, nous connaissons votre secteur</p>
            </div>

            <div>
              <div style={{ background: 'var(--text-gray)', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle size={40} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Garantie</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Assurance décennale, travaux garantis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'Intervention */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Nos Zones d'Intervention
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-gray)' }}>
            Intervention rapide dans un rayon de 30km autour de Miramas
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {['Miramas', 'Salon-de-Provence', 'Istres', 'Martigues', 'Aix-en-Provence', 'Vitrolles', 'Grans', 'La Fare-les-Oliviers', 'Saint-Chamas'].map(ville => (
              <span key={ville} style={{ background: 'white', padding: '0.75rem 1.5rem', borderRadius: '2rem', boxShadow: 'var(--shadow-sm)', color: 'var(--text-dark)', fontWeight: '500' }}>
                {ville}
              </span>
            ))}
          </div>
          <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Demander un Devis Gratuit
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Votre Projet de Climatisation à Miramas
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
            Devis gratuit sous 24h • Intervention rapide • Garantie décennale
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
