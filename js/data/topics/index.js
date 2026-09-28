// Curriculum topics (Kurikulum Merdeka, IPA/IPAS and Kimia). Each file holds lesson text for every level,
// key points, activities, a quiz and teacher notes. To add a topic, copy an existing file and list it here.
import zat from './zat.js';
import atom from './atom.js';
import periodik from './periodik.js';
import ikatan from './ikatan.js';
import bentuk from './bentuk.js';
import stoikiometri from './stoikiometri.js';
import asamBasa from './asam-basa.js';
import reaksi from './reaksi.js';
import laju from './laju.js';
import redoks from './redoks.js';
import karbon from './karbon.js';
import biomolekul from './biomolekul.js';
import material from './material.js';
import lingkungan from './lingkungan.js';

export const TOPICS = [zat, atom, periodik, ikatan, bentuk, stoikiometri, asamBasa, reaksi, laju, redoks, karbon, biomolekul, material, lingkungan];
export const findTopic = id => TOPICS.find(t => t.id === id) || null;

/** Kurikulum Merdeka phases for each Moleculium level (indicative). */
export const PHASES = {
  sd: ['Fase A–C · SD kelas 1–6 (IPAS)', 'Phases A–C · Grades 1–6 (IPAS)'],
  smp: ['Fase D · SMP kelas 7–9 (IPA)', 'Phase D · Grades 7–9 (Science)'],
  sma: ['Fase E–F · SMA kelas 10–12 (Kimia)', 'Phases E–F · Grades 10–12 (Chemistry)'],
  kuliah: ['Perguruan tinggi · Kimia dasar', 'University · General chemistry'],
};

const ORDER = ['sd', 'smp', 'sma', 'kuliah'];
/** The text level to show: the chosen level if the topic has it, else the nearest lower (or first) one. */
export function bodyLevel(topic, level) {
  const want = level === 'guru' ? 'kuliah' : level;
  const avail = ORDER.filter(l => topic.body[l]);
  if (avail.includes(want)) return want;
  const lower = avail.filter(l => ORDER.indexOf(l) < ORDER.indexOf(want));
  return lower.length ? lower[lower.length - 1] : avail[0];
}

/** Quiz questions for a level: that level's questions, topped up with easier ones to reach at least 5. */
export function quizFor(topic, level) {
  const want = level === 'guru' ? 'kuliah' : level;
  const rank = l => ORDER.indexOf(l);
  const exact = topic.quiz.filter(q => q.lv === want);
  const easier = topic.quiz.filter(q => rank(q.lv) < rank(want)).reverse();
  const harder = topic.quiz.filter(q => rank(q.lv) > rank(want));
  const out = [...exact];
  for (const q of [...easier, ...harder]) if (out.length < 5) out.push(q);
  return out;
}
