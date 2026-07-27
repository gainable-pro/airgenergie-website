/**
 * sync-clean-stripe-catalog.mjs
 * Archives all old/duplicate products in Stripe Live Dashboard and builds a single clean catalog.
 * Usage: node scripts/sync-clean-stripe-catalog.mjs
 */

import Stripe from 'stripe';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read Stripe secret key from .env.local
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const stripeKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim();

if (!stripeKey || !stripeKey.startsWith('sk_')) {
  console.error('❌ STRIPE_SECRET_KEY introuvable ou invalide dans .env.local');
  process.exit(1);
}

const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });
const isLive = stripeKey.startsWith('sk_live_');
console.log(`\n🔑 Mode: ${isLive ? '🔴 LIVE' : '🟡 TEST'}\n`);

// ─── Clean Catalog Definition matching the website ───────────────────────────

const OFFICIAL_CATALOG = [
  {
    id: 'devis',
    name: "Étude & Devis d'installation",
    description: "Réalisation d'une étude technique complète et bilan thermique. Déplacement gratuit sous 48h jusqu'à 100 km autour de Miramas.",
    price: 0,
    category: 'depannage',
  },
  {
    id: 'diagnostic',
    name: 'Diagnostic & Rapport de panne',
    description: "Recherche de panne, diagnostic technique, contrôle d'étanchéité et rédaction d'un rapport certifié pour assurance.",
    price: 100,
    category: 'depannage',
  },
  {
    id: 'preventive-split',
    name: 'Entretien climatisation préventif (Mono-split)',
    description: "Nettoyage filtres, désinfection évaporateur (bactéricide & fongicide), contrôle pression, attestation légale annuelle.",
    price: 156,
    category: 'clim',
  },
  {
    id: 'curative-split',
    name: 'Entretien climatisation Curatif +++ (Vapeur 100°C)',
    description: "Désinfection intensive à la vapeur sèche 100°C sous pression, ClimWasher+, décontamination totale du bac à condensats.",
    price: 192,
    category: 'clim',
  },
  {
    id: 'double-split',
    name: 'Forfait Double-split Entretien de climatisation',
    description: "Entretien préventif complet pour 2 unités intérieures et 1 groupe extérieur. Attestation annuelle incluse.",
    price: 270,
    category: 'clim',
  },
  {
    id: 'tri-split',
    name: 'Forfait Tri-split Entretien de climatisation',
    description: "Entretien préventif complet pour 3 unités intérieures et 1 groupe extérieur. Attestation annuelle incluse.",
    price: 380,
    category: 'clim',
  },
  {
    id: 'preventive-gainable',
    name: 'Entretien de climatisation gainable',
    description: "Nettoyage unité en combles/faux-plafond, filtres de reprise, désinfection réseau aéraulique et régulation Airzone.",
    price: 220,
    category: 'clim',
  },
  {
    id: 'preventive-console',
    name: 'Entretien de climatisation console basse',
    description: "Nettoyage filtres d'aspiration, désinfection évaporateur double flux, contrôle du groupe extérieur.",
    price: 154,
    category: 'clim',
  },
  {
    id: 'preventive-cassette',
    name: 'Entretien de climatisation cassette 4 voies',
    description: "Nettoyage grille 4 voies encastrée, bac à condensats, test pompe de relevage, désinfection biocide.",
    price: 180,
    category: 'clim',
  },
  {
    id: 'vrv',
    name: 'Entretien Système VRV / DRV (Tertiaire)',
    description: "Maintenance sur-mesure multi-zones pour hôtels, résidences et commerces. Remise de 10% appliquée automatiquement.",
    price: 0,
    category: 'clim',
  },
  {
    id: 'thermodynamique',
    name: 'Entretien ballon thermodynamique',
    description: "Contrôle annuel chauffe-eau thermodynamique, vérification de l'anode, du circuit hydraulique et de la PAC intégrée.",
    price: 174,
    category: 'pac',
  },
  {
    id: 'pac-air-eau',
    name: 'Entretien Pompe à Chaleur Air/Eau',
    description: "Entretien annuel obligatoire PAC réversible, circuit hydraulique, contrôle vase d'expansion et remise du Cerfa.",
    price: 270,
    category: 'pac',
  },

  // ── Extra unit items for dynamic composer ──────────────────────────────────
  {
    id: 'curative-gainable',
    name: 'Gainable / Plénum — Entretien curatif +++',
    description: "Nébulisation bactéricide intensive, traitement profond des gaines et plénum.",
    price: 260,
    category: 'curative',
  },
  {
    id: 'curative-cassette',
    name: 'Cassette 4 voies — Entretien curatif +++',
    description: "Démontage complet, traitement vapeur 100°C sur échangeur circulaire et bac condensats.",
    price: 220,
    category: 'curative',
  },
  {
    id: 'curative-console',
    name: 'Console basse — Entretien curatif +++',
    description: "Traitement vapeur basse-pression sur évaporateur double flux, désinfection intensive.",
    price: 192,
    category: 'curative',
  },
];

async function cleanupAndSyncCatalog() {
  console.log('🧹 1. Archivage des anciens produits doublons dans Stripe...');
  
  // List all active products
  let hasMore = true;
  let startingAfter = undefined;
  let totalArchived = 0;

  while (hasMore) {
    const list = await stripe.products.list({
      limit: 100,
      active: true,
      starting_after: startingAfter,
    });

    for (const prod of list.data) {
      // Deactivate product
      await stripe.products.update(prod.id, { active: false });
      console.log(`  📦 Produit archivé: ${prod.name} (${prod.id})`);
      totalArchived++;
    }

    hasMore = list.has_more;
    if (list.data.length > 0) {
      startingAfter = list.data[list.data.length - 1].id;
    }
  }

  console.log(`\n✅ ${totalArchived} anciens produits archivés avec succès.\n`);

  console.log('✨ 2. Création du catalogue propre et officiel Air G Énergie...');
  const newCatalog = {};

  for (const item of OFFICIAL_CATALOG) {
    console.log(`  ⏳ Création: ${item.name} (${item.price === 0 ? 'Gratuit' : item.price + '€'})...`);

    const product = await stripe.products.create({
      name: item.name,
      description: item.description,
      metadata: {
        airgenergie_id: item.id,
        airgenergie_category: item.category,
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: item.price * 100,
      currency: 'eur',
      metadata: {
        airgenergie_id: item.id,
        airgenergie_category: item.category,
      },
    });

    console.log(`  ✅ ${item.id}: product_id = ${product.id}, price_id = ${price.id}`);

    newCatalog[item.id] = {
      productId: product.id,
      priceId: price.id,
      name: item.name,
      price: item.price,
      category: item.category,
    };
  }

  // Create or verify VRV Coupon
  let vrvCouponId = 'VRV-10PCT';
  try {
    const existingCoupon = await stripe.coupons.retrieve('VRV-10PCT').catch(() => null);
    if (!existingCoupon) {
      const coupon = await stripe.coupons.create({
        id: 'VRV-10PCT',
        name: 'Remise VRV/DRV -10%',
        percent_off: 10,
        duration: 'once',
        metadata: { airgenergie_category: 'vrv' },
      });
      vrvCouponId = coupon.id;
    }
  } catch (e) { /* ignore */ }

  newCatalog['VRV_COUPON_ID'] = vrvCouponId;

  // Write TypeScript catalog file
  const catalogTs = `// ⚠️ FICHIER AUTO-GÉNÉRÉ — ne pas modifier manuellement
// Généré le ${new Date().toLocaleDateString('fr-FR')} par scripts/sync-clean-stripe-catalog.mjs
// Mode: ${isLive ? 'LIVE' : 'TEST'}

export const STRIPE_CATALOG = ${JSON.stringify(newCatalog, null, 2)} as const;

/** Coupon VRV/DRV -10% */
export const VRV_COUPON_ID = '${vrvCouponId}';

/** Récupère le price_id d'une unité selon le type de service et le type d'unité */
export function getPriceId(
  serviceCategory: 'preventive' | 'curative',
  unitType: 'split' | 'gainable' | 'cassette' | 'console'
): string {
  const key = \`\${serviceCategory}-\${unitType}\` as keyof typeof STRIPE_CATALOG;
  const item = STRIPE_CATALOG[key];
  if (!item || !('priceId' in item)) throw new Error(\`Prix introuvable: \${key}\`);
  return item.priceId;
}
`;

  const catalogPath = resolve(__dirname, '../src/lib/stripe-catalog.ts');
  writeFileSync(catalogPath, catalogTs, 'utf8');

  console.log('\n📄 Fichier src/lib/stripe-catalog.ts mis à jour.');
  console.log('\n🎉 CATALOGUE STRIPE NETTOYÉ ET PROPRE AVEC SUCCÈS !');
}

cleanupAndSyncCatalog().catch((err) => {
  console.error('❌ Erreur lors du nettoyage du catalogue:', err);
  process.exit(1);
});
