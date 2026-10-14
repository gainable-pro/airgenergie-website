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
  invoicePdf?: string;
}

export interface CustomerConfirmationEmailData {
  serviceName: string;
  totalAmount: number | string;
  date: string;
  timeSlot: string;
  clientNom: string;
  clientTelephone: string;
  clientEmail: string;
  clientVille: string;
  clientNotes?: string;
  composition?: string;
  invoicePdf?: string;
  hostedInvoiceUrl?: string;
}

// ─── Email pour l'Artisan (Notification interne) ──────────────────────────────
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

          ${booking.invoicePdf ? `
            <div style="margin-top: 20px; padding: 12px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 13px; color: #065f46;">
              📄 <strong>Facture émise :</strong> Facture Stripe jointe à cet e-mail (<a href="${booking.invoicePdf}" style="color:#059669; font-weight:bold;">Télécharger en ligne</a>).
            </div>
          ` : ''}

          <div style="margin-top: 25px; padding: 14px; background-color: #f0f9ff; border-left: 4px solid #0091DA; border-radius: 4px; font-size: 13px; color: #0369a1;">
            💡 <strong>Agenda :</strong> Le créneau a été automatiquement bloqué dans votre Google Calendar <em>airgenergie@gmail.com</em> avec le tampon de trajet inclus.
          </div>
        </div>
      </div>
    `;

    // Récupération de la facture PDF si disponible
    const attachments: Array<{ content?: Buffer; path?: string; filename: string }> = [];
    if (booking.invoicePdf) {
      try {
        const pdfRes = await fetch(booking.invoicePdf);
        if (pdfRes.ok) {
          const buffer = Buffer.from(await pdfRes.arrayBuffer());
          attachments.push({
            content: buffer,
            filename: `Facture-${booking.clientNom.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          });
        }
      } catch (err) {
        console.warn('Could not fetch PDF buffer for admin email, falling back to path:', err);
        attachments.push({
          path: booking.invoicePdf,
          filename: `Facture-${booking.clientNom.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        });
      }
    }

    const data = await resend.emails.send({
      from: 'Air G Énergie <contact@airgenergie.com>',
      to: ['contact@airgenergie.fr', 'airgenergie@gmail.com'],
      replyTo: booking.clientEmail || 'contact@airgenergie.fr',
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log('✅ Email notification réservation envoyé avec succès:', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de notification:', error);
    return null;
  }
}

// ─── Email pour le Client (avec Facture PDF & copie à contact@airgenergie.fr) ─
export async function sendCustomerConfirmationEmail(booking: CustomerConfirmationEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !booking.clientEmail) {
    console.warn('RESEND_API_KEY ou clientEmail manquant — email client ignoré');
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

    const subject = `✅ Confirmation de votre intervention : ${booking.serviceName} | Air G Énergie`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 10px;">
        <div style="background-color: #0091DA; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px; color: white;">AIR G ÉNERGIE</h1>
          <p style="margin: 8px 0 0 0; font-size: 15px; color: rgba(255,255,255,0.95); font-weight: 500;">
            Votre rendez-vous d'intervention est confirmé
          </p>
        </div>

        <div style="background-color: white; padding: 28px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="color: #0f172a; font-size: 15px; margin-top: 0; line-height: 1.6;">
            Bonjour <strong>${booking.clientNom}</strong>,<br/><br/>
            Nous vous confirmons la bonne prise en compte de votre réservation. Notre technicien qualifié interviendra à votre adresse selon les modalités ci-dessous :
          </p>

          <div style="background: #f1f5f9; padding: 18px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 140px;">Prestation :</td>
                <td style="padding: 6px 0; color: #0091DA; font-weight: bold;">${booking.serviceName}</td>
              </tr>
              ${booking.composition ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Composition :</td>
                  <td style="padding: 6px 0;">${booking.composition}</td>
                </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Date :</td>
                <td style="padding: 6px 0; font-weight: bold; color: #047857;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Créneau horaire :</td>
                <td style="padding: 6px 0; font-weight: bold; color: #b45309;">${booking.timeSlot}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Lieu d'intervention :</td>
                <td style="padding: 6px 0;">${booking.clientVille}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Montant réglé :</td>
                <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">
                  ${booking.totalAmount === 0 || booking.totalAmount === '0' ? 'Gratuit (Devis sur mesure)' : `${booking.totalAmount} € TTC (TVA 20% incluse)`}
                </td>
              </tr>
            </table>
          </div>

          ${booking.invoicePdf ? `
            <div style="text-align: center; margin: 25px 0;">
              <a href="${booking.invoicePdf}" style="background-color: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 10px rgba(5,150,105,0.2);">
                📥 Télécharger ma facture officielle PDF
              </a>
              <p style="font-size: 12px; color: #64748B; margin-top: 8px;">
                La facture est également jointe directement à cet e-mail.
              </p>
            </div>
          ` : ''}

          <h3 style="color: #0f172a; font-size: 15px; margin-top: 25px; margin-bottom: 10px;">
            ℹ️ Déroulement de l'intervention
          </h3>
          <ul style="color: #475569; font-size: 13.5px; line-height: 1.6; padding-left: 20px; margin: 0 0 20px 0;">
            <li>Notre secrétariat vous appellera la veille de l'intervention pour vous préciser l'heure exacte d'arrivée de notre technicien.</li>
            <li>Merci de bien vouloir faciliter l'accès aux unités intérieures et au groupe extérieur.</li>
            <li>À l'issue de l'entretien, l'attestation réglementaire Cerfa vous sera remise.</li>
          </ul>

          <div style="background-color: #eff6ff; border-left: 4px solid #0091DA; padding: 14px; border-radius: 4px; font-size: 13px; color: #1e40af; margin-top: 20px;">
            <strong>Besoin d'un renseignement ou d'ajuster votre horaire ?</strong><br/>
            Contactez-nous directement par téléphone au <a href="tel:0413414901" style="color:#0091DA; font-weight:bold; text-decoration:none;">04 13 41 49 01</a> ou par e-mail à <a href="mailto:contact@airgenergie.fr" style="color:#0091DA; text-decoration:none;">contact@airgenergie.fr</a>.
          </div>
        </div>

        <div style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">
          Air G Énergie — Spécialiste Climatisation & Pompes à Chaleur Bouches-du-Rhône<br/>
          Siège social : Miramas • Intervention 70 km • Qualifié RGE
        </div>
      </div>
    `;

    // Récupération de la facture PDF
    const attachments: Array<{ content?: Buffer; path?: string; filename: string }> = [];
    if (booking.invoicePdf) {
      try {
        const pdfRes = await fetch(booking.invoicePdf);
        if (pdfRes.ok) {
          const buffer = Buffer.from(await pdfRes.arrayBuffer());
          attachments.push({
            content: buffer,
            filename: `Facture-AirGEnergie-${booking.serviceName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          });
        }
      } catch (err) {
        console.warn('Could not fetch PDF buffer for customer email, falling back to path:', err);
        attachments.push({
          path: booking.invoicePdf,
          filename: `Facture-AirGEnergie.pdf`,
        });
      }
    }

    const data = await resend.emails.send({
      from: 'Air G Énergie <contact@airgenergie.com>',
      to: [booking.clientEmail],
      cc: ['contact@airgenergie.fr', 'airgenergie@gmail.com'],
      replyTo: 'contact@airgenergie.fr',
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log('✅ Email client + copie envoyés avec succès:', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email client:', error);
    return null;
  }
}

