import Stripe from 'stripe';
import { createCalendarEvent } from './calendar';
import { supabase } from './supabaseClient';
import { sendBookingNotificationEmail, sendCustomerConfirmationEmail } from './email';

// Global cache to avoid duplicate fulfillment runs in the same runtime
const fulfilledSessions = new Set<string>();

export interface FulfillBookingOptions {
  session: Stripe.Checkout.Session;
  invoicePdf?: string | null;
  hostedInvoiceUrl?: string | null;
}

export async function fulfillPaidBooking({ session, invoicePdf, hostedInvoiceUrl }: FulfillBookingOptions) {
  if (!session || session.payment_status !== 'paid' || !session.metadata) {
    return { success: false, reason: 'not_paid_or_no_metadata' };
  }

  const sessionId = session.id;
  if (fulfilledSessions.has(sessionId)) {
    return { success: true, reason: 'already_fulfilled_in_memory' };
  }
  fulfilledSessions.add(sessionId);

  const meta = session.metadata;
  const clientNom = meta.clientNom || session.customer_details?.name || 'Client';
  const clientEmail = meta.clientEmail || session.customer_details?.email || '';
  const clientTelephone = meta.clientTelephone || session.customer_details?.phone || '';
  const serviceName = meta.serviceName || 'Entretien climatisation';
  const totalAmount = meta.totalAmount || (session.amount_total ? (session.amount_total / 100).toString() : '0');
  const date = meta.date || '';
  const timeSlot = meta.timeSlot || '';
  const slotStartTime = meta.slotStartTime || '08:00';
  const clientVille = meta.clientVille || 'Bouches-du-Rhône';
  const clientNotes = meta.clientNotes || '';
  const composition = meta.composition || '';
  const durationMins = meta.durationMins || '45';
  const isVrv = meta.isVrv === 'true';
  const serviceId = meta.serviceId || 'clim';

  console.log(`🚀 Traitement de la réservation payée pour la session ${sessionId}...`);

  // 1. Google Calendar Event (avec déduplication et buffer trajet)
  const calendarPromise = createCalendarEvent({
    serviceId,
    serviceName,
    composition,
    totalAmount,
    durationMins,
    date,
    timeSlot,
    slotStartTime,
    clientNom,
    clientTelephone,
    clientEmail,
    clientVille,
    clientNotes,
    isVrv,
    stripeSessionId: sessionId,
    invoicePdf: invoicePdf || undefined,
  }).catch((err) => {
    console.error('❌ Erreur création Google Calendar:', err);
    return null;
  });

  // 2. Insertion Supabase Leads
  const supabasePromise = (async () => {
    try {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      }) : date;

      const bookingMessage = [
        `[Réservation Payée en Ligne]`,
        `Prestation : ${serviceName}`,
        composition ? `Composition : ${composition}` : null,
        `Total payé : ${totalAmount} € TTC${isVrv ? ' (remise VRV -10%)' : ''}`,
        `Date : ${formattedDate}`,
        `Créneau : ${timeSlot}`,
        `Durée : ${durationMins} min`,
        `Stripe Session : ${sessionId}`,
        invoicePdf ? `Facture PDF : ${invoicePdf}` : null,
        clientNotes ? `Notes : ${clientNotes}` : null,
      ].filter(Boolean).join('\n');

      const { error } = await supabase.from('leads').insert({
        full_name: clientNom,
        email: clientEmail || null,
        phone: clientTelephone,
        city: clientVille,
        service_type: `Entretien - ${serviceName}${composition ? ` [${composition}]` : ''}`,
        message: bookingMessage,
        status: 'payé',
      });

      if (error) console.error('❌ Erreur insertion lead Supabase:', error);
      else console.log('✅ Lead inséré dans Supabase');
    } catch (e) {
      console.error('❌ Exception Supabase:', e);
    }
  })();

  // 3. Email client avec facture PDF en pièce jointe + copie à contact@airgenergie.fr
  const customerEmailPromise = (async () => {
    if (!clientEmail) return null;
    return sendCustomerConfirmationEmail({
      serviceName,
      totalAmount,
      date,
      timeSlot,
      clientNom,
      clientTelephone,
      clientEmail,
      clientVille,
      clientNotes,
      composition,
      invoicePdf: invoicePdf || undefined,
      hostedInvoiceUrl: hostedInvoiceUrl || undefined,
    });
  })();

  // 4. Notification interne pour l'artisan
  const adminNotificationPromise = sendBookingNotificationEmail({
    serviceName,
    totalAmount,
    date,
    timeSlot,
    clientNom,
    clientTelephone,
    clientEmail,
    clientVille,
    clientNotes,
    composition,
    isPaid: true,
    invoicePdf: invoicePdf || undefined,
  });

  await Promise.allSettled([
    calendarPromise,
    supabasePromise,
    customerEmailPromise,
    adminNotificationPromise,
  ]);

  console.log(`✅ Réservation finalisée avec succès pour ${clientNom} (${sessionId})`);
  return { success: true };
}
