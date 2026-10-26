import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = resolve(__dirname, '../airgenergie-calendar.json');
const keyData = JSON.parse(readFileSync(keyPath, 'utf8'));

async function getPerformance(siteUrl, days = 28) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: keyData.client_email,
      private_key: keyData.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const endDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // GSC has ~2 days delay
  const startDate = new Date(Date.now() - (days + 2) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  console.log(`\n======================================================`);
  console.log(`📊 Rapport Search Console : ${siteUrl}`);
  console.log(`Période : du ${startDate} au ${endDate} (${days} jours)`);
  console.log(`======================================================\n`);

  try {
    // 1. Vue globale (Totaux)
    const summaryRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
      },
    });

    const summary = summaryRes.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    console.log(`📈 VUE GLOBALE :`);
    console.log(`  • Clics totaux      : ${summary.clicks || 0}`);
    console.log(`  • Impressions       : ${summary.impressions || 0}`);
    console.log(`  • CTR Moyen         : ${((summary.ctr || 0) * 100).toFixed(2)} %`);
    console.log(`  • Position Moyenne  : ${(summary.position || 0).toFixed(1)}\n`);

    // 2. Top Requêtes (Mots-clés)
    const queriesRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 15,
      },
    });

    console.log(`🔍 TOP 15 REQUÊTES (Mots-clés) :`);
    if (queriesRes.data.rows && queriesRes.data.rows.length > 0) {
      queriesRes.data.rows.forEach((row, i) => {
        console.log(
          `  ${(i + 1).toString().padStart(2, ' ')}. ${row.keys[0].padEnd(35, ' ')} | Clics: ${row.clicks.toString().padStart(3, ' ')} | Impr: ${row.impressions.toString().padStart(4, ' ')} | Pos: ${row.position.toFixed(1)}`
        );
      });
    } else {
      console.log('  (Aucune donnée de requête disponible sur cette période)');
    }

    // 3. Top Pages
    const pagesRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    console.log(`\n📄 TOP 10 PAGES :`);
    if (pagesRes.data.rows && pagesRes.data.rows.length > 0) {
      pagesRes.data.rows.forEach((row, i) => {
        console.log(
          `  ${(i + 1).toString().padStart(2, ' ')}. ${row.keys[0]} (Clics: ${row.clicks}, Impr: ${row.impressions})`
        );
      });
    } else {
      console.log('  (Aucune donnée de page disponible)');
    }

  } catch (err) {
    console.error(`❌ Erreur pour ${siteUrl}:`, err.message);
  }
}

async function run() {
  const sitesToCheck = [
    'sc-domain:airgenergie.fr',
    'https://airgenergie.fr/',
    'sc-domain:airgenergie.com',
    'https://airgenergie.com/',
  ];

  for (const site of sitesToCheck) {
    await getPerformance(site);
  }
}

run();
