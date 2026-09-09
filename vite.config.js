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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), resolveMapsUrlPlugin()],
  server: {
    port: 3000,
    open: false
  }
})

