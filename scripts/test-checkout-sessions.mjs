/**
 * test-checkout-sessions.mjs
 * Test creation of Stripe Checkout Sessions for products for après-demain
 */

import Stripe from 'stripe';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const stripeKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim();

if (!stripeKey || !stripeKey.startsWith('sk_')) {
  console.error('❌ STRIPE_SECRET_KEY introuvable dans .env.local');
  process.exit(1);
}

const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

// Date après-demain : 2026-07-29
const targetDate = '2026-07-29';
const timeSlot = '08h00 - 10h00';
const slotStartTime = '08:00';

const TEST_SERVICES = [
  {
    serviceId: 'diagnostic',
    serviceName: 'Diagnostic & Rapport de panne',
    totalAmount: 100,
    durationMins: 45,
  },
  {
    serviceId: 'preventive',
    serviceName: 'Entretien climatisation préventif (Mono-split)',
    totalAmount: 156,
    durationMins: 45,
    unitCounts: { split: 1, gainable: 0, cassette: 0, console: 0 },
  },
  {
    serviceId: 'curative',
    serviceName: 'Entretien climatisation Curatif +++ (Vapeur 100°C)',
    totalAmount: 192,
    durationMins: 60,
    unitCounts: { split: 1, gainable: 0, cassette: 0, console: 0 },
  },
  {
    serviceId: 'gainable',
    serviceName: 'Entretien climatisation gainable',
    totalAmount: 220,
    durationMins: 45,
  },
  {
    serviceId: 'pac-air-eau',
    serviceName: 'Entretien Pompe à Chaleur Air/Eau',
    totalAmount: 270,
    durationMins: 45,
  },
];

console.log(`\n🧪 Test de création des sessions Stripe Checkout pour le ${targetDate} (créneau ${timeSlot})...\n`);

for (const s of TEST_SERVICES) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'fr',
      customer_email: 'test.client@example.com',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: s.totalAmount * 100,
            product_data: {
              name: s.serviceName,
              description: `${s.serviceName} planifié le ${targetDate} (${timeSlot}) à Miramas. Client : Client Test (0600000000).`,
              images: ['https://www.airgenergie.fr/images/hero-technician-ac.png'],
            },
          },
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Intervention d'entretien climatisation le ${targetDate} sur le créneau ${timeSlot} à Miramas. Client : Client Test (0600000000). Tarifs exprimés en TTC (TVA 20% incluse).`,
          footer: "Air G Énergie — Entretien & Dépannage Climatisation | Tarifs indiqués en TTC (TVA 20% incluse). Merci pour votre confiance.",
          custom_fields: [
            { name: "Date intervention", value: targetDate },
            { name: "Creneau horaire", value: timeSlot },
            { name: "Lieu intervention", value: "Miramas" },
          ]
        }
      },
      metadata: {
        serviceId: s.serviceId,
        serviceName: s.serviceName,
        totalAmount: String(s.totalAmount),
        date: targetDate,
        timeSlot,
        slotStartTime,
        clientNom: 'Client Test',
        clientTelephone: '0600000000',
        clientEmail: 'test.client@example.com',
        clientVille: 'Miramas',
      },
      success_url: 'https://www.airgenergie.com/booking/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://www.airgenergie.com/booking/cancelled',
    });

    console.log(`✅ [${s.serviceId}] Session créée avec succès !`);
    console.log(`   URL Stripe Checkout : ${session.url}`);
    console.log(`   Facturation automatique Stripe : Activée (enabled: true)\n`);

  } catch (err) {
    console.error(`❌ [${s.serviceId}] Erreur:`, err.message);
  }
}
