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
        metaTitle: "Climatisation à Miramas (13140) – Installation & Dépannage Rapide | Air G Énergie",
        metaDesc: "Installateur climatisation à Miramas : Gare, Mercure, Vieux-Miramas. Entreprise locale, intervention rapide, devis gratuit sous 24h. ✓ Certifié RGE ✓ Garantie décennale",
        h1: "Votre Installateur de Climatisation à Miramas",
        intro: "Basés au cœur de Miramas depuis plusieurs années, nous connaissons parfaitement les spécificités climatiques et architecturales de notre ville. Du quartier de la Gare aux hauteurs du Vieux-Miramas, en passant par Le Mercure et les zones pavillonnaires récentes, Air G Énergie intervient rapidement pour tous vos besoins en climatisation. Notre proximité est votre garantie de réactivité et de service personnalisé.",
        h2_install: "Installation de Climatisation à Miramas : Expertise Locale et Solutions Sur-Mesure",
        txt_install: "Chaque quartier de Miramas a ses particularités. Les maisons de ville du centre historique nécessitent une approche respectueuse du patrimoine, tandis que les résidences récentes du Mercure ou de la zone des Molières demandent une intégration discrète conforme aux règlements de copropriété. Nos techniciens connaissent ces contraintes et adaptent chaque installation : choix de l'emplacement des unités extérieures, passage des gaines en respectant l'esthétique, solutions gainables pour les combles aménagés. Nous travaillons avec les meilleures marques (Daikin, Mitsubishi, Toshiba) et dimensionnons précisément votre système selon la surface, l'isolation et l'exposition de votre logement. Découvrez nos solutions de <a href='/climatisation' style='color: var(--primary-blue); text-decoration: underline;'>climatisation réversible</a> adaptées à votre logement.",
        h2_reversible: "Climatisation Réversible à Miramas : Confort Toute l'Année Face au Climat Provençal",
        txt_reversible: "Le climat de Miramas, typique de l'étang de Berre, est marqué par des étés caniculaires (régulièrement au-dessus de 35°C en juillet-août) et des hivers où le Mistral fait chuter les températures ressenties. Une climatisation réversible est la solution idéale pour faire face à ces extrêmes. En été, elle rafraîchit efficacement votre intérieur. En hiver, elle fonctionne comme une pompe à chaleur air-air, offrant un chauffage économique et rapide. Nos clients miramasséens constatent en moyenne 60% d'économies sur leur facture de chauffage par rapport à des radiateurs électriques classiques. Le système réversible est particulièrement adapté aux maisons récentes bien isolées, nombreuses dans les nouveaux lotissements de Miramas.",
        h2_gainable: "Climatisation Gainable à Miramas : L'Élégance Invisible pour Votre Intérieur",
        txt_gainable: "Vous rénovez une maison dans les quartiers pavillonnaires de Miramas ? Vous construisez dans la zone d'extension nord ? La climatisation gainable est la solution premium qui préserve l'esthétique de votre intérieur. Tout le système de distribution d'air est dissimulé dans vos combles ou faux-plafonds. Seules de discrètes grilles de soufflage, parfaitement intégrées au plafond, sont visibles. Cette solution est particulièrement prisée dans les maisons avec combles perdus, très courantes à Miramas. Avec un système de zoning (Airzone ou Delta Dore), vous pouvez même réguler la température pièce par pièce, pour un confort personnalisé et des économies d'énergie maximales.",
        h2_maintenance: "Entretien et Dépannage Climatisation à Miramas : Réactivité et Proximité",
        txt_maintenance: "Une panne de climatisation en pleine canicule miramasséenne, c'est l'urgence absolue. Notre atelier étant situé à Miramas même, nous intervenons en quelques heures, même les week-ends et jours fériés en période estivale. Nous assurons l'entretien annuel obligatoire de votre installation (nettoyage des filtres, contrôle du fluide frigorigène, vérification des performances), indispensable pour maintenir l'efficacité et la longévité de votre système. Nos contrats d'entretien incluent un dépannage prioritaire et des tarifs préférentiels. Nous intervenons sur toutes marques, même si nous n'avons pas réalisé l'installation initiale.",
        h2_why_us: "Pourquoi Choisir Air G Énergie, Votre Installateur Local à Miramas",
        txt_why_us: "Faire appel à une entreprise locale, c'est choisir la proximité, la réactivité et la connaissance du terrain. Nous connaissons les spécificités de chaque quartier de Miramas : les contraintes du Vieux-Miramas, les règlements des copropriétés récentes, les particularités des maisons provençales traditionnelles. Nous sommes certifiés RGE (Reconnu Garant de l'Environnement), ce qui vous permet de bénéficier des aides financières (MaPrimeRénov', CEE). Notre garantie décennale vous protège sur le long terme. Mais surtout, nous sommes vos voisins : votre satisfaction est notre meilleure publicité dans la ville.",
        h2_cta: "Demandez Votre Devis Gratuit pour une Climatisation à Miramas",
        faq: [
            {
                q: "Quels quartiers de Miramas couvrez-vous ?",
                a: "Nous intervenons dans tous les quartiers de Miramas : centre-ville et Vieux-Miramas, quartier de la Gare, Le Mercure, Les Molières, zone pavillonnaire nord, et tous les secteurs résidentiels. Notre atelier étant à Miramas, nous sommes à moins de 10 minutes de n'importe quel point de la ville."
            },
            {
                q: "Quel est le délai pour une installation de climatisation à Miramas ?",
                a: "Grâce à notre proximité, nous pouvons réaliser une visite technique sous 48h et installer votre climatisation sous 1 à 2 semaines en période normale. En haute saison (mai-juillet), les délais peuvent s'allonger à 3 semaines, d'où l'intérêt d'anticiper."
            },
            {
                q: "Intervenez-vous dans le Vieux-Miramas avec ses contraintes patrimoniales ?",
                a: "Oui, nous avons l'habitude des contraintes du centre historique : façades à préserver, impossibilité de percer certains murs, règles d'urbanisme strictes. Nous proposons des solutions adaptées (unités extérieures en toiture, passages de gaines discrets) en conformité avec les exigences de la mairie."
            },
            {
                q: "Combien coûte une installation de climatisation à Miramas ?",
                a: "Le prix dépend du type de système (split mural, gainable, multi-split), de la surface à climatiser et de la complexité de l'installation. Comptez entre 1 500€ et 3 500€ pour un split mural simple, 4 000€ à 8 000€ pour un système gainable. Nous établissons un devis gratuit et détaillé après visite technique."
            },
            {
                q: "Proposez-vous des aides au financement pour une climatisation à Miramas ?",
                a: "Oui, étant certifiés RGE, vos travaux sont éligibles aux aides : MaPrimeRénov' (pour les pompes à chaleur air-air dans certains cas), Certificats d'Économie d'Énergie (CEE), TVA réduite à 10%. Nous vous accompagnons dans les démarches administratives."
            },
            {
                q: "Faites-vous l'entretien des climatisations existantes à Miramas ?",
                a: "Absolument. Nous assurons l'entretien annuel obligatoire et le dépannage de toutes marques de climatisation, même si nous ne les avons pas installées. Nos contrats d'entretien incluent une visite annuelle complète et un dépannage prioritaire."
            },
            {
                q: "Intervenez-vous en urgence à Miramas ?",
                a: "Oui, en cas de panne en période de forte chaleur, nous intervenons en urgence, généralement le jour même ou le lendemain. Notre proximité (atelier à Miramas) nous permet cette réactivité que ne peuvent pas offrir les entreprises basées à Marseille ou Aix."
            }
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
    },
    "salon-de-provence": {
        slug: "salon-de-provence",
        name: "Salon-de-Provence",
        metaTitle: "Climatisation à Salon-de-Provence – Installation & Dépannage | Air G Énergie",
        metaDesc: "Installation de climatisation à Salon-de-Provence (13300). Intervention rapide dans tous les quartiers. Devis gratuit pour particuliers et professionnels.",
        h1: "Installateur de climatisation à Salon-de-Provence",
        intro: "Air G Énergie intervient à Salon-de-Provence et ses environs pour tous vos besoins en climatisation. Que vous soyez en centre-ville ou dans les quartiers résidentiels, nous vous proposons des solutions adaptées à votre logement.",
        h2_install: "Installation de climatisation à Salon-de-Provence",
        txt_install: "Nous installons tous types de climatisation : split mural, console, cassette ou gainable. Nos techniciens s'adaptent aux contraintes de votre habitation pour une installation propre et discrète.",
        h2_reversible: "Climatisation réversible à Salon-de-Provence",
        txt_reversible: "Profitez d'un confort optimal toute l'année avec nos systèmes réversibles. Fraîcheur en été, chaleur en hiver, tout en réalisant des économies d'énergie importantes.",
        h2_gainable: "Climatisation gainable à Salon-de-Provence",
        txt_gainable: "Pour une solution totalement invisible, optez pour la climatisation gainable. Idéale pour les maisons avec combles ou faux-plafonds, elle offre un confort discret et homogène.",
        h2_maintenance: "Entretien et dépannage de climatisation à Salon-de-Provence",
        txt_maintenance: "Nous assurons l'entretien régulier et le dépannage rapide de votre climatisation. Contrats d'entretien disponibles pour garantir la longévité de votre installation.",
        h2_why_us: "Pourquoi choisir Air G Énergie à Salon-de-Provence",
        txt_why_us: "Entreprise locale, réactive et professionnelle. Nous connaissons parfaitement le secteur de Salon-de-Provence et intervenons rapidement en cas de besoin.",
        h2_cta: "Demandez votre devis climatisation à Salon-de-Provence",
        faq: [
            { q: "Quel est le délai d'intervention à Salon-de-Provence ?", a: "Nous intervenons généralement sous 24 à 48h pour un devis, et sous 1 à 2 semaines pour l'installation selon la saison." },
            { q: "Proposez-vous des aides au financement ?", a: "Oui, nous vous accompagnons dans vos démarches pour bénéficier des aides disponibles (MaPrimeRénov, etc.)." }
        ]
    },
    "saint-chamas": {
        slug: "saint-chamas",
        name: "Saint-Chamas",
        metaTitle: "Climatisation à Saint-Chamas – Installation & Entretien | Air G Énergie",
        metaDesc: "Spécialiste climatisation à Saint-Chamas (13250). Installation, entretien et dépannage rapide. Devis gratuit sous 24h.",
        h1: "Spécialiste climatisation à Saint-Chamas",
        intro: "Air G Énergie est votre partenaire climatisation à Saint-Chamas. Nous intervenons dans toute la commune pour installer, entretenir et dépanner vos systèmes de climatisation.",
        h2_install: "Installation de climatisation à Saint-Chamas",
        txt_install: "Que vous habitiez une maison individuelle ou un appartement, nous vous proposons la solution de climatisation la plus adaptée à vos besoins et à votre budget.",
        h2_reversible: "Climatisation réversible performante à Saint-Chamas",
        txt_reversible: "Équipez-vous d'une climatisation réversible pour un confort optimal été comme hiver. Économies d'énergie garanties par rapport au chauffage électrique traditionnel.",
        h2_gainable: "Climatisation gainable discrète à Saint-Chamas",
        txt_gainable: "La climatisation gainable est la solution premium pour un confort invisible. Tout le système est dissimulé dans vos combles ou faux-plafonds.",
        h2_maintenance: "Entretien et dépannage climatisation à Saint-Chamas",
        txt_maintenance: "Nous assurons l'entretien annuel de votre climatisation et intervenons rapidement en cas de panne. Proximité et réactivité garanties.",
        h2_why_us: "Air G Énergie, votre installateur local à Saint-Chamas",
        txt_why_us: "Entreprise de proximité basée à Miramas, nous intervenons rapidement à Saint-Chamas. Pas de sous-traitance, que du travail local et soigné.",
        h2_cta: "Obtenez votre devis climatisation à Saint-Chamas",
        faq: [
            { q: "Combien coûte une installation de climatisation à Saint-Chamas ?", a: "Le prix dépend du type de système et de la surface à climatiser. Nous vous proposons un devis gratuit et détaillé après visite technique." },
            { q: "Faites-vous l'entretien des climatisations existantes ?", a: "Oui, nous assurons l'entretien de toutes marques de climatisation, même si nous ne les avons pas installées." }
        ]
    }
};

// Placeholder for other cities to ensure they render something (even if generic for now, pending AI generation)
export const getCityData = (slug: string) => {
    return citiesData[slug] || null;
}
