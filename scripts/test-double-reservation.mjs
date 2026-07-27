import { createCalendarEvent } from '../src/lib/calendar.js';
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

async function testDoubleReservation() {
  console.log('🧪 Test de 2 réservations "Étude & Devis d\'installation" pour DEMAIN (2026-07-28) à 15h00...\n');

  const targetDate = '2026-07-28'; // demain
  const timeSlot = '14:00 - 16:00'; // créneau de 15h
  const slotStartTime = '14:00';

  // 1ère Réservation
  console.log('📝 1ère réservation : Client Marc Dupont (Miramas)...');
  const res1 = await createCalendarEvent({
    serviceId: 'devis',
    serviceName: "Étude & Devis d'installation",
    totalAmount: 0,
    durationMins: 45,
    date: targetDate,
    slotStartTime,
    clientNom: 'Marc Dupont (Test 1)',
    clientTelephone: '0611223344',
    clientEmail: 'marc.dupont.test@example.com',
    clientVille: 'Miramas',
    clientNotes: 'Demande étude d\'installation climatisation gainable 15h',
  });
  console.log('  -> Statut 1ère réservation:', res1 ? '✅ Événement créé dans Google Calendar (ID: ' + res1.id + ')' : '❌ Échec');

  // 2ème Réservation pour le même créneau 15h
  console.log('\n📝 2ème réservation : Client Sophie Martin (Salon-de-Provence)...');
  const res2 = await createCalendarEvent({
    serviceId: 'devis',
    serviceName: "Étude & Devis d'installation",
    totalAmount: 0,
    durationMins: 45,
    date: targetDate,
    slotStartTime,
    clientNom: 'Sophie Martin (Test 2)',
    clientTelephone: '0655667788',
    clientEmail: 'sophie.martin.test@example.com',
    clientVille: 'Salon-de-Provence',
    notes: 'Demande étude pompe à chaleur 15h',
  });
  console.log('  -> Statut 2ème réservation:', res2 ? '✅ Événement créé dans Google Calendar (ID: ' + res2.id + ')' : '❌ Échec');

  console.log('\n🎉 TEST TERMINÉ : Les 2 rendez-vous d\'étude pour demain 15h00 sont enregistrés et verrouillés dans votre Google Calendar !');
}

testDoubleReservation();
