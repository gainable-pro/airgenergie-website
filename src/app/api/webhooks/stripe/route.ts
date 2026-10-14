import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fulfillPaidBooking } from '@/lib/booking-fulfillment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err?.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Traitement automatique à la confirmation du paiement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid' && session.metadata) {
      console.log('💳 Paiement confirmé via Webhook Stripe pour la session :', session.id);

      let invoicePdf: string | null = null;
      let hostedInvoiceUrl: string | null = null;
      if (session.invoice) {
        try {
          const invoice = typeof session.invoice === 'string'
            ? await stripe.invoices.retrieve(session.invoice)
            : session.invoice;
          invoicePdf = invoice.invoice_pdf || invoice.hosted_invoice_url || null;
          hostedInvoiceUrl = invoice.hosted_invoice_url || null;
        } catch (e) {
          console.warn('Impossible de récupérer la facture dans le webhook :', e);
        }
      }

      await fulfillPaidBooking({
        session,
        invoicePdf,
        hostedInvoiceUrl,
      });
    }
  }

  return NextResponse.json({ received: true });
}
