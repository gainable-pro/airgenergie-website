import { google } from 'googleapis';

const TRAVEL_BUFFER_MINUTES = 25;

function getGoogleCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Google Calendar credentials missing');
  }

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

function parseTimeOnDate(dateStr: string, timeStr: string): Date {
  return new Date(`${dateStr}T${timeStr}:00+02:00`);
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function slotStartToEndTime(slotStartTime: string, durationMins: number): string {
  const [h, m] = slotStartTime.split(':').map(Number);
  const totalMins = h * 60 + m + durationMins;
  const endH = Math.floor(totalMins / 60);
  const endM = totalMins % 60;
  return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
}

export interface BookingCalendarData {
  serviceId: string;
  serviceName: string;
  composition?: string;
  totalAmount: number | string;
  durationMins?: number | string;
  date: string; // YYYY-MM-DD
  slotStartTime: string; // HH:MM (e.g. "14:00")
  clientNom: string;
  clientTelephone: string;
  clientEmail?: string;
  clientVille: string;
  clientNotes?: string;
  isVrv?: boolean | string;
}

export async function createCalendarEvent(data: BookingCalendarData) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    console.warn('GOOGLE_CALENDAR_ID not set — skipping calendar event creation');
    return null;
  }

  try {
    const calendar = getGoogleCalendarClient();

    const realDuration = typeof data.durationMins === 'string' ? parseInt(data.durationMins || '45') : (data.durationMins || 45);
    const startTime = data.slotStartTime || '08:00';
    const endTime = slotStartToEndTime(startTime, realDuration);

    const interventionStart = parseTimeOnDate(data.date, startTime);
    const interventionEnd = parseTimeOnDate(data.date, endTime);
    const eventEnd = addMinutes(interventionEnd, TRAVEL_BUFFER_MINUTES);

    const description = [
      `📋 Prestation : ${data.serviceName}`,
      data.composition ? `🔧 Composition : ${data.composition}` : null,
      `💶 Montant : ${data.totalAmount === 0 || data.totalAmount === '0' ? 'Gratuit (Devis/Étude)' : `${data.totalAmount} €`}`,
      `👤 Client : ${data.clientNom}`,
      `📞 Téléphone : ${data.clientTelephone}`,
      data.clientEmail ? `📧 Email : ${data.clientEmail}` : null,
      `📍 Ville : ${data.clientVille}`,
      data.clientNotes ? `📝 Notes : ${data.clientNotes}` : null,
      `\n⏱️ Durée réelle : ${realDuration} min`,
      `🚗 Buffer trajet inclus : ${TRAVEL_BUFFER_MINUTES} min`,
    ].filter(Boolean).join('\n');

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `🔧 [Air G] ${data.serviceName} — ${data.clientNom} (${data.clientVille})`,
        description,
        start: {
          dateTime: interventionStart.toISOString(),
          timeZone: 'Europe/Paris',
        },
        end: {
          dateTime: eventEnd.toISOString(),
          timeZone: 'Europe/Paris',
        },
        colorId: data.totalAmount === 0 || data.totalAmount === '0' ? '2' : '5', // Green for free devis, Yellow for paid
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },
            { method: 'popup', minutes: 1440 },
          ],
        },
      },
    });

    console.log(`✅ Event Google Calendar créé avec succès (ID: ${event.data.id})`);
    return event.data;
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'événement Google Calendar:', error);
    return null;
  }
}
