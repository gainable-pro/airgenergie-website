import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_CATALOG, VRV_COUPON_ID } from '@/lib/stripe-catalog';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
});

// Durées réelles en minutes par service (pour affichage dans la confirmation email)
const SERVICE_DURATIONS: Record<string, number> = {
  devis: 45, diagnostic: 45, preventive: 45, curative: 60,
  'double-split': 120, 'tri-split': 120, gainable: 45,
  console: 45, cassette: 45, thermodynamique: 45, 'pac-air-eau': 45, vrv: 90,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceId,
      serviceName,
      composition, // ex: "2 splits, 1 gainable"
      totalAmount,  // en euros (ex: 312)
      durationMins, // durée réelle en minutes
      date,         // YYYY-MM-DD
      timeSlot,     // ex: "10:00 - 12:00"
      slotStartTime,// ex: "10:00"
      client,       // { nom, telephone, email, ville, notes }
      isVrv,
      unitCounts,   // { split, gainable, cassette, console }
    } = body;

    if (!serviceId || !totalAmount || !date || !timeSlot || !client?.nom || !client?.telephone) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 });
    }

    // Pour les devis gratuits, on ne passe pas par Stripe
    if (totalAmount === 0) {
      return NextResponse.json({
        freeService: true,
        message: 'Service gratuit — pas de paiement requis',
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.airgenergie.fr';
    const realDuration = durationMins ?? SERVICE_DURATIONS[serviceId] ?? 45;

    // Détermination des line_items Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];

    const isComposerService = ['preventive', 'curative', 'gainable', 'console', 'cassette', 'double-split', 'tri-split', 'vrv'].includes(serviceId);
    const isCurative = serviceId === 'curative';

    if (isComposerService && unitCounts) {
      // Pour les installations composées, on utilise les prix unitaires réels du catalogue
      const servicePrefix = isCurative ? 'curative' : 'preventive';
      
      const unitTypes = ['split', 'gainable', 'cassette', 'console'] as const;
      for (const type of unitTypes) {
        const count = unitCounts[type] || 0;
        if (count > 0) {
          const catalogKey = `${servicePrefix}-${type}` as keyof typeof STRIPE_CATALOG;
          const catalogItem = STRIPE_CATALOG[catalogKey];
          
          if (catalogItem && 'priceId' in catalogItem) {
            lineItems.push({
              price: catalogItem.priceId,
              quantity: count,
            });
          }
        }
      }

      // Appliquer le coupon -10% pour le VRV/DRV
      if (isVrv) {
        discounts.push({ coupon: VRV_COUPON_ID });
      }
    } else {
      // Pour les services fixes (diagnostic, thermodynamique, pac-air-eau)
      const catalogKey = serviceId as keyof typeof STRIPE_CATALOG;
      const catalogItem = STRIPE_CATALOG[catalogKey];

      if (catalogItem && 'priceId' in catalogItem) {
        lineItems.push({
          price: catalogItem.priceId,
          quantity: 1,
        });
      }
    }

    // Si pour une raison quelconque aucun line item n'a été créé (ex: fallback), on génère un prix dynamique
    if (lineItems.length === 0) {
      const amountInCents = Math.round(totalAmount * 100);
      const durationLabel = realDuration >= 60
        ? `${Math.floor(realDuration / 60)}h${realDuration % 60 > 0 ? (realDuration % 60).toString().padStart(2, '0') : ''}`
        : `${realDuration} min`;

      lineItems.push({
        price_data: {
          currency: 'eur',
          unit_amount: amountInCents,
          product_data: {
            name: serviceName,
            description: [
              composition ? `Composition : ${composition}` : null,
              `Durée : ${durationLabel}`,
              `Date : ${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
              `Créneau : ${timeSlot}`,
              `Ville : ${client.ville}`,
              isVrv ? '✓ Remise VRV -10% incluse' : null,
            ].filter(Boolean).join(' | '),
            images: ['https://www.airgenergie.fr/images/hero-technician-ac.png'],
          },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'fr',
      customer_email: client.email || undefined,
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,

      // Données complètes stockées dans la session pour le webhook
      metadata: {
        serviceId,
        serviceName,
        composition: composition ?? '',
        totalAmount: String(totalAmount),
        durationMins: String(realDuration),
        date,
        timeSlot,
        slotStartTime,
        clientNom: client.nom,
        clientTelephone: client.telephone,
        clientEmail: client.email ?? '',
        clientVille: client.ville,
        clientNotes: client.notes ?? '',
        isVrv: isVrv ? 'true' : 'false',
      },

      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/booking/cancelled`,
    });

    return NextResponse.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
}
