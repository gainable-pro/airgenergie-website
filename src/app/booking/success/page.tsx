'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Phone, Mail, Clock, MapPin, Home, ArrowRight } from 'lucide-react';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #F0F9FF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-geist-sans, sans-serif)',
    }}>
      <div style={{
        maxWidth: '640px',
        width: '100%',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        {/* Success Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 16px rgba(16, 185, 129, 0.1)',
            marginBottom: '1.5rem',
          }}>
            <CheckCircle size={48} color="white" strokeWidth={2.5} />
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '900',
            color: '#064E3B',
            marginBottom: '0.75rem',
            lineHeight: '1.2',
          }}>
            Réservation confirmée !
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#047857', fontWeight: '500' }}>
            Votre paiement a bien été reçu. Merci pour votre confiance.
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          marginBottom: '1.5rem',
        }}>
          {/* What happens next */}
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowRight size={18} color="#10B981" />
            Prochaines étapes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
            {[
              {
                icon: <Mail size={20} color="#0091DA" />,
                title: 'Email de confirmation',
                desc: 'Un email récapitulatif avec les détails de votre intervention vous sera envoyé sous quelques minutes.',
              },
              {
                icon: <Calendar size={20} color="#10B981" />,
                title: 'Créneau réservé',
                desc: 'Votre créneau est maintenant bloqué dans notre planning. Notre technicien sera à l\'heure.',
              },
              {
                icon: <Phone size={20} color="#7C3AED" />,
                title: 'Rappel la veille',
                desc: 'Nous vous appellerons la veille pour confirmer l\'heure exacte d\'arrivée (±15 min).',
              },
              {
                icon: <Clock size={20} color="#F59E0B" />,
                title: 'Contrôle préalable',
                desc: 'À son arrivée, notre technicien effectuera un contrôle de performance avant l\'entretien. En cas de panne identifiée, l\'intervention peut être transformée en diagnostic.',
              },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: '#0F172A', margin: '0 0 0.2rem', fontSize: '0.95rem' }}>{step.title}</p>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{
            background: '#F0FDF4',
            borderRadius: '1rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <p style={{ fontWeight: '700', color: '#064E3B', margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
              Une question ? Contactez-nous directement :
            </p>
            <a href="tel:+33413414901" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}>
              <Phone size={16} /> 04 13 41 49 01
            </a>
            <a href="mailto:contact@airgenergie.fr" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Mail size={16} /> contact@airgenergie.fr
            </a>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748B',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            border: '2px solid #E2E8F0',
            background: 'white',
            transition: 'all 0.2s',
          }}>
            <Home size={16} />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
