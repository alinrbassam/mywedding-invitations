import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
import http from 'http'
import { URL } from 'url'

function resolveMapsUrlPlugin() {
  return {
    name: 'resolve-maps-url-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/resolve-maps-url')) {
          try {
            const reqUrl = new URL(req.url, 'http://localhost:3000');
            const targetUrl = reqUrl.searchParams.get('url');
            if (!targetUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: 'Missing url parameter' }));
            }

            const result = await new Promise((resolve) => {
              let currentUrl = targetUrl.trim();
              let redirectCount = 0;
              const maxRedirects = 5;

              function step(urlStr) {
                let parsed;
                try {
                  parsed = new URL(urlStr);
                } catch (e) {
                  return resolve({ success: false, error: 'Invalid URL', original: targetUrl });
                }

                const client = parsed.protocol === 'https:' ? https : http;
                const r = client.get(
                  urlStr,
                  {
                    headers: {
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                  },
                  (resp) => {
                    if ([301, 302, 303, 307, 308].includes(resp.statusCode) && resp.headers.location) {
                      const nextUrl = new URL(resp.headers.location, urlStr).toString();
                      redirectCount++;
                      if (redirectCount >= maxRedirects || nextUrl.includes('/search/') || nextUrl.includes('/place/') || nextUrl.includes('@')) {
                        return finish(nextUrl);
                      }
                      return step(nextUrl);
                    }
                    return finish(urlStr);
                  }
                );

                r.on('error', (err) => resolve({ success: false, error: err.message, original: targetUrl }));
                r.setTimeout(6000, () => {
                  r.destroy();
                  finish(urlStr);
                });
              }

              function finish(finalUrl) {
                let lat = null;
                let lng = null;
                let placeName = null;

                const searchCoords = finalUrl.match(/search\/(-?\d+\.\d+),\+?(-?\d+\.\d+)/);
                if (searchCoords) {
                  lat = searchCoords[1];
                  lng = searchCoords[2];
                }

                if (!lat) {
                  const atCoords = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                  if (atCoords) {
                    lat = atCoords[1];
                    lng = atCoords[2];
                  }
                }

                if (!lat) {
                  const qCoords = finalUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
                  if (qCoords) {
                    lat = qCoords[1];
                    lng = qCoords[2];
                  }
                }

                const placeMatch = finalUrl.match(/\/place\/([^/@?]+)/);
                if (placeMatch) {
                  try {
                    placeName = decodeURIComponent(placeMatch[1]).replace(/\+/g, ' ');
                  } catch (e) {}
                }

                let embedUrl = '';
                if (lat && lng) {
                  embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
                } else if (placeName) {
                  embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
                }

                resolve({
                  success: true,
                  original: targetUrl,
                  finalUrl,
                  lat,
                  lng,
                  placeName,
                  embedUrl
                });
              }

              step(currentUrl);
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(result));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: err.message }));
          }
        }
        next();
      });
    }
  };
}

function rsvpApiPlugin() {
  const localRsvpStore = {
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

  const getStats = (list = []) => {
    let totalAttendingParties = 0;
    let totalDeclinedParties = 0;
    let totalAdults = 0;
    let totalKids = 0;
    let withDietaryCount = 0;

    list.forEach(r => {
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
      totalResponses: list.length,
      totalAttendingParties,
      totalDeclinedParties,
      totalAdults,
      totalKids,
      totalGuests: totalAdults + totalKids,
      attendanceRate: list.length > 0 ? Math.round((totalAttendingParties / list.length) * 100) : 0,
      withDietaryCount
    };
  };

  return {
    name: 'rsvp-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/rsvp')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
          }

          const parsedUrl = new URL(req.url, 'http://localhost:3000');
          const slug = (parsedUrl.searchParams.get('client') || parsedUrl.searchParams.get('slug') || 'hadi').toLowerCase().replace(/[^a-z0-9_-]/g, '');

          if (req.method === 'GET') {
            const list = localRsvpStore[slug] || [];
            res.statusCode = 200;
            return res.end(JSON.stringify({
              success: true,
              clientSlug: slug,
              rsvps: list,
              stats: getStats(list)
            }));
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', chunk => { bodyStr += chunk; });
            req.on('end', () => {
              try {
                const body = bodyStr ? JSON.parse(bodyStr) : {};
                const clientSlug = (body.clientSlug || body.client || slug || 'hadi').toLowerCase().replace(/[^a-z0-9_-]/g, '');
                const newEntry = {
                  id: body.id || ('rsvp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)),
                  clientSlug: clientSlug,
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

                if (!localRsvpStore[clientSlug]) {
                  localRsvpStore[clientSlug] = [];
                }
                localRsvpStore[clientSlug].unshift(newEntry);

                res.statusCode = 200;
                return res.end(JSON.stringify({
                  success: true,
                  rsvp: newEntry,
                  stats: getStats(localRsvpStore[clientSlug])
                }));
              } catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), resolveMapsUrlPlugin(), rsvpApiPlugin()],
  server: {
    port: 3000,
    open: false
  }
})


