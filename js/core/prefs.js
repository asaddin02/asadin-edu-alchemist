// ChemTaxa · User Preferences Store (Level, Language, Theme)
const KEY = 'chemtaxa_prefs_v1';

const defaultPrefs = {
  level: 'sma', // 'sd' | 'smp' | 'sma' | 'kuliah'
  lang: 'id',   // 'id' | 'en'
  theme: 'dark' // 'dark' | 'light'
};

let current = { ...defaultPrefs };

try {
  const saved = localStorage.getItem(KEY);
  if (saved) Object.assign(current, JSON.parse(saved));
} catch (_) {}

export function getPrefs() {
  return { ...current };
}

export function setPref(key, value) {
  current[key] = value;
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch (_) {}
  applyPrefs();
  window.dispatchEvent(new CustomEvent('chemtaxa:prefs', { detail: current }));
}

export function applyPrefs() {
  const root = document.documentElement;
  root.setAttribute('data-level', current.level);
  root.setAttribute('data-lang', current.lang);
  root.setAttribute('data-theme', current.theme);
}

// Initial apply
applyPrefs();
