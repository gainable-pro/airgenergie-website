'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Clock, ShieldCheck, Wrench, ShieldAlert, Check, FileText, MapPin, HelpCircle } from 'lucide-react';
import BookingWizard from '@/components/booking/BookingWizard';

const DETAILED_SERVICES = [
  {
    id: 'devis',
    category: 'depannage',
    name: 'Étude & Devis d’installation',
    price: 0,
    duration: '45 min',
    image: '/images/technician-handshake.png',
    subtitle: 'Déplacement sous 48h sur 70 km alentour (Bouches-du-Rhône & Provence - gratuit)',
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
    price: 165,
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
    subtitle: 'Hôtels • Résidences • Commerces • Banques — Remise –20% incluse',
    isRecommended: false,
    desc: 'Solution de maintenance taillée pour les installations VRV (Daikin) et DRV (Mitsubishi, Samsung) dans les bâtiments tertiaires et de grande surface habitable. Composez librement la liste de vos unités intérieures pour obtenir un tarif remisé de 20% automatiquement.',
    details: [
      'Contrôle pression du circuit frigorifique principal (haute/basse)',
      'Nettoyage de l\'unité extérieure VRV — condenseur et ventilateurs',
      'Désinfection de chaque unité intérieure (splits, cassettes, gainables, consoles)',
      'Vérification des modules bus de communication BACnet / Modbus',
      'Contrôle et nettoyage des grilles et filtres des centrales de traitement d\'air',
      'Rapport d\'inspection multi-zones avec attestation Cerfa annuelle',
      'Tarification à la composition : –20% sur chaque unité en installation VRV'
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
  },
  {
    id: 'reprogrammation-thermostat',
    category: 'clim',
    name: 'Re-programmation thermostat',
    price: 200,
    duration: '1h à 1h30',
    image: '/images/thermostat-airzone.jpg',
    subtitle: 'Régulation gainable, Airzone, multizone • Contrôle, mise à jour & pression statique',
    desc: 'Vérification du bon fonctionnement des thermostats et de leur mesure, contact avec le support technique pour éventuelle mise à jour système afin de booster le signal, vérification et augmentation de pression statique. Pour tout remplacement de thermostat Airzone, une commande doit être effectuée au préalable. Si un code erreur est lié à un problème carte ou Webserver, un diagnostic sera effectué au préalable.',
    details: [
      'Vérification du bon fonctionnement des thermostats et de leur mesure',
      'Contact support technique pour éventuelle mise à jour système afin de booster le signal',
      'Vérification et augmentation de la pression statique du gainable',
      'Contrôle des communications bus et radio (Airzone, Daikin, Delta Dore, etc.)',
      'Pour tout remplacement de thermostat Airzone : commande à effectuer au préalable',
      'Si code erreur lié à la carte ou au Webserver : diagnostic effectué au préalable'
    ]
  },
  {
    id: 'entretien-vmc',
    category: 'vmc',
    name: 'Entretien annuel VMC',
    price: 230,
    duration: '2h à 3h',
    image: '/images/vmc-ventilation.jpg',
    subtitle: 'Vérification gaines, démontage, nettoyage VMC & test ventilation',
    isRecommended: true,
    desc: 'Entretien annuel complet de votre système de ventilation VMC (simple ou double flux) pour garantir la qualité de l\'air, réduire l\'humidité et assurer votre sécurité.',
    details: [
      'Démontage complet du caisson moteur VMC et nettoyage de la turbine',
      'Dépoussiérage et dégraissage des bouches d\'extraction (cuisine, salle de bain, WC)',
      'Vérification minutieuse de l\'état des gaines de ventilation',
      'Rattrapage d\'appoint avec scotch isolant armé si gaine déchirée ou rongée par rongeur',
      'Test du débit de renouvellement d\'air et du bon tirage de ventilation',
      'Contrôle électrique, vérification des fixations et suspensions antivibratiles',
      'Si remplacement nécessaire de gaines ou du moteur : devis de remplacement édité sur place',
      'Option remplacement intégral de VMC simple flux proposée en moyenne à 693 € TTC'
    ]
  }
];

export default function ReservationClient() {
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
            Réservation en Ligne 48h • Bouches-du-Rhône (13)
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'white', lineHeight: '1.15', maxWidth: '880px' }}>
            Réservation d&apos;Entretien Climatisation, PAC &amp; VMC dans les Bouches-du-Rhône (dès 156 € TTC)
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '780px', lineHeight: '1.65', marginBottom: '2rem', color: 'rgba(255,255,255,0.95)' }}>
            Réservez en 2 minutes votre entretien annuel de climatisation réversible, gainable, pompe à chaleur Air/Eau ou VMC autour de <strong>Miramas, Salon-de-Provence, Aix-en-Provence, Istres, Martigues, Marseille et Arles</strong>. Tarifs transparents dès <strong>156 € TTC</strong>, créneau en temps réel sous 48h, artisan frigoriste certifié RGE et <strong>attestation Cerfa obligatoire</strong> incluse.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#reserve" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#48BB78', border: 'none', fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}>
              Choisir un Créneau en Direct
            </a>
            <a href="#grille-tarifs" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontSize: '1.05rem', padding: '0.85rem 1.6rem' }}>
              Grille des Tarifs TTC
            </a>
            <a href="tel:0413414901" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '2px solid white', color: 'white', fontSize: '1.05rem', padding: '0.85rem 1.6rem' }}>
              <Phone size={20} />
              04 13 41 49 01
            </a>
          </div>
        </div>
      </section>

      {/* Scannable Pricing Table for Users, Google & AI Engines */}
      <section id="grille-tarifs" style={{ background: 'white', padding: '3.5rem 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '0.75rem' }}>
              Tarifs d&apos;Entretien Climatisation, PAC &amp; VMC 2026 (TTC)
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1rem', margin: 0 }}>
              Tous nos forfaits incluent le déplacement dans les Bouches-du-Rhône (rayon 50–70 km autour de Miramas), la main-d&apos;œuvre frigoriste et la remise de l&apos;attestation d&apos;entretien réglementaire.
            </p>
          </div>
          <div style={{ overflowX: 'auto', maxWidth: '1000px', margin: '0 auto', borderRadius: '1rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', fontSize: '0.94rem' }}>
              <thead>
                <tr style={{ background: '#0F172A', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '0.9rem 1.1rem' }}>Prestation / Équipement</th>
                  <th style={{ padding: '0.9rem 1.1rem' }}>Tarif TTC</th>
                  <th style={{ padding: '0.9rem 1.1rem' }}>Durée</th>
                  <th style={{ padding: '0.9rem 1.1rem' }}>Attestation / Inclus</th>
                  <th style={{ padding: '0.9rem 1.1rem', textAlign: 'right' }}>Fiche</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'preventive', label: 'Entretien Climatisation Mono-Split (Préventif)', price: '156 € TTC', dur: '45 min', inc: 'Filtres, désinfection biocide, pressions + Cerfa' },
                  { id: 'curative', label: 'Entretien Curatif Vapeur 100°C (Anti-odeurs)', price: '192 € TTC', dur: '1 h', inc: 'Vapeur sèche ClimWasher+, turbine + Cerfa' },
                  { id: 'double-split', label: 'Entretien Bi-Split (2 unités intérieures)', price: '270 € TTC', dur: '2 h', inc: '2 évaporateurs + groupe ext. + Cerfa' },
                  { id: 'tri-split', label: 'Entretien Tri-Split (3 unités intérieures)', price: '380 € TTC', dur: '2 h', inc: '3 évaporateurs + groupe ext. + Cerfa' },
                  { id: 'gainable', label: 'Entretien Climatisation Gainable & Airzone', price: '220 € TTC', dur: '45 min', inc: 'Plénum combles, nébulisation gaines + Cerfa' },
                  { id: 'console', label: 'Entretien Climatisation Console basse', price: '165 € TTC', dur: '45 min', inc: 'Double flux, filtres bas, étanchéité + Cerfa' },
                  { id: 'cassette', label: 'Entretien Cassette 4 voies (Bureaux / Commerces)', price: '180 € TTC', dur: '45 min', inc: 'Bac condensats, pompe de relevage + Cerfa' },
                  { id: 'pac-air-eau', label: 'Entretien Pompe à Chaleur Air/Eau (Obligatoire)', price: '270 € TTC', dur: '45 min', inc: 'Échangeur, pression hydraulique, boues + Cerfa' },
                  { id: 'thermodynamique', label: 'Entretien Ballon Thermodynamique', price: '174 € TTC', dur: '45 min', inc: 'PAC intégrée, contrôle anode, sécurité ECS' },
                  { id: 'entretien-vmc', label: 'Entretien Annuel VMC (Simple / Double flux)', price: '230 € TTC', dur: '2h à 3h', inc: 'Démontage caisson, turbine, bouches, gaines' },
                  { id: 'reprogrammation-thermostat', label: 'Re-programmation Thermostat Airzone / Gainable', price: '200 € TTC', dur: '1h à 1h30', inc: 'Mise à jour firmware, signal & pression statique' },
                  { id: 'vrv', label: 'Entretien Système VRV / DRV (Tertiaire / ERP)', price: 'Sur devis (-20 %)', dur: 'Sur mesure', inc: 'Configurateur multi-unités avec remise -20 %' },
                  { id: 'diagnostic', label: 'Diagnostic & Rapport de Panne Assurance', price: '100 € TTC', dur: '45 min', inc: 'Codes défauts, test fuite, rapport certifié' },
                  { id: 'devis', label: 'Étude Thermique & Devis d’Installation', price: 'Gratuit (0 €)', dur: '45 min', inc: 'Déplacement offert jusqu’à 100 km autour de Miramas' },
                ].map((row, i) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 0 ? 'white' : '#F8FAFC' }}>
                    <td style={{ padding: '0.8rem 1.1rem', fontWeight: '600', color: '#0F172A' }}>{row.label}</td>
                    <td style={{ padding: '0.8rem 1.1rem', fontWeight: '800', color: '#0077B6', whiteSpace: 'nowrap' }}>{row.price}</td>
                    <td style={{ padding: '0.8rem 1.1rem', color: '#475569', whiteSpace: 'nowrap' }}>{row.dur}</td>
                    <td style={{ padding: '0.8rem 1.1rem', color: '#475569' }}>{row.inc}</td>
                    <td style={{ padding: '0.8rem 1.1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <Link href={`/reservation-en-ligne/${row.id}`} style={{ color: '#0077B6', fontWeight: '700', textDecoration: 'underline' }}>
                        Détails →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Prestations Section */}
      <section id="catalogue" style={{ background: '#F8FAFC', padding: '5rem 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
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
              Tarifs transparents & réservation directe
            </span>
            <h2 style={{ fontSize: '2.5rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Catalogue des Prestations & Forfaits
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Choisissez ci-dessous la prestation que vous désirez planifier chez vous.
            </p>

            {/* Category Filter Tabs */}
            <div style={{
              display: 'inline-flex',
              background: '#E2E8F0',
              padding: '0.35rem',
              borderRadius: '0.75rem',
              gap: '0.25rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { id: 'all', label: 'Toutes les prestations' },
                { id: 'clim', label: 'Climatisation' },
                { id: 'pac', label: 'Pompe à Chaleur' },
                { id: 'vmc', label: 'VMC' },
                { id: 'depannage', label: 'Dépannage & Études' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: activeCategory === tab.id ? 'white' : 'transparent',
                    color: activeCategory === tab.id ? '#0F172A' : '#64748B',
                    fontWeight: activeCategory === tab.id ? '700' : '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    boxShadow: activeCategory === tab.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decret / Regulation Notice */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #E53E3E',
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
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#9B2C2C', fontWeight: '800', fontSize: '0.95rem' }}>
                Réglementation Officielle (Décret n° 2020-912)
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#7B341E', lineHeight: '1.5' }}>
                L&apos;entretien périodique est <strong>obligatoire au moins tous les 2 ans</strong> pour les systèmes thermodynamiques (climatisation réversible et pompes à chaleur air-eau) d&apos;une puissance nominale comprise entre 4 kW et 70 kW. Une attestation Cerfa vous sera remise.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                className="service-card"
              >
                {/* Recommendation Ribbon */}
                {service.isRecommended && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#FF6B00',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    zIndex: 2,
                    boxShadow: '0 2px 4px rgba(255, 107, 0, 0.2)'
                  }}>
                    Recommandé
                  </div>
                )}

                {/* Card Top / Image Placeholder */}
                <div style={{ position: 'relative', height: '180px', width: '100%', background: '#F1F5F9' }}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                    padding: '1.5rem 1.25rem 1rem',
                    color: 'white'
                  }}>
                    <span style={{ fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                      {service.category === 'clim'
                        ? 'Climatisation'
                        : service.category === 'pac'
                          ? 'Pompe à Chaleur'
                          : service.category === 'vmc'
                            ? 'VMC & Ventilation'
                            : 'Dépannage & Études'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem 1.5rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>
                      {service.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: '600', marginBottom: '0.75rem' }}>
                    {service.subtitle}
                  </p>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-gray)', lineHeight: '1.5', marginBottom: '1.25rem', flex: 1 }}>
                    {service.desc}
                  </p>

                  {/* Pricing / Duration */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: '#F8FAFC',
                    borderRadius: '0.75rem',
                    marginBottom: '1.25rem',
                    border: '1px solid #E2E8F0'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>
                        {service.id === 'vrv' ? 'Tarif sur mesure' : 'Tarif TTC'}
                      </span>
                      <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                        {service.id === 'vrv' ? 'Sur devis (-20 %)' : service.price === 0 ? 'Gratuit' : `${service.price} €`}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Durée estimée</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} /> {service.duration}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Details */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileText size={15} style={{ color: 'var(--primary-blue)' }} /> Opérations incluses :
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {service.details.map((detail, index) => (
                        <li key={index} style={{ fontSize: '0.83rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', lineHeight: '1.4' }}>
                          <Check size={13} style={{ color: '#48BB78', marginTop: '0.15rem', flexShrink: 0 }} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detail link */}
                  <Link
                    href={`/reservation-en-ligne/${service.id}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'var(--primary-blue)',
                      border: '1px solid var(--primary-blue)',
                      padding: '0.65rem',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      marginBottom: '0.75rem',
                      background: 'transparent'
                    }}
                  >
                    Voir détails & conseils de l&apos;expert
                  </Link>

                  {/* Reserve Button */}
                  <button
                    onClick={() => handleSelectService(service.id)}
                    style={{
                      background: 'linear-gradient(135deg, #0091DA 0%, #0077B6 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem',
                      borderRadius: '0.5rem',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0, 145, 218, 0.15)',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      marginTop: 'auto'
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
              Planifiez Votre Intervention
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem' }}>
              Sélectionnez votre forfait ci-dessus, puis choisissez le jour et le créneau qui vous conviennent.
            </p>
          </div>

          {/* Interactive Booking Wizard Component */}
          <BookingWizard initialServiceId={preselectedService} />
        </div>
      </section>

      {/* Why Entretien Benefits Section (Placed below catalog) */}
      <section className="section-padding" style={{ padding: '5rem 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#0F172A', fontWeight: '800' }}>
              Pourquoi entretenir sa climatisation & pompe à chaleur chaque année ?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)' }}>
              Conservez le rendement d&apos;origine de votre appareil, réduisez vos factures d&apos;électricité et prolongez la durée de vie de vos équipements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Wrench size={40} color="var(--primary-blue)" />,
                title: "Économies d'Énergie (-30%)",
                text: "Une climatisation ou PAC bien entretenue consomme jusqu'à 30% d'électricité en moins. Rentabilisez votre forfait d'entretien immédiatement."
              },
              {
                icon: <FileText size={40} color="var(--primary-blue)" />,
                title: "Restauration des Capacités Initiales",
                text: "Le nettoyage de l'évaporateur et de la turbine redonne à votre appareil son débit d'air d'origine et sa capacité de rafraîchissement/chauffage initiale."
              },
              {
                icon: <Clock size={40} color="var(--primary-blue)" />,
                title: "Longévité Maximale du Matériel",
                text: "Un entretien annuel prévient les surchauffes du compresseur Inverter et double la durée de vie moyenne de votre matériel (jusqu'à 15-20 ans)."
              },
              {
                icon: <CheckCircle size={40} color="var(--primary-blue)" />,
                title: "Qualité de l'Air & Santé",
                text: "Élimination de 99% des pollens, poussières, moisissures et bactéries. Notre désinfection biocide certifiée protège les voies respiratoires de votre foyer."
              },
              {
                icon: <ShieldCheck size={40} color="var(--primary-blue)" />,
                title: "Conformité & Attestation Cerfa",
                text: "Attestation d'entretien périodique obligatoire (Décret n° 2020-912) remise immédiatement après intervention. Artisan frigoriste certifié RGE QualiPAC & Décennale."
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E2E8F0',
                borderTop: '4px solid var(--primary-blue)'
              }}>
                <div style={{ marginBottom: '1.25rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0F172A', fontWeight: '700' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Coverage & Brands Section (Visible Local SEO + GEO Signals) */}
      <section style={{ padding: '4.5rem 0', background: 'white', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={22} color="#0091DA" /> Zones d&apos;Intervention Entretien (Bouches-du-Rhône — 13)
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                Basée à <strong>Miramas (13140)</strong>, notre équipe de frigoristes intervient sous 48h dans un rayon de <strong>50 à 70 km</strong> pour tous vos entretiens et dépannages (et jusqu&apos;à 100 km pour les études &amp; diagnostics) :
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  { slug: 'miramas', label: 'Miramas' },
                  { slug: 'salon-de-provence', label: 'Salon-de-Provence' },
                  { slug: 'aix-en-provence', label: 'Aix-en-Provence' },
                  { slug: 'istres', label: 'Istres' },
                  { slug: 'martigues', label: 'Martigues' },
                  { slug: 'marseille', label: 'Marseille' },
                  { slug: 'arles', label: 'Arles' },
                  { slug: 'vitrolles', label: 'Vitrolles' },
                  { slug: 'marignane', label: 'Marignane' },
                  { slug: 'fos-sur-mer', label: 'Fos-sur-Mer' },
                  { slug: 'aubagne', label: 'Aubagne' },
                  { slug: 'gardanne', label: 'Gardanne' },
                  { slug: 'lambesc', label: 'Lambesc' },
                  { slug: 'pelissanne', label: 'Pélissanne' },
                  { slug: 'carry-le-rouet', label: 'Carry-le-Rouet' },
                  { slug: 'saint-remy-de-provence', label: 'Saint-Rémy-de-Provence' },
                ].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}/entretien`}
                    style={{
                      padding: '0.35rem 0.75rem',
                      background: 'white',
                      border: '1px solid #CBD5E1',
                      borderRadius: '2rem',
                      fontSize: '0.84rem',
                      color: '#0F172A',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    Entretien {city.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={22} color="#0091DA" /> Marques Entretenues &amp; Certifications
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1rem' }}>
                <strong>Air G Énergie SARL</strong> (SIREN 909 266 256) entretient et dépanne l&apos;ensemble des grandes marques de climatisation, pompes à chaleur et régulations :
              </p>
              <p style={{ color: '#0F172A', fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Daikin • Mitsubishi Electric • Toshiba • Atlantic • Heiwa (Éco Expert) • Fujitsu • Hitachi • Samsung • LG • Panasonic • Airzone • Delta Dore
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Qualification RGE QualiPAC &amp; Expert Vérifié Gainable.fr</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Attestation de capacité manipulation des fluides frigorigènes</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#48BB78" /> Attestation légale d&apos;entretien Cerfa (Décret n° 2020-912)</li>
              </ul>
              <Link href="/entretien" style={{ color: '#0077B6', fontWeight: '700', textDecoration: 'underline', fontSize: '0.92rem' }}>
                Consulter notre guide complet sur le Décret 2020-912 et les contrats d&apos;entretien →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visible FAQ Section (Mirrors SSR FAQPage JSON-LD 1:1) */}
      <section style={{ padding: '4.5rem 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={26} color="#0091DA" /> Questions Fréquentes — Réservation &amp; Entretien
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                q: "Quel est le prix de l'entretien d'une climatisation dans les Bouches-du-Rhône ?",
                a: "Chez Air G Énergie, l'entretien préventif d'une climatisation mono-split coûte 156 € TTC (192 € TTC en curatif vapeur 100°C). Le forfait bi-split est à 270 € TTC, le tri-split à 380 € TTC, le gainable à 220 € TTC, la console à 165 € TTC, la cassette à 180 € TTC, la pompe à chaleur Air/Eau à 270 € TTC et la VMC à 230 € TTC. Déplacement et attestation Cerfa inclus."
              },
              {
                q: "L'entretien d'une climatisation ou pompe à chaleur est-il obligatoire ?",
                a: "Oui. Selon le décret n° 2020-912 (Code de l'environnement, art. R.224-44-1 à R.224-44-3), l'entretien des systèmes thermodynamiques de 4 kW à 70 kW est obligatoire au moins tous les deux ans. L'attestation d'entretien Cerfa est exigée par votre assurance en cas de sinistre et par les fabricants pour maintenir la garantie."
              },
              {
                q: "Comment fonctionne la réservation en direct sous 48h ?",
                a: "Vous sélectionnez votre équipement (mono-split, multi-split, gainable, PAC Air/Eau, ballon thermodynamique, VMC ou VRV), choisissez la date et le créneau en temps réel dans notre agenda synchronisé, puis validez votre réservation en ligne sécurisée via Stripe. Un frigoriste certifié Air G Énergie intervient sous 48h ouvrées."
              },
              {
                q: "Dans quelles villes des Bouches-du-Rhône intervenez-vous pour l'entretien ?",
                a: "Nos techniciens basés à Miramas (13140) interviennent dans un rayon de 50 à 70 km pour l'entretien et le dépannage : Miramas, Salon-de-Provence, Istres, Martigues, Aix-en-Provence, Marseille, Arles, Vitrolles, Marignane, Fos-sur-Mer, Carry-le-Rouet, Sausset-les-Pins, Pélissanne, Lançon-de-Provence, Saint-Rémy-de-Provence et les Alpilles. Les études et diagnostics s'étendent jusqu'à 100 km."
              },
              {
                q: "Quelle est la différence entre entretien préventif (156 €) et curatif vapeur (192 €) ?",
                a: "L'entretien préventif (156 € TTC) assure la maintenance annuelle complète : nettoyage des filtres, désinfection biocide de l'évaporateur, nettoyage du groupe extérieur, contrôle des pressions et attestation Cerfa. Le forfait curatif (192 € TTC) ajoute un décrassage intensif à la vapeur sèche 100°C sous pression avec bâche ClimWasher+ pour éliminer moisissures incrustées, mauvaises odeurs et dépôts noirs sur la turbine."
              },
              {
                q: "Quelles marques de climatisation et pompe à chaleur entretenez-vous ?",
                a: "Air G Énergie assure la maintenance multimarques : Daikin, Mitsubishi Electric, Toshiba, Atlantic, Heiwa, Fujitsu, Hitachi, Samsung, LG, Panasonic ainsi que les systèmes de régulation gainable Airzone et Delta Dore."
              },
              {
                q: "Que se passe-t-il si ma climatisation est en panne le jour de l'entretien ?",
                a: "Un test de bon fonctionnement est systématiquement réalisé avant tout nettoyage. Si une panne matérielle ou une fuite est constatée, le technicien vous propose de convertir l'intervention en diagnostic officiel avec rapport écrit pour votre assurance (100 € TTC) afin d'établir un devis de réparation précis."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'white', padding: '1.5rem 1.75rem', borderRadius: '0.85rem', border: '1px solid #E2E8F0', borderLeft: '4px solid #0091DA' }}>
                <h3 style={{ fontSize: '1.08rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.6rem' }}>{item.q}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
