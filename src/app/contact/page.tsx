'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Phone, Mail, MapPin } from 'lucide-react';
import { createInsert } from '@/lib/supabase-helpers';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        ville: '',
        service: 'climatisation',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const leadData = createInsert('leads', {
            full_name: formData.nom,
            email: formData.email,
            phone: formData.telephone,
            city: formData.ville,
            service_type: formData.service,
            message: formData.message,
            status: 'new'
        });

        const { error } = await supabase
            .from('leads')
            .insert([leadData as any]);

        if (error) {
            console.error('Error submitting lead:', error);
            setStatus('error');
        } else {
            setStatus('success');
            // Reset form
            setFormData({ nom: '', email: '', telephone: '', ville: '', service: 'climatisation', message: '' });

            // TODO: Call API route to send email notification (e.g. /api/send-email)
        }
    };

    return (
        <div className="contact-page">
            <section style={{ background: '#0F172A', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Contactez-nous</h1>
                    <p style={{ color: '#CBD5E1' }}>Une réponse sous 24h ouvrées. Un devis gratuit et sans engagement.</p>
                </div>
            </section>

            <div className="container section-padding">
                <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>

                    {/* Contact Info Side */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Nos Coordonnées</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#FF6B00', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Téléphone</p>
                                    <a href="tel:0490000000" style={{ fontSize: '1.2rem' }}>04 90 XX XX XX</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#0F172A', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Email</p>
                                    <a href="mailto:contact@airgenergie.fr">contact@airgenergie.fr</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#0F172A', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Siège Social</p>
                                    <p style={{ margin: 0 }}>Zone Industrielle<br />13140 Miramas</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div style={{ flex: 1, minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Parlez-nous de votre projet</h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nom complet</label>
                                <input
                                    type="text"
                                    name="nom"
                                    required
                                    value={formData.nom}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        required
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Ville</label>
                                    <input
                                        type="text"
                                        name="ville"
                                        required
                                        value={formData.ville}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Type de Service</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                >
                                    <option value="climatisation">Installation Climatisation</option>
                                    <option value="gainable">Gainable / Zoning</option>
                                    <option value="pac">Pompe à Chaleur (Chauffage)</option>
                                    <option value="entretien">Entretien / Dépannage</option>
                                    <option value="autre">Autre demande</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message (optionnel)</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn btn-primary"
                                style={{ marginTop: '1rem', width: '100%' }}
                            >
                                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            </button>

                            {status === 'success' && (
                                <div style={{ marginTop: '1rem', padding: '1rem', background: '#DCFCE7', color: '#166534', borderRadius: '0.5rem', textAlign: 'center' }}>
                                    Merci ! Votre demande a été envoyée. Nous vous rappelons très vite.
                                </div>
                            )}

                            {status === 'error' && (
                                <div style={{ marginTop: '1rem', padding: '1rem', background: '#FEE2E2', color: '#991B1B', borderRadius: '0.5rem', textAlign: 'center' }}>
                                    Une erreur est survenue. Merci de nous appeler directement.
                                </div>
                            )}

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
