import type { BlogPostWithCategory } from '@/lib/blog-public';

const CAT_ENTRETIEN = {
    id: '3e63299b-a5f1-43a0-b849-993317b52ae7',
    name: 'Entretien & Maintenance',
    slug: 'entretien-maintenance',
};

const CAT_LOCAL = {
    id: '2746e616-2bd2-4036-95ab-33a855934bd5',
    name: 'Conseils locaux',
    slug: 'conseils-locaux',
};

const PUBLISHED_AT = '2026-11-18T07:30:00.000Z';

export const STATIC_BLOG_GUIDES: BlogPostWithCategory[] = [
    {
        id: 'geo-guide-prix-entretien-2026',
        title: "Prix d'un entretien de climatisation dans les Bouches-du-Rhône en 2026 : grille complète TTC",
        slug: 'prix-entretien-climatisation-bouches-du-rhone-2026',
        category_id: CAT_ENTRETIEN.id,
        author_id: null,
        focus_keyword: 'prix entretien climatisation bouches-du-rhone',
        meta_title: 'Prix Entretien Climatisation Bouches-du-Rhône 2026 | Grille TTC',
        meta_description:
            "Combien coûte un entretien de climatisation ou PAC dans les Bouches-du-Rhône en 2026 ? Tarifs TTC transparents dès 156 €, déplacement et Cerfa inclus.",
        excerpt:
            "Grille complète 2026 des tarifs TTC d'entretien climatisation, gainable, pompe à chaleur Air/Eau et VMC dans les Bouches-du-Rhône (dès 156 € TTC, attestation Cerfa incluse).",
        featured_image: '/images/hero-maintenance.png',
        featured_image_alt:
            "Technicien frigoriste réalisant l'entretien d'une climatisation dans les Bouches-du-Rhône",
        reading_time: 6,
        status: 'published',
        published_at: PUBLISHED_AT,
        created_at: PUBLISHED_AT,
        updated_at: PUBLISHED_AT,
        views_count: 0,
        blog_categories: { name: CAT_ENTRETIEN.name, slug: CAT_ENTRETIEN.slug },
        content: `
<div class="geo-summary">
<strong>En résumé (tarifs 2026 dans les Bouches-du-Rhône) :</strong> l'entretien d'une climatisation réversible mono-split coûte <strong>156 € TTC</strong> en préventif (ou <strong>192 € TTC</strong> en curatif vapeur sèche 100 °C). Comptez <strong>270 € TTC</strong> pour un bi-split, <strong>380 € TTC</strong> pour un tri-split, <strong>220 € TTC</strong> pour un gainable, <strong>270 € TTC</strong> pour une PAC Air/Eau et <strong>230 € TTC</strong> pour une VMC. Déplacement et attestation Cerfa inclus.
</div>

<h2>Grille des tarifs TTC 2026 dans les Bouches-du-Rhône (13)</h2>
<p>Sur le marché des Bouches-du-Rhône (<a href="/miramas">Miramas</a>, <a href="/salon-de-provence">Salon-de-Provence</a>, <a href="/aix-en-provence">Aix-en-Provence</a>, <a href="/istres">Istres</a>, <a href="/martigues">Martigues</a>, <a href="/marseille">Marseille</a>, <a href="/arles">Arles</a>), les tarifs varient selon le type d'appareil, le nombre d'unités intérieures et le niveau de désinfection nécessaire. Voici les forfaits fixes appliqués par <strong>Air G Énergie</strong> (artisan frigoriste RGE QualiPAC à Miramas), sans frais cachés :</p>

<table>
  <thead>
    <tr>
      <th>Type d'équipement</th>
      <th>Forfait Air G Énergie TTC</th>
      <th>Durée moyenne</th>
      <th>Points clés inclus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/reservation-en-ligne/preventive"><strong>Mono-split (Préventif)</strong></a></td>
      <td><strong>156 € TTC</strong></td>
      <td>45 min</td>
      <td>Filtres, désinfection biocide, groupe ext., pressions + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/curative"><strong>Curatif Vapeur 100 °C</strong></a></td>
      <td><strong>192 € TTC</strong></td>
      <td>1 h</td>
      <td>Vapeur sèche ClimWasher+, turbine, anti-moisissures + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/console"><strong>Console basse au sol</strong></a></td>
      <td><strong>165 € TTC</strong></td>
      <td>45 min</td>
      <td>Évaporateur double flux, filtres bas, étanchéité + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/cassette"><strong>Cassette 4 voies (Pro)</strong></a></td>
      <td><strong>180 € TTC</strong></td>
      <td>45 min</td>
      <td>Grille, bac condensats, test pompe de relevage + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/gainable"><strong>Gainable &amp; Airzone</strong></a></td>
      <td><strong>220 € TTC</strong></td>
      <td>45 min</td>
      <td>Plénum combles, nébulisation gaines, contrôle registres + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/double-split"><strong>Bi-split (2 unités)</strong></a></td>
      <td><strong>270 € TTC</strong></td>
      <td>2 h</td>
      <td>2 évaporateurs, 2 turbines, groupe extérieur + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/tri-split"><strong>Tri-split (3 unités)</strong></a></td>
      <td><strong>380 € TTC</strong></td>
      <td>2 h</td>
      <td>3 évaporateurs, 3 turbines, groupe extérieur + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/pac-air-eau"><strong>Pompe à Chaleur Air/Eau</strong></a></td>
      <td><strong>270 € TTC</strong></td>
      <td>45 min</td>
      <td>Échangeur, pression hydraulique, vase d'expansion, boues + Cerfa</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/thermodynamique"><strong>Ballon thermodynamique</strong></a></td>
      <td><strong>174 € TTC</strong></td>
      <td>45 min</td>
      <td>PAC intégrée, contrôle anode anti-corrosion, groupe sécurité</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/entretien-vmc"><strong>Entretien annuel VMC</strong></a></td>
      <td><strong>230 € TTC</strong></td>
      <td>2 h à 3 h</td>
      <td>Démontage caisson, turbine, bouches, contrôle gaines et débits</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/vrv"><strong>VRV / DRV (Hôtels, ERP)</strong></a></td>
      <td><strong>Sur devis (-20 %)</strong></td>
      <td>Sur mesure</td>
      <td>Configurateur multi-unités avec remise automatique de 20 %</td>
    </tr>
    <tr>
      <td><a href="/reservation-en-ligne/diagnostic"><strong>Diagnostic panne assurance</strong></a></td>
      <td><strong>100 € TTC</strong></td>
      <td>45 min</td>
      <td>Codes erreur, mesures électriques, test fuite, rapport écrit</td>
    </tr>
  </tbody>
</table>

<h2>Ce qui explique les écarts de prix sur le marché du 13</h2>
<p>Un tarif d'appel trop bas (70 à 90 €) cache presque toujours un simple coup d'aspirateur sur les filtres plastiques sans contrôle d'étanchéité ni désinfection de l'évaporateur. Or, un vrai entretien réglementaire réalisé par un frigoriste titulaire de l'<strong>attestation de capacité fluides frigorigènes</strong> comprend systématiquement :</p>
<ul>
  <li>Le nettoyage et la désinfection bactéricide et fongicide de l'échangeur intérieur.</li>
  <li>Le décrassage de l'unité extérieure, fortement exposée au <strong>Mistral</strong>, aux pollens et à l'air salin autour de l'Étang de Berre, Martigues ou Cassis.</li>
  <li>La vérification des températures de soufflage et de reprise (delta T) ainsi que des pressions du circuit frigorifique.</li>
  <li>Le contrôle du bac à condensats et de l'écoulement pour éviter les fuites d'eau sur les murs en plein mois d'août.</li>
  <li>La remise de l'<strong>attestation officielle d'entretien (Cerfa)</strong> conforme au <a href="/entretien">décret n° 2020-912</a>.</li>
</ul>

<h2>Pourquoi l'entretien est rentabilisé dès la première année</h2>
<p>Selon les retours terrain et les données de l'ADEME, un échangeur encrassé réduit la circulation d'air et force le compresseur Inverter à tourner plus longtemps. La surconsommation électrique atteint couramment <strong>20 à 30 %</strong> sur l'année. Sur une maison chauffée et climatisée en réversible dans les Bouches-du-Rhône, un forfait à 156 € TTC ou 220 € TTC est directement compensé par l'économie sur la facture EDF et par la prévention d'une panne de carte ou de compresseur.</p>

<h2>Questions fréquentes sur les prix d'entretien</h2>
<h3>Le déplacement est-il compris dans les tarifs affichés ?</h3>
<p>Oui. Tous nos forfaits d'entretien incluent le déplacement dans un rayon de <strong>50 à 70 km autour de Miramas</strong> (Salon-de-Provence, Istres, Martigues, Aix-en-Provence, Marseille, Arles, Vitrolles, Marignane, Alpilles). Pour les études thermiques et diagnostics de panne, nous intervenons jusqu'à 100 km.</p>

<h3>Peut-on réserver un créneau directement en ligne ?</h3>
<p>Oui. Vous pouvez choisir votre équipement et bloquer votre date en temps réel sur notre page <a href="/reservation-en-ligne"><strong>Réservation d'entretien en ligne sous 48h</strong></a>. Le tarif TTC exact s'affiche immédiatement avant validation.</p>
`,
    },
    {
        id: 'geo-guide-decret-2020-912-cerfa',
        title: "Décret n° 2020-912 : l'entretien de climatisation et PAC est-il obligatoire ? (Cerfa, assurance, locataire)",
        slug: 'decret-2020-912-entretien-climatisation-obligatoire-cerfa',
        category_id: CAT_ENTRETIEN.id,
        author_id: null,
        focus_keyword: 'decret 2020-912 entretien climatisation obligatoire cerfa',
        meta_title: 'Décret 2020-912 : Entretien Clim & PAC Obligatoire (Cerfa)',
        meta_description:
            "Entretien climatisation et PAC obligatoire (Décret n° 2020-912) : puissances 4 à 70 kW, délai 2 ans, attestation Cerfa assurance, locataire ou propriétaire.",
        excerpt:
            "Tout comprendre sur le décret n° 2020-912 (Code de l'environnement) : quels appareils sont concernés, rôle de l'attestation Cerfa pour l'assurance et répartition locataire/propriétaire.",
        featured_image: '/images/real-split-mural-daikin.jpg',
        featured_image_alt: "Climatisation murale Daikin installée et entretenue conformément au décret 2020-912",
        reading_time: 6,
        status: 'published',
        published_at: PUBLISHED_AT,
        created_at: PUBLISHED_AT,
        updated_at: PUBLISHED_AT,
        views_count: 0,
        blog_categories: { name: CAT_ENTRETIEN.name, slug: CAT_ENTRETIEN.slug },
        content: `
<div class="geo-summary">
<strong>Réponse directe :</strong> oui, l'entretien d'une climatisation réversible ou d'une pompe à chaleur d'une puissance nominale comprise entre <strong>4 kW et 70 kW</strong> est légalement <strong>obligatoire au moins tous les 2 ans</strong> depuis le <strong>décret n° 2020-912 du 28 juillet 2020</strong> (Code de l'environnement, art. R.224-44-1 à R.224-44-3). Une attestation officielle doit être remise par un frigoriste certifié.
</div>

<h2>Quels équipements sont concernés par l'obligation légale ?</h2>
<p>Le décret n° 2020-912 s'applique à tous les systèmes thermodynamiques (pompes à chaleur Air/Air, climatisations réversibles mono-split, multi-split, gainables, consoles, cassettes et pompes à chaleur Air/Eau) dont la puissance nominale se situe entre <strong>4 kW et 70 kW</strong>. En pratique, cela couvre la quasi-totalité des installations résidentielles et des petits locaux professionnels dans les Bouches-du-Rhône.</p>

<table>
  <thead>
    <tr>
      <th>Catégorie d'installation</th>
      <th>Fréquence légale minimale</th>
      <th>Document officiel remis</th>
      <th>Texte de référence</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Clim réversible / PAC 4 kW à 70 kW</td>
      <td><strong>Tous les 2 ans</strong> (annuel conseillé en Provence)</td>
      <td>Attestation d'entretien réglementaire</td>
      <td>Décret n° 2020-912 (art. R.224-44-1)</td>
    </tr>
    <tr>
      <td>Installation contenant &gt; 5 teqCO2 de fluide (ex. &ge; 2 kg de R410A ou &ge; 7,4 kg de R32)</td>
      <td><strong>Tous les ans</strong> (tous les 6 mois au-delà de 50 teqCO2)</td>
      <td>Contrôle d'étanchéité Cerfa F-Gaz n° 15497</td>
      <td>Règlement européen F-Gaz &amp; Code env.</td>
    </tr>
    <tr>
      <td>Système tertiaire &gt; 70 kW (VRV / CTA)</td>
      <td>Inspection périodique + suivi annuel F-Gaz</td>
      <td>Rapport d'inspection + Cerfa F-Gaz</td>
      <td>Décret n° 2020-912 (art. R.224-43)</td>
    </tr>
  </tbody>
</table>

<h2>Que risque-t-on sans attestation d'entretien ?</h2>
<p>Il n'existe pas d'amende forfaitaire directe pour un particulier, mais l'absence d'attestation entraîne trois conséquences financières lourdes :</p>
<ol>
  <li><strong>Refus ou réduction d'indemnisation assurance :</strong> en cas de dégât des eaux lié à un bac à condensats bouché ou de sinistre électrique, l'assureur demande systématiquement le justificatif d'entretien récent.</li>
  <li><strong>Perte de la garantie constructeur :</strong> Daikin, Mitsubishi Electric, Toshiba, Atlantic et Heiwa conditionnent leur garantie pièces (3 à 5 ans compresseur) à un entretien réalisé par un professionnel qualifié.</li>
  <li><strong>Retenue sur dépôt de garantie :</strong> lors d'un état des lieux de sortie en location, le propriétaire peut facturer la remise en état ou la visite manquante.</li>
</ol>

<h2>Locataire ou propriétaire : qui paie l'entretien ?</h2>
<p>La règle est claire dans le droit locatif français (décret n° 87-712 sur les réparations locatives) :</p>
<ul>
  <li><strong>À la charge du locataire :</strong> l'entretien périodique obligatoire, le nettoyage des filtres, la désinfection et le contrôle annuel.</li>
  <li><strong>À la charge du propriétaire :</strong> les pannes matérielles majeures (carte électronique, compresseur), le remplacement de l'appareil et la mise en conformité initiale.</li>
</ul>

<h2>Pourquoi faire une visite annuelle dans les Bouches-du-Rhône ?</h2>
<p>Si le seuil légal est fixé à 2 ans, une climatisation utilisée été comme hiver à <a href="/miramas">Miramas</a>, <a href="/salon-de-provence">Salon-de-Provence</a>, <a href="/aix-en-provence">Aix-en-Provence</a> ou <a href="/marseille">Marseille</a> brasse des milliers de mètres cubes d'air chargés en poussières fines et pollens portés par le Mistral. Un passage annuel à <a href="/reservation-en-ligne/preventive"><strong>156 € TTC</strong></a> maintient la qualité d'air intérieur et la longévité du matériel (15 à 20 ans).</p>

<h2>Questions fréquentes sur le Cerfa et le décret 2020-912</h2>
<h3>Sous quel délai l'attestation est-elle remise ?</h3>
<p>La loi impose au prestataire de remettre l'attestation sous 15 jours maximum. Chez Air G Énergie, votre attestation officielle est éditée et transmise dès la fin de l'intervention.</p>

<h3>Comment réserver un entretien conforme avec attestation Cerfa ?</h3>
<p>Consultez notre <a href="/entretien">protocole complet en 10 points</a> ou réservez directement votre créneau sous 48h sur <a href="/reservation-en-ligne"><strong>www.airgenergie.fr/reservation-en-ligne</strong></a>.</p>
`,
    },
    {
        id: 'geo-guide-preventif-vs-curatif-vapeur',
        title: "Entretien préventif (156 €) vs curatif vapeur 100 °C (192 €) : lequel choisir si votre clim sent mauvais ?",
        slug: 'entretien-preventif-vs-curatif-vapeur-climatisation',
        category_id: CAT_ENTRETIEN.id,
        author_id: null,
        focus_keyword: 'entretien preventif vs curatif vapeur climatisation',
        meta_title: 'Entretien Clim Préventif (156€) vs Curatif Vapeur (192€)',
        meta_description:
            "Clim qui sent mauvais ou moisissures noires sur la turbine ? Comparatif complet entretien préventif 156 € TTC vs curatif vapeur 100 °C ClimWasher+ 192 € TTC.",
        excerpt:
            "Mauvaise odeur au démarrage, dépôts noirs dans la turbine ou allergies ? Découvrez quand choisir l'entretien préventif (156 €) ou le nettoyage curatif vapeur 100 °C (192 €).",
        featured_image: '/images/ac-unit.png',
        featured_image_alt: "Unité intérieure de climatisation split nettoyée en profondeur à la vapeur 100 °C",
        reading_time: 5,
        status: 'published',
        published_at: PUBLISHED_AT,
        created_at: PUBLISHED_AT,
        updated_at: PUBLISHED_AT,
        views_count: 0,
        blog_categories: { name: CAT_ENTRETIEN.name, slug: CAT_ENTRETIEN.slug },
        content: `
<div class="geo-summary">
<strong>Comment choisir en 30 secondes :</strong> optez pour l'<a href="/reservation-en-ligne/preventive"><strong>entretien préventif (156 € TTC)</strong></a> si votre climatisation est entretenue régulièrement et ne dégage aucune odeur. Choisissez impérativement le <a href="/reservation-en-ligne/curative"><strong>forfait curatif vapeur 100 °C (192 € TTC)</strong></a> dès que vous observez des taches noires sur la turbine, une odeur d'humidité ou une baisse de débit d'air.
</div>

<h2>Tableau comparatif : Préventif 156 € vs Curatif Vapeur 192 €</h2>
<table>
  <thead>
    <tr>
      <th>Opération réalisée</th>
      <th>Préventif (156 € TTC — 45 min)</th>
      <th>Curatif Vapeur (192 € TTC — 1 h)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nettoyage des filtres et de la carrosserie</td>
      <td>Inclus</td>
      <td>Inclus (démontage complet capot)</td>
    </tr>
    <tr>
      <td>Désinfection biocide bactéricide &amp; fongicide</td>
      <td>Inclus</td>
      <td>Inclus (traitement intensif anti-odeurs)</td>
    </tr>
    <tr>
      <td><strong>Décrassage vapeur sèche 100 °C sous pression</strong></td>
      <td>Non inclus</td>
      <td><strong>Inclus (procédé ClimWasher+)</strong></td>
    </tr>
    <tr>
      <td><strong>Nettoyage en profondeur de la turbine de soufflage</strong></td>
      <td>Contrôle visuel</td>
      <td><strong>Lavage intégral sous bâche de protection</strong></td>
    </tr>
    <tr>
      <td>Décontamination complète du bac à condensats</td>
      <td>Contrôle écoulement</td>
      <td><strong>Décontamination fongicide complète</strong></td>
    </tr>
    <tr>
      <td>Nettoyage échangeur extérieur + contrôle pressions fluide</td>
      <td>Inclus</td>
      <td>Inclus</td>
    </tr>
    <tr>
      <td>Attestation légale d'entretien (Cerfa)</td>
      <td>Incluse</td>
      <td>Incluse</td>
    </tr>
  </tbody>
</table>

<h2>Les 4 signes qui prouvent qu'il faut un nettoyage curatif à la vapeur</h2>
<p>Avec une lampe de smartphone dirigée entre les volets de soufflage de votre split mural (appareil éteint), vérifiez ces quatre symptômes :</p>
<ol>
  <li><strong>Odeur de moisi ou de renfermé</strong> dès les premières minutes de mise en route en mode froid.</li>
  <li><strong>Points noirs ou mousse grise sur le rouleau de la turbine</strong> : ce sont des colonies de moisissures nourries par l'eau de condensation.</li>
  <li><strong>Écoulement d'eau sur le mur intérieur</strong> : un biofilm gélatineux obstrue le bac ou le tuyau de condensats.</li>
  <li><strong>Allergies, toux ou gorge sèche</strong> : un appareil non désinfecté depuis plus de 2 ans diffuse des spores dans toute la pièce.</li>
</ol>

<h2>Pourquoi la vapeur sèche à 100 °C avec bâche ClimWasher+ change tout</h2>
<p>Un simple spray désinfectant ne suffit pas quand la graisse et les champignons sont incrustés entre les pales de la turbine. Nos techniciens installent une <strong>bâche étanche ClimWasher+</strong> autour de l'unité murale pour protéger votre mur et votre sol, puis décollent mécaniquement tous les dépôts grâce à la <strong>vapeur sèche haute température à 100 °C</strong>. Résultat : l'appareil retrouve immédiatement son débit d'air d'origine, son silence de fonctionnement et un air sain, sans produits agressifs résiduels.</p>

<h2>Réserver votre forfait dans les Bouches-du-Rhône</h2>
<p>Pour une différence de seulement <strong>36 € TTC</strong>, le curatif vapeur évite souvent un encrassement rapide ou une fuite de condensats en plein été. Vous pouvez réserver directement en ligne sous 48h :</p>
<ul>
  <li><a href="/reservation-en-ligne/preventive"><strong>Réserver l'entretien préventif Mono-Split — 156 € TTC</strong></a></li>
  <li><a href="/reservation-en-ligne/curative"><strong>Réserver l'entretien curatif vapeur 100 °C — 192 € TTC</strong></a></li>
  <li><a href="/reservation-en-ligne"><strong>Voir tous les forfaits (bi-split, tri-split, gainable, PAC, VMC)</strong></a></li>
</ul>
`,
    },
    {
        id: 'geo-guide-entretien-gainable-airzone',
        title: "Entretien climatisation gainable & Airzone en combles : protocole, filtres, désinfection et tarif (220 €)",
        slug: 'entretien-climatisation-gainable-airzone-combles',
        category_id: CAT_LOCAL.id,
        author_id: null,
        focus_keyword: 'entretien climatisation gainable airzone combles',
        meta_title: 'Entretien Climatisation Gainable & Airzone (220€ TTC) — 13',
        meta_description:
            "Comment entretenir une climatisation gainable en combles avec régulation Airzone ? Filtre de reprise, désinfection des gaines, pression statique et prix 220 € TTC.",
        excerpt:
            "Guide complet d'entretien d'une climatisation gainable en combles et régulation Airzone en Provence : fréquence de nettoyage du filtre de reprise, désinfection aéraulique et forfait 220 € TTC.",
        featured_image: '/images/real-gainable-attic-install.jpg',
        featured_image_alt: "Installation et maintenance d'une unité intérieure de climatisation gainable en combles",
        reading_time: 6,
        status: 'published',
        published_at: PUBLISHED_AT,
        created_at: PUBLISHED_AT,
        updated_at: PUBLISHED_AT,
        views_count: 0,
        blog_categories: { name: CAT_LOCAL.name, slug: CAT_LOCAL.slug },
        content: `
<div class="geo-summary">
<strong>L'essentiel sur l'entretien d'un gainable :</strong> parce que l'unité intérieure et le plénum sont dissimulés dans les combles ou faux-plafonds, un gainable exige une maintenance spécifique : nettoyage du filtre de reprise toutes les 3 semaines par l'occupant, et <strong>visite frigoriste annuelle à 220 € TTC</strong> incluant inspection en combles, nébulisation bactéricide des gaines, contrôle des registres Airzone et attestation Cerfa.
</div>

<h2>Pourquoi un gainable ne s'entretient pas comme un split mural</h2>
<p>Très populaire dans les villas d'<a href="/aix-en-provence">Aix-en-Provence</a>, <a href="/salon-de-provence">Salon-de-Provence</a>, <a href="/miramas">Miramas</a>, <a href="/istres">Istres</a> et des Alpilles, la <a href="/gainable">climatisation gainable</a> offre un silence remarquable et une esthétique invisible. En contrepartie, toute la poussière aspirée par la grille de reprise traverse un réseau centralisé de gaines isolées. Si l'entretien est négligé, deux pannes typiques surviennent en Provence :</p>
<ul>
  <li><strong>Prise en glace de l'échangeur dans les combles</strong> : un filtre de reprise colmaté chute le débit d'air, fait geler la batterie puis provoque un débordement d'eau sur le plafond en placo lors du dégivrage.</li>
  <li><strong>Déséquilibre des températures pièce par pièce</strong> : des registres motorisés Airzone ou Delta Dore décalibrés ou une mauvaise pression statique empêchent certaines chambres de refroidir.</li>
</ul>

<h2>Protocole complet de l'entretien gainable Air G Énergie (220 € TTC)</h2>
<table>
  <thead>
    <tr>
      <th>Étape d'intervention</th>
      <th>Contrôle réalisé par le frigoriste</th>
      <th>Bénéfice concret</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1. Grille &amp; filtre de reprise</td>
      <td>Démontage, aspiration, lavage et désinfection complète</td>
      <td>Restaure le débit d'air et évite le givrage</td>
    </tr>
    <tr>
      <td>2. Unité intérieure en combles</td>
      <td>Inspection du caisson, échangeur, turbine, bac et vidange condensats</td>
      <td>Prévient les fuites d'eau sur faux-plafond</td>
    </tr>
    <tr>
      <td>3. Réseau de gaines</td>
      <td>Traitement par nébulisation / fumigène bactéricide &amp; vérification étanchéité conduits</td>
      <td>Air sain dans toutes les pièces, zéro odeur</td>
    </tr>
    <tr>
      <td>4. Régulation Airzone / Zoning</td>
      <td>Test d'ouverture/fermeture des registres motorisés et sondes de température</td>
      <td>Confort homogène pièce par pièce</td>
    </tr>
    <tr>
      <td>5. Groupe extérieur &amp; Cerfa</td>
      <td>Nettoyage condenseur, contrôle pressions fluide et remise attestation Cerfa</td>
      <td>Conformité Décret 2020-912 et garantie</td>
    </tr>
  </tbody>
</table>

<h2>Problème de thermostat Airzone ou de signal radio ?</h2>
<p>Si l'un de vos thermostats Airzone perd la connexion avec la centrale, affiche un décalage de température ou si une pièce manque de souffle malgré des filtres propres, il faut parfois procéder à une mise à jour firmware fabricant et à un réglage de la pression statique disponible. Air G Énergie propose un forfait dédié <a href="/reservation-en-ligne/reprogrammation-thermostat"><strong>Re-programmation Thermostat Airzone &amp; Gainable à 200 € TTC</strong></a>.</p>

<h2>Les bons gestes entre deux visites annuelles</h2>
<ul>
  <li>Aspirez la grande grille de reprise (souvent située dans le couloir) <strong>toutes les 3 semaines</strong> en plein été et au cœur de l'hiver.</li>
  <li>Évitez de fermer simultanément toutes les zones sauf une petite chambre : le by-pass ou la pression statique doivent pouvoir absorber l'excédent d'air.</li>
  <li>Planifiez votre visite annuelle au printemps ou à l'automne sur <a href="/reservation-en-ligne/gainable"><strong>Réservation Entretien Gainable — 220 € TTC</strong></a>.</li>
</ul>
`,
    },
    {
        id: 'geo-guide-entretien-pac-air-eau',
        title: "Entretien Pompe à Chaleur Air/Eau dans les Bouches-du-Rhône : protocole, désembouage, Cerfa et prix (270 €)",
        slug: 'entretien-pompe-a-chaleur-air-eau-bouches-du-rhone',
        category_id: CAT_ENTRETIEN.id,
        author_id: null,
        focus_keyword: 'entretien pompe a chaleur air eau bouches-du-rhone',
        meta_title: 'Entretien Pompe à Chaleur Air/Eau (270€ TTC) — 13 & Cerfa',
        meta_description:
            "Entretien obligatoire pompe à chaleur Air/Eau dans les Bouches-du-Rhône à 270 € TTC : pression hydraulique, boues, vase d'expansion, contrôle fluide et Cerfa.",
        excerpt:
            "Tout savoir sur la maintenance annuelle d'une pompe à chaleur Air/Eau en Provence : contrôle hydraulique, prévention des boues dans l'échangeur à plaques, attestation Cerfa et forfait 270 € TTC.",
        featured_image: '/images/real-outdoor-units-daikin.jpg',
        featured_image_alt: "Unité extérieure de pompe à chaleur Daikin entretenue par Air G Énergie dans les Bouches-du-Rhône",
        reading_time: 6,
        status: 'published',
        published_at: PUBLISHED_AT,
        created_at: PUBLISHED_AT,
        updated_at: PUBLISHED_AT,
        views_count: 0,
        blog_categories: { name: CAT_ENTRETIEN.name, slug: CAT_ENTRETIEN.slug },
        content: `
<div class="geo-summary">
<strong>L'essentiel sur l'entretien d'une PAC Air/Eau :</strong> obligatoire au moins tous les 2 ans (Décret n° 2020-912) et recommandé chaque automne avant la saison de chauffe, l'entretien d'une pompe à chaleur Air/Eau coûte <strong>270 € TTC chez Air G Énergie</strong> dans les Bouches-du-Rhône. Il couvre la partie frigorifique (étanchéité, échangeur) et la partie hydraulique (pression, vase d'expansion, détection de boues) avec remise du Cerfa.
</div>

<h2>Pourquoi la qualité de l'eau est le point critique d'une PAC Air/Eau</h2>
<p>Contrairement à une climatisation Air/Air, une <a href="/pompe-a-chaleur">pompe à chaleur Air/Eau</a> chauffe l'eau qui circule dans vos radiateurs ou votre plancher chauffant (et souvent votre eau chaude sanitaire). Au fil des saisons, l'oxygène dissous et le calcaire présent dans les réseaux des Bouches-du-Rhône créent des <strong>boues ferriques</strong> qui colmatent progressivement le pot à boues et l'échangeur à plaques.</p>
<p>Sans surveillance, ce phénomène fait grimper la consommation électrique, déclenche des mises en sécurité haute pression en plein hiver et peut endommager le circulateur ou le compresseur.</p>

<h2>Ce que comprend le forfait Entretien PAC Air/Eau à 270 € TTC</h2>
<table>
  <thead>
    <tr>
      <th>Circuit contrôlé</th>
      <th>Vérifications techniques effectuées</th>
      <th>Risque évité</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Circuit hydraulique</strong></td>
      <td>Pression réseau, nettoyage filtre à tamis / pot à boues, analyse qualité d'eau (pH, boues, glycol)</td>
      <td>Coupure chauffage par manque de débit ou échangeur bouché</td>
    </tr>
    <tr>
      <td><strong>Vase d'expansion &amp; soupapes</strong></td>
      <td>Mesure pression azote du vase d'expansion, test soupape de sécurité 3 bars</td>
      <td>Chutes de pression répétées et fuites soupape</td>
    </tr>
    <tr>
      <td><strong>Circuit frigorifique</strong></td>
      <td>Nettoyage échangeur extérieur, contrôle surchauffe/sous-refroidissement, détecteur électronique de fuite</td>
      <td>Perte de rendement COP et fuite de gaz réglementée</td>
    </tr>
    <tr>
      <td><strong>Électricité &amp; régulation</strong></td>
      <td>Serrage borniers puissance, contrôle loi d'eau et appoints électriques</td>
      <td>Surconsommation des résistances d'appoint en hiver</td>
    </tr>
    <tr>
      <td><strong>Conformité légale</strong></td>
      <td>Édition et signature de l'attestation d'entretien (Décret 2020-912) et Cerfa étanchéité</td>
      <td>Couverture assurance, revente immobilière et garantie</td>
    </tr>
  </tbody>
</table>

<h2>Et si vous avez aussi un chauffe-eau thermodynamique ou une VMC ?</h2>
<p>Dans de nombreuses maisons récentes du 13 (RT2012 / RE2020), la PAC s'accompagne d'un ballon thermodynamique (dont l'anode anti-corrosion doit être contrôlée pour éviter le percement de la cuve) et d'une VMC. Air G Énergie propose également :</p>
<ul>
  <li><a href="/reservation-en-ligne/thermodynamique"><strong>Entretien Ballon Thermodynamique — 174 € TTC</strong></a></li>
  <li><a href="/reservation-en-ligne/entretien-vmc"><strong>Entretien Annuel VMC (simple ou double flux) — 230 € TTC</strong></a></li>
</ul>

<h2>Quand réserver votre entretien PAC Air/Eau en Provence ?</h2>
<p>La meilleure fenêtre se situe entre <strong>septembre et novembre</strong>, juste avant la remise en chauffe hivernale, afin d'éviter les délais d'attente lors des premières vagues de froid. Réservez votre créneau directement en ligne sous 48h sur <a href="/reservation-en-ligne/pac-air-eau"><strong>Entretien Pompe à Chaleur Air/Eau — 270 € TTC</strong></a> (ou appelez le <strong>04 13 41 49 01</strong>).</p>
`,
    },
];
