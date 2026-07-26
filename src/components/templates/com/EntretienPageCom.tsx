import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, ShieldCheck, Wrench } from 'lucide-react';

export default function EntretienPageCom() {
  return (
    <div className="service-page">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
        color: 'white',
        padding: '4rem 0'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15
        }}>
          <Image
            src="/images/hero-maintenance.png"
            alt="Technicien maintenance climatisation"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '700' }}>
            Entretien & Dépannage Climatisation
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6', marginBottom: '2rem' }}>
            Assurez la longévité et la performance de votre installation avec nos contrats de maintenance préventive et notre service de dépannage réactif.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="tel:0413414901" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FF6B00', border: 'none' }}>
              <Phone size={20} />
              Dépannage Urgent : 04 13 41 49 01
            </a>
          </div>
        </div>
      </section>

      {/* Why Maintenance Section - SEO Enriched */}
      <section className="section-padding" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a365d' }}>Pourquoi l'entretien de votre climatisation est essentiel ?</h2>
            <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
              Que vous possédiez une climatisation réversible, un système gainable ou une pompe à chaleur, un entretien annuel est crucial. Il garantit non seulement la longévité de votre matériel, mais aussi la qualité de l'air que vous respirez.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <ShieldCheck size={40} color="#0091DA" />,
                title: "Fiabilité & Durée de vie",
                text: "Un entretien régulier de votre pompe à chaleur ou climatisation prolonge sa durée de vie jusqu'à 30%."
              },
              {
                icon: <CheckCircle size={40} color="#0091DA" />,
                title: "Air Sain & Hygiène",
                text: "Nous nettoyons intégralement vos filtres et échangeurs pour éliminer bactéries et moisissures de votre climatisation."
              },
              {
                icon: <Wrench size={40} color="#0091DA" />,
                title: "Économies d'Énergie",
                text: "Un système encrassé surconsomme. L'entretien de votre gainable assure un rendement optimal et réduit votre facture."
              },
              {
                icon: <Clock size={40} color="#0091DA" />,
                title: "Sérénité Totale",
                text: "Prévenez les pannes en plein été ou en hiver grâce à notre expertise technique sur toutes marques."
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderTop: '4px solid #0091DA'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2d3748' }}>{item.title}</h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - New Images */}
      <section style={{ background: '#F8FAFC', padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1a365d' }}>
            Nos techniciens en action : la qualité en images
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 3rem', color: '#718096' }}>
            Découvrez le niveau de détail de nos interventions d'entretien : nettoyage haute pression, protection des lieux, et vérification minutieuse.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} style={{
                position: 'relative',
                height: '300px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={`/images/maintenance/img-${num}.png`}
                  alt={`Entretien climatisation étape ${num}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Points Checklist */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1a365d' }}>Les points clés de notre visite d'entretien</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  "Nettoyage complet et désinfection des unités intérieures (mural, gainable...)",
                  "Nettoyage de l'unité extérieure (échangeur, hélice)",
                  "Contrôle de l'étanchéité du circuit frigorifique (Attestation fournie)",
                  "Vérification des connexions électriques et serrages",
                  "Test des écoulements de condensats pour éviter les fuites d'eau",
                  "Relevé des températures et pressions de fonctionnement",
                  "Conseils d'utilisation pour optimiser votre consommation"
                ].map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', color: '#4a5568' }}>
                    <div style={{ minWidth: '24px' }}>
                      <CheckCircle size={24} color="#48BB78" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                padding: '2rem',
                background: '#EBF8FF',
                borderRadius: '1rem',
                border: '2px dashed #0091DA',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#0091DA', marginBottom: '1rem' }}>Rappel Important</h3>
                <p style={{ color: '#2C5282' }}>
                  L'entretien est <strong>obligatoire tous les 2 ans</strong> pour les pompes à chaleur et climatisations dont la puissance est comprise entre 4kW et 70kW.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ textAlign: 'center', padding: '5rem 0', background: '#1a365d', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Prêt à optimiser votre confort ?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
            Réservez votre créneau d'entretien en quelques clics ou contactez-nous pour un dépannage urgent.
          </p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn btn-pulse-white"
              style={{
                background: 'white',
                color: '#0091DA',
                padding: '1rem 2.5rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)'
              }}
            >
              Contactez-nous pour l'entretien
            </Link>

            <a
              href="tel:0413414901"
              className="btn"
              style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.1rem'
              }}
            >
              <Phone size={20} />
              04 13 41 49 01
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
