import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nom, email, telephone, ville, service, message } = body;

        // Verify API Key exists (it might be missing in dev env)
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'Air G Énergie <contact@airgenergie.fr>',
            to: ['contact@airgenergie.fr'],
            subject: `Nouveau Contact: ${nom} (${service})`,
            html: `
                <h1>Nouvelle demande de contact</h1>
                <p><strong>Nom:</strong> ${nom}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${telephone}</p>
                <p><strong>Ville:</strong> ${ville}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Resend Error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
