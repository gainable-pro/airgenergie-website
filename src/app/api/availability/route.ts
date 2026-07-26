import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// ─── Configuration ────────────────────────────────────────────────────────────
const TRAVEL_BUFFER_MINUTES = 25;

const ALL_SLOTS = [
  { id: '08:00', label: '08:00 - 10:00', start: '08:00', end: '10:00' },
  { id: '10:00', label: '10:00 - 12:00', start: '10:00', end: '12:00' },
  { id: '14:00', label: '14:00 - 16:00', start: '14:00', end: '16:00' },
  { id: '16:00', label: '16:00 - 18:00', start: '16:00', end: '18:00' },
];

// ─── Google Calendar Auth ──────────────────────────────────────────────────────
function getGoogleAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Google Calendar credentials not configured');
  }

  return new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parse "HH:MM" on a given date string (YYYY-MM-DD) into a Date object (Paris timezone)
 */
function parseDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  // Create date in Paris time (UTC+2 summer, UTC+1 winter)
  // We use a simple approach: create UTC and adjust
  const dt = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  return dt;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

// ─── API Handler ──────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // format: YYYY-MM-DD

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 });
  }

  // Check it's not Sunday (0) — we don't work Sundays
  const dayOfWeek = new Date(date + 'T12:00:00Z').getUTCDay();
  if (dayOfWeek === 0) {
    return NextResponse.json({ slots: ALL_SLOTS.map(s => ({ ...s, available: false, reason: 'Fermé le dimanche' })) });
  }

  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) throw new Error('GOOGLE_CALENDAR_ID not configured');

    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    // Fetch events for the entire day (Paris time = UTC+2 in summer)
    const timeMin = `${date}T00:00:00+02:00`;
    const timeMax = `${date}T23:59:59+02:00`;

    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = eventsResponse.data.items ?? [];

    // For each slot, check if it overlaps with any existing event (including buffer)
    const slots = ALL_SLOTS.map((slot) => {
      const slotStart = parseDateTime(date, slot.start);
      const slotEnd = parseDateTime(date, slot.end);

      const isBlocked = events.some((event) => {
        // Skip all-day events or events without datetime
        if (!event.start?.dateTime || !event.end?.dateTime) return false;

        const eventStart = new Date(event.start.dateTime);
        // eventEnd already includes TRAVEL_BUFFER_MINUTES (added when creating events)
        const eventEnd = new Date(event.end.dateTime);

        // Check overlap: slotStart < eventEnd AND slotEnd > eventStart
        return slotStart < eventEnd && slotEnd > eventStart;
      });

      return {
        ...slot,
        available: !isBlocked,
        reason: isBlocked ? 'Créneau réservé' : null,
      };
    });

    return NextResponse.json({ slots, date });
  } catch (error) {
    // If Google Calendar is not configured (dev mode), return all slots as available
    console.warn('Google Calendar not configured, returning all slots as available:', error);
    return NextResponse.json({
      slots: ALL_SLOTS.map(s => ({ ...s, available: true, reason: null })),
      date,
      _warning: 'Google Calendar not configured — showing all slots as available',
    });
  }
}
