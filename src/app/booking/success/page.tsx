'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Phone, Mail, Clock, MapPin, Home, ArrowRight, Download, FileText } from 'lucide-react';

interface SessionData {
  id: string;
  customerEmail?: string;
  customerName?: string;
  amountTotal: number;
  paymentStatus: string;
  invoicePdf?: string;
  hostedInvoiceUrl?: string;
  metadata?: Record<string, string>;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<SessionData | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [autoDownloaded, setAutoDownloaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sessionId) {
      setLoadingSession(true);
      fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setSession(data);
          }
        })
        .catch((err) => console.error('Error fetching session details:', err))
        .finally(() => setLoadingSession(false));
    }
  }, [sessionId]);

  // Déclenchement automatique du téléchargement de la facture PDF
  useEffect(() => {
    if (session?.invoicePdf && !autoDownloaded) {
      setAutoDownloaded(true);
      const downloadTimer = setTimeout(() => {
        try {
          const a = document.createElement('a');
          a.href = session.invoicePdf!;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.download = `Facture-AirGEnergie-${(session.metadata?.serviceId || 'Intervention')}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (e) {
          console.warn('Auto-download blocked or failed:', e);
        }
      }, 700);
      return () => clearTimeout(downloadTimer);
    }
  }, [session?.invoicePdf, autoDownloaded]);

  const serviceName = session?.metadata?.serviceName || 'Prestation d\'entretien climatisation';
  const formattedDate = session?.metadata?.date
    ? new Date(session.metadata.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null;
  const timeSlot = session?.metadata?.timeSlot;
  const clientVille = session?.metadata?.clientVille;
  const invoiceLink = session?.invoicePdf || session?.hostedInvoiceUrl;

  return (
    <div style={{
      maxWidth: '680px',
      width: '100%',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
    }}>
      {/* Success Icon */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 16px rgba(16, 185, 129, 0.1)',
          marginBottom: '1.25rem',
        }}>
          <CheckCircle size={48} color="white" strokeWidth={2.5} />
        </div>

        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '900',
          color: '#064E3B',
          marginBottom: '0.5rem',
          lineHeight: '1.2',
        }}>
          Paiement et réservation confirmés !
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#047857', fontWeight: '500', margin: 0 }}>
          Votre virement Stripe a bien été enregistré. Merci pour votre confiance.
        </p>
      </div>

      {/* Invoice & Order Summary Box */}
      {session && (
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #BBF7D0',
          borderRadius: '1.25rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '800', color: '#166534', letterSpacing: '0.05em', display: 'block' }}>
              Paiement confirmé
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#064E3B', marginTop: '0.15rem' }}>
              {serviceName}
            </div>
            {formattedDate && (
              <p style={{ fontSize: '0.88rem', color: '#15803D', margin: '0.25rem 0 0 0' }}>
                📅 {formattedDate} {timeSlot ? `• Créneau : ${timeSlot}` : ''} {clientVille ? `• ${clientVille}` : ''}
              </p>
            )}
            <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0 0 0', fontWeight: '700' }}>
              Montant réglé : {session.amountTotal} € TTC (Facture émise)
            </p>
            {session.customerEmail && (
              <p style={{ fontSize: '0.78rem', color: '#059669', margin: '0.35rem 0 0 0' }}>
                ✉️ Facture PDF également envoyée à <strong>{session.customerEmail}</strong>
              </p>
            )}
          </div>

          {invoiceLink && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
              <a
                href={invoiceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#059669',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.75rem',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                }}
              >
                <Download size={18} />
                Télécharger la facture PDF
              </a>
              <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: '600' }}>
                ✓ Téléchargement lancé automatiquement
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2.25rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        marginBottom: '1.5rem',
        border: '1px solid #E2E8F0',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowRight size={18} color="#10B981" />
          Prochaines étapes de votre intervention
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            {
              icon: <FileText size={20} color="#059669" />,
              title: 'Facture & Reçu Stripe',
              desc: invoiceLink
                ? `Votre facture officielle avec TVA (20%) a été téléchargée automatiquement et envoyée par e-mail à ${session?.customerEmail || 'votre adresse'} (avec copie conforme à notre équipe).`
                : 'Votre reçu de paiement avec facture officielle a été transmis à votre adresse email (avec copie conforme à notre équipe).',
            },
            {
              icon: <Calendar size={20} color="#0091DA" />,
              title: 'Créneau bloqué dans notre planning',
              desc: 'Le technicien Air G Énergie interviendra à votre domicile au jour et créneau sélectionné.',
            },
            {
              icon: <Phone size={20} color="#7C3AED" />,
              title: 'Confirmation téléphonique la veille',
              desc: 'Notre secrétariat vous appellera la veille du rendez-vous pour préciser l\'heure exacte d\'arrivée.',
            },
            {
              icon: <Clock size={20} color="#F59E0B" />,
              title: 'Contrôle préalable & Attestation',
              desc: 'Un contrôle de performance sera réalisé sur place avant l\'entretien. L\'attestation réglementaire Cerfa vous sera délivrée.',
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
            Une question sur votre intervention ou votre facture ?
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
  );
}

export default function BookingSuccessPage() {
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
      <Suspense fallback={
        <div style={{ textAlign: 'center', color: '#047857', fontWeight: '700' }}>
          Chargement de votre confirmation...
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
