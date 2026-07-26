/**
 * create-stripe-catalog.mjs
 * Crée tous les produits et prix du catalogue Air G Énergie dans Stripe
 * Usage: node scripts/create-stripe-catalog.mjs
 */

import Stripe from 'stripe';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Lire la clé depuis .env.local
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

// ─── Définition du catalogue ──────────────────────────────────────────────────

const CATALOG = {
  // ── Services fixes ──────────────────────────────────────────────────────────
  fixed: [
    {
      id: 'diagnostic',
      name: 'Diagnostic & Rapport de panne',
      description: 'Recherche de panne, diagnostic technique, rapport certifié pour assurance. Déplacement jusqu\'à 100 km.',
      price: 100,
      duration: '45 min',
    },
    {
      id: 'thermodynamique',
      name: 'Entretien ballon thermodynamique',
      description: 'Contrôle annuel complet du chauffe-eau thermodynamique, vérification de l\'anode, PAC intégrée.',
      price: 174,
      duration: '45 min',
    },
    {
      id: 'pac-air-eau',
      name: 'Entretien Pompe à Chaleur Air/Eau',
      description: 'Entretien annuel obligatoire PAC réversible, circuit hydraulique, vase d\'expansion, Cerfa réglementaire.',
      price: 270,
      duration: '45 min',
    },
  ],

  // ── Entretien préventif — prix par unité ────────────────────────────────────
  preventive: [
    {
      id: 'preventive-split',
      name: 'Split mural — Entretien préventif',
      description: 'Nettoyage filtres, désinfection évaporateur, contrôle pression, attestation annuelle. Par unité.',
      price: 156,
      duration: '45 min',
    },
    {
      id: 'preventive-gainable',
      name: 'Gainable / Plénum — Entretien préventif',
      description: 'Nettoyage filtres reprise, désinfection gaines, contrôle régulation Airzone. Par unité.',
      price: 220,
      duration: '45 min',
    },
    {
      id: 'preventive-cassette',
      name: 'Cassette 4 voies — Entretien préventif',
      description: 'Nettoyage grille aspiration, bac condensats, désinfection échangeur circulaire. Par unité.',
      price: 180,
      duration: '45 min',
    },
    {
      id: 'preventive-console',
      name: 'Console basse — Entretien préventif',
      description: 'Nettoyage filtres et grilles, désinfection évaporateur double flux, rapport annuel. Par unité.',
      price: 154,
      duration: '45 min',
    },
  ],

  // ── Entretien curatif (vapeur 100°C) — prix par unité ───────────────────────
  curative: [
    {
      id: 'curative-split',
      name: 'Split mural — Entretien curatif +++',
      description: 'Désinfection vapeur sèche 100°C, ClimWasher+, traitement fongicide intensif. Par unité.',
      price: 192,
      duration: '60 min',
    },
    {
      id: 'curative-gainable',
      name: 'Gainable / Plénum — Entretien curatif +++',
      description: 'Nébulisation bactéricide intensive, traitement profond des gaines et plénum. Par unité.',
      price: 260,
      duration: '60 min',
    },
    {
      id: 'curative-cassette',
      name: 'Cassette 4 voies — Entretien curatif +++',
      description: 'Démontage complet, vapeur 100°C sur échangeur circulaire, décontamination totale. Par unité.',
      price: 220,
      duration: '60 min',
    },
    {
      id: 'curative-console',
      name: 'Console basse — Entretien curatif +++',
      description: 'Traitement vapeur basse-pression sur évaporateur double flux, désinfection intensif. Par unité.',
      price: 192,
      duration: '60 min',
    },
  ],
};

// ─── Création des produits et prix ───────────────────────────────────────────

const catalog = {};
let createdCount = 0;

async function createProductPrice(item, category) {
  console.log(`  ⏳ ${item.name} (${item.price}€)...`);
  
  // Créer le produit
  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: {
      airgenergie_id: item.id,
      airgenergie_category: category,
      duration: item.duration,
    },
  });

  // Créer le prix
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: item.price * 100, // en centimes
    currency: 'eur',
    metadata: {
      airgenergie_id: item.id,
      airgenergie_category: category,
    },
  });

  console.log(`  ✅ ${item.id}: price_id = ${price.id}`);
  catalog[item.id] = {
    productId: product.id,
    priceId: price.id,
    name: item.name,
    price: item.price,
    category,
  };
  createdCount++;
}

// ─── Coupon VRV -10% ─────────────────────────────────────────────────────────

async function createVrvCoupon() {
  console.log('\n🏷️  Création du coupon VRV -10%...');
  try {
    // Vérifier si le coupon existe déjà
    const existing = await stripe.coupons.retrieve('VRV-10PCT').catch(() => null);
    if (existing) {
      console.log('  ✅ Coupon VRV-10PCT déjà existant');
      return existing.id;
    }
  } catch (e) { /* not found */ }

  const coupon = await stripe.coupons.create({
    id: 'VRV-10PCT',
    name: 'Remise VRV/DRV -10%',
    percent_off: 10,
    duration: 'once',
    metadata: { airgenergie_category: 'vrv' },
  });
  console.log(`  ✅ Coupon créé: ${coupon.id}`);
  return coupon.id;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('🛍️  Création du catalogue Stripe Air G Énergie...\n');

try {
  // Services fixes
  console.log('📌 Services fixes:');
  for (const item of CATALOG.fixed) {
    await createProductPrice(item, 'fixed');
  }

  // Entretien préventif
  console.log('\n🔧 Entretien préventif (par unité):');
  for (const item of CATALOG.preventive) {
    await createProductPrice(item, 'preventive');
  }

  // Entretien curatif
  console.log('\n🔥 Entretien curatif +++ (par unité):');
  for (const item of CATALOG.curative) {
    await createProductPrice(item, 'curative');
  }

  // Coupon VRV
  const vrvCouponId = await createVrvCoupon();
  catalog['VRV_COUPON_ID'] = vrvCouponId;

  // ─── Écriture du fichier stripe-catalog.ts ──────────────────────────────────
  const catalogTs = `// ⚠️ FICHIER AUTO-GÉNÉRÉ — ne pas modifier manuellement
// Généré le ${new Date().toLocaleDateString('fr-FR')} par scripts/create-stripe-catalog.mjs
// Mode: ${isLive ? 'LIVE' : 'TEST'}

export const STRIPE_CATALOG = ${JSON.stringify(catalog, null, 2)} as const;

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
  console.log(`\n📄 Catalogue TypeScript écrit: src/lib/stripe-catalog.ts`);

  console.log(`\n✅ ${createdCount} produits/prix créés avec succès dans Stripe ${isLive ? 'LIVE' : 'TEST'} !`);
  console.log('\n📋 Résumé du catalogue:');
  Object.entries(catalog).forEach(([key, val]) => {
    if (typeof val === 'object' && 'priceId' in val) {
      console.log(`  ${key}: ${val.priceId} (${val.price}€)`);
    }
  });

} catch (err) {
  console.error('\n❌ Erreur:', err.message);
  process.exit(1);
}
