#!/usr/bin/env node
// Assembles dist/: the files a static host (Cloudflare Pages, Netlify, GitHub Pages) should publish,
// plus a _headers file with the same security policy as server/server.mjs.
//   npm run build:site                                   (also refreshes the sw.js precache list)
//   SITE_URL=https://alchemist.example npm run build:site  absolute link-preview URLs for that address
// The Pages Function in functions/ is deployed from the project root by `wrangler pages deploy dist`.
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECURITY_HEADERS } from '../server/policy.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const siteURL = (process.env.SITE_URL || '').replace(/\/+$/, '');
if (siteURL && !/^https:\/\/[^/]+$/.test(siteURL))
  throw new Error(`SITE_URL must look like https://example.org, got "${siteURL}"`);

const FILES = ['index.html', 'manifest.webmanifest', 'sw.js', 'robots.txt'];
const DIRS = ['css', 'js', 'assets'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of FILES) await cp(join(root, file), join(dist, file));
for (const dir of DIRS)
  await cp(join(root, dir), join(dist, dir), { recursive: true, filter: src => !src.endsWith('.md') });
// Reference data without the sync scripts' private cache.
await cp(join(root, 'data'), join(dist, 'data'), {
  recursive: true,
  filter: src => !src.includes('.sync-cache'),
});

if (siteURL) {
  const path = join(dist, 'index.html');
  let html = await readFile(path, 'utf8');
  const image = '<meta property="og:image" content="assets/brand/og-image.png" />';
  const type = '<meta property="og:type" content="website" />';
  if (!html.includes(image) || !html.includes(type))
    throw new Error('index.html Open Graph tags changed; update scripts/build-site.mjs');
  html = html
    .replace(image, `<meta property="og:image" content="${siteURL}/assets/brand/og-image.png" />`)
    .replace(
      type,
      `${type}\n    <meta property="og:url" content="${siteURL}/" />\n    <link rel="canonical" href="${siteURL}/" />`
    );
  await writeFile(path, html);
}

// Search engines. GOOGLE_SITE_VERIFICATION (the content of Search Console's meta tag, or the whole tag)
// proves ownership; the sitemap needs SITE_URL; 404.html makes unknown paths answer 404 instead of the
// app, which Cloudflare Pages would otherwise serve for every path.
const verification = (process.env.GOOGLE_SITE_VERIFICATION || '').match(
  /(?:content="([^"]*)"|^\s*(\S+)\s*$)/
);
const verificationCode = verification?.[1] ?? verification?.[2] ?? '';
if (process.env.GOOGLE_SITE_VERIFICATION?.trim() && !/^[\w-]{20,100}$/.test(verificationCode))
  throw new Error('GOOGLE_SITE_VERIFICATION must be the content of the google-site-verification meta tag');
if (verificationCode) {
  const path = join(dist, 'index.html');
  const html = await readFile(path, 'utf8');
  await writeFile(
    path,
    html.replace(
      '</head>',
      `  <meta name="google-site-verification" content="${verificationCode}" />\n  </head>`
    )
  );
}
if (siteURL) {
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteURL}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`
  );
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  await writeFile(join(dist, 'robots.txt'), `${robots.trimEnd()}\n\nSitemap: ${siteURL}/sitemap.xml\n`);
}
await writeFile(
  join(dist, '404.html'),
  `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Halaman tidak ditemukan · Alchemist</title>
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/brand/favicon-48.png" />
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px;
        font: 16px/1.5 system-ui, sans-serif; color: #172033; background: #f5f8ff; text-align: center; }
      a { color: #2563eb; font-weight: 600; }
    </style>
  </head>
  <body>
    <main>
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat ini tidak ada di Alchemist.</p>
      <p><a href="/">Kembali ke beranda Alchemist</a></p>
    </main>
  </body>
</html>
`
);

// Cloudflare Pages / Netlify read _headers for static files; the Function sets its own headers.
const headers = { ...SECURITY_HEADERS, 'Strict-Transport-Security': 'max-age=31536000' };
await writeFile(
  join(dist, '_headers'),
  `/*\n${Object.entries(headers)
    .map(([name, value]) => `  ${name}: ${value}`)
    .join(
      '\n'
    )}\n/data/*\n  Cache-Control: public, max-age=3600\n/assets/*\n  Cache-Control: public, max-age=604800\n`
);

async function size(dir) {
  let files = 0;
  let bytes = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await size(full);
      files += sub.files;
      bytes += sub.bytes;
    } else {
      files++;
      bytes += (await stat(full)).size;
    }
  }
  return { files, bytes };
}
const { files, bytes } = await size(dist);
console.log(
  `dist/: ${files} files, ${(bytes / 1048576).toFixed(1)} MB${siteURL ? `, link previews for ${siteURL}` : ''}.`
);
