export const CITIES_SLUGS = [
  // Cœur de cible absolu (Rayon Miramas 40-50km)
  "miramas", "salon-de-provence", "istres", "entressen", "grans", "cornillon-confoux", 
  "martigues", "port-de-bouc", "fos-sur-mer", "chateauneuf-les-martigues", "saint-chamas", 
  "pelissanne", "lancon-provence", "la-fare-les-oliviers", "rognac", "vitrolles", "marignane",

  // Autres villes des Bouches-du-Rhône
  "marseille", "aix-en-provence", "arles", "aubagne", "la-ciotat", "les-pennes-mirabeau", 
  "allauch", "gardanne", "chateaurenard", "tarascon", "bouc-bel-air", "berre-l-etang", 
  "saint-martin-de-crau", "auriol", "plan-de-cuques", "septemes-les-vallons", "trets", 
  "cassis", "roquefort-la-bedoule", "carnoux-en-provence", "gemenos", "venelles", 
  "saint-remy-de-provence", "lambesc", "cabries", "velaux", "sausset-les-pins", "eyguieres", 
  "mallemort", "senas", "carry-le-rouet", "port-saint-louis-du-rhone", "eguilles", 
  "la-destrousse", "la-bouilladisse", "roquevaire", "peypin", "greasque", "meyreuil", 
  "fuveau", "rousset", "peynier", "chateauneuf-le-rouge", "meyrargues", "peyrolles-en-provence", 
  "jouques", "saint-paul-les-durance", "le-puy-sainte-reparade", "saint-esteve-janson", 
  "la-roque-d-antheron", "charleval", "alleins", "lamanon", "aurons", "vernegues", 
  "la-barben", "coudoux", "ventabren", "saint-cannat", "ceyreste", "cuges-les-pins", 
  "belcodene", "cadolive", "saint-savournin", "mimet", "simiane-collongue", "barbenthane", 
  "boulbon", "cabannes", "eyragues", "graveson", "maillane", "mouries", "noves", "orgon", 
  "plan-d-orgon", "fontvieille", "les-baux-de-provence", "maussane-les-alpilles", 
  "le-paradou", "eygalieres", "molleges", "saint-andiol", "verquieres", "saint-etienne-du-gres", 
  "mas-blanc-des-alpilles", "saint-pierre-de-mezoargues", "ensues-la-redonne", "le-rove",
  "la-grande-motte"
];

// ────────────────────────────────────────────────────────────────────────────
// Villes pour la réservation (rayon ~50 km autour de Miramas)
// Utilisé pour les prestations d'entretien, dépannage, installation
// ────────────────────────────────────────────────────────────────────────────
export const BOOKING_CITIES_50KM = [
  // Miramas et communes limitrophes directes
  { slug: "miramas", label: "Miramas" },
  { slug: "istres", label: "Istres" },
  { slug: "grans", label: "Grans" },
  { slug: "entressen", label: "Entressen" },
  { slug: "cornillon-confoux", label: "Cornillon-Confoux" },
  { slug: "saint-chamas", label: "Saint-Chamas" },
  { slug: "fos-sur-mer", label: "Fos-sur-Mer" },
  { slug: "port-de-bouc", label: "Port-de-Bouc" },
  { slug: "martigues", label: "Martigues" },
  { slug: "chateauneuf-les-martigues", label: "Châteauneuf-les-Martigues" },
  { slug: "berre-l-etang", label: "Berre-l'Étang" },
  { slug: "rognac", label: "Rognac" },
  { slug: "vitrolles", label: "Vitrolles" },
  { slug: "marignane", label: "Marignane" },
  { slug: "la-fare-les-oliviers", label: "La Fare-les-Oliviers" },
  { slug: "lancon-provence", label: "Lançon-de-Provence" },
  { slug: "pelissanne", label: "Pélissanne" },
  { slug: "salon-de-provence", label: "Salon-de-Provence" },
  // Alpilles / Crau
  { slug: "saint-martin-de-crau", label: "Saint-Martin-de-Crau" },
  { slug: "arles", label: "Arles" },
  { slug: "port-saint-louis-du-rhone", label: "Port-Saint-Louis-du-Rhône" },
  { slug: "saint-remy-de-provence", label: "Saint-Rémy-de-Provence" },
  { slug: "tarascon", label: "Tarascon" },
  { slug: "fontvieille", label: "Fontvieille" },
  { slug: "mouries", label: "Mouriès" },
  { slug: "eygalieres", label: "Eygalières" },
  { slug: "les-baux-de-provence", label: "Les Baux-de-Provence" },
  { slug: "maussane-les-alpilles", label: "Maussane-les-Alpilles" },
  { slug: "eyguieres", label: "Eyguières" },
  { slug: "lamanon", label: "Lamanon" },
  { slug: "mallemort", label: "Mallemort" },
  { slug: "alleins", label: "Alleins" },
  { slug: "vernegues", label: "Vernègues" },
  // Étang de Berre / Marseille nord
  { slug: "les-pennes-mirabeau", label: "Les Pennes-Mirabeau" },
  { slug: "septemes-les-vallons", label: "Septèmes-les-Vallons" },
  { slug: "cabries", label: "Cabriès" },
  { slug: "velaux", label: "Velaux" },
  { slug: "coudoux", label: "Coudoux" },
  { slug: "ventabren", label: "Ventabren" },
  { slug: "eguilles", label: "Éguilles" },
  // Aix-en-Provence / pays d'Aix
  { slug: "aix-en-provence", label: "Aix-en-Provence" },
  { slug: "lambesc", label: "Lambesc" },
  { slug: "saint-cannat", label: "Saint-Cannat" },
  { slug: "la-roque-d-antheron", label: "La Roque-d'Anthéron" },
  { slug: "charleval", label: "Charleval" },
  { slug: "gardanne", label: "Gardanne" },
  { slug: "bouc-bel-air", label: "Bouc-Bel-Air" },
  // Marseille
  { slug: "marseille", label: "Marseille" },
  { slug: "sausset-les-pins", label: "Sausset-les-Pins" },
  { slug: "carry-le-rouet", label: "Carry-le-Rouet" },
  { slug: "ensues-la-redonne", label: "Ensuès-la-Redonne" },
];

// ────────────────────────────────────────────────────────────────────────────
// Villes pour devis & diagnostic (rayon ~100 km autour de Miramas)
// ────────────────────────────────────────────────────────────────────────────
export const BOOKING_CITIES_100KM = [
  ...BOOKING_CITIES_50KM,
  // Var (ouest)
  { slug: "toulon", label: "Toulon" },
  { slug: "hyeres", label: "Hyères" },
  { slug: "la-seyne-sur-mer", label: "La Seyne-sur-Mer" },
  { slug: "six-fours-les-plages", label: "Six-Fours-les-Plages" },
  { slug: "sanary-sur-mer", label: "Sanary-sur-Mer" },
  { slug: "bandol", label: "Bandol" },
  { slug: "la-ciotat", label: "La Ciotat" },
  { slug: "cassis", label: "Cassis" },
  { slug: "aubagne", label: "Aubagne" },
  // Gard / Nîmes
  { slug: "nimes", label: "Nîmes" },
  { slug: "saint-gilles", label: "Saint-Gilles" },
  { slug: "vauvert", label: "Vauvert" },
  { slug: "beaucaire", label: "Beaucaire" },
  // Vaucluse / Avignon
  { slug: "avignon", label: "Avignon" },
  { slug: "chateaurenard", label: "Châteaurenard" },
  { slug: "barbentane", label: "Barbentane" },
  { slug: "graveson", label: "Graveson" },
  { slug: "noves", label: "Noves" },
  { slug: "orgon", label: "Orgon" },
  { slug: "pertuis", label: "Pertuis" },
  { slug: "manosque", label: "Manosque" },
];

export const SERVICES_SLUGS = [
  "climatisation",
  "pompe-a-chaleur",
  "gainable",
  "entretien",
  "drv-cta"
];

export function unslugify(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => {
      // Special cases
      if (word === 'les') return 'les';
      if (word === 'de') return 'de';
      if (word === 'sur') return 'sur';
      if (word === 'en') return 'en';
      if (word === 'l') return "l'";
      if (word === 'd') return "d'";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace("l' ", "l'")
    .replace("d' ", "d'");
}

export function formatServiceName(slug: string): string {
  switch (slug) {
    case 'climatisation': return 'Climatisation Réversible';
    case 'pompe-a-chaleur': return 'Pompe à Chaleur (PAC)';
    case 'gainable': return 'Climatisation Gainable';
    case 'entretien': return 'Entretien & Dépannage CVC';
    case 'drv-cta': return 'DRV, VRV & CTA Industriel';
    default: return unslugify(slug);
  }
}
