"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, ShieldCheck, Wrench, ShieldAlert, Check } from 'lucide-react';
import BookingWizard from '@/components/booking/BookingWizard';

const DETAILED_SERVICES = [
  {
    id: 'devis',
    category: 'depannage',
    name: 'Étude & Devis d’installation',
    price: 0,
    duration: '45 min',
    image: '/images/technician-handshake.png',
    subtitle: 'Déplacement jusqu\'à 100 km — Miramas et Provence (gratuit)',
    desc: 'Réalisation d\'une étude technique complète pour l\'installation ou le remplacement d\'une climatisation ou pompe à chaleur.',
    details: [
      'Calcul des puissances thermiques nécessaires (bilan thermique)',
      'Analyse de la faisabilité technique (implantation, cheminement)',
      'Conseils personnalisés sur le choix du système (mono, multi, gainable)',
      'Vérification du réseau électrique existant et raccordements',
      'Établissement d\'un devis gratuit détaillé sous 24h'
    ]
  },
  {
    id: 'diagnostic',
    category: 'depannage',
    name: 'Diagnostic & Rapport de panne',
    price: 100,
    duration: '45 min',
    image: '/images/hero-technician-ac.png',
    subtitle: 'Recherche de panne et rapport officiel d\'assurance',
    desc: 'Identification de l\'origine de votre panne (anomalie électrique, code erreur, fuite) avant réparation.',
    details: [
      'Lecture et décodage des codes défauts de la carte électronique',
      'Mesures de tension, d\'intensité et de conformité électrique',
      'Test d\'étanchéité et de pression du circuit frigorifique',
      'Contrôle des connexions électriques et resserrage des borniers',
      'Rédaction d\'un rapport de panne écrit certifié pour votre assurance'
    ]
  },
  {
    id: 'preventive',
    category: 'clim',
    name: 'Entretien climatisation préventif',
    price: 156,
    duration: '45 min',
    image: '/images/split-mural.png',
    subtitle: 'Forfait standard pour 1 unité (Mono-split) • Recommandé',
    isRecommended: true,
    desc: 'Assurez l\'efficacité de votre climatisation, économisez de l\'énergie et assainissez votre air selon les réglementations.',
    details: [
      'Nettoyage des filtres à air et de la carrosserie intérieure',
      'Désinfection de l\'évaporateur (bactéricide & fongicide certifié)',
      'Nettoyage de l\'échangeur extérieur et de son hélice',
      'Contrôle de la charge de fluide frigorigène (pressions)',
      'Vérification du débit d\'air et du delta de température',
      'Délivrance de l\'attestation d\'entretien légale obligatoire'
    ]
  },
  {
    id: 'curative',
    category: 'clim',
    name: 'Entretien climatisation Curatif ++++',
    price: 192,
    duration: '1 h',
    image: '/images/ac-unit.png',
    subtitle: 'Désinfection thermique à la vapeur (100°C) • Intensif',
    isRecommended: true,
    desc: 'Nettoyage en profondeur des turbines et évaporateurs encrassés pour éliminer les bactéries et moisissures incrustées.',
    details: [
      'Désinfection à la vapeur sèche à 100°C sous pression',
      'Nettoyage en profondeur de la turbine de soufflage (ClimWasher+)',
      'Application de traitements bactéricides, fongicides et anti-odeurs',
      'Nettoyage et décontamination complète du bac à condensats',
      'Contrôle d\'étanchéité électronique du circuit de fluide',
      'Vérification des vibrations et niveau sonore de l\'hélice'
    ]
  },
  {
    id: 'double-split',
    category: 'clim',
    name: 'Double-split Entretien de climatisation',
    price: 270,
    duration: '2 h',
    image: '/images/multi-split.png',
    subtitle: 'Entretien complet pour installation bi-split',
    desc: 'Nettoyage et contrôle complet pour un système de climatisation bi-split (2 unités intérieures, 1 groupe extérieur).',
    details: [
      'Nettoyage et désinfection complète des 2 évaporateurs',
      'Traitement biocide complet sur les 2 turbines de soufflage',
      'Dépoussiérage et nettoyage complet du groupe extérieur',
      'Contrôle des pressions et de l\'étanchéité du circuit frigorifique',
      'Vérification de l\'écoulement des condensats sur les 2 réseaux',
      'Attestation d\'entretien annuelle et Cerfa d\'intervention'
    ]
  },
  {
    id: 'tri-split',
    category: 'clim',
    name: 'Tri-split Entretien de climatisation',
    price: 380,
    duration: '2 h',
    image: '/images/multi-split.png',
    subtitle: 'Entretien complet pour installation tri-split',
    desc: 'Nettoyage et contrôle complet pour un système de climatisation tri-split (3 unités intérieures, 1 groupe extérieur).',
    details: [
      'Nettoyage et désinfection complète des 3 évaporateurs',
      'Traitement biocide complet sur les 3 turbines de soufflage',
      'Nettoyage haute pression de l\'échangeur extérieur unique',
      'Contrôle de la charge globale en fluide (haute/basse pressions)',
      'Vérification des écoulements et des pompes de relevage',
      'Attestation d\'entretien annuelle et Cerfa d\'intervention'
    ]
  },
  {
    id: 'gainable',
    category: 'clim',
    name: 'Entretien de climatisation gainable',
    price: 220,
    duration: '45 min',
    image: '/images/gainable-vents.png',
    subtitle: 'Pour réseaux centralisés et régulations Airzone',
    desc: 'Nettoyage de l\'unité intérieure dissimulée en combles et désinfection du réseau aéraulique.',
    details: [
      'Nettoyage des filtres de reprise d\'air (grilles de reprise)',
      'Désinfection des gaines par nébulisation / fumigène bactéricide',
      'Inspection de l\'unité intérieure logée en combles/faux-plafond',
      'Contrôle de la régulation de zone (thermostats et registres)',
      'Vérification du bon écoulement de la vidange des condensats',
      'Signature et remise de l\'attestation d\'entretien périodique'
    ]
  },
  {
    id: 'console',
    category: 'clim',
    name: 'Entretien de climatisation console',
    price: 154,
    duration: '45 min',
    image: '/images/console-ac.png',
    subtitle: 'Nettoyage complet pour console basse au sol',
    desc: 'Entretien complet et désinfection pour climatiseur de type console basse posée ou fixée au sol.',
    details: [
      'Nettoyage des filtres d\'aspiration bas et des grilles de diffusion',
      'Désinfection de l\'évaporateur double flux de la console',
      'Nettoyage de l\'unité extérieure associée',
      'Mesure d\'intensité du compresseur et contrôle des connexions',
      'Vérification de l\'étanchéité frigorifique réglementaire',
      'Remise du rapport de contrôle annuel'
    ]
  },
  {
    id: 'cassette',
    category: 'clim',
    name: 'Entretien de climatisation cassette',
    price: 180,
    duration: '45 min',
    image: '/images/cassette-ac.png',
    subtitle: 'Nettoyage de cassette 4 voies encastrée',
    desc: 'Entretien et désinfection de cassette de soufflage 4 voies encastrée dans le plafond (bureaux et commerces).',
    details: [
      'Nettoyage de la grille d\'aspiration et du filtre 4 voies',
      'Nettoyage du bac à condensats et test de la pompe de relevage',
      'Désinfection complète de l\'échangeur circulaire interne',
      'Nettoyage haute pression du condenseur extérieur',
      'Contrôle d\'intensité moteur et étanchéité fluide frigorigène',
      'Attestation de contrôle réglementaire remise'
    ]
  },
  {
    id: 'vrv',
    category: 'clim',
    name: 'Entretien Système VRV / DRV',
    price: 0,
    duration: 'Sur mesure',
    image: '/images/vrv-commercial.png',
    subtitle: 'Hôtels • Résidences • Commerces • Banques — Remise –10% incluse',
    isRecommended: false,
    desc: 'Solution de maintenance taillée pour les installations VRV (Daikin) et DRV (Mitsubishi, Samsung) dans les bâtiments tertiaires et de grande surface habitable. Composez librement la liste de vos unités intérieures pour obtenir un tarif remisé de 10% automatiquement.',
    details: [
      'Contrôle pression du circuit frigorifique principal (haute/basse)',
      'Nettoyage de l\'unité extérieure VRV — condenseur et ventilateurs',
      'Désinfection de chaque unité intérieure (splits, cassettes, gainables, consoles)',
      'Vérification des modules bus de communication BACnet / Modbus',
      'Contrôle et nettoyage des grilles et filtres des centrales de traitement d\'air',
      'Rapport d\'inspection multi-zones avec attestation Cerfa annuelle',
      'Tarification à la composition : –10% sur chaque unité en installation VRV'
    ]
  },
  {
    id: 'thermodynamique',
    category: 'pac',
    name: 'Entretien ballon thermodynamique',
    price: 174,
    duration: '45 min',
    image: '/images/heat-pump.png',
    subtitle: 'Contrôle complet chauffe-eau thermodynamique',
    desc: 'Contrôle annuel complet pour chauffe-eau thermodynamique pour assurer la production d\'eau chaude et la sécurité.',
    details: [
      'Nettoyage du filtre à air et évaporateur de la PAC intégrée',
      'Vérification de l\'usure de l\'anode de protection du ballon',
      'Contrôle de la pression hydraulique du circuit ECS',
      'Test de fonctionnement de la résistance d\'appoint électrique',
      'Contrôle des connexions électriques et serrages',
      'Rapport technique de maintenance remis au client'
    ]
  },
  {
    id: 'pac-air-eau',
    category: 'pac',
    name: 'Entretien Pompe à Chaleur Air/Eau',
    price: 270,
    duration: '45 min',
    image: '/images/pac-air-eau.png',
    subtitle: 'Entretien annuel obligatoire (Système hydraulique)',
    desc: 'Vérification et optimisation de votre pompe à chaleur pour garantir la longévité du chauffage et de l\'eau chaude.',
    details: [
      'Nettoyage de l\'échangeur thermique extérieur (dépoussiérage)',
      'Contrôle de la pression et du débit hydraulique du circuit',
      'Vérification de pression du vase d\'expansion et soupapes',
      'Contrôle de la qualité de l\'eau (boues, pH, glycol)',
      'Test d\'étanchéité électronique du circuit de fluide',
      'Remise du Cerfa réglementaire et de l\'attestation d\'entretien'
    ]
  }
];

export default function EntretienPageFr() {
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSelectService = (serviceId: string) => {
    setPreselectedService(serviceId);
    const element = document.getElementById('reserve');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredServices = activeCategory === 'all'
    ? DETAILED_SERVICES
    : DETAILED_SERVICES.filter(service => service.category === activeCategory);

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '420px',
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
            Service Après-Vente & Maintenance
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Entretien Climatisation & Pompe à Chaleur
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6', marginBottom: '2rem' }}>
            Gardez votre climatisation propre, saine et économique. Réservez votre entretien annuel en ligne et évitez les pannes en période de forte chaleur.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#reserve" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#48BB78', border: 'none', fontSize: '1.1rem', padding: '0.8rem 1.8rem' }}>
              Réserver en ligne
            </a>
            <a href="tel:0413414901" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '2px solid white', color: 'white', fontSize: '1.1rem', padding: '0.8rem 1.8rem' }}>
              <Phone size={20} />
              Dépannage : 04 13 41 49 01
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding" style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#0F172A', fontWeight: '800' }}>
              Pourquoi l&apos;entretien annuel est-il indispensable ?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)' }}>
              Une climatisation ou pompe à chaleur réversible nécessite un suivi rigoureux pour préserver ses performances et votre santé.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Wrench size={40} color="var(--primary-blue)" />,
                title: "Économie d&apos;Énergie",
                text: "Une climatisation encrassée surconsomme jusqu&apos;à 30% d&apos;électricité. L&apos;entretien garantit un rendement énergétique optimal."
              },
              {
                icon: <CheckCircle size={40} color="var(--primary-blue)" />,
                title: "Qualité de l&apos;Air & Santé",
                text: "Les filtres accumulent poussières, pollens, bactéries et moisissures. Notre désinfection professionnelle purifie l&apos;air de votre villa."
              },
              {
                icon: <ShieldCheck size={40} color="var(--primary-blue)" />,
                title: "Durée de vie prolongée",
                text: "Le nettoyage régulier de l&apos;échangeur extérieur évite la surchauffe du compresseur et prévient les pannes majeures."
              },
              {
                icon: <ShieldAlert size={40} color="var(--primary-blue)" />,
                title: "Obligation Légale",
                text: "Décret n° 2020-912 du 28 juillet 2020 : entretien obligatoire tous les 2 ans pour les systèmes de climatisation réversible entre 4 et 70 kW."
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E2E8F0',
                borderTop: '4px solid var(--primary-blue)'
              }}>
                <div style={{ marginBottom: '1.25rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0F172A', fontWeight: '700' }}>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reworked Prestations Section with Images & Filtering */}
      <section style={{ background: '#F8FAFC', padding: '5rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Détail de nos Prestations & Interventions
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Découvrez les opérations réglementaires et techniques incluses dans chacun de nos forfaits d&apos;intervention.
            </p>
          </div>

          {/* Regulation Notice Banner */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #E53E3E', // Red color for official decret
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#FFF5F5',
              color: '#E53E3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldAlert size={24} />
            </div>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.25rem' }}>
                Réglementation Officielle (Décret n° 2020-912)
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-gray)', margin: 0, lineHeight: '1.5' }}>
                Le Décret n° 2020-912 du 28 juillet 2020 rend l&apos;<strong>entretien obligatoire tous les 2 ans</strong> pour tous les systèmes de climatisation réversible et pompes à chaleur d&apos;une puissance nominale comprise entre <strong>4 kW et 70 kW</strong>. Nos techniciens certifiés vous délivrent l&apos;attestation d&apos;entretien officielle requise par votre assurance.
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'all', label: 'Toutes nos prestations' },
              { id: 'clim', label: 'Entretien Climatisation' },
              { id: 'pac', label: 'Pompe à Chaleur & Ballon' },
              { id: 'depannage', label: 'Diagnostic & Devis' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '0.8rem 1.6rem',
                  borderRadius: '2rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeCategory === tab.id ? 'var(--primary-blue)' : '#EDF2F7',
                  color: activeCategory === tab.id ? 'white' : 'var(--text-dark)',
                  boxShadow: activeCategory === tab.id ? '0 4px 10px rgba(0, 145, 218, 0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid of detailed service cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {filteredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div>
                  {/* Image block */}
                  <div className="service-card-img-wrapper">
                    {('isRecommended' in service && service.isRecommended) && (
                      <div className="service-badge-recommande">Recommandé</div>
                    )}
                    {service.id === 'vrv' && (
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}>
                        <span style={{ background: '#1E293B', color: '#F8FAFC', fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '2rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>🏨 Hôtels</span>
                        <span style={{ background: '#1E293B', color: '#F8FAFC', fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '2rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>🏢 Commerces</span>
                        <span style={{ background: '#1E293B', color: '#F8FAFC', fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '2rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>🏦 Banques / Bureaux</span>
                        <span style={{ background: '#1E293B', color: '#F8FAFC', fontSize: '0.72rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '2rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>🏘️ Résidences</span>
                      </div>
                    )}
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="service-card-img"
                    />
                  </div>

                  {/* Body block */}
                  <div style={{ padding: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: '0 0 0.5rem 0', lineHeight: '1.3' }}>
                      {service.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: 'var(--primary-blue)'
                      }}>
                        {service.id === 'vrv' ? 'Tarif composé (-10%)' : (service.price === 0 ? 'Gratuit' : `${service.price} €`)}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {service.duration}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--text-light)',
                      display: 'block',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {service.subtitle}
                    </span>

                    <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5', minHeight: '4.5rem' }}>
                      {service.desc}
                    </p>

                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Détails de l&apos;intervention :
                    </h4>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      marginBottom: '1rem'
                    }}>
                      {service.details.map((detail, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <Check size={14} style={{ color: '#48BB78', marginTop: '0.15rem', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: '1.3' }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
                  <button
                    onClick={() => handleSelectService(service.id)}
                    className="btn"
                    style={{
                      background: 'var(--primary-blue)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 145, 218, 0.15)',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    Réserver cette prestation
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Booking Form Section */}
      <section id="reserve" style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#48BB78',
              background: 'rgba(72,187,120,0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Réservation en ligne
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem' }}>
              Planifiez votre entretien de climatisation
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem' }}>
              Sélectionnez votre forfait, choisissez votre jour et votre créneau, puis renseignez vos coordonnées. Notre secrétariat vous rappellera rapidement pour valider le rendez-vous.
            </p>
          </div>

          {/* Interactive Booking Wizard Component */}
          <BookingWizard initialServiceId={preselectedService} />
        </div>
      </section>
    </div>
  );
}
