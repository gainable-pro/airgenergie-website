import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = resolve(__dirname, '../airgenergie-calendar.json');
const keyData = JSON.parse(readFileSync(keyPath, 'utf8'));

async function analyzeDetailed() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: keyData.client_email,
      private_key: keyData.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const endDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate90 = new Date(Date.now() - 92 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate28 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const domains = ['sc-domain:airgenergie.fr', 'sc-domain:airgenergie.com'];

  for (const siteUrl of domains) {
    console.log(`\n======================================================`);
    console.log(`🔎 ANALYSE APPROFONDIE : ${siteUrl}`);
    console.log(`======================================================`);

    // 90 days total
    const q90 = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: startDate90, endDate },
    });
    const s90 = q90.data.rows?.[0] || {};
    console.log(`📅 SUR 90 JOURS (${startDate90} au ${endDate}) :`);
    console.log(`  • Clics totaux      : ${s90.clicks || 0}`);
    console.log(`  • Impressions       : ${s90.impressions || 0}`);
    console.log(`  • CTR Moyen         : ${((s90.ctr || 0) * 100).toFixed(2)} %`);
    console.log(`  • Position Moyenne  : ${(s90.position || 0).toFixed(1)}`);

    // 28 days total
    const q28 = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: startDate28, endDate },
    });
    const s28 = q28.data.rows?.[0] || {};
    console.log(`📅 SUR 28 JOURS (${startDate28} au ${endDate}) :`);
    console.log(`  • Clics totaux      : ${s28.clicks || 0}`);
    console.log(`  • Impressions       : ${s28.impressions || 0}`);
    console.log(`  • CTR Moyen         : ${((s28.ctr || 0) * 100).toFixed(2)} %`);
    console.log(`  • Position Moyenne  : ${(s28.position || 0).toFixed(1)}`);

    // Top impressions (opportunités SEO)
    const topImpr = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate28,
        endDate,
        dimensions: ['query'],
        rowLimit: 15,
      },
    });

    // Sort by impressions descending
    const sortedByImpr = (topImpr.data.rows || []).sort((a, b) => b.impressions - a.impressions);
    console.log(`\n🎯 TOP 15 OPPORTUNITÉS (Par Impressions - 28j) :`);
    sortedByImpr.slice(0, 15).forEach((r, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2, ' ')}. ${r.keys[0].padEnd(35, ' ')} | Impr: ${r.impressions.toString().padStart(4, ' ')} | Clics: ${r.clicks.toString().padStart(2, ' ')} | CTR: ${((r.ctr || 0) * 100).toFixed(1).padStart(4, ' ')}% | Pos: ${r.position.toFixed(1)}`
      );
    });

    // Top Pages 28j
    const topPages = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate28,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });
    const sortedPages = (topPages.data.rows || []).sort((a, b) => b.impressions - a.impressions);
    console.log(`\n📄 TOP PAGES PAR VISIBILITÉ (Impressions - 28j) :`);
    sortedPages.forEach((r, i) => {
      console.log(
        `  ${(i + 1).toString().padStart(2, ' ')}. ${r.keys[0]} | Impr: ${r.impressions} | Clics: ${r.clicks} | Pos: ${r.position.toFixed(1)}`
      );
    });
  }
}

analyzeDetailed().catch(console.error);
