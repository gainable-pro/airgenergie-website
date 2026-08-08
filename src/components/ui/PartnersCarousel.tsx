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
    id: 'studio-mirabelle',
    name: 'Studio Mirabelle',
    subtitle: 'Architecture & Design',
    url: 'https://studiomirabelle.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Hexagon outline */}
        <polygon points="35,5 85,5 105,35 85,65 35,65 15,35" fill="none" stroke="#2B7A78" strokeWidth="2.5" />
        <text x="60" y="28" fill="#2B7A78" fontSize="10" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">STUDIO</text>
        <text x="60" y="48" fill="#2B7A78" fontSize="20" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle">Mirabelle</text>
      </svg>
    )
  },
  {
    id: 'gainable-fr',
    name: 'GAINABLE.FR',
    subtitle: 'Études & Solutions Gainables',
    url: 'https://www.gainable.fr',
    logoSvg: (
      <svg viewBox="0 0 220 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Large G logo with yellow mark */}
        <path d="M 45 20 A 20 20 0 1 0 45 50 L 45 35 L 32 35" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <rect x="33" y="31" width="10" height="8" fill="#EAB308" />
        <text x="60" y="44" fill="#334155" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="1">AINABLE.FR</text>
      </svg>
    )
  },
  {
    id: 'toferbat',
    name: 'TOFERBAT',
    subtitle: 'Gros Œuvre & Bâtiment',
    url: 'https://www.toferbat.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        <rect x="20" y="10" width="160" height="50" fill="#1E293B" rx="4" />
        {/* House icon */}
        <path d="M 100 18 L 115 30 L 111 30 L 111 40 L 89 40 L 89 30 L 85 30 Z" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="94" y="24" width="12" height="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="100" y1="24" x2="100" y2="34" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="94" y1="29" x2="106" y2="29" stroke="#FFFFFF" strokeWidth="1" />
        <text x="100" y="52" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">TOFERBAT</text>
        <text x="100" y="58" fill="#94A3B8" fontSize="6" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">DEPUIS 1967</text>
      </svg>
    )
  },
  {
    id: 'f-peinture',
    name: 'F. Peinture',
    subtitle: 'Peinture & Décoration',
    url: 'https://fpeinture.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        <rect x="20" y="10" width="160" height="50" fill="#E2E8F0" rx="4" />
        {/* Paint strokes */}
        <path d="M 60 42 C 80 30 110 48 140 32" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M 70 46 C 95 38 120 46 145 38" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
        <text x="100" y="34" fill="#1E293B" fontSize="17" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">F. peinture</text>
        <text x="100" y="54" fill="#64748B" fontSize="7" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">AMÉNAGEMENT</text>
      </svg>
    )
  },
  {
    id: 'smb13',
    name: 'SMB13',
    subtitle: 'Rénovation Bouches-du-Rhône',
    url: 'http://smb13.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Roof line */}
        <path d="M 25 35 L 70 12 L 115 35" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        {/* Chimney */}
        <rect x="92" y="15" width="8" height="12" fill="#475569" />
        {/* Window */}
        <rect x="64" y="24" width="12" height="12" fill="none" stroke="#475569" strokeWidth="1.5" />
        <line x1="70" y1="24" x2="70" y2="36" stroke="#475569" strokeWidth="1" />
        <line x1="64" y1="30" x2="76" y2="30" stroke="#475569" strokeWidth="1" />
        {/* Text */}
        <text x="32" y="60" fill="#38BDF8" fontSize="28" fontWeight="800" fontFamily="sans-serif">SMB</text>
        <text x="96" y="60" fill="#334155" fontSize="28" fontWeight="800" fontFamily="sans-serif">13</text>
      </svg>
    )
  },
  {
    id: 'daikin',
    name: 'DAIKIN',
    subtitle: 'Partenaire Climatisation & PAC',
    url: 'https://www.daikin.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Triangle logo */}
        <polygon points="15,48 40,18 40,48" fill="#0091DA" />
        <text x="50" y="44" fill="#0091DA" fontSize="26" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1">DAIKIN</text>
      </svg>
    )
  },
  {
    id: 'feel-interim',
    name: 'Feel Interim',
    subtitle: 'Agence d\'Emploi & Recrutement',
    url: 'https://feel-interim.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Orange graphic arms */}
        <path d="M 20 40 Q 30 20 40 18 Q 32 30 30 45 Z" fill="#EA580C" />
        <path d="M 28 42 Q 42 22 55 25 Q 40 35 38 52 Z" fill="#F97316" />
        <text x="60" y="38" fill="#1E293B" fontSize="20" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Feel Interim</text>
        <text x="60" y="52" fill="#64748B" fontSize="7" fontFamily="sans-serif" letterSpacing="1">Simple comme un coup de fil</text>
      </svg>
    )
  },
  {
    id: 'arfi-immobilier',
    name: 'ARFI Immobilier',
    subtitle: 'Réseau Immobilier Provence',
    url: 'https://www.arfi-immobilier.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        <rect x="15" y="15" width="170" height="40" fill="#0284C7" rx="3" />
        <rect x="15" y="43" width="170" height="12" fill="#EAB308" rx="1" />
        <text x="100" y="35" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">ARFI IMMOBILIER</text>
      </svg>
    )
  },
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    subtitle: 'Systèmes de Climatisation',
    url: 'https://www.mitsubishielectric.fr',
    logoSvg: (
      <svg viewBox="0 0 220 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Three red diamonds */}
        <polygon points="25,20 35,35 25,50 15,35" fill="#E11D48" />
        <polygon points="36,36 46,51 26,51" fill="#E11D48" />
        <polygon points="14,36 24,51 4,51" fill="#E11D48" />
        <text x="52" y="38" fill="#1E293B" fontSize="14" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">MITSUBISHI</text>
        <text x="52" y="52" fill="#64748B" fontSize="12" fontWeight="700" fontFamily="sans-serif" letterSpacing="1">ELECTRIC</text>
      </svg>
    )
  },
  {
    id: 'toshiba',
    name: 'Toshiba',
    subtitle: 'Climatisation & Chauffage',
    url: 'https://www.toshibaclim.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        <text x="100" y="45" fill="#DC2626" fontSize="28" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="1" textAnchor="middle">TOSHIBA</text>
      </svg>
    )
  },
  {
    id: 'atlantic',
    name: 'Atlantic',
    subtitle: 'Solutions Thermiques Françaises',
    url: 'https://www.atlantic.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        {/* Geometric wave/circle logo */}
        <circle cx="30" cy="35" r="16" fill="none" stroke="#0284C7" strokeWidth="5" />
        <path d="M 22 35 L 38 35" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        <text x="54" y="44" fill="#0284C7" fontSize="24" fontWeight="800" fontFamily="sans-serif">atlantic</text>
      </svg>
    )
  },
  {
    id: 'airzone',
    name: 'Airzone',
    subtitle: 'Régulation Multizone Gainable',
    url: 'https://www.airzonefrance.fr',
    logoSvg: (
      <svg viewBox="0 0 200 70" className="w-full h-full" style={{ maxHeight: '48px' }}>
        <text x="100" y="43" fill="#0284C7" fontSize="25" fontWeight="900" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">AIRZONE</text>
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
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)', 
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
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', 
              color: '#0091DA', 
              fontWeight: '800', 
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            NOS PARTENAIRES
          </h2>
          <p style={{ color: 'var(--text-gray, #64748B)', marginTop: '0.5rem', fontSize: '1.025rem' }}>
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
                  flex: '0 0 200px',
                  height: '110px',
                  background: 'white',
                  borderRadius: '0.85rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
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
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.03)';
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
