// ⚠️ FICHIER AUTO-GÉNÉRÉ — ne pas modifier manuellement
// Généré le 27/07/2026 par scripts/sync-clean-stripe-catalog.mjs
// Mode: LIVE

export const STRIPE_CATALOG = {
  "devis": {
    "productId": "prod_UxrOn4dH3uMLNk",
    "priceId": "price_1TxvfIFVMqGo2msFqrNR59lV",
    "name": "Étude & Devis d'installation",
    "price": 0,
    "category": "depannage"
  },
  "diagnostic": {
    "productId": "prod_UxrOY65tp0yQ7H",
    "priceId": "price_1TxvfIFVMqGo2msFTsMn2nBa",
    "name": "Diagnostic & Rapport de panne",
    "price": 100,
    "category": "depannage"
  },
  "preventive-split": {
    "productId": "prod_UxrOco17TRYzIS",
    "priceId": "price_1TxvfJFVMqGo2msFKnGzBwfB",
    "name": "Entretien climatisation préventif (Mono-split)",
    "price": 156,
    "category": "clim"
  },
  "curative-split": {
    "productId": "prod_UxrOvDTIfrYDuk",
    "priceId": "price_1TxvfJFVMqGo2msFqoLYZSOr",
    "name": "Entretien climatisation Curatif +++ (Vapeur 100°C)",
    "price": 192,
    "category": "clim"
  },
  "double-split": {
    "productId": "prod_UxrOGByEux8SgU",
    "priceId": "price_1TxvfKFVMqGo2msFBvV4epRo",
    "name": "Forfait Double-split Entretien de climatisation",
    "price": 270,
    "category": "clim"
  },
  "tri-split": {
    "productId": "prod_UxrOQjluFf6agJ",
    "priceId": "price_1TxvfKFVMqGo2msFz3JZ1pGJ",
    "name": "Forfait Tri-split Entretien de climatisation",
    "price": 380,
    "category": "clim"
  },
  "preventive-gainable": {
    "productId": "prod_UxrOMlXmfvycoI",
    "priceId": "price_1TxvfKFVMqGo2msFGvQ33BKA",
    "name": "Entretien de climatisation gainable",
    "price": 220,
    "category": "clim"
  },
  "preventive-console": {
    "productId": "prod_UxrONeannO5t2h",
    "priceId": "price_1TxvfLFVMqGo2msFa6BMx2PL",
    "name": "Entretien de climatisation console basse",
    "price": 154,
    "category": "clim"
  },
  "preventive-cassette": {
    "productId": "prod_UxrOpcEeFZ9vK4",
    "priceId": "price_1TxvfLFVMqGo2msF6baF89RX",
    "name": "Entretien de climatisation cassette 4 voies",
    "price": 180,
    "category": "clim"
  },
  "vrv": {
    "productId": "prod_UxrO8BIkIEE6Ic",
    "priceId": "price_1TxvfMFVMqGo2msFWT01opAn",
    "name": "Entretien Système VRV / DRV (Tertiaire)",
    "price": 0,
    "category": "clim"
  },
  "thermodynamique": {
    "productId": "prod_UxrOMTmx2Lres9",
    "priceId": "price_1TxvfMFVMqGo2msF4r4FOAbf",
    "name": "Entretien ballon thermodynamique",
    "price": 174,
    "category": "pac"
  },
  "pac-air-eau": {
    "productId": "prod_UxrONTWXZ9GHV7",
    "priceId": "price_1TxvfNFVMqGo2msFMYnMY622",
    "name": "Entretien Pompe à Chaleur Air/Eau",
    "price": 270,
    "category": "pac"
  },
  "curative-gainable": {
    "productId": "prod_UxrOSLOh5xSSJy",
    "priceId": "price_1TxvfNFVMqGo2msFWtaJYKi0",
    "name": "Gainable / Plénum — Entretien curatif +++",
    "price": 260,
    "category": "curative"
  },
  "curative-cassette": {
    "productId": "prod_UxrOGOzZbtQUKF",
    "priceId": "price_1TxvfOFVMqGo2msFxhuoMt8j",
    "name": "Cassette 4 voies — Entretien curatif +++",
    "price": 220,
    "category": "curative"
  },
  "curative-console": {
    "productId": "prod_UxrOjlHvwzggHN",
    "priceId": "price_1TxvfOFVMqGo2msFd7bTMQOh",
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
