// This file simulates a database or CMS content for the city pages.
// In production, this would likely come from Supabase.

export interface CityContent {
    slug: string;
    name: string;
    metaTitle: string;
    metaDesc: string;
    h1: string;
    intro: string;
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

export const citiesData: Record<string, CityContent> = {
    "miramas": {
        slug: "miramas",
        name: "Miramas",
        metaTitle: "Climatisation à Miramas – Installation, Dépannage & Devis Rapide | Air G Énergie",
        metaDesc: "Besoin d'un installateur de climatisation à Miramas (13140) ? Intervention rapide quartiers Gare, Le Mercure, Vieux-Miramas. Devis gratuit pour particuliers et pros.",
        h1: "Installateur de climatisation à Miramas",
        intro: "Bienvenue chez Air G Énergie. Basés au cœur de Miramas, nous connaissons parfaitement les besoins thermiques des maisons de ville et pavillons du secteur. Que vous soyez proche de la Gare ou sur les hauteurs du Vieux-Miramas, nos équipes interviennent en quelques minutes.",
        h2_install: "Installation de climatisation à Miramas pour maisons et appartements",
        txt_install: "Nous proposons des poses soignées, adaptées aux façades parfois classées du centre-ville ou aux règlements de copropriété strictes des résidences récentes.",
        h2_reversible: "Climatisation réversible : confort été comme hiver à Miramas",
        txt_reversible: "Le climat de l'étang de Berre est contrasté. Nos systèmes réversibles vous garantissent une fraîcheur idéale lors des canicules de juillet et un chauffage douillet quand le Mistral souffle l'hiver.",
        h2_gainable: "Climatisation gainable à Miramas : solution discrète et premium",
        txt_gainable: "Idéal pour les rénovations dans les zones pavillonnaires calmes. Tout passe dans les combles, rien ne dénature votre intérieur.",
        h2_maintenance: "Entretien et dépannage de climatisation à Miramas",
        txt_maintenance: "Une panne un 15 août ? Notre proximité nous permet d'être ultra-réactifs pour nos clients Miramasséens. Contrats d'entretien disponibles.",
        h2_why_us: "Pourquoi choisir un installateur local de climatisation à Miramas",
        txt_why_us: "Pas de sous-traitance, que du local. En choisissant Air G Énergie, vous faites travailler une entreprise de votre ville.",
        h2_cta: "Demandez votre devis climatisation à Miramas",
        faq: [
            { q: "Intervenez-vous dans le vieux Miramas ?", a: "Oui, nous avons l'habitude des contraintes techniques du centre historique." },
            { q: "Quel est le délai pour une installation à Miramas ?", a: "Étant sur place, nous pouvons souvent intervenir sous 1 à 2 semaines selon la saison." }
        ]
    },
    "istres": {
        slug: "istres",
        name: "Istres",
        metaTitle: "Climatisation à Istres – Installation & Entretien par un Pro Local | Air G Énergie",
        metaDesc: "Faites installer votre clim à Istres par un expert local. Spécialiste réversible et gainable. Devis gratuit aux Heures Claires, Ranquet, Centre-Ville...",
        h1: "Spécialiste de la climatisation à Istres",
        intro: "À Istres, la demande en confort thermique est forte. Air G Énergie accompagne les Istréens pour équiper leurs villas ou appartements avec des solutions performantes et silencieuses.",
        h2_install: "Pose de climatisation à Istres adaptée à votre logement",
        txt_install: "Que vous habitiez une villa récente aux Heures Claires ou un appartement en centre-ville, nous étudions l'emplacement idéal pour les unités.",
        h2_reversible: "Solution de climatisation réversible performante à Istres",
        txt_reversible: "Combinez économies et confort. Remplacez vos radiateurs électriques par une pompe à chaleur air-air performante.",
        h2_gainable: "Installation de climatisation gainable à Istres",
        txt_gainable: "Le luxe du silence. Une diffusion douce et invisible, très prisée dans les constructions neuves autour de l'étang.",
        h2_maintenance: "Maintenance et dépannage de climatisation à Istres",
        txt_maintenance: "L'air salin de l'étang peut user les appareils. Un entretien régulier est crucial pour prolonger la durée de vie de votre équipement à Istres.",
        h2_why_us: "Climatisation à Istres : l’avantage d’un professionnel de proximité",
        txt_why_us: "Nous sommes voisins. En cas de pépin, nous ne sommes jamais loin pour intervenir.",
        h2_cta: "Devis rapide pour votre climatisation à Istres",
        faq: [
            { q: "Faites-vous l'entretien des PAC à Istres ?", a: "Oui, nous proposons des contrats annuels complets." },
            { q: "Proposez-vous des marques japonaises ?", a: "Absolument, nous travaillons essentiellement avec Daikin, Mitsubishi et Toshiba pour leur fiabilité." }
        ]
    }
};

// Placeholder for other cities to ensure they render something (even if generic for now, pending AI generation)
export const getCityData = (slug: string) => {
    return citiesData[slug] || null;
}
