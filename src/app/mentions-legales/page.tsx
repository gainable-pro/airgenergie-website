import { Metadata } from 'next';
import { getSeoAlternates, getSeoDomain } from '@/lib/seo-url';

export async function generateMetadata(): Promise<Metadata> {
    const alternates = await getSeoAlternates('/mentions-legales');
    return {
        title: 'Mentions Légales & Confidentialité - Air G Energie',
        description: 'Informations légales, politique de confidentialité et conditions d’utilisation du site Air G Energie.',
        robots: 'index, follow',
        alternates,
    };
}

export default async function MentionsLegalesPage() {
    const domain = await getSeoDomain();
    const cleanDomain = domain.replace('https://www.', '').replace('https://', '');

    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 border-b pb-4">Mentions Légales</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">

                {/* Section 1: Mentions Légales */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Identité de l'éditeur</h2>
                    <p className="mb-4">
                        Le présent site est édité par l'entreprise individuelle <strong>Air G Énergie</strong>, dirigée par monsieur <strong>Maroan Gharib</strong>.<br />
                        Spécialisée dans les solutions de climatisation et de chauffage, l'entreprise est établie au :
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                        <p className="mb-1"><strong>Siège social :</strong> Zone Industrielle, 13140 Miramas, France</p>
                        <p className="mb-1"><strong>SIRET :</strong> 909 266 256 00017</p>
                        <p className="mb-1"><strong>TVA Intracommunautaire :</strong> FR88 909 266 256</p>
                        <p className="mb-0">
                            <strong>Contact :</strong> 04 13 41 49 01 ou via <a href="mailto:contact@airgenergie.fr" className="text-blue-600 hover:underline">contact@airgenergie.fr</a>
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Hébergement</h2>
                    <p className="mb-4">
                        L'infrastructure technique du site <em>{cleanDomain}</em> est assurée par la société <strong>OVHcloud</strong>.
                    </p>
                    <p className="text-sm text-slate-600">
                        Adresse : 2 rue Kellermann, 59100 Roubaix, France<br />
                        Support : 1007<br />
                        Web : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ovhcloud.com</a>
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Propriété intellectuelle et usage</h2>
                    <p className="mb-4">
                        Sauf indication contraire explicite, tous les éléments constituant ce site (structure, textes, visuels, logo Air G Énergie) sont la propriété exclusive de l'éditeur.
                        Toute utilisation, copie ou modification non autorisée, sur quelque support que ce soit, est formellement interdite sans l'accord écrit de Air G Énergie.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Limitation de responsabilité</h2>
                    <p className="mb-4">
                        Nous apportons le plus grand soin à la qualité des informations diffusées. Cependant, Air G Énergie ne saurait garantir l'exactitude absolue ou l'actualité permanente des données présentes sur le site. L'entreprise décline toute responsabilité quant aux éventuelles erreurs ou omissions.
                    </p>
                </section>

                <hr className="my-12 border-slate-200" />

                {/* Section 2: Politique de confidentialité */}
                <section className="mb-12">
                    <h1 className="text-3xl font-bold mb-8 text-slate-900">Politique de Confidentialité (RGPD)</h1>
                    <p className="mb-6 italic text-slate-600">
                        Air G Énergie s'engage à protéger votre vie privée et vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">Responsable de traitement</h3>
                    <p className="mb-6">
                        Les données sont gérées par <strong>Air G Énergie</strong> (Maroan Gharib), joignable à l'adresse <a href="mailto:contact@airgenergie.fr" className="text-blue-600 hover:underline">contact@airgenergie.fr</a>.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">Quelles données collectons-nous ?</h3>
                    <p className="mb-4">
                        Dans le cadre de nos échanges (demande de devis, formulaire de contact), nous pouvons recueillir :
                    </p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                        <li>Votre identité (Nom, Prénom)</li>
                        <li>Vos coordonnées (Email, Téléphone)</li>
                        <li>Les détails de votre projet (via le message libre)</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">Utilisation de vos données</h3>
                    <p className="mb-2">Ces informations sont strictement nécessaires pour :</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                        <li>Traiter et répondre à vos sollicitations (contact, devis).</li>
                        <li>Assurer la gestion de la relation client.</li>
                    </ul>
                    <p className="mb-6 border-l-4 border-green-500 pl-4 bg-green-50 py-2">
                        <strong>Engagement :</strong> Nous ne vendons ni ne louons vos données à aucun tiers. Elles restent à l'usage exclusif de Air G Énergie.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">Conservation et Droits</h3>
                    <p className="mb-4">
                        Nous conservons les données des prospects pendant une durée maximale de <strong>3 ans</strong> après le dernier échange. Pour les clients, les données sont archivées selon les obligations légales en vigueur.
                    </p>
                    <p className="mb-6">
                        Vous disposez d'un droit permanent d'accès, de modification et de suppression de vos informations. Pour l'exercer, il vous suffit de nous écrire à <a href="mailto:contact@airgenergie.fr" className="text-blue-600 hover:underline">contact@airgenergie.fr</a>.
                    </p>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">Sécurité et Cookies</h3>
                    <p className="mb-4">
                        Nous mettons en place des mesures de sécurité pour protéger vos données.
                        Concernant les cookies, notre site peut en utiliser pour des raisons techniques ou d'analyse d'audience. Vous gardez la maîtrise de les accepter ou non via les paramètres de votre navigateur.
                    </p>
                </section>

                <hr className="my-12 border-slate-200" />

                {/* Section 3: CGU */}
                <section>
                    <h1 className="text-3xl font-bold mb-8 text-slate-900">Conditions Générales d’Utilisation</h1>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Accès et Frais</h3>
                            <p>
                                L'accès au site <em>{cleanDomain}</em> est libre et gratuit. Les coûts liés à votre connexion internet restent à votre charge.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Nature du contenu</h3>
                            <p>
                                Le site a pour vocation de présenter les activités de climatisation et chauffage de Air G Énergie. Les informations y sont fournies à titre informatif et peuvent être modifiées sans préavis.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Responsabilité utilisateur</h3>
                            <p>
                                L'utilisateur s'engage à ne pas perturber le fonctionnement du site. Air G Énergie ne peut être tenue responsable des dysfonctionnements temporaires ou des dommages liés à l'utilisation du réseau internet.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Droit applicable</h3>
                            <p>
                                Tout litige relatif à l'utilisation du site est soumis au droit français. En cas de différend, une résolution amiable sera systématiquement recherchée.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
