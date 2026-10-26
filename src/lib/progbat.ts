/**
 * ProGBat API Client for Air G Énergie
 * Handles automatic creation of customers (Tiers) and draft invoices (Factures)
 * Documentation: https://progbat.readme.io/
 */

const PROGBAT_API_URL = process.env.PROGBAT_API_URL || 'https://api.progbat.com/v2';
const PROGBAT_API_TOKEN = process.env.PROGBAT_API_TOKEN || '';

interface ProgbatAddress {
  label: string;
  byDefault: boolean;
  address: string;
  address2?: string;
  postcode: string;
  city: string;
  country: string;
  phone?: string;
  mobile?: string;
  email?: string;
}

interface CreateThirdParams {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  notes?: string;
}

interface CreateBillParams {
  thirdId: number;
  clientName: string;
  clientAddress?: string;
  clientCity?: string;
  clientPostcode?: string;
  serviceId?: string;
  serviceName: string;
  description?: string;
  totalAmountTTC: number;
  date?: string;
  timeSlot?: string;
  stripePaymentId?: string;
}

/**
 * Common headers for ProGBat API
 */
function getHeaders() {
  return {
    'Authorization': `Bearer ${process.env.PROGBAT_API_TOKEN || PROGBAT_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

/**
 * Matches a service name/id to known ProGBat library element IDs
 */
export function getProgbatElementId(serviceId?: string, serviceName?: string): { elementId: number; defaultLabel: string } {
  const normalized = `${serviceId || ''} ${serviceName || ''}`.toLowerCase();

  if (normalized.includes('curatif') || normalized.includes('vaporis') || normalized.includes('bâche')) {
    return { elementId: 42, defaultLabel: 'Forfait entretien de climatisation curative +++ vaporisation 100°C' };
  }
  if (normalized.includes('gainable')) {
    return { elementId: 75, defaultLabel: 'Forfait entretien climatisation gainable' };
  }
  if (normalized.includes('tri-split') || normalized.includes('tri split')) {
    return { elementId: 45, defaultLabel: 'Entretien climatisation Tri-split' };
  }
  if (normalized.includes('double-split') || normalized.includes('bi-split') || normalized.includes('double split')) {
    return { elementId: 44, defaultLabel: 'Entretien climatisation Double-split' };
  }
  if (normalized.includes('panne') || normalized.includes('diagnostic')) {
    return { elementId: 43, defaultLabel: 'Diagnostic & Rapport de panne climatisation' };
  }
  if (normalized.includes('pompe') || normalized.includes('pac') || normalized.includes('eau')) {
    return { elementId: 43, defaultLabel: 'Entretien Pompe à Chaleur Air/Eau' };
  }
  if (normalized.includes('thermodynamique')) {
    return { elementId: 43, defaultLabel: 'Entretien chauffe-eau thermodynamique' };
  }

  // Default: Split préventif standard
  return { elementId: 43, defaultLabel: 'Forfait entretien de climatisation préventif +++' };
}

/**
 * Searches for an existing client in ProGBat by name, email or phone
 */
export async function findProgbatCustomer(name: string, email?: string, phone?: string): Promise<any | null> {
  try {
    const res = await fetch(`${PROGBAT_API_URL}/company/thirds?type=2`, {
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[ProGBat] Fetch thirds returned status ${res.status}`);
      return null;
    }

    const thirds = await res.json();
    if (!Array.isArray(thirds)) return null;

    const cleanName = (name || '').trim().toLowerCase();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

    const match = thirds.find((t: any) => {
      const legalName = (t.legalName || '').trim().toLowerCase();
      const code = (t.code || '').trim().toLowerCase();
      
      // Match by exact or partial name
      if (cleanName && (legalName.includes(cleanName) || cleanName.includes(legalName) || code.includes(cleanName))) {
        return true;
      }

      // Match by address email/phone
      if (Array.isArray(t.addresses)) {
        for (const addr of t.addresses) {
          if (cleanEmail && addr.email && addr.email.toLowerCase() === cleanEmail) return true;
          if (cleanPhone && addr.mobile && addr.mobile.replace(/[^0-9]/g, '').includes(cleanPhone)) return true;
        }
      }

      return false;
    });

    return match || null;
  } catch (err) {
    console.error('[ProGBat] Error searching customer:', err);
    return null;
  }
}

/**
 * Creates a new client in ProGBat
 */
export async function createProgbatCustomer({
  name,
  email,
  phone,
  address,
  city,
  postcode,
  notes,
}: CreateThirdParams): Promise<any> {
  const cleanCity = city || 'Miramas';
  const cleanPostcode = postcode || '13140';
  const clientCode = `${name.toUpperCase().slice(0, 16).trim()} ${cleanCity.toUpperCase().slice(0, 10).trim()}`.trim();

  const body = {
    code: clientCode,
    type: 2, // 2 = Client
    legalType: 1, // 1 = Particulier
    civility: '',
    legalName: name,
    comments: notes || '',
    address: {
      label: 'Adresse principale',
      byDefault: true,
      address: address || cleanCity,
      postcode: cleanPostcode,
      city: cleanCity,
      country: 'FR',
      mobile: phone || '',
      email: email || '',
    },
    contact: {
      byDefault: true,
      lastname: name,
      mobile: phone || '',
      email: email || '',
    },
  };

  const res = await fetch(`${PROGBAT_API_URL}/company/thirds`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`[ProGBat] Failed to create customer (${res.status}): ${errorText}`);
  }

  return await res.json();
}

/**
 * Finds or creates a customer in ProGBat
 */
export async function findOrCreateProgbatCustomer(params: CreateThirdParams): Promise<{ id: number; name: string }> {
  const existing = await findProgbatCustomer(params.name, params.email, params.phone);
  if (existing) {
    console.log(`[ProGBat] Client existant trouvé : ${existing.legalName} (ID: ${existing.id})`);
    return { id: existing.id, name: existing.legalName };
  }

  console.log(`[ProGBat] Nouveau client détecté, création en cours pour ${params.name}...`);
  const created = await createProgbatCustomer(params);
  console.log(`[ProGBat] Nouveau client créé avec succès : ${created.legalName} (ID: ${created.id})`);
  return { id: created.id, name: created.legalName };
}

/**
 * Creates a draft bill (facture) in ProGBat matching the Stripe payment
 */
export async function createProgbatInvoice({
  thirdId,
  clientName,
  clientAddress,
  clientCity,
  clientPostcode,
  serviceId,
  serviceName,
  description,
  totalAmountTTC,
  date,
  timeSlot,
  stripePaymentId,
}: CreateBillParams): Promise<any> {
  const { elementId, defaultLabel } = getProgbatElementId(serviceId, serviceName);

  // TVA 20% (ID 4 dans ProGBat)
  // Montant HT calculé à partir du TTC réglé sur Stripe
  const netUnitPrice = Math.round((Number(totalAmountTTC) / 1.20) * 100) / 100;
  const docDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  const fullLabel = description || `${defaultLabel}${timeSlot ? ` — Planifié le ${docDate} (${timeSlot})` : ''} | Attestation Cerfa incluse`;

  const billPayload = {
    thirdId,
    type: 'bill',
    documentDate: docDate,
    businessLabel: clientName,
    yardLabel: 'Entretien clim',
    clientName,
    clientAddress: clientAddress || clientCity || 'Bouches-du-Rhône',
    clientCity: clientCity || 'Miramas',
    clientPostcode: clientPostcode || '13140',
    object: `Réservation en ligne — ${serviceName} | Règlement Carte Bancaire Stripe (${stripePaymentId || 'Validé'})`,
    clientOrderNumber: stripePaymentId || '',
    content: [
      {
        lineType: 'element',
        elementId,
        label: fullLabel,
        quantity: 1,
        unit: 'U',
        netUnitPrice,
        taxRateId: 4, // Taux normal 20%
      },
    ],
  };

  const res = await fetch(`${PROGBAT_API_URL}/company/bills`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(billPayload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`[ProGBat] Failed to create invoice (${res.status}): ${errorText}`);
  }

  const createdBill = await res.json();
  console.log(`[ProGBat] Facture créée avec succès : ${createdBill.code} (ID: ${createdBill.id}) pour ${clientName} - ${totalAmountTTC} € TTC`);
  return createdBill;
}
