'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  initials: string;
  city: string;
  date: string;
  rating: number;
  avatarBg: string;
  text: string;
  installationType: string;
  googleUrl: string;
}

const GOOGLE_REVIEWS_URL = 'https://share.google/sLKMxADrGA36sYOhR';

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Roxane Delaby',
    initials: 'RD',
    city: 'Miramas',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
    installationType: 'Climatisation Gainable',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Super intervention d\'Air G Énergie ! Entreprise très professionnelle, réactive et un travail d\'une grande propreté pour l\'installation de notre climatisation. Je recommande vivement !'
  },
  {
    id: '2',
    author: 'Sébastien Perczak',
    initials: 'SP',
    city: 'Salon-de-Provence',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    installationType: 'Pompe à Chaleur Gainable',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Équipe au top pour l\'installation de notre pompe à chaleur gainable. Ponctuels, discrets et un chantier rendu impeccable. Conseils précieux pour l\'utilisation et les économies d\'énergie au quotidien.'
  },
  {
    id: '3',
    author: 'Pascale Barnouin',
    initials: 'PB',
    city: 'Istres',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    installationType: 'Entretien Climatisation',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Très satisfaite de la prestation d\'entretien de notre clim réversible. Intervenant très professionnel, poli et efficace. Je n\'hésiterai pas à refaire appel à Air G Énergie.'
  },
  {
    id: '4',
    author: 'Khalissa Khalfi',
    initials: 'KK',
    city: 'Miramas',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    installationType: 'Installation Réversible',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Service parfait de A à Z ! Devis rapide et clair, prise de rendez-vous simple et installation soignée. Air G Énergie est un artisan de grande confiance sur Miramas et les alentours.'
  },
  {
    id: '5',
    author: 'Céline Marras',
    initials: 'CM',
    city: 'Grans',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    installationType: 'Dépannage & Maintenance',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Excellente expérience avec Air G Énergie. Dépannage rapide en période de fortes chaleurs, diagnostic précis et tarif très honnête. Merci infiniment à toute l\'équipe !'
  },
  {
    id: '6',
    author: 'Michel Arnoux',
    initials: 'MA',
    city: 'Aix-en-Provence',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    installationType: 'Pose Multi-Split',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Professionnalisme, ponctualité et réactivité. Installation d\'une climatisation multisplit dans notre maison. Travail de grande qualité et suivi après-vente très sérieux.'
  },
  {
    id: '7',
    author: 'Emmanuelle Strehl',
    initials: 'ES',
    city: 'Saint-Chamas',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    installationType: 'Nettoyage & Désinfection',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Artisan très réactif et travail très propre. Nous avons fait réaliser l\'entretien annuel et le nettoyage complet à la vapeur de nos unités de climatisation. Résultat impeccable !'
  },
  {
    id: '8',
    author: 'André Ruffet',
    initials: 'AR',
    city: 'Martigues',
    date: 'Avis Google vérifié',
    rating: 5,
    avatarBg: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    installationType: 'Climatisation Daikin',
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Installation impeccable et matériel Daikin de haute qualité. Équipe très courtoise, à l\'écoute de nos besoins et de bon conseil. Je recommande les yeux fermés !'
  }
];

export default function GoogleReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Continuous gentle scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      style={{ 
        padding: '4.5rem 0', 
        background: '#F8FAFC', 
        borderTop: '1px solid #E2E8F0', 
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                background: 'white', 
                padding: '0.5rem 1.3rem', 
                borderRadius: '2rem', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '1rem',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#4285F4')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
            >
              {/* Google G Logo SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>Avis Clients Google Officiels</span>
              <ExternalLink size={14} style={{ color: '#4285F4' }} />
            </div>
          </a>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0F172A', fontWeight: '800', marginBottom: '1rem' }}>
            Ce que nos clients disent sur Google
          </h2>

          {/* Rating Summary (5/5 as requested) */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} fill="#FBBC04" color="#FBBC04" />
                ))}
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>5 / 5</span>
                <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginTop: '0.2rem' }}>
                  Basé sur les avis Google Business Profile Air G Énergie
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Carousel Container */}
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Previous Button */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Avis précédents"
            style={{
              position: 'absolute',
              left: '-16px',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
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

          {/* Reviews Track */}
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '1rem 0.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%'
            }}
          >
            {REVIEWS.map((review) => (
              <a
                key={review.id}
                href={review.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Voir l'avis complet de ${review.author} sur Google`}
                style={{
                  flex: '0 0 320px',
                  background: 'white',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px -2px rgba(0,0,0,0.04), 0 2px 6px -1px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  position: 'relative',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 28px -4px rgba(0,145,218,0.18)';
                  e.currentTarget.style.borderColor = '#0091DA';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div>
                  {/* Top bar: Stars & Google Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.15rem' }}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="#FBBC04" color="#FBBC04" />
                      ))}
                    </div>
                    {/* Google G Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F1F5F9', padding: '0.25rem 0.6rem', borderRadius: '1rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>Google</span>
                    </div>
                  </div>

                  {/* Installation Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.8rem', 
                        color: '#0091DA', 
                        fontWeight: '700'
                      }}
                    >
                      {review.installationType}
                    </span>
                    <ExternalLink size={14} style={{ color: '#0091DA', opacity: 0.7 }} />
                  </div>

                  {/* Review Text */}
                  <p 
                    style={{ 
                      fontSize: '0.95rem', 
                      color: '#334155', 
                      lineHeight: '1.6', 
                      marginBottom: '1.5rem',
                      fontStyle: 'italic'
                    }}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author Info Footer */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid #F1F5F9' 
                  }}
                >
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '50%', 
                      background: review.avatarBg,
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0F172A' }}>
                      {review.author}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {review.city} • {review.date}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Avis suivants"
            style={{
              position: 'absolute',
              right: '-16px',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
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

        {/* CTA Button to Google Profile */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'white',
              color: '#0F172A',
              border: '2px solid #E2E8F0',
              padding: '0.85rem 1.75rem',
              borderRadius: '0.75rem',
              fontSize: '1.05rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#0091DA';
              e.currentTarget.style.color = '#0091DA';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,145,218,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.color = '#0F172A';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            Consulter tous les avis sur notre fiche Google Business
            <ExternalLink size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
