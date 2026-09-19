// Vercel Serverless Function: /api/rsvp
// Handles POST (submit guest RSVP) and GET (fetch client RSVPs & stats)

const inMemoryStore = {
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

function calculateStats(rsvps = []) {
  let totalAttendingParties = 0;
  let totalDeclinedParties = 0;
  let totalAdults = 0;
  let totalKids = 0;
  let withDietaryCount = 0;

  rsvps.forEach(r => {
    if (r.attending === 'yes') {
      totalAttendingParties += 1;
      totalAdults += (Number(r.adultsCount) || 1);
      totalKids += (Number(r.kidsCount) || 0);
    } else {
      totalDeclinedParties += 1;
    }
    if (r.notes && r.notes.trim().length > 0) {
      withDietaryCount += 1;
    }
  });

  return {
    totalResponses: rsvps.length,
    totalAttendingParties,
    totalDeclinedParties,
    totalAdults,
    totalKids,
    totalGuests: totalAdults + totalKids,
    attendanceRate: rsvps.length > 0 ? Math.round((totalAttendingParties / rsvps.length) * 100) : 0,
    withDietaryCount
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const slug = (req.query.client || req.query.slug || 'hadi').toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const clientRsvps = inMemoryStore[slug] || [];
    return res.status(200).json({
      success: true,
      clientSlug: slug,
      rsvps: clientRsvps,
      stats: calculateStats(clientRsvps)
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const slug = (body.clientSlug || body.client || 'hadi').toLowerCase().replace(/[^a-z0-9_-]/g, '');
      
      const newEntry = {
        id: body.id || ('rsvp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)),
        clientSlug: slug,
        name: (body.guestName || body.name || 'Guest').trim(),
        attending: body.attending === 'no' || body.attending === false || body.attending === 'declined' ? 'no' : 'yes',
        adultsCount: typeof body.adultsCount === 'number' ? Math.max(0, body.adultsCount) : (body.attending === 'no' ? 0 : 1),
        kidsCount: typeof body.kidsCount === 'number' ? Math.max(0, body.kidsCount) : 0,
        notes: (body.notes || body.dietary || '').trim(),
        phone: (body.phone || '').trim(),
        email: (body.email || '').trim(),
        createdAt: new Date().toISOString(),
        source: body.source || 'web'
      };

      if (!inMemoryStore[slug]) {
        inMemoryStore[slug] = [];
      }
      inMemoryStore[slug].unshift(newEntry);

      return res.status(200).json({
        success: true,
        rsvp: newEntry,
        stats: calculateStats(inMemoryStore[slug])
      });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}