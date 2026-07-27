/**
 * test-notification-email.mjs
 * Test sending the "Félicitations vous avez une nouvelle réservation" email notification
 */

import { sendBookingNotificationEmail } from '../src/lib/email.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env vars
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[key] = val;
  }
});

async function testEmail() {
  console.log('📧 Envoi de l\'email de notification test "Félicitations !"...\n');

  const res = await sendBookingNotificationEmail({
    serviceName: 'Entretien climatisation préventif (Mono-split)',
    totalAmount: 156,
    date: '2026-07-29',
    timeSlot: '08:00 - 10:00',
    clientNom: 'Jean Dupont',
    clientTelephone: '06 12 34 56 78',
    clientEmail: 'jean.dupont@example.com',
    clientVille: 'Miramas',
    clientNotes: 'Intervention 1er étage, interphone 4B',
    composition: '1 split mural Daikin',
    isPaid: true,
  });

  console.log('Resultat envoi email:', res);
}

testEmail();
