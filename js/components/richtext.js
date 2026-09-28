// Lesson text → HTML. Supports paragraphs, "- " and "1. " lists, "### " headings, **bold**, *italic*,
// [[glossary term]] / [[term|label]], {{m:molecule-id}} / {{m:id|label}}, {{e:Fe}} (element),
// {{lab:id|label}}, {{learn:id|label}} and {{page:table|label}}. Input is escaped first, so content cannot inject HTML.
import { esc } from '../core/dom.js';
import { pick } from '../core/prefs.js';
import { getMolecule } from '../data/curatedMolecules.js';
import { getElement } from '../data/periodicTable.js';
import { findTerm } from '../data/glossary.js';

function inline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(\S.*?\S|\S)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, key, label) => {
      const term = findTerm(key);
      const text = label || key;
      return term
        ? `<a class="term" href="#/glossary/${encodeURIComponent(term.key)}" data-term="${esc(term.key)}">${text}</a>`
        : `<a class="term" href="#/glossary?q=${encodeURIComponent(key)}">${text}</a>`;
    })
    .replace(/\{\{(m|e|lab|learn|page):([^}|]+)(?:\|([^}]+))?\}\}/g, (_, kind, id, label) => {
      if (kind === 'm') {
        const m = getMolecule(id);
        return m
          ? `<a class="mol-link" href="#/molecule/${id}">${label || esc(pick(m.name))}</a>`
          : label || id;
      }
      if (kind === 'e') {
        const e = getElement(id);
        return e
          ? `<a class="el-link" href="#/atom/${e.s}">${label || esc(pick([e.id, e.en]))}</a>`
          : label || id;
      }
      if (kind === 'page') return `<a href="#/${id}">${label || id}</a>`;
      return `<a href="#/${kind}/${id}">${label || id}</a>`;
    });
}

export function richText(source) {
  const blocks = String(source || '')
    .trim()
    .split(/\n\s*\n/);
  return blocks
    .map(block => {
      const lines = block.split('\n');
      if (lines.every(l => /^\s*-\s+/.test(l)))
        return `<ul>${lines.map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`).join('')}</ul>`;
      if (lines.every(l => /^\s*\d+\.\s+/.test(l)))
        return `<ol>${lines.map(l => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
      if (/^###\s+/.test(block)) return `<h3>${inline(block.replace(/^###\s+/, ''))}</h3>`;
      // A paragraph followed directly by a list ("Contoh:\n- a\n- b").
      const listStart = lines.findIndex(l => /^\s*-\s+/.test(l));
      if (listStart > 0 && lines.slice(listStart).every(l => /^\s*-\s+/.test(l)))
        return `<p>${inline(lines.slice(0, listStart).join(' '))}</p><ul>${lines
          .slice(listStart)
          .map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`)
          .join('')}</ul>`;
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('');
}

/** Plain text (for read-aloud): strips link syntax and markup. */
export function plainText(source) {
  return String(source || '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, k, l) => l || k)
    .replace(/\{\{(m|e|lab|learn|page):([^}|]+)(?:\|([^}]+))?\}\}/g, (_, kind, id, l) => {
      if (l) return l;
      if (kind === 'm') return pick(getMolecule(id)?.name) || id;
      if (kind === 'e') {
        const e = getElement(id);
        return e ? pick([e.id, e.en]) : id;
      }
      return id;
    })
    .replace(/\*\*|\*|###\s*/g, '')
    .replace(/^\s*-\s+/gm, '');
}
