#!/usr/bin/env node
// Content integrity checks: every link in lessons and data points at something that exists, every quiz
// answer is valid, every catalogue molecule has its synced PubChem record, every reaction balances.
// Usage: npm run data:check
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOLECULES, getMolecule } from '../js/data/curatedMolecules.js';
import { CLASSES, getClass } from '../js/data/classes.js';
import { ELEMENTS, getElement } from '../js/data/periodicTable.js';
import { GLOSSARY, GLOSSARY_CATS, findTerm } from '../js/data/glossary.js';
import { TOPICS, findTopic } from '../js/data/topics/index.js';
import { LABS, PLACES, PATHS, findLab } from '../js/data/curriculum.js';
import { GEOMETRIES } from '../js/data/geometry.js';
import { REACTIONS } from '../js/data/reactions.js';
import { LATTICES } from '../js/services/lattice.js';
import { parseFormula, molarMass, balance } from '../js/services/formula.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const warnings = [];
const fail = msg => errors.push(msg);
const LEVELS = ['sd', 'smp', 'sma', 'kuliah'];
const pair = (v, where) => {
  if (!Array.isArray(v) || v.length !== 2 || v.some(x => typeof x !== 'string' || !x.trim()))
    fail(`${where}: needs [id, en] text`);
};

// ---------- Molecules ----------
const ids = new Set();
const index = existsSync(join(root, 'data/molecules/index.json'))
  ? JSON.parse(readFileSync(join(root, 'data/molecules/index.json'), 'utf8'))
  : [];
const indexIds = new Set(index.map(r => r.id));
let photos = 0;
for (const m of MOLECULES) {
  const w = `molecule ${m.id}`;
  if (!/^[a-z0-9-]+$/.test(m.id)) fail(`${w}: id must be kebab-case`);
  if (ids.has(m.id)) fail(`${w}: duplicate id`);
  ids.add(m.id);
  if (!Number.isInteger(m.cid) || m.cid <= 0) fail(`${w}: invalid cid`);
  if (!m.cls?.length || m.cls.some(c => !getClass(c))) fail(`${w}: unknown class in ${m.cls}`);
  if (!LEVELS.includes(m.lv)) fail(`${w}: invalid level ${m.lv}`);
  for (const c of m.ctx || []) if (!PLACES.some(p => p.id === c)) fail(`${w}: unknown place ${c}`);
  for (const k of ['name', 'about', 'uses', 'fun']) pair(m[k], `${w}.${k}`);
  if (m.geo && !GEOMETRIES[m.geo]) fail(`${w}: unknown geometry ${m.geo}`);
  if (m.lattice && !LATTICES[m.lattice.type]) fail(`${w}: unknown lattice ${m.lattice.type}`);
  if (m.lattice)
    for (const el of m.lattice.el) if (!getElement(el)) fail(`${w}: unknown lattice element ${el}`);
  const file = join(root, 'data/molecules', `${m.id}.json`);
  if (!existsSync(file)) {
    fail(`${w}: missing data/molecules/${m.id}.json (run npm run sync:molecules)`);
    continue;
  }
  const rec = JSON.parse(readFileSync(file, 'utf8'));
  if (rec.cid !== m.cid) fail(`${w}: record cid ${rec.cid} ≠ ${m.cid} (re-sync)`);
  if (!indexIds.has(m.id)) fail(`${w}: missing from data/molecules/index.json`);
  if (!rec.structure && !m.lattice) warnings.push(`${w}: no structure`);
  if (rec.photo?.kind === 'photo') photos++;
  const formula = rec.props?.formula;
  const parsed = formula ? parseFormula(formula) : { error: 'none' };
  if (parsed.error) fail(`${w}: PubChem formula "${formula}" does not parse`);
  else if (rec.props.mw && Math.abs(molarMass(parsed.counts) - rec.props.mw) / rec.props.mw > 0.01)
    fail(`${w}: molar mass ${molarMass(parsed.counts).toFixed(2)} ≠ PubChem ${rec.props.mw}`);
}

// ---------- Classes ----------
const classIds = new Set();
for (const c of CLASSES) {
  if (classIds.has(c.id)) fail(`class ${c.id}: duplicate`);
  classIds.add(c.id);
  if (c.parent && !getClass(c.parent)) fail(`class ${c.id}: unknown parent ${c.parent}`);
  pair(c.name, `class ${c.id}.name`);
  pair(c.def, `class ${c.id}.def`);
  if (!LEVELS.includes(c.level)) fail(`class ${c.id}: invalid level`);
}

// ---------- Elements ----------
if (ELEMENTS.length !== 118) fail(`periodic table: ${ELEMENTS.length} elements, expected 118`);
const cells = new Set();
for (const e of ELEMENTS) {
  const key = `${e.x},${e.y}`;
  if (cells.has(key)) fail(`element ${e.s}: position ${key} taken`);
  cells.add(key);
  if (e.shells.reduce((a, b) => a + b, 0) !== e.z) fail(`element ${e.s}: shells do not add up to Z`);
  if (!existsSync(join(root, 'data/elements', `${e.z}.json`)))
    fail(`element ${e.s}: missing data/elements/${e.z}.json`);
}

// ---------- Glossary ----------
const keys = new Set();
for (const g of GLOSSARY) {
  if (keys.has(g.key)) fail(`glossary ${g.key}: duplicate`);
  keys.add(g.key);
  if (!GLOSSARY_CATS[g.cat]) fail(`glossary ${g.key}: unknown category ${g.cat}`);
  for (const k of ['term', 'simple', 'sci']) pair(g[k], `glossary ${g.key}.${k}`);
  for (const s of g.see || []) if (!findTerm(s)) fail(`glossary ${g.key}: see-also ${s} not found`);
  for (const m of g.m || []) if (!getMolecule(m)) fail(`glossary ${g.key}: molecule ${m} not found`);
}

// ---------- Lesson text links ----------
function checkText(text, where) {
  for (const [, key] of text.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g))
    if (!findTerm(key)) fail(`${where}: glossary term [[${key}]] not found`);
  for (const [, kind, id] of text.matchAll(/\{\{(m|e|lab|learn|page):([^}|]+)(?:\|[^}]+)?\}\}/g)) {
    const ok =
      kind === 'm'
        ? getMolecule(id)
        : kind === 'e'
          ? getElement(id)
          : kind === 'lab'
            ? findLab(id)
            : kind === 'learn'
              ? findTopic(id)
              : ['table', 'explore', 'classes', 'atom', 'lab', 'learn', 'quiz'].includes(id);
    if (!ok) fail(`${where}: link {{${kind}:${id}}} not found`);
  }
}

// ---------- Topics ----------
let questions = 0;
for (const t of TOPICS) {
  const w = `topic ${t.id}`;
  pair(t.title, `${w}.title`);
  pair(t.summary, `${w}.summary`);
  for (const l of Object.keys(t.body)) {
    if (!t.levels.includes(l)) fail(`${w}: body for ${l} but levels are ${t.levels}`);
    pair(t.body[l], `${w}.body.${l}`);
    t.body[l].forEach(x => checkText(x, `${w}.body.${l}`));
  }
  for (const l of t.levels) if (!t.body[l]) fail(`${w}: level ${l} has no body`);
  for (const p of t.points) pair(p, `${w}.points`);
  for (const m of t.molecules || []) if (!getMolecule(m)) fail(`${w}: molecule ${m} not found`);
  for (const l of t.labs || []) if (!findLab(l)) fail(`${w}: lab ${l} not found`);
  if (t.quiz.length < 5) fail(`${w}: only ${t.quiz.length} quiz questions`);
  for (const [i, q] of t.quiz.entries()) {
    questions++;
    if (!t.levels.includes(q.lv)) fail(`${w} quiz ${i + 1}: level ${q.lv} not in topic levels`);
    pair(q.q, `${w} quiz ${i + 1}.q`);
    if (q.options.length < 2) fail(`${w} quiz ${i + 1}: needs options`);
    q.options.forEach(o => pair(o, `${w} quiz ${i + 1}.option`));
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
      fail(`${w} quiz ${i + 1}: answer out of range`);
    if (q.explain) pair(q.explain, `${w} quiz ${i + 1}.explain`);
  }
  const n = t.teacher;
  if (!n) fail(`${w}: missing teacher notes`);
  else for (const k of ['cp', 'duration', 'assessment']) pair(n[k], `${w}.teacher.${k}`);
}

// ---------- Labs, places, paths, reactions ----------
for (const l of LABS) {
  if (!existsSync(join(root, 'js/labs', `${l.id}.js`))) fail(`lab ${l.id}: missing js/labs/${l.id}.js`);
  if (!findTopic(l.topic)) fail(`lab ${l.id}: unknown topic ${l.topic}`);
  pair(l.title, `lab ${l.id}.title`);
}
for (const p of PLACES)
  if (!MOLECULES.some(m => m.ctx.includes(p.id))) warnings.push(`place ${p.id}: no molecules`);
for (const [lv, list] of Object.entries(PATHS))
  for (const id of list) if (!findTopic(id)) fail(`path ${lv}: topic ${id} not found`);
for (const r of REACTIONS) {
  const res = balance(r.r, r.p);
  if (res.error) fail(`reaction ${r.r.join('+')}: ${res.error}`);
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(
  `Content OK: ${MOLECULES.length} molecules (${photos} with photos), ${CLASSES.length} classes, 118 elements, ${GLOSSARY.length} glossary terms, ${TOPICS.length} topics with ${questions} quiz questions, ${LABS.length} labs, ${REACTIONS.length} practice reactions.`
);
