/**
 * Client Invitations Registry
 * 
 * Each client invitation is keyed by their unique URL slug (e.g. 'hadi' -> /invite/hadi or /hadi).
 * You can add new clients directly here, or generate instant packed share links from the studio.
 */

export const CLIENT_INVITES = {
  hadi: {
    slug: 'hadi',
    clientName: 'Hadi',
    templateId: 'dolce-vita',
    secretPin: '1234',
    createdAt: '2026-09-18',
    status: 'active',
    customData: {
      partner1: 'Hadi',
      partner2: 'Nour',
      connector: '&',
      initials: 'HN',
      dateText: 'September 20, 2026',
      dateInput: '2026-09-20',
      timeInput: '18:00',
      targetDate: '2026-09-20T18:00:00',
      venueName: 'Château d’Amalfi',
      venueAddress: 'Via Panoramica 14, Amalfi Coast, Italy',
      mapUrl: 'https://maps.google.com/?q=Amalfi+Coast+Italy',
      welcomeMessage: 'We joyfully invite you to celebrate our wedding day with us surrounded by the sea and sunset.',
      dressCode: 'Black Tie Optional / Summer Formal Elegance',
      giftPreference: 'Your presence at our celebration is the greatest gift.',
      rsvpDeadline: 'August 1, 2026',
      rsvpDeadlineMessage: 'Please confirm your attendance with us by August 1, 2026.',
      closingText: 'With love and excitement, Hadi & Nour'
    }
  }
};

/**
 * Initial seed RSVPs for Hadi so the dashboard immediately showcases
 * realistic, actionable guest stats (Attending, Declined, Adults, Kids, Dietary notes).
 */
export const SEED_RSVPS = {
  hadi: [
    {
      id: 'rsvp_hadi_1',
      clientSlug: 'hadi',
      name: 'Karim & Sarah Al-Hassan',
      attending: 'yes',
      adultsCount: 2,
      kidsCount: 2,
      notes: 'No seafood for Sarah please. So thrilled to celebrate with you both!',
      createdAt: '2026-09-19T10:15:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_2',
      clientSlug: 'hadi',
      name: 'Tarek Mansour',
      attending: 'yes',
      adultsCount: 1,
      kidsCount: 0,
      notes: 'Cannot wait for the big day! Looking forward to an unforgettable night.',
      createdAt: '2026-09-19T11:40:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_3',
      clientSlug: 'hadi',
      name: 'Dr. Sami & Leila Khoury',
      attending: 'yes',
      adultsCount: 2,
      kidsCount: 1,
      notes: 'High chair needed if possible. Mabrouk!',
      createdAt: '2026-09-19T12:20:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_4',
      clientSlug: 'hadi',
      name: 'Omar Bitar',
      attending: 'no',
      adultsCount: 0,
      kidsCount: 0,
      notes: 'Sending all my love from London! Wish I could be there in person.',
      createdAt: '2026-09-19T13:05:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_5',
      clientSlug: 'hadi',
      name: 'Maya & Ziad Haddad',
      attending: 'yes',
      adultsCount: 2,
      kidsCount: 1,
      notes: 'Vegetarian meal for Maya. So excited for the wedding!',
      createdAt: '2026-09-19T14:45:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_6',
      clientSlug: 'hadi',
      name: 'Rania Sleiman & Guest',
      attending: 'yes',
      adultsCount: 2,
      kidsCount: 0,
      notes: 'Allergies: Nut-free meal for guest.',
      createdAt: '2026-09-19T15:30:00Z',
      source: 'web'
    },
    {
      id: 'rsvp_hadi_7',
      clientSlug: 'hadi',
      name: 'Jad Kassir',
      attending: 'no',
      adultsCount: 0,
      kidsCount: 0,
      notes: 'Heartfelt congratulations! Wishing you endless joy and prosperity.',
      createdAt: '2026-09-19T16:10:00Z',
      source: 'web'
    }
  ]
};

export const WEDDINGS_REGISTRY_KEY = 'laylitna_weddings_registry';
const memoryRegistry = {};

/**
 * Get all registered client weddings (seeded + custom saved in localStorage)
 */
export function getAllClientWeddings() {
  const dynamicMap = { ...memoryRegistry };
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(WEDDINGS_REGISTRY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          Object.assign(dynamicMap, parsed);
        }
      }
    } catch (e) {
      console.error('Error reading weddings registry:', e);
    }
  }

  // Merge static seeds with dynamic map
  const merged = { ...CLIENT_INVITES, ...dynamicMap };
  return Object.values(merged);
}

/**
 * Look up a client invite by slug (case-insensitive)
 */
export function getClientInvite(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(WEDDINGS_REGISTRY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed[clean]) {
          return parsed[clean];
        }
      }
    } catch (e) {}
  }

  return memoryRegistry[clean] || CLIENT_INVITES[clean] || null;
}

/**
 * Create or save a new client wedding project
 */
export function saveClientWedding(wedding) {
  if (!wedding || !wedding.slug) return null;
  const cleanSlug = wedding.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  
  const partner1 = wedding.partner1 || wedding.customData?.partner1 || 'Bride';
  const partner2 = wedding.partner2 || wedding.customData?.partner2 || 'Groom';

  const record = {
    slug: cleanSlug,
    clientName: wedding.clientName || `${partner1} & ${partner2}`,
    templateId: wedding.templateId || 'dolce-vita',
    secretPin: String(wedding.secretPin || Math.floor(1000 + Math.random() * 9000)),
    createdAt: wedding.createdAt || new Date().toISOString().split('T')[0],
    status: wedding.status || 'active',
    customData: wedding.customData || {
      partner1,
      partner2,
      connector: '&',
      initials: `${partner1[0] || 'A'}${partner2[0] || 'N'}`,
      dateText: wedding.dateText || 'September 20, 2026',
      dateInput: wedding.dateInput || '2026-09-20',
      timeInput: wedding.timeInput || '18:00',
      venueName: wedding.venueName || 'Grand Ballroom',
      venueAddress: wedding.venueAddress || '',
      mapUrl: wedding.mapUrl || '',
      welcomeMessage: wedding.welcomeMessage || 'We joyfully invite you to celebrate our special day with us.',
      dressCode: wedding.dressCode || 'Black Tie / Evening Glamour',
      giftPreference: 'Your presence at our wedding is the greatest gift.',
      rsvpDeadline: wedding.rsvpDeadline || '',
      rsvpDeadlineMessage: 'Please confirm your attendance with us.'
    }
  };

  memoryRegistry[cleanSlug] = record;

  if (typeof window !== 'undefined') {
    try {
      let currentMap = {};
      const stored = localStorage.getItem(WEDDINGS_REGISTRY_KEY);
      if (stored) currentMap = JSON.parse(stored) || {};
      currentMap[cleanSlug] = record;
      localStorage.setItem(WEDDINGS_REGISTRY_KEY, JSON.stringify(currentMap));
      window.dispatchEvent(new CustomEvent('laylitna_weddings_updated', { detail: record }));
    } catch (e) {
      console.error('Failed to save wedding to registry:', e);
    }
  }

  return record;
}

/**
 * Delete a client wedding project from dynamic registry
 */
export function deleteClientWedding(slug) {
  if (!slug) return false;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  delete memoryRegistry[cleanSlug];
  if (typeof window !== 'undefined') {
    try {
      let currentMap = {};
      const stored = localStorage.getItem(WEDDINGS_REGISTRY_KEY);
      if (stored) currentMap = JSON.parse(stored) || {};
      delete currentMap[cleanSlug];
      localStorage.setItem(WEDDINGS_REGISTRY_KEY, JSON.stringify(currentMap));
      window.dispatchEvent(new CustomEvent('laylitna_weddings_updated', { detail: { deleted: cleanSlug } }));
      return true;
    } catch (e) {
      console.error('Failed to delete wedding:', e);
    }
  }
  return false;
}

/**
 * Verify couple PIN or key
 */
export function verifyCoupleAccess(slug, pinOrKey) {
  if (!slug || !pinOrKey) return false;
  const client = getClientInvite(slug);
  if (!client) return false;
  const expected = String(client.secretPin || '1234').trim();
  return String(pinOrKey).trim() === expected;
}

/**
 * Retrieve all RSVPs for a given client slug
 */
export function getClientRsvps(slug) {
  if (!slug) return [];
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  try {
    const storageKey = `wbg_rsvps_${clean}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to read stored RSVPs:', e);
  }
  return SEED_RSVPS[clean] ? [...SEED_RSVPS[clean]] : [];
}

/**
 * Save an RSVP for a given client slug (adds new or updates existing)
 */
export function saveClientRsvp(slug, rsvp) {
  if (!slug || !rsvp) return null;
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const existing = getClientRsvps(clean);
  
  const newRsvp = {
    id: rsvp.id || `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    clientSlug: clean,
    name: (rsvp.name || rsvp.guestName || 'Guest').trim(),
    attending: rsvp.attending === 'no' || rsvp.attending === false || rsvp.attending === 'declined' ? 'no' : 'yes',
    adultsCount: typeof rsvp.adultsCount === 'number' ? Math.max(0, rsvp.adultsCount) : (rsvp.attending === 'no' ? 0 : 1),
    kidsCount: typeof rsvp.kidsCount === 'number' ? Math.max(0, rsvp.kidsCount) : 0,
    notes: (rsvp.notes || rsvp.dietary || '').trim(),
    phone: (rsvp.phone || '').trim(),
    email: (rsvp.email || '').trim(),
    createdAt: rsvp.createdAt || new Date().toISOString(),
    source: rsvp.source || 'web'
  };

  // Check if updating existing by ID
  const index = existing.findIndex(item => item.id === newRsvp.id);
  let updatedList;
  if (index >= 0) {
    updatedList = [...existing];
    updatedList[index] = newRsvp;
  } else {
    // Insert at beginning of list so latest appears first
    updatedList = [newRsvp, ...existing];
  }

  try {
    localStorage.setItem(`wbg_rsvps_${clean}`, JSON.stringify(updatedList));
    // Trigger storage event for same-window sync
    window.dispatchEvent(new CustomEvent('wbg_rsvp_updated', { detail: { slug: clean, rsvps: updatedList } }));
  } catch (e) {
    console.error('Failed to persist RSVP to localStorage:', e);
  }

  return newRsvp;
}

/**
 * Delete an RSVP by ID
 */
export function deleteClientRsvp(slug, rsvpId) {
  if (!slug || !rsvpId) return false;
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const existing = getClientRsvps(clean);
  const updatedList = existing.filter(r => r.id !== rsvpId);
  try {
    localStorage.setItem(`wbg_rsvps_${clean}`, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('wbg_rsvp_updated', { detail: { slug: clean, rsvps: updatedList } }));
    return true;
  } catch (e) {
    console.error('Failed to delete RSVP:', e);
    return false;
  }
}

/**
 * Calculate key KPI statistics for couple's guest dashboard
 */
export function getClientRsvpStats(slug) {
  const rsvps = getClientRsvps(slug);
  let totalAttendingParties = 0;
  let totalDeclinedParties = 0;
  let totalAdults = 0;
  let totalKids = 0;
  let withDietaryCount = 0;

  rsvps.forEach(r => {
    if (r.attending === 'yes') {
      totalAttendingParties += 1;
      totalAdults += (r.adultsCount || 1);
      totalKids += (r.kidsCount || 0);
    } else {
      totalDeclinedParties += 1;
    }
    if (r.notes && r.notes.trim().length > 0) {
      withDietaryCount += 1;
    }
  });

  const totalGuests = totalAdults + totalKids;
  const totalResponses = rsvps.length;
  const attendanceRate = totalResponses > 0 ? Math.round((totalAttendingParties / totalResponses) * 100) : 0;

  return {
    totalResponses,
    totalAttendingParties,
    totalDeclinedParties,
    totalAdults,
    totalKids,
    totalGuests,
    attendanceRate,
    withDietaryCount
  };
}

/**
 * Pack customData into a safe base64 URL string
 */
export function packInviteData(templateId, customData) {
  try {
    const payload = JSON.stringify({ tpl: templateId, data: customData });
    return btoa(encodeURIComponent(payload).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (err) {
    console.error('Error packing invite data:', err);
    return '';
  }
}

/**
 * Unpack customData from a safe base64 URL string
 */
export function unpackInviteData(encodedStr) {
  try {
    if (!encodedStr) return null;
    const jsonStr = decodeURIComponent(
      Array.prototype.map.call(atob(encodedStr), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Error unpacking invite data:', err);
    return null;
  }
}
