// ⚠️ FICHIER AUTO-GÉNÉRÉ — ne pas modifier manuellement
// Généré le 16/07/2026 par scripts/create-stripe-catalog.mjs
// Mode: LIVE

export const STRIPE_CATALOG = {
  "diagnostic": {
    "productId": "prod_UtjvVchx1oxnGu",
    "priceId": "price_1TtwRcFVMqGo2msFFmSUFlj8",
    "name": "Diagnostic & Rapport de panne",
    "price": 100,
    "category": "fixed"
  },
  "thermodynamique": {
    "productId": "prod_Utjv1H4ZutYPpA",
    "priceId": "price_1TtwRcFVMqGo2msF3GHxg17u",
    "name": "Entretien ballon thermodynamique",
    "price": 174,
    "category": "fixed"
  },
  "pac-air-eau": {
    "productId": "prod_UtjviUKFGJXYqx",
    "priceId": "price_1TtwRdFVMqGo2msFgMFgi8me",
    "name": "Entretien Pompe à Chaleur Air/Eau",
    "price": 270,
    "category": "fixed"
  },
  "preventive-split": {
    "productId": "prod_UtjvA0oKRxTBiL",
    "priceId": "price_1TtwRdFVMqGo2msFiinGgMBH",
    "name": "Split mural — Entretien préventif",
    "price": 156,
    "category": "preventive"
  },
  "preventive-gainable": {
    "productId": "prod_UtjvluaWY6zkHI",
    "priceId": "price_1TtwRdFVMqGo2msFPx6lVDox",
    "name": "Gainable / Plénum — Entretien préventif",
    "price": 220,
    "category": "preventive"
  },
  "preventive-cassette": {
    "productId": "prod_UtjvwVFMk8TU3i",
    "priceId": "price_1TtwReFVMqGo2msFYRzRdYZV",
    "name": "Cassette 4 voies — Entretien préventif",
    "price": 180,
    "category": "preventive"
  },
  "preventive-console": {
    "productId": "prod_Utjv2ft25LPe2E",
    "priceId": "price_1TtwReFVMqGo2msFBo5EKj3k",
    "name": "Console basse — Entretien préventif",
    "price": 154,
    "category": "preventive"
  },
  "curative-split": {
    "productId": "prod_UtjvIaxVdBg9nT",
    "priceId": "price_1TtwRfFVMqGo2msFaBnMkiSF",
    "name": "Split mural — Entretien curatif +++",
    "price": 192,
    "category": "curative"
  },
  "curative-gainable": {
    "productId": "prod_Utjvk845X7xEeU",
    "priceId": "price_1TtwRfFVMqGo2msFn8s6nc7L",
    "name": "Gainable / Plénum — Entretien curatif +++",
    "price": 260,
    "category": "curative"
  },
  "curative-cassette": {
    "productId": "prod_UtjvaKph6xpIj4",
    "priceId": "price_1TtwRgFVMqGo2msFfzQS7R3h",
    "name": "Cassette 4 voies — Entretien curatif +++",
    "price": 220,
    "category": "curative"
  },
  "curative-console": {
    "productId": "prod_UtjvWoSSKU9DgG",
    "priceId": "price_1TtwRgFVMqGo2msF9UnFb53r",
    "name": "Console basse — Entretien curatif +++",
    "price": 192,
    "category": "curative"
  },
  "VRV_COUPON_ID": "VRV-10PCT"
} as const;

/** Coupon VRV/DRV -10% */
export const VRV_COUPON_ID = 'VRV-10PCT';

/** Récupère le price_id d'une unité selon le type de service et le type d'unité */
export function getPriceId(
  serviceCategory: 'preventive' | 'curative',
  unitType: 'split' | 'gainable' | 'cassette' | 'console'
): string {
  const key = `${serviceCategory}-${unitType}` as keyof typeof STRIPE_CATALOG;
  const item = STRIPE_CATALOG[key];
  if (!item || !('priceId' in item)) throw new Error(`Prix introuvable: ${key}`);
  return item.priceId;
}
