import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Charger la clé API Resend
let apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  try {
    const envGain = fs.readFileSync(path.resolve(__dirname, '../../gainable-fr/.env.local'), 'utf8');
    apiKey = envGain.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim()?.replace(/^["']|["']$/g, '');
  } catch {}
}
if (!apiKey) {
  try {
    const envAir = fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf8');
    apiKey = envAir.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim()?.replace(/^["']|["']$/g, '');
  } catch {}
}

if (!apiKey) {
  console.error('❌ Clé RESEND_API_KEY introuvable.');
  process.exit(1);
}

const resend = new Resend(apiKey);

// 2. Charger le template HTML d'acquisition avec vidéo
const possibleHtmlPaths = [
  path.resolve(__dirname, '../../gainable-fr/emails_marketing/email_video_acquisition.html'),
  path.resolve(__dirname, '../emails_marketing/email_video_acquisition.html'),
  path.resolve(__dirname, 'email_video_acquisition.html'),
];

let htmlTemplate = null;
for (const p of possibleHtmlPaths) {
  if (fs.existsSync(p)) {
    htmlTemplate = fs.readFileSync(p, 'utf8');
    break;
  }
}

if (!htmlTemplate) {
  console.error('❌ Template email_video_acquisition.html introuvable.');
  process.exit(1);
}

// 3. Fichier de log d'historique des envois
const logPath = path.resolve(__dirname, 'artisan-emails-sent-log.json');

export async function sendArtisanVideoEmail({ email, nomEntreprise, prenom, ccAdmin = true }) {
  if (!email || !email.includes('@')) {
    throw new Error(`Adresse email invalide: "${email}"`);
  }

  const cleanEmail = email.trim().toLowerCase();

  // Personnalisation éventuelle du template
  let finalHtml = htmlTemplate;
  if (nomEntreprise || prenom) {
    const appellation = prenom || nomEntreprise;
    finalHtml = finalHtml.replace(
      '<strong>Chers confrères, professionnels du froid et de la climatisation,</strong>',
      `<strong>Bonjour ${appellation},</strong><br /><span style="font-size: 14px; color: #64748B;">Chers confrères, professionnels du froid et de la climatisation,</span>`
    );
  }

  const subject = 'Chers confrères : et si on remplissait le carnet de chantiers toute l\'année ? (Démo 60s)';

  const sendPayload = {
    from: 'Gainable.fr <noreply@gainable.ch>',
    replyTo: 'contact@gainable.fr',
    to: [cleanEmail],
    subject: subject,
    html: finalHtml,
  };

  const response = await resend.emails.send(sendPayload);

  if (response.error) {
    throw new Error(`Erreur Resend: ${response.error.message || JSON.stringify(response.error)}`);
  }

  // Historique des envois
  let history = [];
  if (fs.existsSync(logPath)) {
    try {
      history = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    } catch {}
  }

  const logEntry = {
    id: response.data?.id,
    to: cleanEmail,
    nomEntreprise: nomEntreprise || null,
    prenom: prenom || null,
    sentAt: new Date().toISOString(),
    status: 'sent',
  };
  history.push(logEntry);
  fs.writeFileSync(logPath, JSON.stringify(history, null, 2), 'utf8');

  console.log(`✅ Email envoyé avec succès à ${cleanEmail} (ID: ${response.data?.id})`);
  return { success: true, id: response.data?.id, email: cleanEmail };
}

// Support CLI direct: node scripts/send-artisan-video-email.mjs <email> [nomEntreprise]
const args = process.argv.slice(2);
if (args.length > 0) {
  const targetEmail = args[0];
  const targetName = args[1] || '';
  sendArtisanVideoEmail({ email: targetEmail, nomEntreprise: targetName })
    .then((res) => {
      console.log('Résultat:', res);
    })
    .catch((err) => {
      console.error('Erreur:', err.message);
      process.exitCode = 1;
    });
}
