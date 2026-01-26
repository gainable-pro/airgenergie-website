'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Check, Clock, Eye, Phone } from 'lucide-react';
import { Tables, createUpdate } from '@/lib/supabase-helpers';

type Lead = Tables<'leads'>;

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setLeads(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        const updateData = createUpdate('leads', { status: newStatus });
        await supabase.from('leads').update(updateData as any).eq('id', id);
        fetchLeads();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#0F172A' }}>Gestion des Leads</h1>
                <button onClick={fetchLeads} className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Actualiser</button>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748B' }}>DATE</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748B' }}>CLIENT</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748B' }}>VILLE</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748B' }}>SERVICE</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748B' }}>STATUT</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#64748B' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</td></tr>
                        ) : leads.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>Aucun lead pour le moment.</td></tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                                        <br />
                                        <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{new Date(lead.created_at).toLocaleTimeString('fr-FR')}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600' }}>{lead.full_name}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748B' }}>{lead.phone}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{lead.city}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: lead.service_type === 'pac' ? '#DBEAFE' : '#F1F5F9',
                                            color: lead.service_type === 'pac' ? '#1E40AF' : '#475569',
                                            padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '500'
                                        }}>
                                            {(lead.service_type || 'Autre').toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {lead.status === 'new' ? (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                                <Clock size={14} /> A traiter
                                            </span>
                                        ) : (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#166534', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                                <Check size={14} /> Traité
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        {lead.status === 'new' && (
                                            <button
                                                onClick={() => updateStatus(lead.id, 'contacted')}
                                                title="Marquer comme traité"
                                                style={{ background: '#22C55E', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                        <a
                                            href={`tel:${lead.phone}`}
                                            title="Appeler"
                                            style={{ display: 'inline-block', background: '#0F172A', color: 'white', padding: '0.5rem', borderRadius: '4px', marginRight: '0.5rem' }}
                                        >
                                            <Phone size={16} />
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
