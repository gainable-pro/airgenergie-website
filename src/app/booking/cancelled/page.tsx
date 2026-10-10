'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft, Phone } from 'lucide-react';

export default function BookingCancelledPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8FAFC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        maxWidth: '550px',
        width: '100%',
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        textAlign: 'center',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#FEE2E2',
          color: '#DC2626',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}>
          <XCircle size={40} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
          Réservation annulée
        </h1>
        <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Le processus de paiement a été annulé. Aucun débit n&apos;a été effectué sur votre carte bancaire.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/reservation-en-ligne" className="btn btn-primary" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'var(--primary-blue, #0091DA)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '700',
          }}>
            <ArrowLeft size={18} />
            Recommencer la réservation
          </Link>

          <a href="tel:0413414901" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.5rem',
            borderRadius: '0.75rem',
            background: '#F1F5F9',
            color: '#334155',
            textDecoration: 'none',
            fontWeight: '600',
          }}>
            <Phone size={18} />
            Nous contacter par téléphone : 04 13 41 49 01
          </a>
        </div>
      </div>
    </div>
  );
}
