import type { Metadata } from 'next';
import { getSeoAlternates } from '@/lib/seo-url';
import ReservationClient from './ReservationClient';

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getSeoAlternates('/reservation-en-ligne');
  return {
    title: "Réservation en Ligne | Entretien & SAV Climatisation | Air G Énergie",
    description: "Réservez votre entretien de climatisation ou pompe à chaleur en ligne. Planification en temps réel, tarifs transparents et paiement sécurisé Stripe.",
    alternates,
  };
}

export default function ReservationEnLignePage() {
  return <ReservationClient />;
}
