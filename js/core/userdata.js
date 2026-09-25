// ChemTaxa · LocalStorage User Data (Bookmarks, Notes, Badges)
const BOOKMARKS_KEY = 'chemtaxa_bookmarks_v1';
const NOTES_KEY = 'chemtaxa_notes_v1';
const QUIZ_KEY = 'chemtaxa_quiz_v1';

export function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
  } catch (_) {
    return [];
  }
}

export function isBookmarked(id) {
  const list = getBookmarks();
  return list.some(item => (typeof item === 'string' ? item === id : item.id === id));
}

export function toggleBookmark(molecule) {
  const list = getBookmarks();
  const id = typeof molecule === 'string' ? molecule : molecule.id;
  const idx = list.findIndex(item => (typeof item === 'string' ? item === id : item.id === id));

  let added = false;
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift(typeof molecule === 'string' ? { id } : molecule);
    added = true;
  }

  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
  } catch (_) {}

  window.dispatchEvent(new CustomEvent('chemtaxa:bookmarks', { detail: list }));
  return added;
}

export function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
  } catch (_) {
    return {};
  }
}

export function getNote(key) {
  const notes = getNotes();
  return notes[key]?.content || '';
}

export function setNote(key, content, meta = {}) {
  const notes = getNotes();
  if (!content.trim()) {
    delete notes[key];
  } else {
    notes[key] = {
      content,
      updatedAt: new Date().toISOString(),
      title: meta.title || key,
      category: meta.category || 'general'
    };
  }
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent('chemtaxa:notes', { detail: notes }));
    return true;
  } catch (_) {
    return false;
  }
}

export function getQuizStats() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_KEY)) || { totalSolved: 0, score: 0, badges: [] };
  } catch (_) {
    return { totalSolved: 0, score: 0, badges: [] };
  }
}

export function recordQuizResult(points, badgeEarned = null) {
  const stats = getQuizStats();
  stats.totalSolved += 1;
  stats.score += points;
  if (badgeEarned && !stats.badges.includes(badgeEarned)) {
    stats.badges.push(badgeEarned);
  }
  try {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(stats));
  } catch (_) {}
  window.dispatchEvent(new CustomEvent('chemtaxa:quiz', { detail: stats }));
  return stats;
}
