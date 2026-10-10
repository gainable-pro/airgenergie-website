'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  url: string;
  subtitle?: string;
  logoImg: string;
}

const PARTNERS: Partner[] = [
  {
    id: 'gainable-fr',
    name: 'GAINABLE.FR',
    subtitle: 'Études & Solutions Gainables',
    url: 'https://www.gainable.fr',
    logoImg: '/images/partners/gainable.png'
  },
  {
    id: 'toferbat',
    name: 'TOFERBAT',
    subtitle: 'Gros Œuvre & Bâtiment',
    url: 'https://www.toferbat.fr',
    logoImg: '/images/partners/toferbat.jpg'
  },
  {
    id: 'tr-peinture',
    name: 'TR Peinture',
    subtitle: 'Peinture & Revêtement',
    url: 'https://fpeinture.fr',
    logoImg: '/images/partners/tr-peinture.jpg'
  },
  {
    id: 'smb13',
    name: 'SMB13',
    subtitle: 'Rénovation Bouches-du-Rhône',
    url: 'http://smb13.fr',
    logoImg: '/images/partners/smb13.png'
  },
  {
    id: 'daikin',
    name: 'DAIKIN',
    subtitle: 'Partenaire Climatisation & PAC',
    url: 'https://www.daikin.fr',
    logoImg: '/images/partners/daikin.png'
  },
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    subtitle: 'Systèmes de Climatisation',
    url: 'https://www.mitsubishielectric.fr',
    logoImg: '/images/partners/mitsubishi.png'
  },
  {
    id: 'toshiba',
    name: 'Toshiba',
    subtitle: 'Climatisation & Chauffage',
    url: 'https://www.toshibaclim.fr',
    logoImg: '/images/partners/toshiba.png'
  },
  {
    id: 'atlantic',
    name: 'Atlantic',
    subtitle: 'Solutions Thermiques Françaises',
    url: 'https://www.atlantic.fr',
    logoImg: '/images/partners/atlantic.png'
  },
  {
    id: 'arfi-immobilier',
    name: 'ARFI Immobilier',
    subtitle: 'Réseau Immobilier PACA',
    url: 'https://www.arfi-immobilier.fr',
    logoImg: '/images/partners/arfi-immobilier.png'
  },
  {
    id: 'feel-interim',
    name: 'Feel Interim',
    subtitle: 'Agence d\'Emploi & Recrutement',
    url: 'https://feel-interim.fr',
    logoImg: '/images/partners/feel-interim.png'
  },
  {
    id: 'effy',
    name: 'Effy',
    subtitle: 'Partenaire Rénovation Énergétique',
    url: 'https://www.effy.fr',
    logoImg: '/images/partners/effy.jpg'
  },
  {
    id: 'bni',
    name: 'BNI',
    subtitle: 'Business Network International',
    url: 'https://www.bni.com',
    logoImg: '/images/partners/bni.jpg'
  },
  {
    id: 'fex-im13',
    name: 'Franck Expertise Immobilier 13',
    subtitle: 'Expertise & Diagnostics Immobiliers',
    url: 'https://fex-im13.fr',
    logoImg: '/images/partners/fex-im13.png'
  },
  {
    id: 'melusine-services',
    name: 'Mélusine Services',
    subtitle: 'Services à la personne & Entretien',
    url: 'https://www.melusineservices.fr',
    logoImg: '/images/partners/melusine-services.jpg'
  },
  {
    id: 'ekite-avocats',
    name: 'Ékité Avocats',
    subtitle: 'Cabinet d\'Avocats',
    url: 'https://www.ekite-avocats.fr',
    logoImg: '/images/partners/ekite-avocats.jpg'
  }
];

export default function PartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Continuous subtle auto-scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      style={{ 
        padding: '3.5rem 0', 
        background: '#FFFFFF', 
        borderTop: '1px solid #E2E8F0', 
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 
            style={{ 
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', 
              color: '#0091DA', 
              fontWeight: '800', 
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            NOS PARTENAIRES
          </h2>
          <p style={{ color: '#64748B', marginTop: '0.5rem', fontSize: '1.025rem' }}>
            Un réseau de confiance et des fabricants leaders du génie climatique. Cliquez sur un logo pour visiter leur site.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Partenaires précédents"
            style={{
              position: 'absolute',
              left: '-12px',
              zIndex: 10,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0F172A',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: '1.25rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '0.75rem 0.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%'
            }}
          >
            {PARTNERS.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visiter ${partner.name}`}
                style={{
                  flex: '0 0 210px',
                  height: '95px',
                  background: 'white',
                  borderRadius: '0.85rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px -1px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#0091DA';
                  e.currentTarget.style.boxShadow = '0 12px 20px -4px rgba(0,145,218,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 6px -1px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={partner.logoImg}
                    alt={partner.name}
                    style={{
                      maxHeight: '52px',
                      maxWidth: '165px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))'
                    }}
                  />
                </div>

                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    right: '8px', 
                    opacity: 0.5,
                    transition: 'opacity 0.2s ease',
                    color: '#0091DA'
                  }}
                >
                  <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Partenaires suivants"
            style={{
              position: 'absolute',
              right: '-12px',
              zIndex: 10,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0F172A',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
