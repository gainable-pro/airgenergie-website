import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, ShieldCheck, Wrench, ShieldAlert, Check, Calendar, FileText, Building2, ArrowRight } from 'lucide-react';

export default function EntretienPageFr() {
  return (
    <div className="service-page">
      {/* Hero Section — Editorial Pillar Guide (Distinct from /reservation-en-ligne) */}
      <section style={{
        position: 'relative',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #006BA6 100%)',
        color: 'white',
        padding: '4.5rem 0'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.16 }}>
          <Image
            src="/images/hero-maintenance.png"
            alt="Protocole d'entretien obligatoire climatisation et pompe à chaleur Air G Énergie"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.4rem 1rem',
            borderRadius: '2rem',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Guide Réglementaire &amp; Contrats SAV • Bouches-du-Rhône (13)
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'white', maxWidth: '860px', lineHeight: '1.15' }}>
            Entretien Obligatoire Climatisation &amp; Pompe à Chaleur : Protocole, Décret 2020-912 &amp; Contrats
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '780px', lineHeight: '1.65', marginBottom: '2rem', color: 'rgba(255,255,255,0.92)' }}>
            Depuis le <strong>décret n° 2020-912</strong>, l&apos;entretien des climatisations réversibles et pompes à chaleur (4 à 70 kW) est obligatoire au moins tous les 2 ans avec remise d&apos;une <strong>attestation officielle</strong>. Découvrez notre protocole technique en 10 points, nos contrats professionnels et réservez votre créneau en ligne dès <strong>156 € TTC</strong>.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/reservation-en-ligne" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#48BB78', border: 'none', fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}>
              <Calendar size={20} />
              Réserver un Entretien en Ligne (dès 156 €)
            </Link>
            <a href="tel:0413414901" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '2px solid white', color: 'white', fontSize: '1.05rem', padding: '0.85rem 1.6rem' }}>
              <Phone size={20} />
              Urgence Dépannage : 04 13 41 49 01
            </a>
          </div>
        </div>
      </section>

      {/* Cadre Réglementaire Décret 2020-912 & F-Gaz */}
      <section style={{ padding: '4.5rem 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '1.25rem' }}>
            Ce que dit la loi : Décret n° 2020-912 &amp; Contrôle F-Gaz
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.75', marginBottom: '1.75rem' }}>
            Codifié aux articles <strong>R.224-44-1 à R.224-44-3 du Code de l&apos;environnement</strong>, le décret n° 2020-912 du 28 juillet 2020 rend obligatoire l&apos;entretien des systèmes thermodynamiques dont la puissance nominale est comprise entre <strong>4 kW et 70 kW</strong> (climatisation réversible mono/multi-split, gainable, pompe à chaleur Air/Eau). Cette visite doit être effectuée par un professionnel titulaire de l&apos;<strong>attestation de capacité à la manipulation des fluides frigorigènes</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '1rem', border: '1px solid #E2E8F0', borderTop: '4px solid #E53E3E' }}>
              <ShieldAlert size={28} color="#E53E3E" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.5rem' }}>Fréquence légale &amp; recommandée</h3>
              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                Minimum légal : <strong>tous les 2 ans</strong> (et tous les ans pour les équipements &gt; 5 teqCO₂ de fluide). En Provence (Mistral, pollen, usage été + hiver), une visite <strong>annuelle</strong> évite 20 à 30 % de surconsommation électrique.
              </p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '1rem', border: '1px solid #E2E8F0', borderTop: '4px solid #0091DA' }}>
              <FileText size={28} color="#0091DA" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.5rem' }}>Attestation Cerfa obligatoire</h3>
              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                L&apos;attestation d&apos;entretien remise par Air G Énergie est exigée par votre <strong>assurance habitation</strong> en cas de dégât des eaux/incendie, par votre propriétaire (si locataire) et par les fabricants (Daikin, Mitsubishi…) pour conserver la garantie.
              </p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '1rem', border: '1px solid #E2E8F0', borderTop: '4px solid #48BB78' }}>
              <ShieldCheck size={28} color="#48BB78" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.5rem' }}>Santé &amp; Qualité d&apos;Air</h3>
              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                L&apos;humidité du bac à condensats favorise moisissures et légionelles. Notre désinfection biocide certifiée (ou vapeur sèche 100°C en curatif) assainit durablement l&apos;air soufflé dans votre logement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocole Technique en 10 Points */}
      <section style={{ padding: '4.5rem 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '0.75rem' }}>
            Notre Protocole d&apos;Entretien Frigoriste en 10 Points
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.65' }}>
            Chaque visite réalisée par nos techniciens certifiés dans les Bouches-du-Rhône suit une check-list rigoureuse :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              '1. Test de performance initial (delta T soufflage / reprise) avant démontage',
              '2. Démontage et lavage intégral des filtres à air et grilles de reprise',
              '3. Désinfection bactéricide & fongicide certifiée de l’évaporateur intérieur',
              '4. Nettoyage en profondeur de la turbine (et vapeur 100°C ClimWasher+ sur forfait curatif)',
              '5. Nettoyage et décontamination du bac à condensats + test pompe de relevage',
              '6. Dépoussiérage et nettoyage de l’échangeur du groupe extérieur',
              '7. Contrôle d’étanchéité électronique du circuit de fluide frigorigène',
              '8. Vérification des pressions de fonctionnement et de la charge frigorifique',
              '9. Contrôle des intensités électriques et resserrage des borniers de puissance',
              '10. Rédaction et remise immédiate de l’attestation officielle d’entretien (Cerfa)'
            ].map((step, i) => (
              <div key={i} style={{ background: 'white', padding: '1.1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle size={18} color="#48BB78" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.93rem', color: '#1E293B', lineHeight: '1.45', fontWeight: '500' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choisir le bon forfait (Entonnoir vers /reservation-en-ligne/[service]) */}
      <section style={{ padding: '4.5rem 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '0.75rem', textAlign: 'center' }}>
            Quel Forfait d&apos;Entretien Choisir Selon Votre Installation ?
          </h2>
          <p style={{ textAlign: 'center', color: '#475569', maxWidth: '720px', margin: '0 auto 2.5rem', fontSize: '1.02rem' }}>
            Accédez directement à la fiche détaillée et au calendrier en temps réel pour réserver votre intervention sous 48h :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { title: 'Climatisation Mono-Split (Préventif)', price: '156 € TTC', desc: 'Entretien annuel réglementaire d’une unité murale + groupe extérieur avec Cerfa.', href: '/reservation-en-ligne/preventive' },
              { title: 'Nettoyage Curatif Vapeur 100°C', price: '192 € TTC', desc: 'Recommandé en cas de mauvaises odeurs, moisissures visibles ou allergies respiratoires.', href: '/reservation-en-ligne/curative' },
              { title: 'Multi-Split (Bi-Split & Tri-Split)', price: '270 € / 380 € TTC', desc: 'Maintenance groupée de 2 ou 3 unités intérieures reliées à un groupe extérieur unique.', href: '/reservation-en-ligne/double-split' },
              { title: 'Climatisation Gainable & Airzone', price: '220 € TTC', desc: 'Inspection du plénum en combles, nébulisation bactéricide des gaines et contrôle registres.', href: '/reservation-en-ligne/gainable' },
              { title: 'Pompe à Chaleur Air/Eau', price: '270 € TTC', desc: 'Contrôle hydraulique, vase d’expansion, détection de boues, étanchéité fluide et Cerfa.', href: '/reservation-en-ligne/pac-air-eau' },
              { title: 'Entretien Annuel VMC', price: '230 € TTC', desc: 'Démontage caisson, nettoyage turbine, dégraissage bouches, contrôle gaines et débits.', href: '/reservation-en-ligne/entretien-vmc' },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.6rem',
                  background: '#F8FAFC',
                  borderRadius: '1rem',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>{card.title}</h3>
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0077B6', marginBottom: '0.65rem' }}>{card.price}</div>
                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.55', margin: '0 0 1.25rem 0' }}>{card.desc}</p>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0077B6', fontWeight: '700', fontSize: '0.9rem' }}>
                  Voir la fiche &amp; réserver <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/reservation-en-ligne" className="btn btn-primary" style={{ background: '#0091DA', border: 'none', padding: '1rem 2.2rem', fontSize: '1.08rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} />
              Voir les 14 Forfaits &amp; Réserver mon Créneau 48h
            </Link>
          </div>
        </div>
      </section>

      {/* Contrats Pros / Tertiaire VRV & DRV */}
      <section style={{ padding: '4rem 0', background: '#0F172A', color: 'white' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ flex: '1 1 520px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Building2 size={18} /> Contrats Maintenance Professionnels &amp; ERP (13)
              </div>
              <h2 style={{ fontSize: '1.9rem', color: 'white', fontWeight: '800', marginBottom: '1rem' }}>
                Hôtels, Restaurants, Bureaux &amp; Commerces : Contrats VRV / DRV (-20 %)
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Nous assurons le suivi réglementaire annuel (registre de sécurité + Cerfa F-Gaz) des parcs multi-unités, cassettes 4 voies et systèmes VRV/DRV Daikin, Mitsubishi et Samsung dans toutes les Bouches-du-Rhône.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#E2E8F0', fontSize: '0.94rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Remise automatique de -20 % sur la composition VRV / DRV</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Priorité d&apos;intervention dépannage en haute saison</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Rapports détaillés par zone pour conformité ERP &amp; Code du travail</li>
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minWidth: '240px' }}>
              <Link href="/reservation-en-ligne/vrv" className="btn btn-primary" style={{ background: '#FF6B00', border: 'none', textAlign: 'center', padding: '0.9rem 1.5rem', fontWeight: '700' }}>
                Configurer mon Parc VRV (-20 %)
              </Link>
              <Link href="/contact" className="btn" style={{ background: 'white', color: '#0F172A', border: 'none', textAlign: 'center', padding: '0.9rem 1.5rem', fontWeight: '700' }}>
                Demander un Contrat Annuel Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Réglementaire Visible (Miroir JSON-LD) */}
      <section style={{ padding: '4.5rem 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>
            Questions Fréquentes sur la Réglementation &amp; l&apos;Entretien
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                q: "Que dit le décret n° 2020-912 sur l'entretien obligatoire d'une climatisation ?",
                a: "Le décret n° 2020-912 du 28 juillet 2020 impose un entretien périodique au moins tous les 2 ans pour tout système thermodynamique (climatisation réversible ou pompe à chaleur) d'une puissance nominale comprise entre 4 kW et 70 kW. L'entretien doit être réalisé par un professionnel titulaire de l'attestation de capacité fluides frigorigènes, qui remet une attestation officielle dans les 15 jours."
              },
              {
                q: "Qui doit payer l'entretien d'une climatisation : le locataire ou le propriétaire ?",
                a: "Sauf clause contraire du bail, l'entretien courant et la visite périodique obligatoire d'une climatisation ou pompe à chaleur relèvent des charges locatives (à la charge de l'occupant). Le propriétaire conserve à sa charge les réparations lourdes et le remplacement de l'équipement."
              },
              {
                q: "À quelle fréquence entretenir sa climatisation en Provence (Bouches-du-Rhône) ?",
                a: "Bien que la loi impose un minimum d'une visite tous les 2 ans (entre 4 et 70 kW), une visite annuelle avant l'été ou avant l'hiver est fortement recommandée dans les Bouches-du-Rhône. Le Mistral, les pollens, les poussières et l'usage intensif réversible encrassent plus vite les échangeurs et réduisent le rendement jusqu'à 30 %."
              },
              {
                q: "Quelles sont les obligations d'entretien pour les commerces, hôtels et bureaux (VRV/DRV) ?",
                a: "Au-delà du décret 2020-912, les installations contenant plus de 5 tonnes équivalent CO2 de fluide frigorigène (souvent à partir de 2 kg de R410A ou ~7,4 kg de R32) sont soumises à un contrôle d'étanchéité annuel obligatoire consigné sur Cerfa F-Gaz (n° 15497). Air G Énergie propose des contrats dédiés avec remise -20 % pour les systèmes VRV/DRV."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'white', padding: '1.5rem 1.75rem', borderRadius: '0.85rem', border: '1px solid #E2E8F0', borderLeft: '4px solid #0091DA' }}>
                <h3 style={{ fontSize: '1.08rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.6rem' }}>{item.q}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/reservation-en-ligne" className="btn btn-primary" style={{ background: '#48BB78', border: 'none', padding: '0.95rem 2rem', fontSize: '1.05rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wrench size={18} />
              Planifier mon Entretien en Direct (dès 156 € TTC)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
