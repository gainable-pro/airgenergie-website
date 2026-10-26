import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export const TRAVEL_BUFFER_MINUTES = 25;

export function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || 'airgenergie@gmail.com';
}

/**
 * Charge les identifiants Google Service Account de manière ultra-robuste :
 * 1. GOOGLE_SERVICE_ACCOUNT_JSON (JSON brut ou base64)
 * 2. GOOGLE_PRIVATE_KEY + GOOGLE_SERVICE_ACCOUNT_EMAIL
 * 3. Fichier airgenergie-calendar.json sur le disque si présent
 */
export function getGoogleAuth(scope: 'read' | 'write' = 'write') {
  // Option 1 : JSON complet dans une variable d'environnement (brut ou base64)
  const jsonEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonEnv) {
    try {
      let rawJson = jsonEnv.trim();
      if (!rawJson.startsWith('{')) {
        // Probablement du base64
        rawJson = Buffer.from(rawJson, 'base64').toString('utf8');
      }
      const credentials = JSON.parse(rawJson);
      return new google.auth.GoogleAuth({
        credentials,
        scopes: [scope === 'read' ? 'https://www.googleapis.com/auth/calendar.readonly' : 'https://www.googleapis.com/auth/calendar'],
      });
    } catch (e) {
      console.warn('⚠️ Échec lecture GOOGLE_SERVICE_ACCOUNT_JSON, tentative variables séparées:', e);
    }
  }

  // Option 2 : Variables séparées
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (privateKey && clientEmail) {
    // Nettoyage des guillemets éventuels et des retours à la ligne échappés
    privateKey = privateKey.trim();
    if ((privateKey.startsWith('"') && privateKey.endsWith('"')) || (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    return new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        client_email: clientEmail.trim(),
        private_key: privateKey,
      },
      scopes: [scope === 'read' ? 'https://www.googleapis.com/auth/calendar.readonly' : 'https://www.googleapis.com/auth/calendar'],
    });
  }

  // Option 3 : Fichier local airgenergie-calendar.json (environnement local dev)
  try {
    const localFilePath = path.join(process.cwd(), 'airgenergie-calendar.json');
    if (fs.existsSync(localFilePath)) {
      const fileContent = fs.readFileSync(localFilePath, 'utf8');
      const credentials = JSON.parse(fileContent);
      return new google.auth.GoogleAuth({
        credentials,
        scopes: [scope === 'read' ? 'https://www.googleapis.com/auth/calendar.readonly' : 'https://www.googleapis.com/auth/calendar'],
      });
    }
  } catch (e) {
    console.warn('⚠️ Fichier airgenergie-calendar.json non trouvé ou illisible:', e);
  }

  throw new Error('Google Calendar credentials missing (aucune méthode d\'authentification valide trouvée)');
}

export function getGoogleCalendarClient(scope: 'read' | 'write' = 'write') {
  const auth = getGoogleAuth(scope);
  return google.calendar({ version: 'v3', auth });
}

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

function parseTimeOnDate(dateStr: string, timeStr: string): Date {
  const offset = getParisOffset(dateStr);
  return new Date(`${dateStr}T${timeStr}:00${offset}`);
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
  timeSlot?: string; // ex: "14:00 - 16:00"
  slotStartTime: string; // HH:MM (e.g. "14:00")
  clientNom: string;
  clientTelephone: string;
  clientEmail?: string;
  clientVille: string;
  clientNotes?: string;
  isVrv?: boolean | string;
  stripeSessionId?: string;
  invoicePdf?: string;
}

export async function createCalendarEvent(data: BookingCalendarData) {
  const calendarId = getCalendarId();
  if (!calendarId) {
    console.warn('GOOGLE_CALENDAR_ID non défini — création de l\'événement agenda ignorée');
    return null;
  }

  try {
    const calendar = getGoogleCalendarClient('write');

    // Éviter les doublons si l'événement a déjà été inséré pour cette session Stripe
    if (data.stripeSessionId) {
      try {
        const existing = await calendar.events.list({
          calendarId,
          q: data.stripeSessionId,
          maxResults: 5,
        });
        if (existing.data.items && existing.data.items.length > 0) {
          console.log(`ℹ️ L'événement Google Calendar existe déjà pour la session ${data.stripeSessionId}`);
          return existing.data.items[0];
        }
      } catch (listErr) {
        console.warn('Vérification des doublons Google Calendar impossible:', listErr);
      }
    }

    const realDuration = typeof data.durationMins === 'string' ? parseInt(data.durationMins || '45') : (data.durationMins || 45);
    const startTime = data.slotStartTime || (data.timeSlot ? data.timeSlot.split(' ')[0] : '08:00');

    // Calcul de l'heure de fin :
    // Si le créneau horaire sélectionné est une plage de 2h (ex: "14:00 - 16:00"), on bloque les 2h complètes dans l'agenda
    let endTime: string;
    if (data.timeSlot && data.timeSlot.includes('-')) {
      const parts = data.timeSlot.split('-').map(s => s.trim());
      endTime = parts[1] || slotStartToEndTime(startTime, 120);
    } else {
      endTime = slotStartToEndTime(startTime, 120); // 2h par défaut
    }

    const interventionStart = parseTimeOnDate(data.date, startTime);
    const interventionEnd = parseTimeOnDate(data.date, endTime);

    const formattedAmount = data.totalAmount === 0 || data.totalAmount === '0'
      ? 'Gratuit (Étude & Devis sur place)'
      : `${data.totalAmount} € TTC (Payé en ligne via Stripe)`;

    const description = [
      `📋 Prestation : ${data.serviceName}`,
      data.composition ? `🔧 Composition : ${data.composition}` : null,
      `⏱️ Créneau réservé : ${data.timeSlot || `${startTime} - ${endTime}`} (Plage de passage de 2h bloquée)`,
      `⏱️ Temps d'intervention estimé : ${realDuration} min sur place`,
      `💶 Règlement : ${formattedAmount}`,
      `👤 Client : ${data.clientNom}`,
      `📞 Téléphone : ${data.clientTelephone}`,
      data.clientEmail ? `📧 Email : ${data.clientEmail}` : null,
      `📍 Ville / Commune : ${data.clientVille}`,
      data.clientNotes ? `📝 Notes & Adresse exacte : ${data.clientNotes}` : null,
      data.invoicePdf ? `📄 Facture officielle Stripe PDF : ${data.invoicePdf}` : null,
      data.stripeSessionId ? `💳 Stripe Session ID : ${data.stripeSessionId}` : null,
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
          dateTime: interventionEnd.toISOString(),
          timeZone: 'Europe/Paris',
        },
        colorId: data.totalAmount === 0 || data.totalAmount === '0' ? '2' : '5', // Vert pour devis gratuit, Jaune pour entretien payé
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },   // 1h avant
            { method: 'popup', minutes: 1440 }, // 24h avant
          ],
        },
        extendedProperties: {
          private: {
            airgenergie_booking: 'true',
            service_id: data.serviceId || '',
            stripe_session_id: data.stripeSessionId || '',
            client_phone: data.clientTelephone || '',
          },
        },
      },
    });

    console.log(`✅ Événement Google Calendar créé avec succès (ID: ${event.data.id})`);
    return event.data;
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'événement Google Calendar:', error);
    return null;
  }
}
