#!/usr/bin/env node
// Assembles dist/: the files a static host (Cloudflare Pages, Netlify, GitHub Pages) should publish,
// plus a _headers file with the same security policy as server/server.mjs.
//   npm run build:site                                   (also refreshes the sw.js precache list)
//   SITE_URL=https://moleculium.example npm run build:site  absolute link-preview URLs for that address
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
