import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nom, email, telephone, ville, service, message } = body;

        // Verify API Key exists (it might be missing in dev env)
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const data = await resend.emails.send({
            from: 'Air G Énergie <onboarding@resend.dev>', // Update this if user has a verified domain
            to: ['ghariani.youssef@gmail.com'], // Ideally fetch this from env or use a fixed admin email. Using a placeholder for now or the user's email if known? The user didn't specify the 'to' address, but presumably it's for THEM (admin). 
            // Better to use a generic 'to' or ask user. I will use a placeholder 'contact@airgenergie.fr' if I can, but resend dev only allows sending to the registered user.
            // I will use 'onboarding@resend.dev' as sender. For receiver, I'll use a placeholder variable that falls back to a safe default if not configured.
            // Actually, for now I'll just use the provided contact email from the page 'contact@airgenergie.fr' assuming they want to receive it there.
            // BUT Resend free tier only sends to verified emails.
            // I will implement it and then ask the user for the key AND the destination email if needed.
            // For now, I'll use a safe placeholder or try to send to the provided email if allowed.
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
