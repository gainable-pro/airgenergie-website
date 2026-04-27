import { unslugify, formatServiceName } from './seo-data';

export interface SeoSpintax {
  heroTitle: string;
  heroSubtitle: string;
  geoContext: string;
  trustCallout: string;
  benefits: string[];
}

// Simple hash function to deterministically select variations based on city + service
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

const HERO_SUBTITLES = [
  "L'expertise {service} au service de votre confort thermique à {city}.",
  "Votre installateur certifié RGE spécialisé en {service} intervenant sur {city}.",
  "Des solutions sur-mesure en {service} pour les particuliers et professionnels à {city}.",
  "La garantie d'une installation parfaite de votre {service} dans la région de {city}.",
  "Faites confiance à notre savoir-faire local pour votre projet de {service} à {city}."
];

const GEO_CONTEXTS = [
  "Basés près de chez vous, nous déployons nos équipes techniques sur {city} et dans un rayon de 40 km pour assurer l'installation, le dépannage et la maintenance de vos systèmes de {service}.",
  "En tant qu'experts régionaux, nous maîtrisons parfaitement les spécificités climatiques de {city}. C'est pourquoi nous recommandons des solutions de {service} adaptées pour garantir des économies d'énergie optimales.",
  "La réactivité est au cœur de notre métier. Pour toute demande concernant votre {service} sur le secteur de {city}, nos techniciens qualifiés interviennent rapidement avec un équipement de pointe.",
  "Votre projet de {service} à {city} mérite un accompagnement professionnel de A à Z. De l'étude thermique préalable jusqu'à la mise en service, Air G Énergie est votre partenaire de confiance."
];

const TRUST_CALLOUTS = [
  "Une urgence ou un projet de {service} sur {city} ?",
  "Demandez votre devis gratuit à {city} aujourd'hui",
  "Besoin d'un chauffagiste frigoriste certifié à {city} ?",
  "Faites évaluer votre installation énergétique à {city}"
];

const BENEFITS = [
  [
    "Bilan thermique offert avant toute installation",
    "Certification RGE QualiPAC",
    "Garantie décennale et matériel grandes marques (Daikin, Mitsubishi...)",
    "Contrats de maintenance personnalisés"
  ],
  [
    "Déplacement et devis gratuit sur {city}",
    "Aides financières de l'État déduites (MaPrimeRénov')",
    "SAV réactif et dépannage multi-marques",
    "Financement et facilités de paiement"
  ],
  [
    "Étude sur-mesure de vos besoins énergétiques",
    "Intervention propre et respectueuse des délais",
    "Techniciens qualifiés manipulation fluides frigorigènes",
    "Optimisation de votre consommation électrique"
  ]
];

export function getSeoVariations(villeSlug: string, serviceSlug: string): SeoSpintax {
  const seed = `${villeSlug}-${serviceSlug}`;
  const h = hashString(seed);

  const cityName = unslugify(villeSlug);
  const serviceName = formatServiceName(serviceSlug);

  const subtitleTemplate = HERO_SUBTITLES[h % HERO_SUBTITLES.length];
  const contextTemplate = GEO_CONTEXTS[(h + 1) % GEO_CONTEXTS.length];
  const calloutTemplate = TRUST_CALLOUTS[(h + 2) % TRUST_CALLOUTS.length];
  const benefitsSet = BENEFITS[(h + 3) % BENEFITS.length];

  const formatText = (text: string) => {
    return text
      .replace(/{city}/g, cityName)
      .replace(/{service}/g, serviceName.toLowerCase());
  };

  return {
    heroTitle: `${serviceName} à ${cityName}`,
    heroSubtitle: formatText(subtitleTemplate),
    geoContext: formatText(contextTemplate),
    trustCallout: formatText(calloutTemplate),
    benefits: benefitsSet.map(b => formatText(b)),
  };
}
