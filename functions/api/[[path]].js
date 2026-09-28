// Cloudflare Pages Function: /api/health and a cached, allow-listed PubChem proxy at the edge.
// Mirrors server/server.mjs so the app behaves the same on Cloudflare Pages and on a school server.
import { DEFAULT_USER_AGENT, SECURITY_HEADERS, UPSTREAM, route } from '../../server/policy.mjs';

const json = (status, data, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      ...SECURITY_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extra,
    },
  });

export async function onRequest({ request, waitUntil }) {
  if (!['GET', 'HEAD'].includes(request.method)) return json(405, { error: 'Method not allowed' });
  const url = new URL(request.url);
  const apiPath = url.pathname.replace(/^\/api\//, '');
  if (apiPath === 'health') return json(200, { ok: true, proxy: true, edge: true });
  if (url.search.length > 2000) return json(414, { error: 'Query too long' });
  const target = route(apiPath, url.search);
  if (target.error === 404) return json(404, { error: 'Unknown endpoint' });
  if (target.error === 403) return json(403, { error: 'Endpoint not allowed' });

  const upstreamURL = `${UPSTREAM[target.provider].base}${target.path}${target.search}`;
  const cache = caches.default;
  const key = new Request(upstreamURL, { method: 'GET' });
  const hit = await cache.match(key);
  if (hit) return hit;
  let response;
  try {
    response = await fetch(upstreamURL, { headers: { 'User-Agent': DEFAULT_USER_AGENT, Accept: '*/*' } });
  } catch {
    return json(502, { error: 'Upstream unavailable' });
  }
  const ttl = Math.round(UPSTREAM[target.provider].ttl(target.path) / 1000);
  const out = new Response(response.body, {
    status: response.status,
    headers: {
      ...SECURITY_HEADERS,
      'Content-Type': response.headers.get('content-type') || 'application/json',
      'Cache-Control': response.ok || response.status === 404 ? `public, max-age=${ttl}` : 'no-store',
    },
  });
  if (response.ok || response.status === 404) waitUntil(cache.put(key, out.clone()));
  return out;
}
