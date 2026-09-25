// ChemTaxa · Speech Synthesis Service (Audio narration for young learners and accessibility)
let synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let currentUtterance = null;

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeaking() {
  return synth ? synth.speaking : false;
}

export function stopSpeaking() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
}

export function speak(text, lang = 'id', onEnd = () => {}) {
  if (!canSpeak()) return false;
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Attempt to select an Indonesian or English voice
  const voices = synth.getVoices();
  const targetPrefix = lang === 'en' ? 'en' : 'id';
  const voice = voices.find(v => v.lang.startsWith(targetPrefix));
  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    currentUtterance = null;
    onEnd();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    onEnd();
  };

  currentUtterance = utterance;
  synth.speak(utterance);
  return true;
}
