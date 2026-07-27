import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Phone, Clock, ShieldCheck, MapPin, Check, FileText, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import BookingWizard from '@/components/booking/BookingWizard';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';

interface ServiceData {
  id: string;
  category: 'clim' | 'pac' | 'depannage';
  name: string;
  price: number;
  duration: string;
  image: string;
  subtitle: string;
  desc: string;
  details: string[];
  conseilsTitle: string;
  conseilsContent: string;
  conseilsList: string[];
  techniqueSpecs: string[];
}

const SERVICES_CATALOG: Record<string, ServiceData> = {
  devis: {
    id: 'devis',
    category: 'depannage',
    name: 'Étude & Devis d’installation',
    price: 0,
    duration: '45 min',
    image: '/images/technician-handshake.png',
    subtitle: 'Déplacement sous 48h jusqu\'à 100 km à la ronde — Miramas, Aix, Marseille, Salon, Alpilles, La Ciotat... (gratuit)',
    desc: 'Réalisation d\'une étude technique complète pour l\'installation ou le remplacement d\'une climatisation réversible ou pompe à chaleur.',
    details: [
      'Calcul des puissances thermiques nécessaires (bilan thermique)',
      'Analyse de la faisabilité technique (implantation, cheminement)',
      'Conseils personnalisés sur le choix du système (mono, multi, gainable)',
      'Vérification du réseau électrique existant et raccordements',
      'Établissement d\'un devis gratuit détaillé sous 24h'
    ],
    conseilsTitle: 'Conseil de l\'expert : Pourquoi un dimensionnement précis est-il capital ?',
    conseilsContent: 'Avant d\'installer un climatiseur réversible dans votre logement ou local professionnel (à Miramas, Salon-de-Provence, Aix-en-Provence, Marseille, Istres, Arles ou dans toute la région), une étude thermique de votre pièce est essentielle. Un système sous-dimensionné fonctionnera en continu sans jamais atteindre la température de consigne, entraînant une surconsommation électrique et une usure prématurée du compresseur. À l\'inverse, un appareil sur-dimensionné engendrera des cycles courts répétés préjudiciables à la longévité de l\'électronique et du compresseur.',
    conseilsList: [
      'Choisissez l\'emplacement de l\'unité extérieure de manière à limiter les nuisances sonores pour le voisinage.',
      'Privilégiez les appareils certifiés Eurovent pour garantir les performances annoncées.',
      'Renseignez-vous sur les aides de l\'État (CEE, MaPrimeRénov\') pour réduire le coût d\'installation.'
    ],
    techniqueSpecs: [
      'Relevé précis des volumes et de l\'isolation thermique',
      'Analyse de l\'exposition solaire et des surfaces vitrées',
      'Vérification des options de passage des liaisons frigorifiques',
      'Examen du tableau électrique et des protections disponibles'
    ]
  },
  diagnostic: {
    id: 'diagnostic',
    category: 'depannage',
    name: 'Diagnostic & Rapport de panne',
    price: 100,
    duration: '45 min',
    image: '/images/hero-technician-ac.png',
    subtitle: 'Recherche de panne et rapport officiel pour assurance dans tout le 13',
    desc: 'Identification de l\'origine de votre panne (anomalie électrique, code erreur, fuite) avant réparation.',
    details: [
      'Lecture et décodage des codes défauts de la carte électronique',
      'Mesures de tension, d\'intensité et de conformité électrique',
      'Test d\'étanchéité et de pression du circuit frigorifique',
      'Contrôle des connexions électriques et resserrage des borniers',
      'Rédaction d\'un rapport de panne écrit certifié pour votre assurance'
    ],
    conseilsTitle: 'Que faire en cas de code erreur sur votre climatisation ?',
    conseilsContent: 'Si l\'unité de votre logement clignote ou affiche un code d\'erreur (ex: E1, H6, U4), il est conseillé de couper le disjoncteur dédié pendant 10 minutes puis de le réenclencher pour réinitialiser la carte. Si le problème persiste lors de notre venue (à Miramas, Istres, Salon, Aix, Marseille, Arles ou dans toute la région), ne forcez pas le démarrage de l\'appareil. Cela risquerait d\'endommager définitivement le compresseur ou d\'autres composants onéreux. Notre diagnostic technique vous permet d\'avoir une certitude sur l\'origine exacte de la panne.',
    conseilsList: [
      'Notez précisément le code erreur affiché sur la télécommande ou l\'unité intérieure.',
      'Vérifiez que le filtre à air n\'est pas complètement obturé par de la poussière.',
      'Le rapport officiel de diagnostic est indispensable pour justifier un sinistre surtension auprès de votre assureur.'
    ],
    techniqueSpecs: [
      'Contrôle électrique au multimètre des alimentations et bus de communication',
      'Mesure du delta de température (soufflage / reprise)',
      'Détection électronique de fuites de gaz frigorigène',
      'Édition du rapport technique complet pour l\'assurance'
    ]
  },
  preventive: {
    id: 'preventive',
    category: 'clim',
    name: 'Entretien climatisation préventif',
    price: 156,
    duration: '45 min',
    image: '/images/split-mural.png',
    subtitle: 'Forfait standard pour 1 unité (Mono-split) • Idéal pour l\'entretien périodique',
    desc: 'Assurez l\'efficacité de votre climatisation, économisez de l\'énergie et assainissez votre air selon les réglementations.',
    details: [
      'Nettoyage des filtres à air et de la carrosserie intérieure',
      'Désinfection de l\'évaporateur (bactéricide & fongicide certifié)',
      'Nettoyage de l\'échangeur extérieur et de son hélice',
      'Contrôle de la charge de fluide frigorigène (pressions)',
      'Vérification du débit d\'air et du delta de température',
      'Délivrance de l\'attestation d\'entretien légale obligatoire'
    ],
    conseilsTitle: 'L\'avis de l\'expert : Pourquoi entretenir sa climatisation chaque année ?',
    conseilsContent: 'L\'accumulation de poussière sur l\'évaporateur d\'un climatiseur split gêne l\'échange thermique. L\'appareil doit travailler plus pour rafraîchir ou chauffer, ce qui augmente votre facture d\'électricité de 20% à 30%. De plus, l\'humidité dans le bac à condensats favorise la prolifération de moisissures qui se diffusent dans l\'air intérieur. Un entretien préventif régulier dans toutes les Bouches-du-Rhône (rayon de 70 km) élimine ces risques pour votre santé et votre budget.',
    conseilsList: [
      'Nettoyez vous-même les filtres amovibles à l\'eau tiède une fois par mois.',
      'L\'attestation d\'entretien est obligatoire pour conserver les garanties constructeur Daikin, Mitsubishi, Atlantic, etc.',
      'Un entretien régulier double la durée de vie moyenne de votre matériel (jusqu\'à 15-20 ans).'
    ],
    techniqueSpecs: [
      'Vaporisation d\'un biocide certifié sur l\'échangeur d\'air',
      'Vérification visuelle et électronique de l\'absence de fuite',
      'Resserrage des connexions électriques',
      'Attestation de conformité réglementaire'
    ]
  },
  curative: {
    id: 'curative',
    category: 'clim',
    name: 'Entretien climatisation Curatif +++',
    price: 192,
    duration: '1 h',
    image: '/images/ac-unit.png',
    subtitle: 'Désinfection thermique à la vapeur (100°C) • Traitement anti-odeurs intensif',
    desc: 'Nettoyage en profondeur des turbines et évaporateurs encrassés pour éliminer les bactéries et moisissures incrustées.',
    details: [
      'Désinfection à la vapeur sèche à 100°C sous pression',
      'Nettoyage en profondeur de la turbine de soufflage (ClimWasher+)',
      'Application de traitements bactéricides, fongicides et anti-odeurs',
      'Nettoyage et décontamination complète du bac à condensats',
      'Contrôle d\'étanchéité électronique du circuit de fluide',
      'Vérification des vibrations et niveau sonore de l\'hélice'
    ],
    conseilsTitle: 'Quand faut-il faire un entretien curatif à la vapeur ?',
    conseilsContent: 'Si vous sentez une odeur d\'humidité ou de moisi au démarrage de votre climatisation, ou si vous observez des dépôts noirs sur la turbine de soufflage à travers les ailettes, un entretien standard ne suffira pas. Les bactéries et champignons se sont installés en profondeur. La désinfection sous pression à la vapeur sèche à 100°C est le seul procédé écologique et efficace pour décoller les graisses, détruire les agents pathogènes et assainir durablement l\'air de votre logement.',
    conseilsList: [
      'Indispensable si un membre de la famille souffre d\'allergies respiratoires ou d\'asthme.',
      'Ce nettoyage redonne au split son débit d\'air d\'origine, améliorant immédiatement le confort.',
      'Évite le bouchage des canalisations de condensats et les fuites d\'eau sur vos murs.'
    ],
    techniqueSpecs: [
      'Démontage de la carrosserie et installation d\'une bâche de protection ClimWasher+',
      'Nettoyage vapeur haute température 100°C et haute pression',
      'Traitement de désinfection fongicide intensif des bacs à condensats',
      'Mesures acoustiques et thermiques post-intervention'
    ]
  },
  'double-split': {
    id: 'double-split',
    category: 'clim',
    name: 'Double-split Entretien de climatisation',
    price: 270,
    duration: '2 h',
    image: '/images/multi-split.png',
    subtitle: 'Forfait complet de maintenance préventive pour installation bi-split',
    desc: 'Nettoyage et contrôle complet pour un système de climatisation bi-split (2 unités intérieures, 1 groupe extérieur).',
    details: [
      'Nettoyage et désinfection complète des 2 évaporateurs',
      'Traitement biocide complet sur les 2 turbines de soufflage',
      'Dépoussiérage et nettoyage complet du groupe extérieur',
      'Contrôle des pressions et de l\'étanchéité du circuit frigorifique',
      'Vérification de l\'écoulement des condensats sur les 2 réseaux',
      'Attestation d\'entretien annuelle et Cerfa d\'intervention'
    ],
    conseilsTitle: 'Entretien bi-split : Le point de vigilance sur le groupe extérieur unique',
    conseilsContent: 'Dans une installation double-split, deux pièces (par exemple le salon et une chambre) dépendent du même compresseur extérieur. Si le flux d\'air extérieur est entravé par des feuilles, de la poussière ou du pollen, le compresseur va surchauffer, ce qui dégradera les performances dans tout le logement. L\'entretien régulier de l\'échangeur extérieur dans les Bouches-du-Rhône est donc le garant de l\'équilibre thermique de vos pièces.',
    conseilsList: [
      'Vérifiez qu\'aucun arbuste ou objet ne bloque le souffle de l\'unité extérieure.',
      'Un entretien annuel est fortement préconisé pour protéger le moteur unique qui alimente vos deux splits.',
      'Bénéficiez d\'un tarif préférentiel par rapport à deux interventions isolées.'
    ],
    techniqueSpecs: [
      'Mesure du delta de température sur chaque split actif',
      'Nettoyage haute pression de l\'échangeur du groupe extérieur',
      'Nettoyage et désinfection chimique des 2 évaporateurs intérieurs',
      'Signature du Cerfa officiel avec rapport de pressions'
    ]
  },
  'tri-split': {
    id: 'tri-split',
    category: 'clim',
    name: 'Tri-split Entretien de climatisation',
    price: 380,
    duration: '2 h',
    image: '/images/multi-split.png',
    subtitle: 'Forfait complet de maintenance préventive pour installation tri-split',
    desc: 'Nettoyage et contrôle complet pour un système de climatisation tri-split (3 unités intérieures, 1 groupe extérieur).',
    details: [
      'Nettoyage et désinfection complète des 3 évaporateurs',
      'Traitement biocide complet sur les 3 turbines de soufflage',
      'Nettoyage haute pression de l\'échangeur extérieur unique',
      'Contrôle de la charge globale en fluide (haute/basse pressions)',
      'Vérification des écoulements et des pompes de relevage',
      'Attestation d\'entretien annuelle et Cerfa d\'intervention'
    ],
    conseilsTitle: 'Optimisez l\'utilisation d\'un climatiseur tri-split en Provence',
    conseilsContent: 'Un système tri-split permet de climatiser efficacement trois zones distinctes. Cependant, pour éviter que le compresseur ne consomme trop, veillez à ne pas régler des températures trop éloignées d\'une pièce à l\'autre. Nos techniciens contrôlent le rendement global de l\'installation et l\'étanchéité frigorifique, évitant ainsi des pertes de fluide qui diminueraient le rafraîchissement global.',
    conseilsList: [
      'Nettoyez régulièrement les filtres des 3 splits pour conserver un air sain dans chaque pièce.',
      'Contrôlez le bon écoulement des bacs à condensats, particulièrement dans les chambres.',
      'Bénéficiez de la remise sur le pack tri-split par rapport aux tarifs d\'unités individuelles.'
    ],
    techniqueSpecs: [
      'Relevé de température de soufflage sur les 3 unités intérieures',
      'Resserrage des connexions électriques sur le groupe extérieur et les unités',
      'Contrôle d\'étanchéité des raccords frigorifiques (détecteur électronique)',
      'Délivrance de l\'attestation d\'entretien légale'
    ]
  },
  gainable: {
    id: 'gainable',
    category: 'clim',
    name: 'Entretien de climatisation gainable',
    price: 220,
    duration: '45 min',
    image: '/images/gainable-vents.png',
    subtitle: 'Idéal pour les réseaux de gaines centralisés et régulations Airzone',
    desc: 'Nettoyage de l\'unité intérieure dissimulée en combles et désinfection du réseau aéraulique.',
    details: [
      'Nettoyage des filtres de reprise d\'air (grilles de reprise)',
      'Désinfection des gaines par nébulisation / fumigène bactéricide',
      'Inspection de l\'unité intérieure logée en combles/faux-plafond',
      'Contrôle de la régulation de zone (thermostats et registres)',
      'Vérification du bon écoulement de la vidange des condensats',
      'Signature et remise de l\'attestation d\'entretien périodique'
    ],
    conseilsTitle: 'Entretien Gainable : L\'importance cruciale de la désinfection des gaines',
    conseilsContent: 'Contrairement aux splits muraux, une climatisation gainable diffuse l\'air via un réseau de gaines caché dans vos combles ou faux-plafonds. Si la poussière ou l\'humidité s\'y installe, des odeurs désagréables se propageront dans toute la maison. L\'entretien nécessite l\'utilisation d\'un fumigène ou d\'un nébulisateur biocide afin de traiter l\'intérieur même des gaines sur toute leur longueur, garantissant un air sain.',
    conseilsList: [
      'Le filtre de reprise d\'air (souvent dans le couloir) doit être aspiré toutes les 3 semaines en été.',
      'Un filtre encrassé limite le débit d\'air et peut forcer le système gainable à geler dans les combles.',
      'Vérifiez le bon fonctionnement des registres motorisés Airzone pour optimiser la régulation.'
    ],
    techniqueSpecs: [
      'Inspection visuelle de l\'unité intérieure de type plénum en combles',
      'Traitement de désinfection fongicide par nébulisation aéraulique',
      'Nettoyage de l\'échangeur et vérification du moteur de ventilation',
      'Vérification de l\'étanchéité des conduits pour éviter les pertes d\'air chaud/froid'
    ]
  },
  console: {
    id: 'console',
    category: 'clim',
    name: 'Entretien de climatisation console',
    price: 154,
    duration: '45 min',
    image: '/images/console-ac.png',
    subtitle: 'Nettoyage complet pour climatiseur console basse au sol',
    desc: 'Entretien complet et désinfection pour climatiseur de type console basse posée ou fixée au sol.',
    details: [
      'Nettoyage des filtres d\'aspiration bas et des grilles de diffusion',
      'Désinfection de l\'évaporateur double flux de la console',
      'Nettoyage de l\'unité extérieure associée',
      'Mesure d\'intensité du compresseur et contrôle des connexions',
      'Vérification de l\'étanchéité frigorifique réglementaire',
      'Remise du rapport de contrôle annuel'
    ],
    conseilsTitle: 'Conseil de l\'expert : Pourquoi la console basse s\'encrasse-t-elle plus vite ?',
    conseilsContent: 'La console basse est positionnée près du sol, comme un radiateur. Cette position basse fait qu\'elle aspire beaucoup plus facilement les poussières, poils d\'animaux et fibres de tapis qui circulent au niveau du sol. Ses filtres s\'obstruent donc plus rapidement que ceux d\'un split mural placé en hauteur. Il est donc recommandé d\'inspecter régulièrement sa console (à Miramas, Salon, Aix, Marseille ou alentours) pour éviter une baisse de débit d\'air.',
    conseilsList: [
      'Nettoyez le filtre à air de la console toutes les 2 à 3 semaines si vous avez des animaux de compagnie.',
      'Vérifiez que le flux d\'air vers le haut et vers le bas n\'est pas bloqué par des meubles.',
      'Un entretien annuel évite l\'encrassement de la turbine tangentielle double flux.'
    ],
    techniqueSpecs: [
      'Nettoyage de l\'évaporateur double flux à l\'aide d\'un désinfectant certifié',
      'Vérification du bac à condensats inférieur',
      'Mesure de charge et pression du fluide frigorigène',
      'Resserrage des connexions électriques de la console'
    ]
  },
  cassette: {
    id: 'cassette',
    category: 'clim',
    name: 'Entretien de climatisation cassette',
    price: 180,
    duration: '45 min',
    image: '/images/cassette-ac.png',
    subtitle: 'Nettoyage de cassette de soufflage 4 voies encastrée dans le plafond',
    desc: 'Entretien et désinfection de cassette de soufflage 4 voies encastrée dans le plafond (bureaux et commerces).',
    details: [
      'Nettoyage de la grille d\'aspiration et du filtre 4 voies',
      'Nettoyage du bac à condensats et test de la pompe de relevage',
      'Désinfection complète de l\'échangeur circulaire interne',
      'Nettoyage haute pression du condenseur extérieur',
      'Contrôle d\'intensité moteur et étanchéité fluide frigorigène',
      'Attestation de contrôle réglementaire remise'
    ],
    conseilsTitle: 'Entretien de Cassette : La pompe de relevage, organe sensible des bureaux',
    conseilsContent: 'Les cassettes encastrées dans le plafond utilisent une pompe de relevage électrique pour évacuer l\'eau des condensats vers l\'extérieur. Si des algues ou de la poussière s\'accumulent dans le bac inférieur de la cassette, la pompe se bouche et tombe en panne, provoquant un débordement d\'eau et des dégâts sur votre faux-plafond. Notre intervention comprend le nettoyage complet de ce bac et le test de bon fonctionnement de la pompe.',
    conseilsList: [
      'Recommandé dans les commerces, bureaux et cabinets médicaux tous les ans.',
      'L\'accumulation de poussière sur le filtre 4 voies réduit le confort des salariés et clients.',
      'Les cassettes fonctionnent souvent de longues heures en tertiaire, nécessitant un suivi rigoureux.'
    ],
    techniqueSpecs: [
      'Démontage de la grille d\'aspiration et du filtre à air circulaire',
      'Nettoyage approfondi et désinfection du bac à condensats',
      'Test de fonctionnement électrique de la pompe de relevage',
      'Mesures de températures de soufflage et de reprise'
    ]
  },
  vrv: {
    id: 'vrv',
    category: 'clim',
    name: 'Entretien Système VRV / DRV',
    price: 0,
    duration: 'Sur mesure',
    image: '/images/vrv-commercial.png',
    subtitle: 'Hôtels • Restaurants • Bureaux • ERP — Remise –10% automatique',
    desc: 'Solution de maintenance taillée pour les installations VRV (Daikin) et DRV (Mitsubishi, Samsung) dans les bâtiments tertiaires et de grande surface habitable. Composez librement la liste de vos unités intérieures pour obtenir un tarif remisé de 10% automatiquement.',
    details: [
      'Contrôle pression du circuit frigorifique principal (haute/basse)',
      'Nettoyage de l\'unité extérieure VRV — condenseur et ventilateurs',
      'Désinfection de chaque unité intérieure (splits, cassettes, gainables, consoles)',
      'Vérification des modules bus de communication BACnet / Modbus',
      'Contrôle et nettoyage des grilles et filtres des centrales de traitement d\'air',
      'Rapport d\'inspection multi-zones avec attestation Cerfa annuelle',
      'Tarification à la composition : –10% sur chaque unité en installation VRV'
    ],
    conseilsTitle: 'Hôtels, Restaurants : Pourquoi le suivi d\'un système VRV/DRV est-il stratégique ?',
    conseilsContent: 'Un système VRV (ou DRV) relie des dizaines d\'unités intérieures à un seul groupe de forte puissance. Dans un hôtel, restaurant ou établissement en Provence (Miramas, Salon, Aix, Marseille, Arles...), une panne sur le groupe extérieur met à l\'arrêt l\'ensemble de l\'établissement. Un entretien planifié permet d\'éviter ce sinistre en contrôlant l\'usure du compresseur Inverter, l\'état des vannes solénoïdes et la communication du réseau de régulation. Notre configurateur de tarification applique automatiquement une réduction de 10% sur chaque unité pour les systèmes VRV.',
    conseilsList: [
      'L\'entretien bisannuel est une obligation légale pour les installations contenant plus de 2 kg de fluide.',
      'Un rapport par zone est fourni pour faciliter la gestion de votre registre de sécurité.',
      'Le suivi de la charge frigorifique permet d\'anticiper les fuites lentes néfastes pour l\'environnement et le rendement.'
    ],
    techniqueSpecs: [
      'Diagnostic complet via logiciel de maintenance Daikin/Mitsubishi',
      'Vérification de l\'état de marche de l\'ensemble des cartes électroniques',
      'Nettoyage approfondi des grilles de condenseurs extérieurs de grande taille',
      'Attestation de contrôle annuel d\'étanchéité des fluides'
    ]
  },
  thermodynamique: {
    id: 'thermodynamique',
    category: 'pac',
    name: 'Entretien ballon thermodynamique',
    price: 174,
    duration: '45 min',
    image: '/images/heat-pump.png',
    subtitle: 'Contrôle complet de chauffe-eau thermodynamique et protection anti-corrosion',
    desc: 'Contrôle annuel complet pour chauffe-eau thermodynamique pour assurer la production d\'eau chaude et la sécurité.',
    details: [
      'Nettoyage du filtre à air et évaporateur de la PAC intégrée',
      'Vérification de l\'usure de l\'anode de protection du ballon',
      'Contrôle de la pression hydraulique du circuit ECS',
      'Test de fonctionnement de la résistance d\'appoint électrique',
      'Contrôle des connexions électriques et serrages',
      'Rapport technique de maintenance remis au client'
    ],
    conseilsTitle: 'Comment prolonger la durée de vie de votre chauffe-eau thermodynamique ?',
    conseilsContent: 'Le chauffe-eau thermodynamique utilise une petite pompe à chaleur pour chauffer l\'eau sanitaire. Il dispose d\'une anode (en magnésium ou en titane) pour protéger la cuve contre la corrosion de l\'eau. Si l\'anode en magnésium est usée (consommée à plus de 50%), le ballon commencera à rouiller, ce qui provoquera une fuite irréversible sous quelques années. Notre entretien vérifie cet élément protecteur crucial ainsi que le filtre à air de la PAC.',
    conseilsList: [
      'Nettoyez régulièrement la grille d\'aspiration d\'air pour éviter que la PAC intégrée ne force.',
      'Un ballon entretenu produit de l\'eau chaude jusqu\'à 3 fois moins cher qu\'un chauffe-eau électrique classique.',
      'Le contrôle du groupe de sécurité évite les pertes d\'eau continues.'
    ],
    techniqueSpecs: [
      'Mesure du courant de protection de l\'anode (anode titane ACI)',
      'Nettoyage de l\'évaporateur de la pompe à chaleur air/eau intégrée',
      'Vérification du fonctionnement de la soupape de sécurité du chauffe-eau',
      'Contrôle des cycles de fonctionnement et de la résistance d\'appoint'
    ]
  },
  'pac-air-eau': {
    id: 'pac-air-eau',
    category: 'pac',
    name: 'Entretien Pompe à Chaleur Air/Eau',
    price: 270,
    duration: '45 min',
    image: '/images/pac-air-eau.png',
    subtitle: 'Entretien annuel obligatoire pour systèmes de chauffage hydraulique',
    desc: 'Vérification et optimisation de votre pompe à chaleur pour garantir la longévité du chauffage et de l\'eau chaude.',
    details: [
      'Nettoyage de l\'échangeur thermique extérieur (dépoussiérage)',
      'Contrôle de la pression et du débit hydraulique du circuit',
      'Vérification de pression du vase d\'expansion et soupapes',
      'Contrôle de la qualité de l\'eau (boues, pH, glycol)',
      'Test d\'étanchéité électronique du circuit de fluide',
      'Remise du Cerfa réglementaire et de l\'attestation d\'entretien'
    ],
    conseilsTitle: 'Pompe à Chaleur Air/Eau : La qualité de l\'eau du circuit, clé de voûte de votre chauffage',
    conseilsContent: 'Une pompe à chaleur air/eau alimente un réseau de radiateurs ou un plancher chauffant. Avec le temps, l\'eau du circuit s\'oxyde et forme des boues (dépôts de fer et calcaire) qui bouchent l\'échangeur à plaques de la PAC. Cela réduit considérablement le transfert de chaleur, augmente votre consommation électrique et peut casser le compresseur. Notre technicien contrôle la qualité de l\'eau et préconise un désembouage si nécessaire.',
    conseilsList: [
      'L\'entretien annuel prévient les chutes de pression hydraulique qui coupent le chauffage en plein hiver.',
      'Conservez les attestations d\'entretien fournies, elles sont exigées par les assurances et en cas de revente du logement.',
      'Un circuit propre réduit l\'effort du circulateur électrique.'
    ],
    techniqueSpecs: [
      'Contrôle de la charge de fluide frigorigène par mesure de surchauffe/sous-refroidissement',
      'Vérification de la pression du vase d\'expansion (recharge d\'azote si nécessaire)',
      'Analyse de l\'eau du réseau (détection de boues ou manque d\'inhibiteur)',
      'Signature et délivrance du Cerfa officiel de contrôle d\'étanchéité'
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(SERVICES_CATALOG).map((service) => ({
    service,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const data = SERVICES_CATALOG[service];
  if (!data) return { title: 'Prestation - Air G Énergie' };

  const alternates = await getSeoAlternates(`/reservation-en-ligne/${service}`);

  return {
    title: `${data.name} | Bouches-du-Rhône & Rayon 70 km | Tarif & Réservation | Air G Énergie`,
    description: `${data.subtitle}. ${data.desc} Intervention sous 48h dans un rayon de 70km autour de Miramas, Salon, Aix, Marseille, Arles, Martigues. Prenez rendez-vous en ligne.`,
    alternates,
    openGraph: {
      title: `${data.name} | Air G Énergie`,
      description: data.desc,
      url: alternates.canonical,
      siteName: 'Air G Énergie',
      images: [
        {
          url: data.image,
          width: 800,
          height: 600,
          alt: data.name,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = SERVICES_CATALOG[service];

  if (!data) {
    return notFound();
  }

  const domain = await getSeoDomain();
  const pageUrl = `${domain}/reservation-en-ligne/${service}`;

  // Schéma structuré Product & Offer Google Merchant
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${data.name} — Air G Énergie`,
    'image': `${domain}${data.image}`,
    'description': data.desc,
    'brand': {
      '@type': 'Brand',
      'name': 'Air G Énergie'
    },
    'offers': {
      '@type': 'Offer',
      'price': String(data.price),
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock',
      'url': pageUrl,
      'priceValidUntil': '2027-12-31',
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'price': String(data.price),
        'priceCurrency': 'EUR',
        'valueAddedTaxIncluded': 'true',
        'description': data.price === 0 ? 'Étude et devis gratuit sur place' : 'Forfait main d\'œuvre et déplacement inclus'
      },
      'seller': {
        '@type': 'LocalBusiness',
        'name': 'Air G Énergie',
        'telephone': '04 13 41 49 01',
        'image': `${domain}/logo.png`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Miramas',
          'postalCode': '13140',
          'addressRegion': 'Bouches-du-Rhône',
          'addressCountry': 'FR'
        }
      }
    }
  };

  const formattedPrice = data.price === 0 ? 'Gratuit' : `${data.price} €`;

  return (
    <div className="service-detail-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <nav style={{ background: 'white', padding: '1rem 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
            <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/reservation-en-ligne" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Réservation en ligne</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{data.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0091DA 0%, #006BA6 100%)',
        color: 'white',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <span style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'inline-block'
              }}>
                Fiche Prestation
              </span>
              <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>{data.name}</h1>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.95)', marginBottom: '1.75rem', lineHeight: '1.6' }}>{data.desc}</p>
              
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={20} />
                  <span>Durée : <strong>{data.duration}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} />
                  <span>Tarif : <strong>{formattedPrice}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} />
                  <span>Garantie Décennale & Entreprise Garantie 2025</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#reserve" className="btn btn-primary" style={{ background: '#48BB78', borderColor: '#48BB78', padding: '0.75rem 1.75rem', fontWeight: '700' }}>
                  Planifier cette prestation
                </a>
                <a href="tel:0413414901" className="btn" style={{ border: '2px solid white', color: 'white', background: 'transparent', padding: '0.75rem 1.75rem', fontWeight: '600' }}>
                  Conseil au 04 13 41 49 01
                </a>
              </div>
            </div>
            <div style={{ flex: '1 1 350px', position: 'relative', height: '280px', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <Image src={data.image} alt={data.name} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Expert Advice Section */}
      <section className="section-padding" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
            {/* Left side: Advice & technical details */}
            <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Detailed specifications card */}
              <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={22} style={{ color: 'var(--primary-blue)' }} /> Détails techniques de l&apos;intervention
                </h2>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Nos techniciens réalisent un protocole strict lors de chaque visite d&apos;entretien ou de contrôle afin de garantir la conformité aux exigences réglementaires.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {data.techniqueSpecs.map((spec, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <Check size={16} style={{ color: '#48BB78', marginTop: '0.2rem', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4' }}>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Advice Section */}
              <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2.5rem 2rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={22} style={{ color: '#FF6B00' }} /> {data.conseilsTitle}
                </h2>
                <p style={{ fontSize: '1.025rem', lineHeight: '1.8', color: '#334155', marginBottom: '1.5rem' }}>
                  {data.conseilsContent}
                </p>
                
                <div style={{ background: '#FFF7ED', borderLeft: '4px solid #FF6B00', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#9A3412', marginBottom: '0.75rem' }}>
                    Recommandations de sécurité & d&apos;usage :
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {data.conseilsList.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: '#7C2D12', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#FF6B00', fontWeight: 'bold' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Serviced Cities / SEO Local */}
              <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-blue)' }} /> Villes & Zones desservies en Provence (Rayon jusqu&apos;à 100 km)
                </h2>
                <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                  Nos équipes techniques interviennent à domicile ou en entreprise pour l&apos;étude, l&apos;installation, l&apos;entretien et le dépannage de votre climatisation ou pompe à chaleur à <strong>Miramas</strong> (13140), <strong>Salon-de-Provence</strong>, <strong>Istres</strong>, <strong>Saint-Chamas</strong>, <strong>Grans</strong>, <strong>Lançon-de-Provence</strong>, <strong>Pélissanne</strong>, <strong>Marseille</strong>, <strong>Aix-en-Provence</strong>, <strong>Martigues</strong>, <strong>Arles</strong>, <strong>Carry-le-Rouet</strong>, <strong>Sausset-les-Pins</strong>, <strong>La Ciotat</strong>, <strong>Mouriès</strong>, <strong>Maussane-les-Alpilles</strong>, <strong>Saint-Martin-de-Crau</strong>, <strong>Vitrolles</strong>, <strong>Marignane</strong> et toutes les communes alentour dans un rayon allant jusqu&apos;à 100 km.
                </p>
                <div style={{ background: '#F0F9FF', borderLeft: '4px solid #0091DA', padding: '1rem 1.25rem', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#0369A1', lineHeight: '1.55', margin: 0, fontWeight: '500' }}>
                    💡 <strong>Engagement Conseils & Confort :</strong> Nos experts frigoristes font leur maximum pour analyser la configuration de votre logement ou local et vous apporter les meilleurs conseils orientés confort et économies d&apos;énergie. Nous vous préconisons la solution la plus adaptée à vos besoins : <strong>Climatisation Gainable réversible</strong> (invisible), <strong>Split mural performant</strong>, <strong>Console basse</strong> ou <strong>Pompe à chaleur Air/Eau</strong>.
                  </p>
                </div>
              </div>

            </div>

            {/* Right side: Summary & reassurance box */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'sticky', top: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>Votre réservation en ligne :</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#475569' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Prestation :</span>
                    <strong style={{ textAlign: 'right', color: '#0F172A' }}>{data.name}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Durée :</span>
                    <strong style={{ color: '#0F172A' }}>{data.duration}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                    <span>Tarif :</span>
                    <strong style={{ color: 'var(--primary-blue)', fontSize: '1.15rem' }}>{formattedPrice}</strong>
                  </li>
                </ul>
                <a href="#reserve" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none', background: 'linear-gradient(135deg, #0091DA 0%, #0077B6 100%)', border: 'none', fontWeight: '700' }}>
                  Choisir ce forfait
                </a>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #E2E8F0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.75rem' }}>Nos Garanties Professionnelles</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: '#64748B' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} style={{ color: '#48BB78' }} /> Frigoristes certifiés (Attestation de capacité)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} style={{ color: '#48BB78' }} /> Assurance Décennale et Responsabilité Civile
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} style={{ color: '#48BB78' }} /> Expert Vérifié Gainable.fr & Labellisé Garantie 2025
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Wizard Section */}
      <section id="reserve" style={{ padding: '5rem 0', background: 'white', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#48BB78',
              background: 'rgba(72,187,120,0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Réservation immédiate
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#0F172A', fontWeight: '800', marginBottom: '1rem' }}>
              Planifiez Votre Date & Heure
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem' }}>
              Sélectionnez ci-dessous votre créneau disponible dans notre planning. Le forfait <strong>{data.name}</strong> est pré-sélectionné.
            </p>
          </div>

          <BookingWizard initialServiceId={data.id} />
        </div>
      </section>
    </div>
  );
}
