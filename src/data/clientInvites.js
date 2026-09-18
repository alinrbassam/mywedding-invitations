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
 * Look up a client invite by slug (case-insensitive)
 */
export function getClientInvite(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  return CLIENT_INVITES[clean] || null;
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
