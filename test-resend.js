const { Resend } = require('resend');

const apiKey = 're_PGbgGLaL_Df3BkpPNhSw4fqWyKfxq61Xp';
const resend = new Resend(apiKey);

async function send() {
    try {
        const data = await resend.emails.send({
            from: 'Air G Énergie <onboarding@resend.dev>',
            to: ['contact@airgenergie.fr'],
            subject: 'Test Technique - Agent AI',
            html: '<strong>Si vous recevez ceci, la clé API fonctionne !</strong>',
        });
        console.log('SUCCESS:', data);
    } catch (error) {
        console.error('ERROR:', error);
    }
}

send();
