import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { VRV_COUPON_ID } from '@/lib/stripe-catalog';
import { createCalendarEvent } from '@/lib/calendar';
import { supabase } from '@/lib/supabaseClient';
import { sendBookingNotificationEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

// Durées réelles en minutes par service (pour affichage dans la confirmation email)
const SERVICE_DURATIONS: Record<string, number> = {
  devis: 45, diagnostic: 45, preventive: 45, curative: 60,
  'double-split': 120, 'tri-split': 120, gainable: 45,
  console: 45, cassette: 45, thermodynamique: 45, 'pac-air-eau': 45, vrv: 90,
};

function buildStripeLineItems(
  serviceId: string,
  unitCounts: { split: number; gainable: number; cassette: number; console: number } | undefined,
  date: string,
  timeSlot: string
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const isCurative = serviceId === 'curative';
  
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formatItem = (
    name: string,
    priceInEuros: number,
    qty: number,
    description: string
  ): Stripe.Checkout.SessionCreateParams.LineItem => {
    return {
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(priceInEuros * 100),
        product_data: {
          name,
          description: `${description} (Planifié pour le ${formattedDate} sur le créneau ${timeSlot})`,
          images: ['https://www.airgenergie.fr/images/hero-technician-ac.png'],
        },
      },
      quantity: qty,
    };
  };

  // If unitCounts are provided (composer / multi-unit or packages)
  if (unitCounts) {
    if (isCurative) {
      if (unitCounts.split > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Split mural",
          192,
          unitCounts.split,
          "Désinfection et nettoyage complet en profondeur de l'unité intérieure split murale."
        ));
      }
      if (unitCounts.gainable > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Gainable / Plénum",
          260,
          unitCounts.gainable,
          "Désinfection et nettoyage complet de l'unité gainable en comble / plénum."
        ));
      }
      if (unitCounts.cassette > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Cassette 4 voies",
          220,
          unitCounts.cassette,
          "Désinfection et nettoyage complet de cassette de soufflage encastrée 4 voies."
        ));
      }
      if (unitCounts.console > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Console basse",
          192,
          unitCounts.console,
          "Désinfection et nettoyage de l'unité console basse posée au sol."
        ));
      }
    } else {
      // Preventive & Packages (double-split, tri-split, etc.)
      if (unitCounts.split > 0) {
        const splitCount = unitCounts.split;
        if (splitCount === 1) {
          lineItems.push(formatItem(
            "Entretien préventif — Split mural",
            156,
            1,
            "Nettoyage de filtre, désinfection et contrôle de performance d'un split mural."
          ));
        } else if (splitCount === 2) {
          lineItems.push(formatItem(
            "Forfait Entretien Double-split (2 Splits muraux)",
            270,
            1,
            "Forfait préférentiel d'entretien préventif pour 2 splits muraux."
          ));
        } else if (splitCount === 3) {
          lineItems.push(formatItem(
            "Forfait Entretien Tri-split (3 Splits muraux)",
            380,
            1,
            "Forfait préférentiel d'entretien préventif pour 3 splits muraux."
          ));
        } else {
          lineItems.push(formatItem(
            "Forfait Entretien Tri-split (3 Splits muraux)",
            380,
            1,
            "Forfait préférentiel d'entretien préventif pour 3 splits muraux."
          ));
          lineItems.push(formatItem(
            "Split mural supplémentaire — Entretien préventif",
            156,
            splitCount - 3,
            "Nettoyage et contrôle de performance de split mural supplémentaire."
          ));
        }
      }
      if (unitCounts.gainable > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Gainable / Plénum",
          220,
          unitCounts.gainable,
          "Nettoyage de l'échangeur, désinfection de la turbine et plénum pour gainable."
        ));
      }
      if (unitCounts.cassette > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Cassette 4 voies",
          180,
          unitCounts.cassette,
          "Nettoyage de turbine et bac à condensats pour cassette de soufflage encastrée 4 voies."
        ));
      }
      if (unitCounts.console > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Console basse",
          154,
          unitCounts.console,
          "Nettoyage complet pour climatiseur de type console basse posée au sol."
        ));
      }
    }
  }

  // Fallbacks if no line items generated yet
  if (lineItems.length === 0) {
    if (serviceId === 'diagnostic') {
      lineItems.push(formatItem(
        "Diagnostic & Rapport de panne",
        100,
        1,
        "Recherche de panne technique, examen des codes défauts et diagnostic détaillé."
      ));
    } else if (serviceId === 'thermodynamique') {
      lineItems.push(formatItem(
        "Entretien ballon thermodynamique",
        174,
        1,
        "Nettoyage évaporateur, contrôle d'usure de l'anode de protection et étanchéité."
      ));
    } else if (serviceId === 'pac-air-eau') {
      lineItems.push(formatItem(
        "Entretien — Pompe à Chaleur Air/Eau",
        270,
        1,
        "Nettoyage de l'unité extérieure, contrôle de la pression hydraulique et des vases d'expansion."
      ));
    }
  }

  return lineItems;
}

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

    // Pour les devis gratuits, on insère dans Google Calendar + Supabase sans passer par Stripe
    if (totalAmount === 0) {
      const realDuration = durationMins ?? SERVICE_DURATIONS[serviceId] ?? 45;
      
      // 1. Bloquer le créneau dans Google Calendar
      await createCalendarEvent({
        serviceId,
        serviceName,
        composition,
        totalAmount: 0,
        durationMins: realDuration,
        date,
        slotStartTime: slotStartTime || timeSlot.split(' ')[0] || '14:00',
        clientNom: client.nom,
        clientTelephone: client.telephone,
        clientEmail: client.email,
        clientVille: client.ville,
        clientNotes: client.notes,
        isVrv,
      });

      // 2. Insérer dans Supabase leads table
      try {
        await supabase.from('leads').insert({
          full_name: client.nom,
          email: client.email || null,
          phone: client.telephone,
          city: client.ville,
          service_type: `Étude & Devis - ${serviceName}`,
          message: `[Réservation Gratuite] Prestation: ${serviceName} | Date: ${date} (${timeSlot}) | Notes: ${client.notes || 'Aucune'}`,
        });
      } catch (e) {
        console.warn('Supabase lead insertion notice:', e);
      }

      // 3. Envoyer l'email de notification "Félicitations vous avez une nouvelle réservation"
      try {
        await sendBookingNotificationEmail({
          serviceName,
          totalAmount: 0,
          date,
          timeSlot,
          clientNom: client.nom,
          clientTelephone: client.telephone,
          clientEmail: client.email,
          clientVille: client.ville,
          clientNotes: client.notes,
          composition,
          isPaid: false,
        });
      } catch (e) {
        console.warn('Email notification error:', e);
      }

      return NextResponse.json({
        freeService: true,
        message: 'Réservation gratuite enregistrée et créneau bloqué dans le calendrier',
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.airgenergie.com';
    const realDuration = durationMins ?? SERVICE_DURATIONS[serviceId] ?? 45;

    // Détermination des line_items Stripe
    const lineItems = buildStripeLineItems(serviceId, unitCounts, date, timeSlot);
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];

    // Appliquer le coupon -10% pour le VRV/DRV
    if (isVrv) {
      discounts.push({ coupon: VRV_COUPON_ID });
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

      // Auto-génération de la facture Stripe téléchargeable après paiement
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Intervention d'entretien climatisation le ${new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} sur le créneau ${timeSlot} à ${client.ville}. Client : ${client.nom} (${client.telephone}). Tarifs exprimés en TTC (TVA 20% incluse).`,
          footer: "Air G Énergie — Entretien & Dépannage Climatisation | Tarifs indiqués en TTC (TVA 20% incluse). Merci pour votre confiance.",
          custom_fields: [
            { name: "Date intervention", value: date },
            { name: "Creneau horaire", value: timeSlot },
            { name: "Lieu intervention", value: client.ville },
          ]
        }
      },

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
