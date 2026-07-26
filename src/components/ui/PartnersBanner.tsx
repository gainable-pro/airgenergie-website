import React from 'react';

const PARTNERS = [
  { name: 'Daikin', type: 'Partenaire Premium', desc: 'Leader mondial du CVC, réputé pour sa fiabilité et ses performances.' },
  { name: 'Mitsubishi Electric', type: 'Installateur Qualifié', desc: 'Technologie de pointe et silence exceptionnel pour un confort optimal.' },
  { name: 'Toshiba', type: 'Partenaire Officiel', desc: 'Rapport qualité-prix imbattable et compacité des unités extérieures.' },
  { name: 'Panasonic', type: 'Station Agréée', desc: 'Systèmes de filtration d\'air avancés et haute efficacité énergétique.' },
  { name: 'Atlantic', type: 'Installateur Conseil', desc: 'Conception française robuste et excellence du service après-vente.' }
];

export default function PartnersBanner() {
  return (
    <section style={{ padding: '4rem 0', background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            Marques & Matériel
          </span>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800' }}>
            Nos Partenaires Techniques & Fabricants Agréés
          </h2>
          <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.05rem' }}>
            Nous sélectionnons uniquement du matériel haut de gamme chez les plus grands constructeurs pour vous garantir des installations durables et économiques.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'center'
        }}>
          {PARTNERS.map((partner, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '180px'
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#0F172A',
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.02em'
                }}>
                  {partner.name}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--primary-blue)',
                  background: 'rgba(0,145,218,0.06)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  {partner.type}
                </span>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-light)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {partner.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small sliding animation container or scrolling info */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: 'var(--text-light)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span>
          <span>Garantie constructeur préservée & pièces détachées d'origine certifiées</span>
        </div>
      </div>
    </section>
  );
}
