'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  url: string;
  subtitle?: string;
  logoSvg: React.ReactNode;
}

const PARTNERS: Partner[] = [
  {
    id: 'gainable-fr',
    name: 'GAINABLE.FR',
    subtitle: 'Études & Solutions Gainables',
    url: 'https://www.gainable.fr',
    logoSvg: (
      <svg viewBox="0 0 220 65" className="w-full h-full" style={{ maxHeight: '42px' }}>
        {/* Crisp Gainable G with orange mark */}
        <path d="M 38 16 A 18 18 0 1 0 38 46 L 38 31 L 28 31" fill="none" stroke="#2D3748" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="27" y="27" width="9" height="8" fill="#F59E0B" rx="1" />
        <text x="52" y="39" fill="#2D3748" fontSize="21" fontWeight="800" fontFamily="System-UI, -apple-system, sans-serif" letterSpacing="0.5">AINABLE.FR</text>
      </svg>
    )
  },
  {
    id: 'toferbat',
    name: 'TOFERBAT',
    subtitle: 'Gros Œuvre & Bâtiment',
    url: 'https://www.toferbat.fr',
    logoSvg: (
      <svg viewBox="0 0 180 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        {/* Navy dark card container */}
        <rect x="5" y="6" width="170" height="52" fill="#1E242C" rx="4" />
        {/* House roof icon */}
        <path d="M 90 14 L 104 25 L 101 25 L 101 34 L 79 34 L 79 25 L 76 25 Z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="85" y="21" width="10" height="9" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="90" y1="21" x2="90" y2="30" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="85" y1="25.5" x2="95" y2="25.5" stroke="#FFFFFF" strokeWidth="1" />
        {/* Text */}
        <text x="90" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">TOFERBAT</text>
        <text x="90" y="51" fill="#A0AEC0" fontSize="5.5" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">DEPUIS 1967</text>
      </svg>
    )
  },
  {
    id: 'f-peinture',
    name: 'F. Peinture',
    subtitle: 'Peinture & Décoration',
    url: 'https://fpeinture.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <rect x="5" y="6" width="180" height="52" fill="#E2E8F0" rx="4" />
        {/* Dual paint stroke */}
        <path d="M 45 34 C 65 24 95 40 135 26" stroke="#2D3748" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 55 38 C 80 30 110 38 140 32" stroke="#00A8FF" strokeWidth="5" strokeLinecap="round" fill="none" />
        <text x="95" y="29" fill="#1A202C" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">F. peinture</text>
        <text x="95" y="49" fill="#718096" fontSize="6.5" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">AMÉNAGEMENT</text>
      </svg>
    )
  },
  {
    id: 'smb13',
    name: 'SMB13',
    subtitle: 'Rénovation Bouches-du-Rhône',
    url: 'http://smb13.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        {/* House roof */}
        <path d="M 20 31 L 65 10 L 110 31" fill="none" stroke="#4A5568" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="86" y="12" width="7" height="10" fill="#4A5568" />
        <rect x="60" y="21" width="10" height="10" fill="none" stroke="#4A5568" strokeWidth="1.5" />
        <line x1="65" y1="21" x2="65" y2="31" stroke="#4A5568" strokeWidth="1" />
        <line x1="60" y1="26" x2="70" y2="26" stroke="#4A5568" strokeWidth="1" />
        {/* Text */}
        <text x="25" y="55" fill="#00A8FF" fontSize="26" fontWeight="900" fontFamily="System-UI, sans-serif">SMB</text>
        <text x="88" y="55" fill="#2D3748" fontSize="26" fontWeight="900" fontFamily="System-UI, sans-serif">13</text>
      </svg>
    )
  },
  {
    id: 'daikin',
    name: 'DAIKIN',
    subtitle: 'Partenaire Climatisation & PAC',
    url: 'https://www.daikin.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        {/* Blue Daikin Triangle */}
        <polygon points="12,46 38,16 38,46" fill="#0091DA" />
        <text x="48" y="42" fill="#0091DA" fontSize="25" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1">DAIKIN</text>
      </svg>
    )
  },
  {
    id: 'studio-mirabelle',
    name: 'Studio Mirabelle',
    subtitle: 'Architecture & Design',
    url: 'https://studiomirabelle.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        {/* Hexagon */}
        <polygon points="30,4 80,4 100,32 80,60 30,60 10,32" fill="none" stroke="#2B7A78" strokeWidth="2.2" />
        <text x="55" y="24" fill="#2B7A78" fontSize="9" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">STUDIO</text>
        <text x="55" y="44" fill="#2B7A78" fontSize="19" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle">Mirabelle</text>
      </svg>
    )
  },
  {
    id: 'arfi-immobilier',
    name: 'ARFI Immobilier',
    subtitle: 'Réseau Immobilier PACA',
    url: 'https://www.arfi-immobilier.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <rect x="10" y="12" width="170" height="38" fill="#0284C7" rx="3" />
        <rect x="10" y="40" width="170" height="10" fill="#EAB308" rx="1" />
        <text x="95" y="32" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">ARFI IMMOBILIER</text>
      </svg>
    )
  },
  {
    id: 'feel-interim',
    name: 'Feel Interim',
    subtitle: 'Agence d\'Emploi & Recrutement',
    url: 'https://feel-interim.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <path d="M 15 36 Q 25 18 35 16 Q 27 28 25 42 Z" fill="#EA580C" />
        <path d="M 23 38 Q 37 20 48 23 Q 34 32 32 48 Z" fill="#F97316" />
        <text x="55" y="34" fill="#1E293B" fontSize="19" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Feel Interim</text>
        <text x="55" y="48" fill="#64748B" fontSize="6.5" fontFamily="sans-serif" letterSpacing="0.8">Simple comme un coup de fil</text>
      </svg>
    )
  },
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    subtitle: 'Systèmes de Climatisation',
    url: 'https://www.mitsubishielectric.fr',
    logoSvg: (
      <svg viewBox="0 0 210 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <polygon points="22,16 31,31 22,46 13,31" fill="#E11D48" />
        <polygon points="32,32 41,47 23,47" fill="#E11D48" />
        <polygon points="12,32 21,47 3,47" fill="#E11D48" />
        <text x="48" y="34" fill="#1E293B" fontSize="13.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">MITSUBISHI</text>
        <text x="48" y="47" fill="#64748B" fontSize="11.5" fontWeight="700" fontFamily="sans-serif" letterSpacing="1">ELECTRIC</text>
      </svg>
    )
  },
  {
    id: 'toshiba',
    name: 'Toshiba',
    subtitle: 'Climatisation & Chauffage',
    url: 'https://www.toshibaclim.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <text x="95" y="42" fill="#DC2626" fontSize="27" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1" textAnchor="middle">TOSHIBA</text>
      </svg>
    )
  },
  {
    id: 'atlantic',
    name: 'Atlantic',
    subtitle: 'Solutions Thermiques Françaises',
    url: 'https://www.atlantic.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <circle cx="28" cy="32" r="15" fill="none" stroke="#0284C7" strokeWidth="4.5" />
        <path d="M 20 32 L 36 32" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
        <text x="50" y="40" fill="#0284C7" fontSize="23" fontWeight="800" fontFamily="sans-serif">atlantic</text>
      </svg>
    )
  },
  {
    id: 'airzone',
    name: 'Airzone',
    subtitle: 'Régulation Multizone Gainable',
    url: 'https://www.airzonefrance.fr',
    logoSvg: (
      <svg viewBox="0 0 190 65" className="w-full h-full" style={{ maxHeight: '44px' }}>
        <text x="95" y="40" fill="#0284C7" fontSize="24" fontWeight="900" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">AIRZONE</text>
      </svg>
    )
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {partner.logoSvg}
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
