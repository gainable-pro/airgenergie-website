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
  "mas-blanc-des-alpilles", "saint-pierre-de-mezoargues", "ensues-la-redonne", "le-rove"
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
