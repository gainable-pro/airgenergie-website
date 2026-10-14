import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fulfillPaidBooking } from '@/lib/booking-fulfillment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['invoice'],
    });

    const invoice = typeof session.invoice === 'object' ? (session.invoice as Stripe.Invoice) : null;
    const invoicePdf = invoice?.invoice_pdf || invoice?.hosted_invoice_url || null;
    const hostedInvoiceUrl = invoice?.hosted_invoice_url || null;

    // Déclenchement automatique garanti de la synchronisation agenda + emails client/artisan avec facture PDF
    if (session.payment_status === 'paid' && session.metadata) {
      try {
        await fulfillPaidBooking({
          session,
          invoicePdf,
          hostedInvoiceUrl,
        });
      } catch (err) {
        console.error('Error fulfilling booking in session route:', err);
      }
    }

    return NextResponse.json({
      id: session.id,
      customerEmail: session.customer_details?.email || session.metadata?.clientEmail || null,
      customerName: session.customer_details?.name || session.metadata?.clientNom || null,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      paymentStatus: session.payment_status,
      invoicePdf,
      hostedInvoiceUrl,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json({ error: 'Session introuvable' }, { status: 404 });
  }
}
