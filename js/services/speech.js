// Read-aloud with the browser's own speech synthesis (works offline where voices are installed).
import { lang } from '../core/prefs.js';

export const canSpeak = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
export const speaking = () => canSpeak() && speechSynthesis.speaking;

function voiceFor(code) {
  const voices = speechSynthesis.getVoices();
  return voices.find(v => v.lang?.toLowerCase().startsWith(code)) || null;
}

/** Speaks text in the current language. `onend` runs when finished or stopped. */
export function speak(text, onend) {
  if (!canSpeak() || !text) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\s+/g, ' ').slice(0, 4000));
  const code = lang() === 'en' ? 'en' : 'id';
  u.lang = code === 'en' ? 'en-GB' : 'id-ID';
  const v = voiceFor(code);
  if (v) u.voice = v;
  u.rate = 0.95;
  u.onend = u.onerror = () => onend?.();
  speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking() {
  if (canSpeak()) speechSynthesis.cancel();
}
