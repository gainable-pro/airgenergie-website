import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
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

    return NextResponse.json({
      id: session.id,
      customerEmail: session.customer_details?.email || session.metadata?.clientEmail || null,
      customerName: session.customer_details?.name || session.metadata?.clientNom || null,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      paymentStatus: session.payment_status,
      invoicePdf: invoice?.invoice_pdf || invoice?.hosted_invoice_url || null,
      hostedInvoiceUrl: invoice?.hosted_invoice_url || null,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json({ error: 'Session introuvable' }, { status: 404 });
  }
}
