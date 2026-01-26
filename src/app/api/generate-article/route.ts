import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { city, category } = await req.json();

        if (!city || !category) {
            return NextResponse.json({ error: 'City and Category are required' }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API Key is missing in server configuration' }, { status: 500 });
        }

        const prompt = `
Agis comme un expert SEO local senior et rédacteur humain.
Rédige un article pour un installateur de climatisation basé à ${city}.

Sujet principal : ${category} (ex : climatisation, climatisation gainable, pompe à chaleur).

OBJECTIF :
- SEO local propre (sans sur-optimisation)
- Contenu humain, naturel
- Génération de leads (appels + formulaires)
- Aucun contenu générique ou répétitif entre villes

CONTRAINTES STRICTES (OBLIGATOIRES) :

1. Title SEO
- Accrocheur
- < 60 caractères
- Inclure ${city}
- Différent des autres villes (reformulation obligatoire)

2. Slug
- Court
- Avec tirets
- Exemple : installation-climatisation-${city.toLowerCase().replace(/ /g, '-')}

3. H1
- Différent du Title
- Orienté conversion
- Reformulé par rapport aux autres villes

4. Contenu (structure flexible, NON figée)
- Introduction locale spécifique à ${city} 
  (quartiers, type d’habitat, climat, usages locaux)

- Sections H2 :
  ⚠️ Les H2 doivent être reformulés d’une ville à l’autre
  ⚠️ Ne jamais utiliser exactement les mêmes intitulés

  Les thèmes à couvrir (ordre libre) :
  - Installation de ${category} à ${city}
  - Bénéfices concrets pour les habitants (confort, économies)
  - Entretien, dépannage, durabilité
  - Pourquoi faire appel à un installateur local à ${city}

- Conclusion orientée action :
  - appel
  - demande de rappel
  - devis

5. FAQ
- 3 questions minimum
- Spécifiques à ${city}
- Reformulées à chaque génération

INTERDICTIONS :
- Pas de phrases types répétitives
- Pas de bourrage de mots-clés
- Pas de structure identique entre deux villes
- Pas de mention d’IA ou d’automatisation

TON :
- Professionnel
- Rassurant
- Naturel
- Orienté client local

FORMAT DE RÉPONSE :
JSON strict :
{
  "title": "",
  "slug": "",
  "content": "",
  "meta_title": "",
  "meta_desc": ""
}
`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o', // Using high quality model for SEO
                messages: [
                    { role: 'system', content: 'You are a Senior SEO Copywriter. You output ONLY valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: 'OpenAI Error', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        const generatedContent = JSON.parse(data.choices[0].message.content);

        return NextResponse.json(generatedContent);

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
