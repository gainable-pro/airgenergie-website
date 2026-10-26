import { NextRequest, NextResponse } from 'next/server';
import { getGoogleCalendarClient, getCalendarId } from '@/lib/calendar';

const ALL_SLOTS = [
  { id: '08:00', label: '08:00 - 10:00', start: '08:00', end: '10:00' },
  { id: '10:00', label: '10:00 - 12:00', start: '10:00', end: '12:00' },
  { id: '14:00', label: '14:00 - 16:00', start: '14:00', end: '16:00' },
  { id: '16:00', label: '16:00 - 18:00', start: '16:00', end: '18:00' },
];

function getParisOffset(dateStr: string): string {
  try {
    const testDate = new Date(`${dateStr}T12:00:00Z`);
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Paris',
      timeZoneName: 'longOffset',
    });
    const parts = dtf.formatToParts(testDate);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    return tzPart ? tzPart.value.replace('GMT', '') : '+01:00';
  } catch {
    return '+01:00';
  }
}

function parseDateTimeParis(dateStr: string, timeStr: string): Date {
  const offset = getParisOffset(dateStr);
  return new Date(`${dateStr}T${timeStr}:00${offset}`);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // format: YYYY-MM-DD

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Format de date invalide. Utilisez YYYY-MM-DD' }, { status: 400 });
  }

  // Vérification fermeture le dimanche
  const dayOfWeek = new Date(date + 'T12:00:00Z').getUTCDay();
  if (dayOfWeek === 0) {
    return NextResponse.json({
      slots: ALL_SLOTS.map(s => ({ ...s, available: false, reason: 'Fermé le dimanche' })),
      date,
    });
  }

  try {
    const calendarId = getCalendarId();
    const calendar = getGoogleCalendarClient('read');

    // Récupération des événements de la journée sur l'agenda avec le décalage horaire Paris exact (CET +01:00 ou CEST +02:00)
    const offset = getParisOffset(date);
    const timeMin = `${date}T00:00:00${offset}`;
    const timeMax = `${date}T23:59:59${offset}`;

    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = eventsResponse.data.items ?? [];

    // Filtrer les événements bloquants :
    // - On ignore les événements annulés
    // - On ignore les événements marqués "Disponible" (transparency: 'transparent')
    // - On ignore expressément tous les événements liés aux apprentis/alternants (ex: "Présence apprenti")
    const blockingEvents = events.filter((event) => {
      if (event.status === 'cancelled') return false;
      if (event.transparency === 'transparent') return false;

      // Règle explicite : les événements de présence apprenti, alternant, cours BTS ou marqués non bloquants ne doivent jamais bloquer le calendrier client
      const summary = (event.summary || '').toLowerCase();
      const description = (event.description || '').toLowerCase();
      if (
        summary.includes('apprenti') ||
        summary.includes('alternan') ||
        summary.includes('bts') ||
        description.includes('apprenti') ||
        description.includes('non bloquant')
      ) {
        return false;
      }

      return true;
    });

    // 1. Vérifier si un événement journée entière bloque tout le jour (ex: Congés, Absence, Indisponible)
    const hasAllDayBlock = blockingEvents.some((event) => {
      if (event.start?.date) {
        const startDate = event.start.date;
        const endDate = event.end?.date || startDate;
        // Pour les all-day events Google, endDate est exclu (ex: start=2026-10-15, end=2026-10-16 pour 1 jour)
        return date >= startDate && date < endDate;
      }
      return false;
    });

    if (hasAllDayBlock) {
      return NextResponse.json({
        slots: ALL_SLOTS.map(s => ({ ...s, available: false, reason: 'Journée bloquée dans votre agenda' })),
        date,
      });
    }

    // 2. Pour chaque créneau, vérifier s'il chevauche un événement précis dans l'agenda
    const slots = ALL_SLOTS.map((slot) => {
      const slotStart = parseDateTimeParis(date, slot.start);
      const slotEnd = parseDateTimeParis(date, slot.end);

      const isBlocked = blockingEvents.some((event) => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false;

        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        // Chevauchement : slotStart < eventEnd ET slotEnd > eventStart
        return slotStart < eventEnd && slotEnd > eventStart;
      });

      return {
        ...slot,
        available: !isBlocked,
        reason: isBlocked ? 'Créneau indisponible (réservé)' : null,
      };
    });

    return NextResponse.json({ slots, date });
  } catch (error) {
    console.warn('⚠️ Google Calendar inaccessible ou non configuré, affichage par défaut:', error);
    return NextResponse.json({
      slots: ALL_SLOTS.map(s => ({ ...s, available: true, reason: null })),
      date,
      _warning: 'Google Calendar non configuré — affichage des créneaux par défaut',
    });
  }
}
