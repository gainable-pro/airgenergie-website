import { Resend } from 'resend';

export interface BookingEmailData {
  serviceName: string;
  totalAmount: number | string;
  date: string;
  timeSlot: string;
  clientNom: string;
  clientTelephone: string;
  clientEmail?: string;
  clientVille: string;
  clientNotes?: string;
  composition?: string;
  isPaid?: boolean;
}

export async function sendBookingNotificationEmail(booking: BookingEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY non configurée — email de notification ignoré');
    return null;
  }

  try {
    const resend = new Resend(apiKey);
    const formattedDate = new Date(booking.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const subject = `🎉 Félicitations ! Nouvelle réservation : ${booking.clientNom} (${booking.clientVille})`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 10px;">
        <div style="background-color: #0091DA; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px; color: white;">🎉 Félicitations !</h1>
          <p style="margin: 6px 0 0 0; font-size: 15px; color: rgba(255,255,255,0.9);">Vous avez reçu une nouvelle réservation en ligne</p>
        </div>

        <div style="background-color: white; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #0f172a; font-size: 17px; margin-top: 0; border-bottom: 2px solid #0091DA; padding-bottom: 8px;">
            📋 Détails de la Prestation
          </h2>
          <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; line-height: 1.8; color: #334155; font-size: 14px;">
            <li><strong>Prestation :</strong> ${booking.serviceName}</li>
            ${booking.composition ? `<li><strong>Composition :</strong> ${booking.composition}</li>` : ''}
            <li><strong>Montant :</strong> ${booking.totalAmount === 0 || booking.totalAmount === '0' ? '<span style="color:#48BB78; font-weight:bold;">GRATUIT (Étude/Devis)</span>' : `<span style="color:#0091DA; font-weight:bold;">${booking.totalAmount} € TTC (Payé via Stripe)</span>`}</li>
            <li><strong>Date d'intervention :</strong> <span style="background:#eff6ff; padding:2px 8px; border-radius:4px; font-weight:bold; color:#1e40af;">${formattedDate}</span></li>
            <li><strong>Créneau horaire :</strong> <span style="background:#fef3c7; padding:2px 8px; border-radius:4px; font-weight:bold; color:#92400e;">${booking.timeSlot}</span></li>
          </ul>

          <h2 style="color: #0f172a; font-size: 17px; margin-top: 25px; border-bottom: 2px solid #0091DA; padding-bottom: 8px;">
            👤 Coordonnées Complètes du Client
          </h2>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; color: #334155; font-size: 14px;">
            <li><strong>Nom & Prénom :</strong> <span style="font-size: 15px; font-weight: bold; color: #0f172a;">${booking.clientNom}</span></li>
            <li><strong>Téléphone / Portable :</strong> <a href="tel:${booking.clientTelephone}" style="color:#0091DA; font-weight:bold; font-size:15px; text-decoration:none;">${booking.clientTelephone}</a></li>
            <li><strong>Adresse Email :</strong> ${booking.clientEmail ? `<a href="mailto:${booking.clientEmail}" style="color:#0091DA; text-decoration:none;">${booking.clientEmail}</a>` : 'Non renseignée'}</li>
            <li><strong>Ville / Adresse d'intervention :</strong> <strong>${booking.clientVille}</strong></li>
            ${booking.clientNotes ? `<li><strong>Notes & Précisions client :</strong> <em>${booking.clientNotes}</em></li>` : ''}
          </ul>

          <div style="margin-top: 25px; padding: 14px; background-color: #f0f9ff; border-left: 4px solid #0091DA; border-radius: 4px; font-size: 13px; color: #0369a1;">
            💡 <strong>Agenda :</strong> Le créneau a été automatiquement bloqué dans votre Google Calendar <em>airgenergie@gmail.com</em> avec le tampon de trajet inclus.
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Air G Énergie <onboarding@resend.dev>',
      to: ['contact@airgenergie.fr'],
      subject,
      html,
    });

    console.log('✅ Email notification réservation envoyé avec succès:', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de notification:', error);
    return null;
  }
}
