'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Check, Calendar as CalendarIcon, Clock, User, Phone, Mail, MapPin, ChevronRight, ChevronLeft, ShieldCheck, Info, Loader2 } from 'lucide-react';
import { BOOKING_CITIES_50KM, BOOKING_CITIES_100KM } from '@/lib/seo-data';

const MAINTENANCE_SERVICES = [
  { id: 'devis', name: 'Étude & Devis d\'installation', price: 0, duration: '45 min', desc: 'Déplacement gratuit pour étudier votre projet d\'installation de climatisation ou pompe à chaleur.' },
  { id: 'diagnostic', name: 'Diagnostic & Rapport de panne', price: 100, duration: '45 min', desc: 'Recherche de panne, diagnostic technique et devis de réparation.' },
  { id: 'preventive', name: 'Entretien de climatisation préventif', price: 156, duration: '45 min', desc: 'Nettoyage des filtres, désinfection de l\'unité intérieure, vérification de pression, nettoyage échangeur extérieur (1 unité).' },
  { id: 'curative', name: 'Entretien de climatisation Curatif ++++', price: 192, duration: '1 h', desc: 'Nettoyage en profondeur avec turbine, dégraissage, traitement fongicide complet et désinfection contre les odeurs/bactéries.' },
  { id: 'double-split', name: 'Double-split Entretien de climatisation', price: 270, duration: '2 h', desc: 'Nettoyage et contrôle complet pour une installation bi-split (2 unités intérieures, 1 groupe extérieur).' },
  { id: 'tri-split', name: 'Tri-split Entretien de climatisation', price: 380, duration: '2 h', desc: 'Nettoyage et contrôle complet pour une installation tri-split (3 unités intérieures, 1 groupe extérieur).' },
  { id: 'gainable', name: 'Entretien de climatisation gainable', price: 220, duration: '45 min', desc: 'Entretien de l\'unité en comble/faux-plafond, nettoyage plénum, contrôle des grilles de soufflage et filtres.' },
  { id: 'console', name: 'Entretien de climatisation console', price: 154, duration: '45 min', desc: 'Nettoyage complet pour climatiseur de type console basse posée au sol.' },
  { id: 'cassette', name: 'Entretien de climatisation cassette', price: 180, duration: '45 min', desc: 'Nettoyage de cassette de soufflage 4 voies encastrée dans le plafond (bureaux ou commerces).' },
  { id: 'thermodynamique', name: 'Entretien ballon thermodynamique', price: 174, duration: '45 min', desc: 'Contrôle étanchéité fluide, nettoyage évaporateur, vérification de l\'anode et contrôle du bon fonctionnement.' },
  { id: 'pac-air-eau', name: 'Entretien – Pompe à Chaleur Air/Eau', price: 270, duration: '45 min', desc: 'Nettoyage et contrôle de l\'unité extérieure, contrôle de la pression hydraulique et des vases d\'expansion.' },
  { id: 'vrv', name: 'Entretien Système VRV / DRV', price: 0, duration: 'Sur mesure', desc: 'Entretien technique complet de vos installations VRV/DRV. Composez votre installation par type d\'unités (splits, gainables, cassettes, consoles) pour un tarif remisé de -10%.' },
  { id: 'reprogrammation-thermostat', name: 'Re-programmation thermostat', price: 200, duration: '1h à 1h30', desc: 'Vérification thermostats et mesures, contact support technique pour mise à jour signal, vérification et augmentation pression statique.' }
];

// Unit type prices for multi-unit and VRV composer
const UNIT_PRICES = {
  split: { label: 'Split mural', price: 156, duration: 45 },
  gainable: { label: 'Gainable / Plénum', price: 220, duration: 45 },
  cassette: { label: 'Cassette 4 voies', price: 180, duration: 45 },
  console: { label: 'Console basse', price: 154, duration: 45 },
};

type UnitCounts = {
  split: number;
  gainable: number;
  cassette: number;
  console: number;
};

// Services that use the unit-type composer
const MULTI_UNIT_SERVICES = ['preventive', 'curative', 'gainable', 'console', 'cassette', 'double-split', 'tri-split', 'vrv'];

// Curative multiplier: more expensive cleaning
const CURATIVE_UNIT_PRICES = {
  split: { label: 'Split mural', price: 192, duration: 60 },
  gainable: { label: 'Gainable / Plénum', price: 260, duration: 60 },
  cassette: { label: 'Cassette 4 voies', price: 220, duration: 60 },
  console: { label: 'Console basse', price: 192, duration: 60 },
};

// Map each standard service to its "default" unit type pre-selected
const SERVICE_DEFAULT_UNITS: Record<string, Partial<UnitCounts>> = {
  preventive: { split: 1, gainable: 0, cassette: 0, console: 0 },
  curative: { split: 1, gainable: 0, cassette: 0, console: 0 },
  gainable: { split: 0, gainable: 1, cassette: 0, console: 0 },
  console: { split: 0, gainable: 0, cassette: 0, console: 1 },
  cassette: { split: 0, gainable: 0, cassette: 1, console: 0 },
  'double-split': { split: 2, gainable: 0, cassette: 0, console: 0 },
  'tri-split': { split: 3, gainable: 0, cassette: 0, console: 0 },
  vrv: { split: 1, gainable: 0, cassette: 0, console: 0 },
};

const calculateUnitTotal = (units: UnitCounts, isCurative: boolean, isVrv: boolean): number => {
  const prices = isCurative ? CURATIVE_UNIT_PRICES : UNIT_PRICES;
  
  let splitsPrice = 0;
  if (isCurative) {
    splitsPrice = units.split * prices.split.price;
  } else {
    const numSplits = units.split;
    if (numSplits >= 3) {
      splitsPrice = 380 + (numSplits - 3) * prices.split.price;
    } else if (numSplits === 2) {
      splitsPrice = 270;
    } else if (numSplits === 1) {
      splitsPrice = 156;
    } else {
      splitsPrice = 0;
    }
  }

  const raw =
    splitsPrice +
    units.gainable * prices.gainable.price +
    units.cassette * prices.cassette.price +
    units.console * prices.console.price;
  return isVrv ? Math.round(raw * 0.9) : raw;
};

const calculateUnitDuration = (units: UnitCounts, isCurative: boolean): number => {
  const prices = isCurative ? CURATIVE_UNIT_PRICES : UNIT_PRICES;
  return (
    units.split * prices.split.duration +
    units.gainable * prices.gainable.duration +
    units.cassette * prices.cassette.duration +
    units.console * prices.console.duration
  );
};

const formatDuration = (totalMins: number): string => {
  if (totalMins < 60) return `${totalMins} min`;
  const hrs = Math.floor(totalMins / 60);
  const remaining = totalMins % 60;
  return remaining > 0 ? `${hrs}h${remaining.toString().padStart(2, '0')}` : `${hrs} h`;
};

const calculateSimplePrice = (serviceId: string): number => {
  const service = MAINTENANCE_SERVICES.find(s => s.id === serviceId);
  if (!service) return 0;
  return service.price;
};

const TIME_SLOTS = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

export default function BookingWizard({ initialServiceId }: { initialServiceId?: string } = {}) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof MAINTENANCE_SERVICES[0] | null>(null);
  const [unitCounts, setUnitCounts] = useState<UnitCounts>({ split: 1, gainable: 0, cassette: 0, console: 0 });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isComposer = selectedService ? MULTI_UNIT_SERVICES.includes(selectedService.id) : false;
  const isCurative = selectedService?.id === 'curative';
  const isVrv = selectedService?.id === 'vrv';
  const isWideRadius = selectedService?.id === 'devis' || selectedService?.id === 'diagnostic';
  const bookingCities = isWideRadius ? BOOKING_CITIES_100KM : BOOKING_CITIES_50KM;
  const totalUnits = unitCounts.split + unitCounts.gainable + unitCounts.cassette + unitCounts.console;

  const composerTotal = isComposer ? calculateUnitTotal(unitCounts, isCurative, isVrv) : 0;
  const composerDuration = isComposer ? calculateUnitDuration(unitCounts, isCurative) : 0;
  const simpleTotal = selectedService && !isComposer ? calculateSimplePrice(selectedService.id) : 0;
  const finalTotal = isComposer ? composerTotal : simpleTotal;

  React.useEffect(() => {
    if (initialServiceId) {
      const service = MAINTENANCE_SERVICES.find(s => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
        setStep(1);
        setTermsAccepted(false);
        const defaults = SERVICE_DEFAULT_UNITS[service.id] ?? { split: 1, gainable: 0, cassette: 0, console: 0 };
        setUnitCounts({ split: 0, gainable: 0, cassette: 0, console: 0, ...defaults });
      }
    }
  }, [initialServiceId]);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', ville: 'Miramas', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mois courant affiché dans le calendrier
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());

  // Disponibilités Google Calendar en temps réel pour le jour sélectionné
  const [slotsAvailability, setSlotsAvailability] = useState<{ id: string; label: string; available: boolean; reason: string | null }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Navigation mensuelle (max 3 mois dans le futur)
  const today = new Date();
  const isCurrentMonth = currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const isMaxMonth = currentMonth >= maxMonth;

  const handlePrevMonth = () => {
    if (isCurrentMonth) return;
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (isMaxMonth) return;
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Génération des jours du mois sélectionné
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Lundi, 6 = Dimanche

  const todayStr = new Date().toISOString().split('T')[0];

  const daysInMonth = [];
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSunday = dateObj.getDay() === 0;
    const isPastOrToday = dateStr <= todayStr; // Réservations à partir de demain
    daysInMonth.push({
      dayNumber: d,
      dateStr,
      isSunday,
      isPastOrToday,
      disabled: isSunday || isPastOrToday,
    });
  }

  // Interrogation en direct de Google Calendar dès qu'une date est cliquée
  React.useEffect(() => {
    if (!selectedDate) {
      setSlotsAvailability([]);
      return;
    }
    let isCancelled = false;
    setLoadingSlots(true);
    setSelectedTimeSlot('');

    fetch(`/api/availability?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.slots) {
          setSlotsAvailability(data.slots);
        }
      })
      .catch((err) => {
        console.warn('Erreur vérification disponibilité Google Calendar:', err);
        if (!isCancelled) {
          setSlotsAvailability(TIME_SLOTS.map((s) => ({ id: s.split(' ')[0], label: s, available: true, reason: null })));
        }
      })
      .finally(() => {
        if (!isCancelled) setLoadingSlots(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedDate]);

  const updateUnit = (type: keyof UnitCounts, delta: number) => {
    setUnitCounts(prev => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
  };

  const handleNext = () => {
    if (!selectedService) return;
    if (isComposer && totalUnits === 0) {
      alert('Veuillez sélectionner au moins une unité dans le configurateur.');
      return;
    }
    if (step === 1 && (!selectedDate || !selectedTimeSlot)) return;
    setStep(step + 1);
  };

  const handleBack = () => { setStep(step - 1); };

  const buildCompositionSummary = () => {
    const parts: string[] = [];
    if (unitCounts.split > 0) parts.push(`${unitCounts.split} split mural${unitCounts.split > 1 ? 's' : ''}`);
    if (unitCounts.gainable > 0) parts.push(`${unitCounts.gainable} gainable${unitCounts.gainable > 1 ? 's' : ''}`);
    if (unitCounts.cassette > 0) parts.push(`${unitCounts.cassette} cassette${unitCounts.cassette > 1 ? 's' : ''}`);
    if (unitCounts.console > 0) parts.push(`${unitCounts.console} console${unitCounts.console > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTimeSlot || !formData.nom || !formData.telephone) return;
    if (!termsAccepted) {
      alert('Veuillez cocher la case de confirmation des conditions d\'intervention avant de valider.');
      return;
    }
    setLoading(true);

    const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const composition = isComposer ? buildCompositionSummary() : `${selectedService.name}`;
    const bookingMessage = `[Réservation en Ligne]
Prestation : ${selectedService.name}
${isComposer ? `Composition : ${composition}` : ''}
Total estimé : ${finalTotal === 0 ? 'Gratuit' : `${finalTotal} €`}${isVrv ? ' (remise VRV -10%)' : ''}
Date souhaitée : ${formattedDate}
Créneau : ${selectedTimeSlot}
Conditions d'intervention : ACCEPTÉES
Notes client : ${formData.notes || 'Aucune'}`;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          composition: isComposer ? composition : '',
          totalAmount: finalTotal,
          durationMins: isComposer ? composerDuration : null,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          slotStartTime: selectedTimeSlot.split(' ')[0], // ex: "14:00"
          client: formData,
          isVrv,
          unitCounts: isComposer ? unitCounts : null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réservation');
      }

      if (data.freeService) {
        setSuccess(true);
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error('Error creating booking:', err);
      alert(err?.message || 'Une erreur est survenue lors de la réservation. Veuillez réessayer ou nous contacter directement par téléphone.');
    } finally {
      setLoading(false);
    }
  };

  if (success && selectedService) {
    const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const composition = isComposer ? buildCompositionSummary() : null;
    return (
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', padding: '3rem 2rem', maxWidth: '650px', margin: '2rem auto', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Check size={36} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.75rem' }}>Réservation enregistrée !</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Merci <strong>{formData.nom}</strong>. Votre demande pour <strong>{selectedService.name}</strong> a bien été enregistrée pour le <strong>{formattedDate}</strong> à <strong>{selectedTimeSlot}</strong>.
        </p>
        <div style={{ background: '#F8FAFC', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} style={{ color: '#48BB78' }} /> Récapitulatif :
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem', color: '#475569' }}>
            <li>• <strong>Service :</strong> {selectedService.name}</li>
            {composition && <li>• <strong>Composition :</strong> {composition}</li>}
            <li>• <strong>Date :</strong> {formattedDate} ({selectedTimeSlot})</li>
            <li>• <strong>Montant estimé :</strong> {finalTotal === 0 ? 'Gratuit' : `${finalTotal} €`}{isVrv ? ' (remise VRV -10% incluse)' : ''}</li>
            <li>• <strong>Lieu :</strong> {formData.ville}</li>
          </ul>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '2rem', background: '#FFFBEB', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #FCD34D' }}>
          ⚠️ Un contrôle de performance sera réalisé avant toute intervention. Notre secrétariat vous confirmera le rendez-vous sous 2h au <strong>{formData.telephone}</strong>.
        </p>
        <button type="button" onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(''); setSelectedTimeSlot(''); setFormData({ nom: '', email: '', telephone: '', ville: 'miramas', notes: '' }); setSuccess(false); setTermsAccepted(false); }} className="btn btn-secondary" style={{ width: '100%' }}>
          Faire une autre demande
        </button>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', padding: '3.5rem 2rem', maxWidth: '850px', margin: '2rem auto', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,145,218,0.05)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CalendarIcon size={32} />
        </div>
        <h3 style={{ fontSize: '1.4rem', color: '#0F172A', fontWeight: '800', marginBottom: '0.5rem' }}>Aucune prestation sélectionnée</h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
          Veuillez choisir un forfait dans la grille ci-dessus et cliquer sur le bouton <strong>&quot;Réserver cette prestation&quot;</strong> pour débloquer la planification de votre rendez-vous.
        </p>
      </div>
    );
  }

  const priceUnits = isCurative ? CURATIVE_UNIT_PRICES : UNIT_PRICES;

  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden', maxWidth: '850px', margin: '2rem auto' }}>
      {/* Header */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[{ n: 1, label: 'Date & Heure' }, { n: 2, label: 'Coordonnées' }].map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= s.n ? 'var(--primary-blue)' : '#E2E8F0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>{s.n}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: step === s.n ? '700' : '500', color: step >= s.n ? '#0F172A' : '#94A3B8' }}>{s.label}</span>
              {s.n < 2 && <ChevronRight size={16} style={{ color: '#94A3B8', marginLeft: '1rem' }} />}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>
          {selectedService.name}
        </div>
      </div>

      {/* Summary & Unit Composer */}
      <div style={{ padding: '2rem 2rem 0 2rem' }}>
        <div style={{ background: 'rgba(0,145,218,0.03)', borderRadius: '1rem', padding: '1.5rem', border: '1px dashed rgba(0,145,218,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: isComposer ? '1.5rem' : 0 }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.25rem' }}>{selectedService.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', margin: 0 }}>{selectedService.desc}</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-blue)', display: 'block' }}>
                {finalTotal === 0 && !isComposer ? 'Gratuit' : finalTotal === 0 ? 'À calculer' : `${finalTotal} €`}
                {isVrv && finalTotal > 0 && <span style={{ fontSize: '0.75rem', color: '#48BB78', display: 'block', fontWeight: '700' }}>– 10% VRV inclus</span>}
              </span>
              {isComposer && composerDuration > 0 && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                  <Clock size={13} /> Durée : {formatDuration(composerDuration)}
                </span>
              )}
            </div>
          </div>

          {/* Unit Type Composer — shown for multi-unit services */}
          {isComposer && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Info size={16} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#475569' }}>
                  Composez votre installation — sélectionnez le nombre d&apos;unités par type :
                  {isVrv && <span style={{ color: '#48BB78', marginLeft: '0.5rem' }}>Remise VRV -10% automatique</span>}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {(Object.keys(priceUnits) as Array<keyof typeof priceUnits>).map((type) => {
                  const unitKey = type as keyof UnitCounts;
                  const count = unitCounts[unitKey];
                  const unitInfo = priceUnits[type];
                  return (
                    <div key={type} style={{ background: count > 0 ? 'rgba(0,145,218,0.04)' : 'white', border: count > 0 ? '1.5px solid var(--primary-blue)' : '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', transition: 'all 0.2s ease' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', lineHeight: '1.2' }}>{unitInfo.label}</div>
                        <div style={{ fontSize: '0.78rem', color: count > 0 ? 'var(--primary-blue)' : 'var(--text-light)', fontWeight: '600', marginTop: '0.15rem' }}>
                          {unitInfo.price} € / unité
                          {isVrv && <span style={{ color: '#48BB78' }}> → {Math.round(unitInfo.price * 0.9)} €</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E0', borderRadius: '0.5rem', background: 'white', flexShrink: 0 }}>
                        <button type="button" onClick={() => updateUnit(unitKey, -1)} style={{ padding: '0.3rem 0.65rem', border: 'none', background: 'transparent', cursor: count > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', color: count > 0 ? '#0F172A' : '#CBD5E0' }}>−</button>
                        <span style={{ padding: '0 0.4rem', fontWeight: '700', fontSize: '0.95rem', minWidth: '22px', textAlign: 'center', color: count > 0 ? 'var(--primary-blue)' : '#94A3B8' }}>{count}</span>
                        <button type="button" onClick={() => updateUnit(unitKey, 1)} style={{ padding: '0.3rem 0.65rem', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: '#0F172A' }}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalUnits === 0 && (
                <p style={{ fontSize: '0.85rem', color: '#E53E3E', fontWeight: '600', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  ⚠️ Veuillez sélectionner au moins une unité pour continuer.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step Contents */}
      <div style={{ padding: '2rem' }}>
        {/* Step 1: Date & Heure */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: '800', marginBottom: '1.5rem' }}>
              Étape 1 : Sélectionnez la date et le créneau horaire
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Calendrier Mensuel avec navigation */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CalendarIcon size={18} style={{ color: 'var(--primary-blue)' }} /> Choisir le jour d&apos;intervention :
                </h4>

                {/* Sélecteur de mois */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', background: '#F8FAFC', padding: '0.6rem 0.85rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    disabled={isCurrentMonth}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.35rem 0.65rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '0.5rem',
                      background: isCurrentMonth ? '#F1F5F9' : 'white',
                      color: isCurrentMonth ? '#94A3B8' : '#0F172A',
                      cursor: isCurrentMonth ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ChevronLeft size={16} /> Préc.
                  </button>

                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', textTransform: 'capitalize' }}>
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    disabled={isMaxMonth}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.35rem 0.65rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '0.5rem',
                      background: isMaxMonth ? '#F1F5F9' : 'white',
                      color: isMaxMonth ? '#94A3B8' : '#0F172A',
                      cursor: isMaxMonth ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Suiv. <ChevronRight size={16} />
                  </button>
                </div>

                {/* En-tête des jours de la semaine */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem', marginBottom: '0.35rem', textAlign: 'center' }}>
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((w) => (
                    <div key={w} style={{ fontSize: '0.72rem', fontWeight: '800', color: w === 'Dim' ? '#EF4444' : '#64748B', textTransform: 'uppercase' }}>
                      {w}
                    </div>
                  ))}
                </div>

                {/* Grille des jours du mois */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem' }}>
                  {/* Espaces vides début de mois */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ height: '38px' }} />
                  ))}

                  {/* Boutons des jours */}
                  {daysInMonth.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        disabled={day.disabled}
                        onClick={() => setSelectedDate(day.dateStr)}
                        title={day.isSunday ? 'Fermé le dimanche' : day.isPastOrToday ? 'Réservations à partir de demain' : undefined}
                        style={{
                          height: '38px',
                          border: isSelected ? '2px solid var(--primary-blue)' : '1px solid #E2E8F0',
                          background: isSelected ? 'var(--primary-blue)' : day.disabled ? '#F8FAFC' : 'white',
                          color: isSelected ? 'white' : day.disabled ? '#CBD5E1' : '#0F172A',
                          borderRadius: '0.5rem',
                          cursor: day.disabled ? 'not-allowed' : 'pointer',
                          fontSize: '0.88rem',
                          fontWeight: isSelected ? '800' : '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? '0 2px 8px rgba(0,145,218,0.3)' : 'none',
                        }}
                      >
                        {day.dayNumber}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748B' }}>
                  <span>✓ Réservations possibles jusqu&apos;à 3 mois</span>
                  <span style={{ color: '#EF4444', fontWeight: '600' }}>Dimanche : Fermé</span>
                </div>
              </div>

              {/* Créneaux horaires synchronisés en direct */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} style={{ color: 'var(--primary-blue)' }} /> Choisir le créneau horaire :
                </h4>

                {!selectedDate ? (
                  <div style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '0.75rem', padding: '2.5rem 1.5rem', textAlign: 'center', color: '#64748B' }}>
                    <CalendarIcon size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.4, color: 'var(--primary-blue)' }} />
                    <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: '700', color: '#334155' }}>
                      Sélectionnez un jour sur le calendrier
                    </p>
                    <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                      Les disponibilités de notre agenda s&apos;afficheront en temps réel.
                    </p>
                  </div>
                ) : loadingSlots ? (
                  <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '0.75rem', padding: '2.5rem 1.5rem', textAlign: 'center', color: '#0369A1' }}>
                    <Loader2 size={32} style={{ margin: '0 auto 0.75rem', animation: 'spin 1s linear infinite' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>
                      Vérification de l&apos;agenda en direct...
                    </p>
                    <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: '#0284C7' }}>
                      Interrogation de Google Calendar pour le {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0284C7', background: '#F0F9FF', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #BAE6FD', marginBottom: '0.25rem' }}>
                      📅 {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    {(slotsAvailability.length > 0 ? slotsAvailability : TIME_SLOTS.map(s => ({ id: s.split(' ')[0], label: s, available: true, reason: null }))).map((slot) => {
                      const isSelected = selectedTimeSlot === slot.label;
                      const isAvailable = slot.available;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => setSelectedTimeSlot(slot.label)}
                          style={{
                            padding: '0.95rem 1.15rem',
                            border: isSelected
                              ? '2px solid var(--primary-blue)'
                              : !isAvailable
                              ? '1px solid #E2E8F0'
                              : '1px solid #CBD5E1',
                            background: isSelected
                              ? 'rgba(0,145,218,0.06)'
                              : !isAvailable
                              ? '#F8FAFC'
                              : 'white',
                            borderRadius: '0.75rem',
                            cursor: isAvailable ? 'pointer' : 'not-allowed',
                            textAlign: 'left',
                            fontSize: '0.95rem',
                            fontWeight: isSelected ? '800' : '600',
                            color: isSelected
                              ? 'var(--primary-blue)'
                              : !isAvailable
                              ? '#94A3B8'
                              : '#1E293B',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.15s ease',
                            boxShadow: isSelected ? '0 2px 8px rgba(0,145,218,0.12)' : 'none',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: isAvailable ? '#10B981' : '#EF4444',
                                display: 'inline-block',
                                flexShrink: 0,
                              }}
                            />
                            <span>{slot.label}</span>
                          </div>

                          <div>
                            {isSelected && <Check size={18} style={{ color: 'var(--primary-blue)' }} />}
                            {!isAvailable && (
                              <span style={{ fontSize: '0.75rem', background: '#FEE2E2', color: '#B91C1C', padding: '0.2rem 0.55rem', borderRadius: '0.35rem', fontWeight: '700' }}>
                                🔒 Réservé
                              </span>
                            )}
                            {isAvailable && !isSelected && (
                              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>
                                Disponible
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Coordonnées + Terms */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: '800', marginBottom: '1.5rem' }}>
              Étape 2 : Vos coordonnées pour l&apos;intervention
            </h3>

            {/* Conditions d'intervention notice ou Préparation pour Devis */}
            {selectedService?.id === 'devis' ? (
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>ℹ️</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1E40AF', marginBottom: '0.4rem' }}>Préparation de votre visite</h4>
                  <p style={{ fontSize: '0.85rem', color: '#1E3A8A', margin: 0, lineHeight: '1.5' }}>
                    Afin de faciliter l&apos;étude technique de dimensionnement et d&apos;implantation de votre futur système de climatisation ou pompe à chaleur, <strong>nous vous invitons à préparer les plans de votre maison</strong> (si disponibles) pour le jour du rendez-vous.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderLeft: '4px solid #F59E0B', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>⚠️</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#92400E', marginBottom: '0.4rem' }}>Conditions d&apos;intervention</h4>
                  <p style={{ fontSize: '0.85rem', color: '#78350F', margin: 0, lineHeight: '1.5' }}>
                    Avant toute prestation, notre technicien effectuera un <strong>contrôle de performance</strong> (prise de température, vérification du débit d&apos;air, test en modes chaud et froid).
                    En cas de défaut détecté (panne, fuite de fluide, dysfonctionnement électrique), Air G Énergie se réserve le droit <strong>d&apos;annuler l&apos;entretien ou de le convertir en diagnostic facturable à 100 €</strong> afin d&apos;identifier précisément la problématique.
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Nom complet *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input type="text" required placeholder="Jean Dupont" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Numéro de téléphone *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input type="tel" required placeholder="06 00 00 00 00" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Adresse Email (facultatif)</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input type="email" placeholder="contact@email.fr" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Ville d&apos;intervention *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <select value={formData.ville} onChange={(e) => setFormData({ ...formData, ville: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem', background: 'white', appearance: 'none' }}>
                    {bookingCities.map((c) => (<option key={c.slug} value={c.label}>{c.label}</option>))}
                  </select>
                  {isWideRadius && <p style={{ fontSize: '0.75rem', color: '#48BB78', marginTop: '0.25rem', fontWeight: '600' }}>✓ Déplacement jusqu&apos;à 100 km (études & diagnostics)</p>}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Précisions / Code d&apos;entrée / Notes (facultatif)</label>
              <textarea placeholder="Exemple : digicode 1234, 2ème étage, marque Daikin..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem', resize: 'vertical' }} />
            </div>

            {/* Attestation checkbox */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', background: termsAccepted ? 'rgba(72,187,120,0.05)' : '#F8FAFC', border: termsAccepted ? '1.5px solid #48BB78' : '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.75rem', transition: 'all 0.2s ease' }}>
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#48BB78', flexShrink: 0, marginTop: '0.1rem' }} />
              <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.5' }}>
                J&apos;atteste que mon système de climatisation est <strong>en fonctionnement</strong> à la date de la réservation et j&apos;accepte les conditions d&apos;intervention : en cas de défaut détecté lors du contrôle de performance préalable, l&apos;entretien pourra être converti en diagnostic (100 €) ou annulé.
              </span>
            </label>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ChevronLeft size={16} /> Retour
              </button>
              <button type="submit" disabled={loading || !termsAccepted} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: termsAccepted ? '#48BB78' : '#94A3B8', borderColor: termsAccepted ? '#48BB78' : '#94A3B8', cursor: termsAccepted ? 'pointer' : 'not-allowed' }}>
                {loading ? 'Enregistrement...' : 'Confirmer le Rendez-vous'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer Nav */}
      {step < 2 && (
        <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {step > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ChevronLeft size={16} /> Retour
              </button>
            )}
          </div>
          <button type="button" onClick={handleNext} disabled={!selectedDate || !selectedTimeSlot || (isComposer && totalUnits === 0)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Suivant <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
