// This file simulates a database or CMS content for the city pages.
// Using a generator pattern to efficiently manage 30+ cities.

export interface CityContent {
    slug: string;
    name: string;
    metaTitle: string;
    metaDesc: string;
    h1: string;
    intro: string;
    heroImage: string;

    // Dynamic Images per section
    img_install: string;
    img_reversible: string;
    img_gainable: string;
    img_maintenance: string;

    h2_install: string;
    txt_install: string;
    h2_reversible: string;
    txt_reversible: string;
    h2_gainable: string;
    txt_gainable: string;
    h2_maintenance: string;
    txt_maintenance: string;
    h2_why_us: string;
    txt_why_us: string;
    h2_cta: string;
    faq: { q: string; a: string }[];
}

interface CityConfig {
    name: string;
    slug: string;
    zip: string;
    dist: string;
    quartiers: string;
    angle: string;
    isAirSalin?: boolean;
}

// Global Hero Images
const heroImages = [
    "/images/hero-technician-ac.png",
    "/images/hero-maintenance.png",
    "/images/city-install/img-1.jpg",
    "/images/city-install/img-2.jpg",
    "/images/city-install/img-3.jpg",
];

// Installation Section Images (Outdoor units, Tools, Technicians)
const installImages = [
    "/images/city-install/img-1.jpg",
    "/images/city-install/img-2.jpg",
    "/images/city-install/img-3.jpg",
    "/images/city-install/img-4.jpg",
];

// Gainable Section Images (Vents, Attics, Finished Ceilings)
const gainableImages = [
    "/images/city-gainable/img-1.jpg",
    "/images/city-gainable/img-2.png",
    "/images/city-gainable/img-3.jpg",
    "/images/city-gainable/img-4.jpg",
];

// Reversible Section Images (Comfort, Savings, Thermostats)
const reversibleImages = [
    "/images/city-reversible/img-1.jpg", // Radiator/Money (renamed in logic if needed, ensuring match)
    "/images/city-reversible/img-2.jpg", // Thermostat
    "/images/city-reversible/img-3.jpg", // Living room
    "/images/city-reversible/img-1.png", // Verify extension match
    "/images/city-reversible/img-2.png",
    "/images/city-reversible/img-6.png",
    "/images/city-reversible/img-7.png",
    "/images/city-reversible/img-8.jpg",
    "/images/city-reversible/img-9.jpg",
];

// Maintenance Section Images (Cleaning, Filters)
const maintenanceImages = [
    "/images/city-maintenance/img-1.png",
    "/images/city-maintenance/img-2.png",
    "/images/city-maintenance/img-3.png",
    "/images/city-maintenance/img-4.png",
    "/images/city-maintenance/img-5.png",
];

// Configuration for generated cities (Tier 1, 2, 3)
const citiesList: CityConfig[] = [
    // TIER 1 (Proche & Gros volume)
    { name: "Martigues", slug: "martigues", zip: "13500", dist: "25 min", quartiers: "Jonquières, Ferrières, L'Île, Croix-Sainte", angle: "la Venise Provençale et ses spécificités balnéaires", isAirSalin: true },
    { name: "Vitrolles", slug: "vitrolles", zip: "13127", dist: "20 min", quartiers: "Les Pins, Le Liourat, Le Griffon, Zone Industrielle", angle: "une ville dynamique entre aéroport et plateau", isAirSalin: false },
    { name: "Grans", slug: "grans", zip: "13450", dist: "10 min", quartiers: "Le Village, Les Coussouls", angle: "ce village provençal au charme authentique", isAirSalin: false },
    { name: "La Fare-les-Oliviers", slug: "la-fare-les-oliviers", zip: "13580", dist: "15 min", quartiers: "Le Village, Les Cadeneaux", angle: "cette commune résidentielle au cœur des oliviers", isAirSalin: false },
    { name: "Lançon-Provence", slug: "lancon-provence", zip: "13680", dist: "15 min", quartiers: "Le Village, Val de Sibourg", angle: "ce village perché dominant la Provence", isAirSalin: false },

    // TIER 2 (Marseille Ouest & Alentours)
    { name: "Aix-en-Provence", slug: "aix-en-provence", zip: "13100", dist: "35 min", quartiers: "Centre-Ville, Les Milles, Puyricard, La Duranne", angle: "cette ville d'eau et d'art aux nombreuses bastides", isAirSalin: false },
    { name: "Marseille", slug: "marseille", zip: "13000", dist: "40 min", quartiers: "l'Estaque, Saint-Antoine, Les Aygalades (Quartiers Nord/Ouest)", angle: "la cité phocéenne et ses exigences urbaines", isAirSalin: true },
    { name: "Aubagne", slug: "aubagne", zip: "13400", dist: "45 min", quartiers: "Le centre, Beaudinard, Les Passons", angle: "le pays de Pagnol et son climat intérieur", isAirSalin: false },
    { name: "Arles", slug: "arles", zip: "13200", dist: "35 min", quartiers: "Trinquetaille, Barriol, Le centre historique", angle: "cette ville d'art et d'histoire aux portes de la Camargue", isAirSalin: false },
    { name: "Cassis", slug: "cassis", zip: "13260", dist: "50 min", quartiers: "Le port, Le Bestouan, Les hauts", angle: "ce joyau du littoral et ses villas d'exception", isAirSalin: true },
    { name: "Carry-le-Rouet", slug: "carry-le-rouet", zip: "13620", dist: "30 min", quartiers: "Le port, Sausset, Le Rouet", angle: "la perle de la Côte Bleue", isAirSalin: true },

    // TIER 3 (Complétion Maillage)
    { name: "Berre-l'Étang", slug: "berre-l-etang", zip: "13130", dist: "15 min", quartiers: "Le centre, Mauran, Saint-Estève", angle: "les rives de l'étang et son micro-climat", isAirSalin: true },
    { name: "Bouc-Bel-Air", slug: "bouc-bel-air", zip: "13320", dist: "30 min", quartiers: "La Malle, Les Terres Blanches", angle: "cette zone résidentielle prisée entre Aix et Marseille", isAirSalin: false },
    { name: "Châteauneuf-les-Martigues", slug: "chateauneuf-les-martigues", zip: "13220", dist: "20 min", quartiers: "La Mède, Le centre", angle: "entre étang et collines", isAirSalin: true },
    { name: "Cornillon-Confoux", slug: "cornillon-confoux", zip: "13250", dist: "12 min", quartiers: "Le village perché", angle: "ce village authentique avec vue panoramique", isAirSalin: false },
    { name: "Éguilles", slug: "eguilles", zip: "13510", dist: "35 min", quartiers: "Le village, Les Figons", angle: "ce village résidentiel chic proche d'Aix", isAirSalin: false },
    { name: "Fos-sur-Mer", slug: "fos-sur-mer", zip: "13270", dist: "25 min", quartiers: "La plage, Le centre, Les Carabins", angle: "cette ville industrielle et balnéaire", isAirSalin: true },
    { name: "Gardanne", slug: "gardanne", zip: "13120", dist: "40 min", quartiers: "Biver, Le centre", angle: "le bassin minier en pleine mutation", isAirSalin: false },
    { name: "Gignac-la-Nerthe", slug: "gignac-la-nerthe", zip: "13180", dist: "20 min", quartiers: "Laure, Le centre", angle: "cette commune pavillonnaire dynamique", isAirSalin: false },
    { name: "Les Pennes-Mirabeau", slug: "les-pennes-mirabeau", zip: "13170", dist: "25 min", quartiers: "Plan de Campagne, Les Cadeneaux, La Gavotte", angle: "ce carrefour stratégique aux portes de Marseille", isAirSalin: false },
    { name: "Lambesc", slug: "lambesc", zip: "13410", dist: "20 min", quartiers: "Le centre historique", angle: "la cité des festivals au cœur de la Provence", isAirSalin: false },
    { name: "Mallemort", slug: "mallemort", zip: "13370", dist: "18 min", quartiers: "Pont Royal, Le village", angle: "les bords de Durance et le golf", isAirSalin: false },
    { name: "Marignane", slug: "marignane", zip: "13700", dist: "25 min", quartiers: "Le Jaï, Saint-Pierre, Le centre", angle: "la cité aéroportuaire et son étang", isAirSalin: true },
    { name: "Miramas-le-Vieux", slug: "miramas-le-vieux", zip: "13140", dist: "5 min", quartiers: "Le village médiéval", angle: "ce joyau historique perché", isAirSalin: false },
    { name: "Pélissanne", slug: "pelissanne", zip: "13330", dist: "12 min", quartiers: "Le centre ancien, Les Enjouvènes", angle: "ce village typique au pied des collines", isAirSalin: false },
    { name: "Plan-de-Cuques", slug: "plan-de-cuques", zip: "13380", dist: "35 min", quartiers: "Le centre, Les collines", angle: "le balcon vert de Marseille", isAirSalin: false },
    { name: "Port-de-Bouc", slug: "port-de-bouc", zip: "13110", dist: "25 min", quartiers: "La Lèque, Le port", angle: "cette ville tournée vers la mer et l'industrie", isAirSalin: true },
    { name: "Port-Saint-Louis-du-Rhône", slug: "port-saint-louis-du-rhone", zip: "13230", dist: "40 min", quartiers: "Le Faubourg, La plage", angle: "le bout du monde camarguais", isAirSalin: true },
    { name: "Rognac", slug: "rognac", zip: "13340", dist: "15 min", quartiers: "Les Barjaquets, Le centre", angle: "entre colline et étang", isAirSalin: false },
    { name: "Saint-Martin-de-Crau", slug: "saint-martin-de-crau", zip: "13310", dist: "35 min", quartiers: "Caphan, Le centre", angle: "au cœur de la plaine de la Crau", isAirSalin: false },
    { name: "Septèmes-les-Vallons", slug: "septemes-les-vallons", zip: "13240", dist: "30 min", quartiers: "Notre-Dame limite, Le vallon", angle: "cette commune limitrophe de Marseille", isAirSalin: false },
    { name: "Salon-de-Provence", slug: "salon-de-provence", zip: "13300", dist: "10 min", quartiers: "Michelet, Les Canourgues, Centre-ville", angle: "la cité de Nostradamus", isAirSalin: false },
    { name: "Allauch", slug: "allauch", zip: "13190", dist: "40 min", quartiers: "Le Logis-Neuf, La Pounche", angle: "ce village provençal aux portes de la ville", isAirSalin: false },
    { name: "Saint-Chamas", slug: "saint-chamas", zip: "13250", dist: "15 min", quartiers: "Le Delà, Le Centre, Les Mololières", angle: "le village bordé par l'étang de Berre", isAirSalin: true },
    { name: "Fontvieille", slug: "fontvieille", zip: "13990", dist: "35 min", quartiers: "Le centre, Les Alpilles", angle: "ce village historique rendu célèbre par Alphonse Daudet", isAirSalin: false },
    { name: "Velaux", slug: "velaux", zip: "13880", dist: "20 min", quartiers: "Le village, Les Quatre Vents", angle: "cette commune résidentielle de la vallée de l'Arc", isAirSalin: false },
    { name: "Sénas", slug: "senas", zip: "13560", dist: "20 min", quartiers: "Le village, La Cabre", angle: "cette commune maraîchère des Alpilles", isAirSalin: false },
    { name: "La Grande-Motte", slug: "la-grande-motte", zip: "34280", dist: "60 min", quartiers: "Le port, Point Zéro", angle: "cette célèbre station balnéaire de l'Hérault", isAirSalin: true },
    { name: "Cabannes", slug: "cabannes", zip: "13440", dist: "35 min", quartiers: "Le village", angle: "ce charmant village au bord de la Durance", isAirSalin: false },
    { name: "Mouriès", slug: "mouries", zip: "13890", dist: "25 min", quartiers: "Le village", angle: "la capitale de l'huile d'olive en Provence", isAirSalin: false },
    { name: "Eygalières", slug: "eygalieres", zip: "13810", dist: "30 min", quartiers: "Le village", angle: "ce magnifique village des Alpilles", isAirSalin: false }
];

// Helper to generate content with variations (Spintax-like)
const generateCityContent = (config: CityConfig, index: number): CityContent => {
    const airSalinText = config.isAirSalin
        ? "L'air marin et la salinité de notre secteur nécessitent des équipements robustes et un entretien spécifique que nous maîtrisons parfaitement."
        : "Le climat sec et aussi chaud de notre secteur impose des installations performantes pour garantir votre confort estival.";

    const specificHeroImages: Record<string, string> = {
        "aix-en-provence": "/images/aix-cours-mirabeau.png",
        "salon-de-provence": "/images/salon-fontaine-moussue.png",
        "martigues": "/images/martigues-miroir-oiseaux.png",
        "marseille": "/images/marseille-vieux-port.png",
        "arles": "/images/arles-arenes.png",
    };

    const heroImage = specificHeroImages[config.slug] || heroImages[index % heroImages.length];
    const img_install = installImages[index % installImages.length];
    const img_gainable = gainableImages[(index + 1) % gainableImages.length];
    const img_reversible = reversibleImages[(index + 2) % reversibleImages.length];
    const img_maintenance = maintenanceImages[(index + 3) % maintenanceImages.length];

    // VARIATION LOGIC (Deterministic based on index)
    const variation = index % 3; // 0, 1, or 2

    // 1. INTRO VARIATIONS
    let intro = "";
    if (variation === 0) {
        intro = `Air G Énergie intervient quotidiennement à ${config.name} et dans ses quartiers comme ${config.quartiers}. Basés à Miramas, nous sommes à seulement ${config.dist} de chez vous, ce qui nous permet une réactivité exceptionnelle pour l'installation, l'entretien et le dépannage de votre climatisation. Nous connaissons parfaitement ${config.angle}, et adaptons nos solutions techniques à l'architecture locale.`;
    } else if (variation === 1) {
        intro = `Vous habitez à ${config.name} ou ses environs (${config.quartiers}) ? Air G Énergie est votre partenaire local privilégié. Notre proximité géographique (${config.dist} de trajet) nous permet d'assurer des interventions rapides et efficaces. Spécialistes du confort thermique en Provence, nous comprenons les défis posés par ${config.angle} et vous proposons des installations durables et économes.`;
    } else {
        intro = `Pour tous vos projets de climatisation à ${config.name}, faites confiance à une expertise locale et certifiée. Que vous résidiez vers ${config.quartiers.split(',')[0]} ou dans le centre, notre équipe se déplace en moins de ${config.dist}. Nous avons développé une connaissance fine de ${config.angle}, nous permettant de conseiller le matériel le plus adapté à votre typologie d'habitation.`;
    }

    // 2. WHY US VARIATIONS
    let txt_why_us = "";
    if (variation === 0) {
        txt_why_us = `Choisir Air G Énergie, c'est choisir un artisan local certifié RGE QualiPAC, proche de vous et de vos préoccupations. Contrairement aux grandes plateformes nationales, nous assurons nous-mêmes le suivi de A à Z, de la visite technique à la mise en service et au SAV. Notre garantie décennale couvre tous nos travaux. Nous vous accompagnons également pour l'obtention des aides financières (MaPrimeRénov', CEE) pour vos travaux à ${config.name}.`;
    } else if (variation === 1) {
        txt_why_us = `Pourquoi nous faire confiance pour votre chantier à ${config.name} ? Parce que nous sommes une entreprise familiale, RGE et locale. Pas de sous-traitance opaque : nos techniciens qualifiés prennent soin de votre intérieur. Nous offrons le sérieux d'une garantie décennale couplé à la souplesse d'un artisan de proximité. De plus, nous gérons pour vous les dossiers d'aides de l'État pour alléger votre facture.`;
    } else {
        txt_why_us = `La force d'Air G Énergie à ${config.name}, c'est l'alliance de la compétence technique et de la proximité humaine. Certifiés RGE QualiPAC, nous vous garantissons des installations conformes aux normes les plus strictes. Nous sommes fiers de notre réputation locale et de notre capacité à accompagner nos clients de ${config.name} sur le long terme, du conseil initial jusqu'à l'entretien annuel, avec toutes les garanties requises.`;
    }

    // 3. INSTALLATION VARIATIONS (Simple structure changes)
    let txt_install = "";
    if (variation === 0) {
        txt_install = `Que vous habitiez une villa récente, un appartement en centre-ville ou une maison traditionnelle à ${config.name}, nous avons la solution adaptée. Nos techniciens réalisent une étude thermique précise pour dimensionner votre installation. Nous posons des systèmes split (muraux), consoles ou cassettes, en privilégiant l'esthétique et le silence. ${airSalinText} Nous travaillons avec les marques leaders (Daikin, Mitsubishi, Toshiba) pour vous garantir fiabilité et économies d'énergie.`;
    } else {
        txt_install = `À ${config.name}, chaque logement est unique. C'est pourquoi nous commençons toujours par un bilan thermique complet de votre habitation (villa, appartement, ancien). Nous installons des gammes performantes (Split, Console) sélectionnées chez les meilleurs fabricants comme Daikin ou Mitsubishi. ${airSalinText} L'objectif : un confort immédiat et une intégration visuelle soignée.`;
    }

    return {
        slug: config.slug,
        name: config.name,
        metaTitle: `Climatisation à ${config.name} (${config.zip}) – Installation & Dépannage | Air G Énergie`,
        metaDesc: `Installateur climatisation à ${config.name} : ${config.quartiers}. Intervention rapide (${config.dist}), devis gratuit. ✓ RGE ✓ Décennale. Spécialiste local.`,
        h1: `Votre Installateur de Climatisation à ${config.name}`,
        intro,
        heroImage,
        img_install,
        img_reversible,
        img_gainable,
        img_maintenance,
        h2_install: `Installation de Climatisation à ${config.name}`,
        txt_install,
        h2_reversible: `Pompe à Chaleur Air-Air : Idéal pour ${config.name}`,
        txt_reversible: `Optez pour une climatisation réversible (pompe à chaleur air-air) pour chauffer et rafraîchir votre logement à ${config.name}. Ce système 2-en-1 est particulièrement rentable dans notre région : il divise par 3 votre facture de chauffage en hiver tout en assurant une fraîcheur parfaite lors des canicules estivales. C'est la solution de rénovation énergétique préférée des habitants de ${config.name} pour gagner en confort thermique toute l'année.`,
        h2_gainable: `Climatisation Gainable à ${config.name}`,
        txt_gainable: `Pour les maisons individuelles à ${config.name}, notamment dans les quartiers résidentiels comme ${config.quartiers.split(',')[0]}, le gainable est la solution premium. Invisible (caché dans les combles), silencieux et performant, il diffuse l'air via des grilles discrètes. Couplé à un système de régulation par zone (Airzone), il permet de choisir la température dans chaque pièce indépendamment.`,
        h2_maintenance: `Entretien et Dépannage à ${config.name}`,
        txt_maintenance: `Une panne en plein été ? Notre proximité (${config.dist}) nous permet d'intervenir en urgence à ${config.name}. Nous proposons également des contrats d'entretien annuel pour pérenniser votre matériel, assainir l'air intérieur et prévenir les pannes. Un entretien régulier est indispensable pour maintenir les performances énergétiques de votre climatisation.`,
        h2_why_us: `Pourquoi choisir Air G Énergie à ${config.name} ?`,
        txt_why_us,
        h2_cta: `Devis Climatisation Gratuit à ${config.name}`,
        faq: [
            { q: `Intervenez-vous dans tous les quartiers de ${config.name} ?`, a: `Oui, nous couvrons l'intégralité de ${config.name} (${config.zip}) ainsi que les communes limitrophes. Notre équipe se déplace quotidiennement dans des quartiers comme ${config.quartiers}.` },
            { q: `Quel est le délai d'intervention à ${config.name} ?`, a: `Étant basés à proximité (${config.dist}), nous pouvons intervenir pour un devis sous 24/48h et pour un dépannage urgent dans la journée selon disponibilité.` },
            { q: `Vos installations à ${config.name} sont-elles éligibles aux aides ?`, a: `Absolument. En tant qu'entreprise RGE, nos installations de pompes à chaleur air-air (climatisation réversible) à ${config.name} sont éligibles aux primes CEE et à la TVA réduite sous conditions.` },
            { q: `Faites-vous l'entretien des clims non installées par vous à ${config.name} ?`, a: `Oui, nous assurons la maintenance et le dépannage de toutes marques de climatisation à ${config.name}, quelle que soit l'entreprise installatrice d'origine.` },
            { q: `Quel budget pour une clim posée à ${config.name} ?`, a: `Comptez entre 1500€ et 3000€ pour un mono-split, et à partir de 4000€ pour un multi-split ou gainable, selon la complexité. Nous réalisons des devis gratuits et fermes après visite technique à ${config.name}.` },
            { q: `L'air marin de ${config.name} abîme-t-il les climatisations ?`, a: config.isAirSalin ? `Oui, c'est un facteur réel. Nous installons des unités extérieures traitées anticorrosion "Blue Fin" ou équivalent pour résister à l'environnement salin de ${config.name}.` : `Non, ${config.name} est assez éloigné du bord de mer direct pour ne pas subir de corrosion accélérée majeure, mais nous privilégions tout de même du matériel résistant.` },
            { q: `Quelle marque de climatisation conseillez-vous à ${config.name} ?`, a: `Nous recommandons Daikin, Mitsubishi Electric et Toshiba pour leur fiabilité exceptionnelle et leur SAV performant, parfaitement adaptés au climat exigeant de ${config.name}.` }
        ]
    };
};

/* ==========================================
   MANUAL OVERRIDES FOR PILLAR CITIES (Tier 1)
   ========================================== */

const miramasData: CityContent = {
    slug: "miramas",
    name: "Miramas",
    metaTitle: "Climatisation à Miramas (13140) – Installation & Dépannage Rapide | Air G Énergie",
    metaDesc: "Installateur climatisation à Miramas : Gare, Mercure, Vieux-Miramas. Entreprise locale, intervention rapide, devis gratuit sous 24h. ✓ Certifié RGE ✓ Garantie décennale",
    h1: "Votre Installateur de Climatisation à Miramas",
    intro: "Basés au cœur de Miramas depuis plusieurs années, nous connaissons parfaitement les spécificités climatiques et architecturales de notre ville. Du quartier de la Gare aux hauteurs du Vieux-Miramas, en passant par Le Mercure et les zones pavillonnaires récentes, Air G Énergie intervient rapidement pour tous vos besoins en climatisation. Notre proximité est votre garantie de réactivité et de service personnalisé.",
    heroImage: "/images/city-miramas-hero.png",
    img_install: "/images/city-install/img-1.jpg",
    img_reversible: "/images/city-reversible/img-3.jpg",
    img_gainable: "/images/city-gainable/img-1.jpg",
    img_maintenance: "/images/city-maintenance/img-1.png",
    h2_install: "Installation de Climatisation à Miramas : Expertise Locale",
    txt_install: "Chaque quartier de Miramas a ses particularités. Les maisons de ville du centre historique nécessitent une approche respectueuse du patrimoine, tandis que les résidences récentes du Mercure demandent une intégration discrète. Nos techniciens connaissent ces contraintes et adaptent chaque installation. Nous travaillons avec les meilleures marques (Daikin, Mitsubishi, Toshiba) et dimensionnons précisément votre système.",
    h2_reversible: "Climatisation Réversible à Miramas : Confort Toute l'Année",
    txt_reversible: "Le climat de Miramas, typique de l'étang de Berre, est marqué par des étés caniculaires et des hivers où le Mistral souffle fort. Une climatisation réversible est la solution idéale pour faire face à ces extrêmes. En été, elle rafraîchit efficacement. En hiver, elle offre un chauffage économique. Nos clients miramasséens constatent d'importantes économies d'énergie.",
    h2_gainable: "Climatisation Gainable à Miramas : Élégance et Discrétion",
    txt_gainable: "Pour les villas modernes ou en rénovation à Miramas, le gainable est la solution premium qui préserve l'esthétique. Tout le système est caché dans les combles. Avec un système de zoning, vous régulez la température pièce par pièce pour un confort absolu.",
    h2_maintenance: "Entretien et Dépannage à Miramas : Réactivité Maximale",
    txt_maintenance: "Notre atelier étant situé à Miramas même, nous intervenons en un temps record pour tout dépannage ou entretien. Ne laissez pas une panne gâcher votre confort. Nous assurons l'entretien annuel obligatoire pour garantir la longévité de votre installation.",
    h2_why_us: "Pourquoi Choisir Air G Énergie à Miramas ?",
    txt_why_us: "Faire appel à nous, c'est choisir un artisan local, vos voisins. Nous sommes certifiés RGE, ce qui vous ouvre droit aux aides financières. Notre connaissance du terrain et notre réactivité sont inégalées sur la commune.",
    h2_cta: "Demandez Votre Devis à Miramas",
    faq: [
        { q: "Quels quartiers de Miramas couvrez-vous ?", a: "Tous : Centre, Gare, Mercure, Molières, Vieux-Miramas, etc." },
        { q: "Quel délai pour une installation à Miramas ?", a: "Visite sous 24h, installation sous 1 à 2 semaines selon la saison." },
        { q: "Intervenez-vous au Vieux-Miramas ?", a: "Oui, nous avons l'habitude des contraintes patrimoniales du village." },
        { q: "Quel prix pour une clim à Miramas ?", a: "À partir de 1500€ posé pour un split. Devis gratuit sur place." },
        { q: "Avez-vous les qualifications RGE ?", a: "Oui, nous sommes RGE QualiPAC, éligibles aux primes CEE." },
        { q: "Où est situé votre atelier ?", a: "Nous sommes basés à Miramas même, ce qui garantit notre rapidité." },
        { q: "Faites-vous le dépannage ?", a: "Oui, toutes marques, en priorité pour nos clients locaux." }
    ]
};

const istresData: CityContent = {
    slug: "istres",
    name: "Istres",
    metaTitle: "Climatisation à Istres (13800) – Installation & Dépannage Rapide | Air G Énergie",
    metaDesc: "Installateur climatisation à Istres : Heures Claires, Ranquet, Centre. Entreprise locale (15 min), intervention rapide. ✓ Certifié RGE ✓ Garantie décennale",
    h1: "Votre Installateur de Climatisation à Istres",
    intro: "Voisins d'Istres, nous intervenons quotidiennement sur la commune, des Heures Claires au Ranquet en passant par le centre-ville. Nous connaissons les spécificités de l'habitat istréen et les contraintes liées à la proximité de l'étang.",
    heroImage: "/images/hero-technician-ac.png",
    img_install: "/images/city-install/img-2.jpg",
    img_reversible: "/images/city-reversible/img-2.jpg",
    img_gainable: "/images/city-gainable/img-3.jpg",
    img_maintenance: "/images/city-maintenance/img-2.png",
    h2_install: "Installation Climatisation à Istres",
    txt_install: "Nous équipons appartements et villas à Istres avec des solutions performantes et silencieuses. Split, multi-split ou gainable, nous étudions la meilleure configuration pour votre logement.",
    h2_reversible: "Confort Thermique à Istres",
    txt_reversible: "Le climat d'Istres demande une solution polyvalente. La climatisation réversible vous apporte fraîcheur l'été et chauffage économique l'hiver, idéal pour contrer l'humidité de l'étang.",
    h2_gainable: "Le Gainable pour vos Villas à Istres",
    txt_gainable: "Solution invisible par excellence, le gainable est très prisé dans les quartiers résidentiels d'Istres comme le Prépaou ou les Heures Claires. Confort acoustique et visuel garanti.",
    h2_maintenance: "Maintenance Experte à Istres",
    txt_maintenance: "Nous assurons la maintenance de votre parc. Proches de vous, nous intervenons rapidement en cas de panne.",
    h2_why_us: "Expertise Locale pour Istres",
    txt_why_us: "Proximité, qualification RGE, tarifs justes. Nous sommes votre partenaire confiance pour le génie climatique à Istres.",
    h2_cta: "Devis Gratuit à Istres",
    faq: [
        { q: "Quand pouvez-vous intervenir à Istres ?", a: "Sous 48h pour un devis, rapidement pour les travaux." },
        { q: "Couvrez-vous Entressen ?", a: "Oui, Entressen fait partie intégrante de notre zone d'intervention." },
        { q: "Gérez-vous les aides de l'État ?", a: "Oui, nous déduisons les primes CEE et vous guidons pour MaPrimeRénov'." },
        { q: "Quel matériel installez-vous ?", a: "Daikin, Mitsubishi, Toshiba principalement." },
        { q: "Le devis est-il payant ?", a: "Non, devis et déplacement 100% gratuits." },
        { q: "Faites-vous l'entretien ?", a: "Oui, contrats annuels disponibles." },
        { q: "Une garantie ?", a: "Oui, garantie décennale sur l'installation." }
    ]
};

// -- NOUVEAU : Salon-de-Provence (Enrichissement Manuel)
const salonData: CityContent = {
    slug: "salon-de-provence",
    name: "Salon-de-Provence",
    metaTitle: "Climatisation à Salon-de-Provence (13300) – Installation & Entretien | Air G Énergie",
    metaDesc: "Spécialiste climatisation à Salon-de-Provence. Intervention Michelet, Canourgues, Centre. RGE QualiPAC, devis gratuit. Installation et dépannage rapide.",
    h1: "Climatisation et Pompe à Chaleur à Salon-de-Provence",
    intro: "À Salon-de-Provence, ville de Nostradamus et de la Patrouille de France, le climat peut être rude, avec un Mistral puissant et des étés très chauds. Air G Énergie vous accompagne pour sécuriser votre confort thermique. Que vous soyez proche du cours Gimon, dans le quartier des Canourgues ou vers Bel-Air, notre équipe technique intervient avec le soin et la rigueur attendus.",
    heroImage: "/images/salon-fontaine-moussue.png",
    img_install: "/images/city-install/img-3.jpg",
    img_reversible: "/images/city-reversible/img-9.jpg",
    img_gainable: "/images/city-gainable/img-4.jpg",
    img_maintenance: "/images/city-maintenance/img-3.png",
    h2_install: "Installation sur mesure à Salon-de-Provence",
    txt_install: "La diversité de l'habitat salonnais, des immeubles anciens du centre aux villas contemporaines, demande une grande adaptabilité. Nous posons des climatisations discrètes (splits compacts, gainables invisibles) pour respecter l'esthétique de votre intérieur tout en garantissant une efficacité redoutable contre la chaleur.",
    h2_reversible: "La Réversible : Le Choix Malin à Salon",
    txt_reversible: "Pour affronter les hivers ventés sans faire exploser la facture, la pompe à chaleur air-air est incontournable à Salon. Elle récupère les calories de l'air extérieur pour chauffer votre maison à moindre coût. En été, elle inverse le cycle pour une fraîcheur absolue.",
    h2_gainable: "Gainable : Le Luxe Invisible",
    txt_gainable: "Idéal pour les zones résidentielles de Salon, le gainable diffuse l'air par des grilles motorisées. Plus de bruit, plus de courants d'air désagréables, juste une température parfaite régulée pièce par pièce.",
    h2_maintenance: "Service Après-Vente Réactif",
    txt_maintenance: "Notre proximité immédiate (10 min) nous permet d'être sur place très vite en cas de panne sur Salon-de-Provence. Ne restez pas sans chauffage ou sans clim !",
    h2_why_us: "Votre Installateur RGE à Salon-de-Provence",
    txt_why_us: "Air G Énergie n'est pas une plateforme nationale impersonnelle. Nous sommes des artisans locaux, fiers de notre travail. Certifiés RGE, nous vous donnons accès à toutes les aides de l'État pour financer votre projet à Salon. Nous privilégions la relation humaine et la qualité technique.",
    h2_cta: "Obtenez votre Devis à Salon",
    faq: [
        { q: "Intervenez-vous en centre-ville de Salon ?", a: "Oui, nous avons l'habitude des accès restreints et des contraintes esthétiques." },
        { q: "Quel est le temps d'attente pour un devis ?", a: "Nous nous déplaçons sous 24-48h pour évaluer votre projet." },
        { q: "Quelles marques proposez-vous ?", a: "Nous sommes partenaires Daikin, Mitsubishi et Toshiba." },
        { q: "Proposez-vous des facilités de paiement ?", a: "Oui, contactez-nous pour en discuter." },
        { q: "Faites-vous les entretiens annuels ?", a: "Bien sûr, c'est essentiel pour la garantie et la performance." },
        { q: "Êtes-vous assurés ?", a: "Oui, responsabilité civile et garantie décennale à jour." },
        { q: "La visite technique est-elle payante ?", a: "Non, elle est totalement gratuite et sans engagement." }
    ]
};

// -- NOUVEAU : Aix-en-Provence (Enrichissement Manuel)
const aixData: CityContent = {
    slug: "aix-en-provence",
    name: "Aix-en-Provence",
    metaTitle: "Climatisation Aix-en-Provence (13100) – Installation Luxe & Design | Air G Énergie",
    metaDesc: "Installation climatisation haut de gamme à Aix-en-Provence. Spécialiste gainable et PAC design. Centre, Puyricard, Les Milles. RGE QualiPAC.",
    h1: "Expert Climatisation à Aix-en-Provence",
    intro: "Aix-en-Provence, ville d'eau et d'art, exige des prestations à la hauteur de son standing. Que vous résidiez dans une bastide à Puyricard, un appartement sur le Cours Mirabeau ou une villa moderne à la Duranne, Air G Énergie vous propose des solutions de climatisation alliant haute performance énergétique et discrétion absolue.",
    heroImage: "/images/aix-cours-mirabeau.png",
    img_install: "/images/city-install/img-4.jpg",
    img_reversible: "/images/city-reversible/img-8.jpg",
    img_gainable: "/images/city-gainable/img-2.png",
    img_maintenance: "/images/city-maintenance/img-4.png",
    h2_install: "L'Excellence Technique pour Aix",
    txt_install: "Nous accordons un soin particulier aux finitions. Goulottes invisibles, intégration en faux-plafonds, unités extérieures carénées : votre confort ne doit pas nuire à l'élégance de votre propriété aixoise. Nous installons les gammes 'Design' de chez Daikin et Mitsubishi.",
    h2_reversible: "Confort 4 Saisons",
    txt_reversible: "Profitez de vos extérieurs l'été et rentrez dans une maison fraîche. L'hiver, bénéficiez d'une chaleur douce et homogène. Nos pompes à chaleur air-air sont pilotables à distance via Wifi pour trouver la température idéale dès votre arrivée.",
    h2_gainable: "Le Standard du Confort Aixois",
    txt_gainable: "Le gainable est la norme pour les rénovations de qualité à Aix. Totalement invisible, il valorise votre bien immobilier. Avec le système Airzone, chaque membre de la famille contrôle sa propre température.",
    h2_maintenance: "Maintenance Préventive",
    txt_maintenance: "Pour assurer la fiabilité de votre installation, nos contrats de maintenance incluent le nettoyage complet, la désinfection antibactérienne et le contrôle des fluides. Un service premium pour des clients exigeants.",
    h2_why_us: "Pourquoi Air G Énergie sur Aix-en-Provence ?",
    txt_why_us: "Nous apportons la réactivité et la proximité d'une structure humaine, là où les gros acteurs peinent à suivre. Notre expertise technique nous permet de gérer des chantiers complexes (grandes hauteurs sous plafond, vieilles pierres). Certifiés RGE, nous garantissons un travail dans les règles de l'art.",
    h2_cta: "Devis Prestige Gratuit à Aix",
    faq: [
        { q: "Intervenez-vous dans le centre historique piéton ?", a: "Oui, nous organisons la logistique en conséquence." },
        { q: "Quelles sont les solutions les plus silencieuses ?", a: "Nous vous orienterons vers les gammes 'Stylish' ou Gainable de Daikin." },
        { q: "Installez-vous des pompes à chaleur Piscine ?", a: "Oui, nous pouvons aussi chauffer votre piscine." },
        { q: "Quel est le coût d'un système complet pour 100m² ?", a: "Comptez entre 8000€ et 12000€ en gainable zoné, selon configuration." },
        { q: "Les travaux sont-ils couverts ?", a: "Oui, garantie décennale incluse." },
        { q: "Gérez-vous la mise en service ?", a: "Nous la réalisons nous-mêmes, sans sous-traitant." },
        { q: "Puis-je piloter ma clim avec mon iPhone ?", a: "Oui, toutes nos installations récentes sont connectées." }
    ]
};

// -- NOUVEAU : Martigues (Enrichissement Manuel)
const martiguesData: CityContent = {
    slug: "martigues",
    name: "Martigues",
    metaTitle: "Climatisation Martigues (13500) – La Venise Provençale | Air G Énergie",
    metaDesc: "Climatisation à Martigues : Installation résistante air salin. Jonquières, Ferrières, L'Île. Devis gratuit RGE. Pompe à chaleur et entretien.",
    h1: "Climatisation et Confort à Martigues",
    intro: "À Martigues, la Venise Provençale, la proximité de l'eau et de l'industrie demande une vraie expertise. L'air peut y être humide et salin. Air G Énergie intervient de Ferrières à Jonquières en passant par l'Île, avec du matériel robuste traité pour résister à ces conditions spécifiques tout en vous offrant un confort thermique optimal.",
    heroImage: "/images/martigues-miroir-oiseaux.png",
    img_install: "/images/city-install/img-2.jpg",
    img_reversible: "/images/city-reversible/img-1.png",
    img_gainable: "/images/city-gainable/img-3.jpg",
    img_maintenance: "/images/city-maintenance/img-5.png",
    h2_install: "Installation Durable à Martigues",
    txt_install: "Nous sélectionnons des unités extérieures avec traitement anticorrosion (Blue Fin) pour garantir leur longévité face à l'air marin de Martigues. Que ce soit pour un appartement avec balcon ou une maison à Croix-Sainte, nous avons la solution technique.",
    h2_reversible: "Chauffage et Clim pour Martigues",
    txt_reversible: "Remplacez vos vieux convecteurs par une climatisation réversible. Vous ferez des économies drastiques sur le chauffage tout en supprimant l'humidité ambiante, fréquent souci en bord d'étang.",
    h2_gainable: "Discrétion et Performance",
    txt_gainable: "Pour les pavillons, le gainable est la solution reine. Plus d'appareils aux murs, tout est caché. Vous profitez juste du confort.",
    h2_maintenance: "Entretien Spécifique Bord de Mer",
    txt_maintenance: "À Martigues, l'entretien n'est pas une option. Le sel et la pollution peuvent encrasser les échangeurs. Notre nettoyage approfondi protège votre investissement.",
    h2_why_us: "L'Expertise Locale à Martigues",
    txt_why_us: "Connaître Martigues, c'est savoir quel matériel installer pour qu'il dure. Air G Énergie, c'est l'assurance d'un installateur RGE qui connaît son territoire et ne vous vendra pas une installation inadaptée. Proximité, conseil et prix juste.",
    h2_cta: "Devis Gratuit Martigues",
    faq: [
        { q: "Le matériel résiste-t-il au sel ?", a: "Oui, nous privilégions les traitements anticorrosion type Blue Fin." },
        { q: "Intervenez-vous sur les bateaux ?", a: "Non, uniquement résidentiel et tertiaire (bureaux, commerces)." },
        { q: "Quel délai pour un dépannage ?", a: "Dans la journée ou le lendemain en cas d'urgence totale." },
        { q: "Aides de l'état possibles ?", a: "Oui, MaPrimeRénov' et CEE fonctionnent à Martigues." },
        { q: "Faites-vous les commerces ?", a: "Oui, nous équipons beaucoup de boutiques sur Martigues." },
        { q: "Quelle marque pour le bord de mer ?", a: "Mitsubishi Electric est réputé très robuste." },
        { q: "Le devis engage-t-il à quelque chose ?", a: "Rien du tout, il est gratuit." }
    ]
};

// -- NOUVEAU : Marseille (Enrichissement Manuel)
const marseilleData: CityContent = {
    slug: "marseille",
    name: "Marseille",
    metaTitle: "Climatisation Marseille – Installation Pro & Rapide (13) | Air G Énergie",
    metaDesc: "Installateur climatisation Marseille Nord/Ouest (L'Estaque, St Antoine, 13/14/15/16). RGE QualiPAC. Dépannage rapide et installation soignée.",
    h1: "Climatisation à Marseille : Secteur Nord & Ouest",
    intro: "Marseille, la cité phocéenne, est une ville bouillonnante où la chaleur peut devenir étouffante. Nous concentrons nos interventions sur les 13ème, 14ème, 15ème et 16ème arrondissements (L'Estaque, Saint-Antoine, Château-Gombert...) pour garantir une réactivité maximale. Nous apportons le calme et la fraîcheur dans votre foyer marseillais.",
    heroImage: "/images/marseille-vieux-port.png",
    img_install: "/images/city-install/img-1.jpg",
    img_reversible: "/images/city-reversible/img-7.png",
    img_gainable: "/images/city-gainable/img-1.jpg",
    img_maintenance: "/images/city-maintenance/img-2.png",
    h2_install: "Installation Climatisation Marseille",
    txt_install: "En appartement ou en maison de ville, nous maîtrisons les contraintes marseillaises (copropriété, bruit, façades). Nous installons des systèmes silencieux et performants, dans le respect du voisinage et des règles d'urbanisme.",
    h2_reversible: "La Fraîcheur, enfin !",
    txt_reversible: "Dormez au frais, même en plein mois d'août. La climatisation réversible est aujourd'hui un standard de confort à Marseille. Et l'hiver, elle chauffe mieux et moins cher que le gaz ou l'électrique.",
    h2_gainable: "Maison Marseillaise & Gainable",
    txt_gainable: "Si vous avez des combles, passez au gainable. C'est la plus-value assurée pour votre maison. Un confort d'hôtel, chez vous, sans rien voir.",
    h2_maintenance: "Dépannage Clim Marseille",
    txt_maintenance: "Sur Marseille, la réactivité est clé. Notre sectorisation géographique nous permet d'éviter de traverser toute la ville et d'être chez vous rapidement en cas de pépin.",
    h2_why_us: "Votre Artisan de Confiance à Marseille",
    txt_why_us: "Marseille regorge d'offres, mais la qualité est inégale. Air G Énergie vous apporte la rigueur d'un artisan certifié RGE, avec des garanties solides (décennale). Nous sommes une entreprise stable, pas des sous-traitants éphémères. Nous respectons nos devis et nos délais.",
    h2_cta: "Devis Clim Marseille Gratuit",
    faq: [
        { q: "Intervenez-vous dans le centre (Vieux-Port) ?", a: "Principalement Nord/Ouest pour garantir nos délais, mais consultez-nous." },
        { q: "Faut-il une autorisation de copropriété ?", a: "Oui, c'est indispensable pour l'unité extérieure. Nous vous aidons pour le dossier." },
        { q: "Combien de temps dure l'installation ?", a: "1 jour pour un mono-split, 2-3 jours pour un multi ou gainable." },
        { q: "Les devis sont-ils gratuits ?", a: "Oui, toujours." },
        { q: "Quelle marque choisir ?", a: "Daikin reste la valeur sûre, Toshiba excellent rapport qualité/prix." },
        { q: "Faites-vous la mise en service ?", a: "Oui, nous avons l'attestation de capacité requise." },
        { q: "Acceptez-vous les chèques énergie ?", a: "Nous montons les dossiers CEE/MaPrimeRénov, le chèque énergie sert au paiement." }
    ]
};


// Generate all cities data
const generatedCities = citiesList.reduce((acc, config, index) => {
    acc[config.slug] = generateCityContent(config, index);
    return acc;
}, {} as Record<string, CityContent>);

// Export combined data
export const citiesData: Record<string, CityContent> = {
    ...generatedCities,
    miramas: miramasData,
    istres: istresData,
    "salon-de-provence": salonData,
    "aix-en-provence": aixData,
    martigues: martiguesData,
    marseille: marseilleData
};

export function getCityData(slug: string): CityContent | undefined {
    return citiesData[slug];
}

export function getAllCitySlugs(): string[] {
    return Object.keys(citiesData);
}
