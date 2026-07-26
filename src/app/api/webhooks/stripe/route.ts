import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { google } from 'googleapis';
import { supabase } from '@/lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

// ─── Configuration ────────────────────────────────────────────────────────────
const TRAVEL_BUFFER_MINUTES = 25; // Minutes de trajet ajoutées après chaque intervention

// ─── Google Calendar Auth ──────────────────────────────────────────────────────
function getGoogleCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseTimeOnDate(dateStr: string, timeStr: string): Date {
  // dateStr: YYYY-MM-DD, timeStr: "HH:MM"
  return new Date(`${dateStr}T${timeStr}:00+02:00`); // Paris summer time
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function slotStartToTime(slotStartTime: string): string {
  // "10:00" → "10:00"
  return slotStartTime;
}

function slotStartToEndTime(slotStartTime: string, durationMins: number): string {
  const [h, m] = slotStartTime.split(':').map(Number);
  const totalMins = h * 60 + m + durationMins;
  const endH = Math.floor(totalMins / 60);
  const endM = totalMins % 60;
  return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
}

// ─── Create Google Calendar Event ──────────────────────────────────────────────
async function createCalendarEvent(metadata: Stripe.Metadata) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    console.warn('GOOGLE_CALENDAR_ID not set — skipping calendar event creation');
    return null;
  }

  try {
    const calendar = getGoogleCalendarClient();

    const {
      serviceName, composition, totalAmount, durationMins,
      date, slotStartTime, clientNom, clientTelephone,
      clientEmail, clientVille, clientNotes, isVrv, serviceId,
    } = metadata;

    const realDuration = parseInt(durationMins ?? '45');
    const startTime = slotStartToTime(slotStartTime ?? '08:00');
    const endTime = slotStartToEndTime(startTime, realDuration);

    const interventionStart = parseTimeOnDate(date, startTime);
    const interventionEnd = parseTimeOnDate(date, endTime);
    // Add travel buffer to end time
    const eventEnd = addMinutes(interventionEnd, TRAVEL_BUFFER_MINUTES);

    const description = [
      `📋 Prestation : ${serviceName}`,
      composition ? `🔧 Composition : ${composition}` : null,
      `💶 Montant payé : ${totalAmount} €${isVrv === 'true' ? ' (remise VRV -10%)' : ''}`,
      `👤 Client : ${clientNom}`,
      `📞 Téléphone : ${clientTelephone}`,
      clientEmail ? `📧 Email : ${clientEmail}` : null,
      `📍 Ville : ${clientVille}`,
      clientNotes ? `📝 Notes : ${clientNotes}` : null,
      `\n⏱️ Durée réelle : ${realDuration} min`,
      `🚗 Buffer trajet inclus : ${TRAVEL_BUFFER_MINUTES} min`,
    ].filter(Boolean).join('\n');

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `🔧 [Air G] ${serviceName} — ${clientNom} (${clientVille})`,
        description,
        start: {
          dateTime: interventionStart.toISOString(),
          timeZone: 'Europe/Paris',
        },
        end: {
          // End includes travel buffer — this blocks the next slot from being booked too close
          dateTime: eventEnd.toISOString(),
          timeZone: 'Europe/Paris',
        },
        colorId: '5', // Banana yellow = field intervention
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },  // 1h before
            { method: 'popup', minutes: 1440 }, // 24h before
          ],
        },
        extendedProperties: {
          private: {
            airgenergie_booking: 'true',
            service_id: serviceId ?? '',
            client_phone: clientTelephone ?? '',
            actual_duration_mins: String(realDuration),
            travel_buffer_mins: String(TRAVEL_BUFFER_MINUTES),
          },
        },
      },
    });

    console.log('✅ Google Calendar event created:', event.data.id);
    return event.data;
  } catch (error) {
    console.error('❌ Failed to create Google Calendar event:', error);
    return null;
  }
}

// ─── Insert Supabase Lead ──────────────────────────────────────────────────────
async function insertSupabaseLead(metadata: Stripe.Metadata, stripeSessionId: string) {
  const {
    serviceName, composition, totalAmount, durationMins,
    date, timeSlot, clientNom, clientTelephone,
    clientEmail, clientVille, clientNotes, isVrv,
  } = metadata;

  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const bookingMessage = [
    `[Réservation Payée en Ligne]`,
    `Prestation : ${serviceName}`,
    composition ? `Composition : ${composition}` : null,
    `Total payé : ${totalAmount} €${isVrv === 'true' ? ' (remise VRV -10%)' : ''}`,
    `Date : ${formattedDate}`,
    `Créneau : ${timeSlot}`,
    `Durée : ${durationMins} min`,
    `Stripe Session : ${stripeSessionId}`,
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

  if (error) {
    console.error('❌ Supabase insert error:', error);
  } else {
    console.log('✅ Supabase lead inserted');
  }
}

// ─── Main Webhook Handler ──────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // We only care about successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid' && session.metadata) {
      console.log('💳 Payment confirmed for session:', session.id);

      // Run both operations in parallel
      await Promise.allSettled([
        createCalendarEvent(session.metadata),
        insertSupabaseLead(session.metadata, session.id),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}

