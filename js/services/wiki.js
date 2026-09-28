// Live Wikidata / Wikipedia / Wikimedia Commons lookups (free, no key, CORS with origin=*).
// Used for compounds outside the catalogue: Indonesian names, the encyclopedia lead and a licensed photo.
import { CONFIG } from '../config.js';

const cache = new Map();
async function getJSON(url) {
  if (cache.has(url)) return cache.get(url);
  const task = fetch(url, { signal: AbortSignal.timeout(12000) }).then(r => (r.ok ? r.json() : null));
  cache.set(url, task);
  task.catch(() => cache.delete(url));
  return task;
}
const api = params => `${CONFIG.wikidata}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
const strip = html =>
  String(html || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);

/** Wikidata item for a PubChem CID, with its Indonesian/English labels, Wikipedia titles and image. */
export async function itemForCid(cid) {
  const found = await getJSON(
    api({ action: 'query', list: 'search', srsearch: `haswbstatement:P662=${Number(cid)}`, srlimit: '1' })
  );
  const qid = found?.query?.search?.[0]?.title;
  if (!qid) return null;
  const [entity, claims] = await Promise.all([
    getJSON(
      api({
        action: 'wbgetentities',
        ids: qid,
        props: 'labels|sitelinks',
        languages: 'id|en',
        sitefilter: 'idwiki|enwiki',
      })
    ),
    getJSON(api({ action: 'wbgetclaims', entity: qid, property: 'P18' })),
  ]);
  const e = entity?.entities?.[qid] || {};
  return {
    qid,
    label: { id: e.labels?.id?.value || null, en: e.labels?.en?.value || null },
    idwiki: e.sitelinks?.idwiki?.title || null,
    enwiki: e.sitelinks?.enwiki?.title || null,
    image: claims?.claims?.P18?.[0]?.mainsnak?.datavalue?.value || null,
  };
}

/** Lead section of a Wikipedia article as plain text. */
export async function intro(lang, title, max = 2200) {
  if (!title) return null;
  const url = `https://${lang}.wikipedia.org/w/api.php?${new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    prop: 'extracts|info',
    inprop: 'url',
    exintro: '1',
    explaintext: '1',
    redirects: '1',
    origin: '*',
    titles: title,
  })}`;
  const page = (await getJSON(url))?.query?.pages?.[0];
  if (!page?.extract) return null;
  let text = page.extract.replace(/\n{2,}/g, '\n').trim();
  if (text.length > max) text = `${text.slice(0, text.lastIndexOf('. ', max) + 1 || max)}`;
  return { title: page.title, extract: text, url: page.fullurl };
}

/** Commons thumbnail and credit for a file name. */
export async function photo(file, width = 640) {
  if (!file) return null;
  const data = await getJSON(
    `${CONFIG.commons}?${new URLSearchParams({
      action: 'query',
      format: 'json',
      formatversion: '2',
      origin: '*',
      prop: 'imageinfo',
      iiprop: 'url|size|extmetadata',
      iiurlwidth: String(width),
      iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|Credit',
      titles: `File:${file}`,
    })}`
  );
  const info = data?.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) return null;
  const meta = info.extmetadata || {};
  return {
    file,
    thumb: info.thumburl || info.url,
    width: info.thumbwidth,
    height: info.thumbheight,
    page: info.descriptionurl,
    author: strip(meta.Artist?.value) || strip(meta.Credit?.value) || 'Wikimedia Commons',
    license: strip(meta.LicenseShortName?.value),
    licenseUrl: meta.LicenseUrl?.value || '',
    kind: /\.svg$/i.test(file) ? 'diagram' : 'photo',
  };
}

/** Encyclopedia extras for a live compound: { wikidata, label, wiki: {id, en}, photo }. */
export async function extrasForCid(cid) {
  const item = await itemForCid(cid).catch(() => null);
  if (!item) return null;
  const [id, en, img] = await Promise.all([
    intro('id', item.idwiki).catch(() => null),
    intro('en', item.enwiki).catch(() => null),
    photo(item.image).catch(() => null),
  ]);
  return { wikidata: item.qid, label: item.label, wiki: { id, en }, photo: img };
}

/**
 * Compounds whose Indonesian (or English) Wikidata label matches the term: [{ qid, label, cid }].
 * Lets learners search "asam cuka" or "garam dapur" even when PubChem only knows English names.
 */
export async function searchByLabel(term, lang = 'id') {
  const found = await getJSON(
    api({ action: 'wbsearchentities', search: term, language: lang, uselang: lang, type: 'item', limit: '8' })
  );
  const items = (found?.search || []).map(s => ({
    qid: s.id,
    label: s.label,
    description: s.description || '',
  }));
  if (!items.length) return [];
  const query = `SELECT ?item ?cid WHERE { VALUES ?item { ${items.map(i => `wd:${i.qid}`).join(' ')} } ?item wdt:P662 ?cid }`;
  const res = await getJSON(`${CONFIG.sparql}?${new URLSearchParams({ query, format: 'json' })}`);
  const cids = new Map(
    (res?.results?.bindings || []).map(b => [b.item.value.split('/').pop(), Number(b.cid.value)])
  );
  return items.filter(i => cids.has(i.qid)).map(i => ({ ...i, cid: cids.get(i.qid) }));
}
