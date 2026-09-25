// ChemTaxa · Application Entry Point
import { $ } from './core/dom.js';
import { applyPrefs } from './core/prefs.js';
import { configureRouter, renderCurrentRoute } from './core/router.js';
import { renderHeader, renderFooter } from './components/layout.js';
import { initBackgroundCanvas } from './services/bgCanvas.js';

// 1. Initialize System Preferences & Theme
applyPrefs();

// 2. Configure Dynamic Router
configureRouter({
  before(route) {
    renderHeader(route.page);
  },
  after(route, main) {
    // Dynamic enhancements if needed
  },
  error(route, err) {
    console.error('Navigation error:', err);
  }
});

// 3. Render Persistent Shell
renderHeader();
renderFooter();

// 4. Initialize Interactive Ambient Atomic Canvas
const bgCanvas = $('#bg-canvas');
if (bgCanvas) {
  initBackgroundCanvas(bgCanvas);
}

// 5. Listen to Preference Changes (Level, Language, Theme)
window.addEventListener('chemtaxa:prefs', () => {
  renderHeader();
  renderFooter();
  renderCurrentRoute();
});

// 6. Launch Initial Route
renderCurrentRoute();
