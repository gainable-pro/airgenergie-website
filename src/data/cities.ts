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
    { name: "Saint-Chamas", slug: "saint-chamas", zip: "13250", dist: "15 min", quartiers: "Le Delà, Le Centre, Les Mololières", angle: "le village bordé par l'étang de Berre", isAirSalin: true }
];

// Helper to generate content
const generateCityContent = (config: CityConfig, index: number): CityContent => {
    const airSalinText = config.isAirSalin
        ? "L'air marin et la salinité de notre secteur nécessitent des équipements robustes et un entretien spécifique que nous maîtrisons parfaitement."
        : "Le climat sec et chaud de notre secteur impose des installations performantes pour garantir votre confort estival.";

    // Deterministic image assignment based on index to ensure variety
    // Using primes to offset the cycles so cities don't get the same set of images
    const heroImage = heroImages[index % heroImages.length];
    const img_install = installImages[index % installImages.length];
    const img_gainable = gainableImages[(index + 1) % gainableImages.length];
    const img_reversible = reversibleImages[(index + 2) % reversibleImages.length];
    const img_maintenance = maintenanceImages[(index + 3) % maintenanceImages.length];

    return {
        slug: config.slug,
        name: config.name,
        metaTitle: `Climatisation à ${config.name} (${config.zip}) – Installation & Dépannage | Air G Énergie`,
        metaDesc: `Installateur climatisation à ${config.name} : ${config.quartiers}. Intervention rapide (${config.dist}), devis gratuit. ✓ RGE ✓ Décennale. Spécialiste local.`,
        h1: `Votre Installateur de Climatisation à ${config.name}`,
        intro: `Air G Énergie intervient quotidiennement à ${config.name} et dans ses quartiers comme ${config.quartiers}. Basés à Miramas, nous sommes à seulement ${config.dist} de chez vous, ce qui nous permet une réactivité exceptionnelle pour l'installation, l'entretien et le dépannage de votre climatisation. Nous connaissons parfaitement ${config.angle}, et adaptons nos solutions techniques à l'architecture locale.`,

        heroImage,
        img_install,
        img_reversible,
        img_gainable,
        img_maintenance,

        h2_install: `Installation de Climatisation à ${config.name} : Notre Expertise`,
        txt_install: `Que vous habitiez une villa récente, un appartement en centre-ville ou une maison traditionnelle à ${config.name}, nous avons la solution adaptée. Nos techniciens réalisent une étude thermique précise pour dimensionner votre installation. Nous posons des systèmes split (muraux), consoles ou cassettes, en privilégiant l'esthétique et le silence. ${airSalinText} Nous travaillons avec les marques leaders (Daikin, Mitsubishi, Toshiba) pour vous garantir fiabilité et économies d'énergie.`,

        h2_reversible: `Pompe à Chaleur Air-Air : La Solution Idéale pour ${config.name}`,
        txt_reversible: `Optez pour une climatisation réversible (pompe à chaleur air-air) pour chauffer et rafraîchir votre logement à ${config.name}. Ce système 2-en-1 est particulièrement rentable dans notre région : il divise par 3 votre facture de chauffage en hiver tout en assurant une fraîcheur parfaite lors des canicules estivales. C'est la solution de rénovation énergétique préférée des habitants de ${config.name} pour gagner en confort thermique toute l'année.`,

        h2_gainable: `Climatisation Gainable à ${config.name} : Discrétion Absolue`,
        txt_gainable: `Pour les maisons individuelles à ${config.name}, notamment dans les quartiers résidentiels comme ${config.quartiers.split(',')[0]}, le gainable est la solution premium. Invisible (caché dans les combles), silencieux et performant, il diffuse l'air via des grilles discrètes. Couplé à un système de régulation par zone (Airzone), il permet de choisir la température dans chaque pièce indépendamment.`,

        h2_maintenance: `Entretien et Dépannage Rapide à ${config.name}`,
        txt_maintenance: `Une panne en plein été ? Notre proximité (${config.dist}) nous permet d'intervenir en urgence à ${config.name}. Nous proposons également des contrats d'entretien annuel pour pérenniser votre matériel, assainir l'air intérieur et prévenir les pannes. Un entretien régulier est indispensable pour maintenir les performances énergétiques de votre climatisation.`,

        h2_why_us: `Pourquoi choisir Air G Énergie pour votre projet à ${config.name} ?`,
        txt_why_us: `Choisir Air G Énergie, c'est choisir un artisan local certifié RGE QualiPAC, proche de vous et de vos préoccupations. Contrairement aux grandes plateformes nationales, nous assurons nous-mêmes le suivi de A à Z, de la visite technique à la mise en service et au SAV. Notre garantie décennale couvre tous nos travaux. Nous vous accompagnons également pour l'obtention des aides financières (MaPrimeRénov', CEE) pour vos travaux à ${config.name}.`,

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

// Custom content for headquarters (Miramas & Istres)
// Kept separate to allow specific manual overrides if needed, but following same structure
const miramasData: CityContent = {
    slug: "miramas",
    name: "Miramas",
    metaTitle: "Climatisation à Miramas (13140) – Installation & Dépannage Rapide | Air G Énergie",
    metaDesc: "Installateur climatisation à Miramas : Gare, Mercure, Vieux-Miramas. Entreprise locale, intervention rapide, devis gratuit sous 24h. ✓ Certifié RGE ✓ Garantie décennale",
    h1: "Votre Installateur de Climatisation à Miramas",
    intro: "Basés au cœur de Miramas depuis plusieurs années, nous connaissons parfaitement les spécificités climatiques et architecturales de notre ville. Du quartier de la Gare aux hauteurs du Vieux-Miramas, en passant par Le Mercure et les zones pavillonnaires récentes, Air G Énergie intervient rapidement pour tous vos besoins en climatisation. Notre proximité est votre garantie de réactivité et de service personnalisé.",
    heroImage: "/images/city-miramas-hero.png",

    // Manual image selection for Headquarters
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

    // Manual image selection for Headquarters
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

// Generate all cities data
const generatedCities = citiesList.reduce((acc, config, index) => {
    acc[config.slug] = generateCityContent(config, index);
    return acc;
}, {} as Record<string, CityContent>);

// Export combined data
export const citiesData: Record<string, CityContent> = {
    ...generatedCities,
    miramas: miramasData,
    istres: istresData
};

export function getCityData(slug: string): CityContent | undefined {
    return citiesData[slug];
}

export function getAllCitySlugs(): string[] {
    return Object.keys(citiesData);
}
