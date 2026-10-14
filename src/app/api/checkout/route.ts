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
  'reprogrammation-thermostat': 90,
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
          description: `${description} | Planifié le ${formattedDate} (${timeSlot}) | Attestation Cerfa incluse`,
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
          "Entretien curatif +++ — Split mural (Dégraissage turbine sous bâche, désinfection complète & fongicide)",
          192,
          unitCounts.split,
          "Nettoyage haute intensité sous bâche étanche, dégraissage en profondeur de la turbine au nettoyeur basse pression, traitement bactéricide et fongicide anti-odeurs, nettoyage échangeur extérieur et contrôle des pressions."
        ));
      }
      if (unitCounts.gainable > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Gainable / Plénum (Désinfection turbine, plénum & assainissement circuit)",
          260,
          unitCounts.gainable,
          "Désinfection et nettoyage haute performance de l'unité gainable en comble/faux-plafond, pulvérisation fongicide dans le plénum et traitement anti-bactérien approfondi."
        ));
      }
      if (unitCounts.cassette > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Cassette 4 voies (Nettoyage bac condensats, turbine & désinfection)",
          220,
          unitCounts.cassette,
          "Démontage sous-face, nettoyage en profondeur du bac à condensats, traitement bactéricide de la turbine 4 voies et contrôle de la pompe de relevage."
        ));
      }
      if (unitCounts.console > 0) {
        lineItems.push(formatItem(
          "Entretien curatif +++ — Console basse (Dégraissage, désinfection & traitement assainissant)",
          192,
          unitCounts.console,
          "Désinfection haute intensité et nettoyage de l'unité console basse posée au sol, filtres, turbine et bac à condensats."
        ));
      }
    } else {
      // Preventive & Packages (double-split, tri-split, etc.)
      if (unitCounts.split > 0) {
        const splitCount = unitCounts.split;
        if (splitCount === 1) {
          lineItems.push(formatItem(
            "Entretien préventif — Split mural (Nettoyage filtres, désinfection antibactérienne & contrôle pressions)",
            156,
            1,
            "Nettoyage et désinfection complète de l'unité intérieure split, dépoussiérage échangeur, contrôle des pressions frigorifiques et températures, vérification écoulement condensats, nettoyage groupe extérieur."
          ));
        } else if (splitCount === 2) {
          lineItems.push(formatItem(
            "Forfait Entretien Double-split (2 Splits muraux — Nettoyage, désinfection complète & contrôle global)",
            270,
            1,
            "Forfait d'entretien préventif pour 2 unités splits intérieures et 1 groupe extérieur : nettoyage filtres, traitement antibactérien des turbines, contrôle des pressions et températures."
          ));
        } else if (splitCount === 3) {
          lineItems.push(formatItem(
            "Forfait Entretien Tri-split (3 Splits muraux — Nettoyage, désinfection complète & contrôle global)",
            380,
            1,
            "Forfait préférentiel pour 3 unités splits intérieures et groupe extérieur : nettoyage complet des filtres, désinfection des 3 turbines, contrôle étanchéité et pressions frigorifiques."
          ));
        } else {
          lineItems.push(formatItem(
            "Forfait Entretien Tri-split (3 Splits muraux — Nettoyage, désinfection complète & contrôle global)",
            380,
            1,
            "Forfait préférentiel pour 3 unités splits intérieures et groupe extérieur : nettoyage complet des filtres, désinfection des 3 turbines, contrôle étanchéité et pressions frigorifiques."
          ));
          lineItems.push(formatItem(
            "Split mural supplémentaire — Entretien préventif complet",
            156,
            splitCount - 3,
            "Nettoyage, désinfection antibactérienne et contrôle de performance pour unité split murale supplémentaire."
          ));
        }
      }
      if (unitCounts.gainable > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Climatisation gainable / plénum (Nettoyage unité comble, filtres & contrôle soufflage)",
          220,
          unitCounts.gainable,
          "Entretien technique de l'unité en comble/faux-plafond, désinfection de la turbine et du plénum, nettoyage des filtres d'aspiration, contrôle des grilles de soufflage et du groupe extérieur."
        ));
      }
      if (unitCounts.cassette > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Cassette 4 voies (Nettoyage bac condensats, turbine & filtres)",
          180,
          unitCounts.cassette,
          "Nettoyage de turbine, contrôle du bac à condensats et de la pompe de relevage, désinfection pour cassette encastrée 4 voies."
        ));
      }
      if (unitCounts.console > 0) {
        lineItems.push(formatItem(
          "Entretien préventif — Console basse (Nettoyage filtres, échangeur & contrôle frigorifique)",
          154,
          unitCounts.console,
          "Nettoyage complet de l'unité console basse posée au sol, filtres, turbine et vérification des connexions frigorifiques."
        ));
      }
    }
  }

  // Fallbacks if no line items generated yet
  if (lineItems.length === 0) {
    if (serviceId === 'diagnostic') {
      lineItems.push(formatItem(
        "Diagnostic & Rapport de panne technique (Recherche de panne sur site & examen codes défauts)",
        100,
        1,
        "Recherche de panne sur site par un technicien qualifié, diagnostic électrique et frigorifique complet, lecture des codes défauts et devis de réparation détaillé."
      ));
    } else if (serviceId === 'thermodynamique') {
      lineItems.push(formatItem(
        "Entretien chauffe-eau thermodynamique (Nettoyage évaporateur, contrôle anode magnésium & étanchéité)",
        174,
        1,
        "Nettoyage et dépoussiérage de l'évaporateur, contrôle d'usure de l'anode sacrificielle de protection, contrôle de l'étanchéité du fluide frigorigène et test des sécurités."
      ));
    } else if (serviceId === 'pac-air-eau') {
      lineItems.push(formatItem(
        "Entretien — Pompe à Chaleur Air/Eau (Contrôle pression hydraulique, vase d'expansion & unité extérieure)",
        270,
        1,
        "Nettoyage de l'unité extérieure, contrôle de la pression hydraulique et des vases d'expansion, vérification de l'appoint électrique, contrôle étanchéité circuit et remise attestation Cerfa."
      ));
    } else if (serviceId === 'reprogrammation-thermostat') {
      lineItems.push(formatItem(
        "Re-programmation thermostat & Régulation (Vérification thermostats, signal commande & réglage pression statique)",
        200,
        1,
        "Vérification complète des thermostats, test des sondes et signaux de commande, réglage de la pression statique, coordination support technique fabricant et optimisation de la régulation."
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

    if (!serviceId || typeof totalAmount !== 'number' || !date || !timeSlot || !client?.nom || !client?.telephone) {
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

    const formattedInvoiceDate = new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const isCurativeService = serviceId === 'curative';
    const operationsSummary = isCurativeService
      ? "Nettoyage haute intensité sous bâche étanche, dégraissage approfondi turbine au nettoyeur basse pression, traitement bactéricide & fongicide anti-odeurs, nettoyage groupe extérieur, contrôle pressions et températures, remise attestation d'entretien Cerfa."
      : "Nettoyage approfondi des filtres, désinfection antibactérienne/fongicide unité intérieure, vérification écoulement condensats, contrôle températures et pressions frigorifiques, nettoyage groupe extérieur, remise attestation Cerfa.";

    const invoiceFullDescription = [
      `PRESTATION : ${serviceName}${composition ? ` (${composition})` : ''}`,
      `OPÉRATIONS INCLUSES : ${operationsSummary}`,
      `DATE & CRÉNEAU : ${formattedInvoiceDate} sur la plage ${timeSlot} (plage d'intervention de 2h)`,
      `ADRESSE D'INTERVENTION : ${client.ville}${client.notes ? ` — ${client.notes.replace(/\n/g, ', ')}` : ''}`,
      `CLIENT : ${client.nom} — Tél : ${client.telephone}${client.email ? ` • Email : ${client.email}` : ''}`,
      `Tarifs TTC (TVA 20% incluse). Attestation réglementaire Cerfa remise sur site à l'issue de l'intervention.`,
    ].join('\n\n');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'fr',
      customer_email: (client.email && typeof client.email === 'string' && client.email.includes('@')) ? client.email.trim() : undefined,
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,

      // Auto-génération de la facture Stripe téléchargeable après paiement avec détails complets
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: invoiceFullDescription,
          footer: "Air G Énergie — Entretien & Dépannage Climatisation & PAC | Attestation Cerfa remise sur site | Tarifs TTC (TVA 20% incluse) | Tél : 04 13 41 49 01 — contact@airgenergie.fr",
          custom_fields: [
            { name: "Date intervention", value: new Date(date).toLocaleDateString('fr-FR') },
            { name: "Creneau horaire", value: timeSlot },
            { name: "Lieu intervention", value: client.ville },
            { name: "Attestation Cerfa", value: "Remise sur site" },
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
