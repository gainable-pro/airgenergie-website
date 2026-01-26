import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, ThermometerSun } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homePrefix}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Expert Local depuis 10 ans</span>
            <h1 className={styles.heroTitle}>
              Votre confort thermique à <span className="text-accent">Miramas</span> et en Provence
            </h1>
            <p className={styles.heroSubtitle}>
              Installation, entretien et dépannage de climatisation réversible et pompes à chaleur.
              Intervention rapide et devis gratuit.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btn-primary">
                Demander un devis gratuit
              </Link>
              <Link href="/services" className="btn btn-secondary">
                Découvrir nos services
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            {/* Placeholder for Hero Image */}
            <div className={styles.placeholderImage}>
              <span>Image Hero (Technicien / Clim)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <CheckCircle className="text-accent" />
              <span>Devis sous 24h</span>
            </div>
            <div className={styles.trustItem}>
              <Shield className="text-accent" />
              <span>Assurance Décennale</span>
            </div>
            <div className={styles.trustItem}>
              <ThermometerSun className="text-accent" />
              <span>Certifié RGE QualiPAC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center">Nos Solutions de Climatisation</h2>
          <p className="text-center text-gray" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            Des solutions performantes et économes pour votre maison ou vos locaux professionnels.
          </p>

          <div className={styles.servicesGrid}>
            {/* Service 1 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <h3>Climatisation Réversible</h3>
                <p>Le confort en toute saisont. Fraîcheur l&apos;été, chauffage économique l&apos;hiver.</p>
                <Link href="/climatisation" className={styles.readMore}>
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <h3>Systèmes Gainables</h3>
                <p>La solution invisible et silencieuse pour un confort haut de gamme.</p>
                <Link href="/gainable" className={styles.readMore}>
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <h3>Pompes à Chaleur</h3>
                <p>Remplacez votre chaudière et divisez vos factures par 3.</p>
                <Link href="/pompe-a-chaleur" className={styles.readMore}>
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContainer}`}>
          <h2>Prêt à améliorer votre confort ?</h2>
          <p>Nos experts sont à votre disposition pour une étude personnalisée à domicile.</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="btn btn-primary">
              Prendre rendez-vous
            </Link>
            <a href="tel:0490000000" className="btn btn-secondary">
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
