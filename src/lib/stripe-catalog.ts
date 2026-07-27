// ⚠️ FICHIER AUTO-GÉNÉRÉ — ne pas modifier manuellement
// Généré le 27/07/2026 par scripts/create-stripe-catalog.mjs
// Mode: LIVE

export const STRIPE_CATALOG = {
  "diagnostic": {
    "productId": "prod_UxrMLliZntc74w",
    "priceId": "price_1TxvdPFVMqGo2msFAL3jN9Gd",
    "name": "Diagnostic & Rapport de panne",
    "price": 100,
    "category": "fixed"
  },
  "thermodynamique": {
    "productId": "prod_UxrMSzl2otojjt",
    "priceId": "price_1TxvdPFVMqGo2msF9zYLQ4NM",
    "name": "Entretien ballon thermodynamique",
    "price": 174,
    "category": "fixed"
  },
  "pac-air-eau": {
    "productId": "prod_UxrMLX0uvm0Qpl",
    "priceId": "price_1TxvdQFVMqGo2msFUAawxSgq",
    "name": "Entretien Pompe à Chaleur Air/Eau",
    "price": 270,
    "category": "fixed"
  },
  "preventive-split": {
    "productId": "prod_UxrM2vkgIJtsDg",
    "priceId": "price_1TxvdQFVMqGo2msF1LckDkBq",
    "name": "Split mural — Entretien préventif",
    "price": 156,
    "category": "preventive"
  },
  "preventive-gainable": {
    "productId": "prod_UxrMtxmEy9sCJi",
    "priceId": "price_1TxvdRFVMqGo2msFIXYj8Fyb",
    "name": "Gainable / Plénum — Entretien préventif",
    "price": 220,
    "category": "preventive"
  },
  "preventive-cassette": {
    "productId": "prod_UxrMne3239ZK1G",
    "priceId": "price_1TxvdRFVMqGo2msFpaYLvOGv",
    "name": "Cassette 4 voies — Entretien préventif",
    "price": 180,
    "category": "preventive"
  },
  "preventive-console": {
    "productId": "prod_UxrMq5cGgSTiI0",
    "priceId": "price_1TxvdSFVMqGo2msF3aBwOpU6",
    "name": "Console basse — Entretien préventif",
    "price": 154,
    "category": "preventive"
  },
  "curative-split": {
    "productId": "prod_UxrMs7ZR4Jjbtl",
    "priceId": "price_1TxvdSFVMqGo2msFQ712JGWL",
    "name": "Split mural — Entretien curatif +++",
    "price": 192,
    "category": "curative"
  },
  "curative-gainable": {
    "productId": "prod_UxrM577wXLXkOl",
    "priceId": "price_1TxvdTFVMqGo2msFuQWRnBu6",
    "name": "Gainable / Plénum — Entretien curatif +++",
    "price": 260,
    "category": "curative"
  },
  "curative-cassette": {
    "productId": "prod_UxrMizt9xA4o3X",
    "priceId": "price_1TxvdTFVMqGo2msFIxQCxh4d",
    "name": "Cassette 4 voies — Entretien curatif +++",
    "price": 220,
    "category": "curative"
  },
  "curative-console": {
    "productId": "prod_UxrM659OAWaXaS",
    "priceId": "price_1TxvdTFVMqGo2msFMn7rwpzu",
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
