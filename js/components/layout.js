// ChemTaxa · Global Layout Components (Header, Nav, Footer, Mode Selectors)
import { $, $$ } from '../core/dom.js';
import { getPrefs, setPref } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from './icons.js';
import { getBookmarks } from '../core/userdata.js';

export function renderHeader(activePage = 'home') {
  const header = $('#header');
  if (!header) return;

  const prefs = getPrefs();
  const ui = getUi(prefs.lang);
  const bookmarkCount = getBookmarks().length;

  header.innerHTML = `
    <div class="nav-container container">
      <div class="nav-brand-wrap">
        <a href="#/home" class="brand-link" aria-label="ChemTaxa Beranda">
          <div class="brand-logo" aria-hidden="true">
            ${getIcon('atom', 28, 'spin-glow')}
          </div>
          <div class="brand-text">
            <span class="brand-title">ChemTaxa</span>
            <span class="brand-sub">Asadin Edu</span>
          </div>
        </a>
      </div>

      <nav class="nav-links" id="main-nav" aria-label="Navigasi Utama">
        <a href="#/home" class="nav-item ${activePage === 'home' ? 'active' : ''}">
          ${getIcon('home', 16)} <span>${ui.navHome}</span>
        </a>
        <a href="#/explore" class="nav-item ${activePage === 'explore' ? 'active' : ''}">
          ${getIcon('search', 16)} <span>${ui.navExplore}</span>
        </a>
        <a href="#/learn" class="nav-item ${activePage === 'learn' ? 'active' : ''}">
          ${getIcon('graduate', 16)} <span>${ui.navLearn}</span>
        </a>
        <a href="#/lab" class="nav-item ${activePage === 'lab' ? 'active' : ''}">
          ${getIcon('flask', 16)} <span>${ui.navLab}</span>
        </a>
        <a href="#/table" class="nav-item ${activePage === 'table' ? 'active' : ''}">
          ${getIcon('table', 16)} <span>${ui.navTable}</span>
        </a>
        <a href="#/compare" class="nav-item ${activePage === 'compare' ? 'active' : ''}">
          ${getIcon('scale', 16)} <span>${ui.navCompare}</span>
        </a>
        <a href="#/quiz" class="nav-item ${activePage === 'quiz' ? 'active' : ''}">
          ${getIcon('quiz', 16)} <span>${ui.navQuiz}</span>
        </a>
        <a href="#/teacher" class="nav-item ${activePage === 'teacher' ? 'active' : ''}">
          ${getIcon('teacher', 16)} <span>${ui.navTeacher}</span>
        </a>
        <a href="#/saved" class="nav-item ${activePage === 'saved' ? 'active' : ''}">
          ${getIcon('bookmark', 16)} 
          <span>${ui.navSaved}</span>
          ${bookmarkCount > 0 ? `<span class="badge-count">${bookmarkCount}</span>` : ''}
        </a>
      </nav>

      <div class="nav-actions">
        <!-- Level Selector Dropdown -->
        <div class="level-select-wrap">
          <label for="level-select" class="sr-only">${ui.levelLabel}</label>
          <select id="level-select" class="select-level" aria-label="${ui.levelLabel}">
            <option value="sd" ${prefs.level === 'sd' ? 'selected' : ''}>🎓 SD</option>
            <option value="smp" ${prefs.level === 'smp' ? 'selected' : ''}>🎓 SMP</option>
            <option value="sma" ${prefs.level === 'sma' ? 'selected' : ''}>🎓 SMA</option>
            <option value="kuliah" ${prefs.level === 'kuliah' ? 'selected' : ''}>🎓 Kuliah</option>
          </select>
        </div>

        <!-- Language Switcher -->
        <button class="btn-tool" id="btn-toggle-lang" title="Ganti Bahasa (ID / EN)" aria-label="Ganti Bahasa">
          <span class="lang-tag">${prefs.lang.toUpperCase()}</span>
        </button>

        <!-- Theme Toggle -->
        <button class="btn-tool" id="btn-toggle-theme" title="Ganti Tema Gelap/Terang" aria-label="Ganti Tema">
          ${getIcon(prefs.theme === 'dark' ? 'sun' : 'moon', 18)}
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button class="btn-tool btn-mobile-menu" id="btn-menu-toggle" aria-label="Buka Menu" aria-expanded="false">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>
  `;

  bindHeaderEvents();
}

function bindHeaderEvents() {
  const levelSelect = $('#level-select');
  if (levelSelect) {
    levelSelect.addEventListener('change', e => {
      setPref('level', e.target.value);
    });
  }

  const langBtn = $('#btn-toggle-lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = getPrefs().lang;
      setPref('lang', current === 'id' ? 'en' : 'id');
    });
  }

  const themeBtn = $('#btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = getPrefs().theme;
      setPref('theme', current === 'dark' ? 'light' : 'dark');
      renderHeader();
    });
  }

  const menuToggle = $('#btn-menu-toggle');
  const mainNav = $('#main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open', !expanded);
    });
  }
}

export function renderFooter() {
  const footer = $('#footer');
  if (!footer) return;

  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  footer.innerHTML = `
    <div class="footer-wrap container">
      <div class="footer-grid">
        <div class="footer-col brand-col">
          <div class="footer-brand">
            ${getIcon('atom', 24)}
            <h3>ChemTaxa</h3>
          </div>
          <p class="footer-desc">
            ${ui.tagline}. Platform pembelajaran dan penjelajahan kimia molekul terbuka yang menghubungkan konsep sekolah dengan sains mutakhir.
          </p>
          <div class="footer-badge-pill">
            <span>🔬 Asadin Edu Ecosystem</span>
          </div>
        </div>

        <div class="footer-col">
          <h4>${ui.navExplore}</h4>
          <ul>
            <li><a href="#/explore?cat=life">Molekul Kehidupan & Sel</a></li>
            <li><a href="#/explore?cat=atmosphere">Atmosfer & Gas Bumi</a></li>
            <li><a href="#/explore?cat=medicine">Obat & Farmakologi</a></li>
            <li><a href="#/explore?cat=household">Bahan Rumah Tangga</a></li>
            <li><a href="#/explore?cat=energy">Energi & Bahan Bakar</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Fitur Unggulan</h4>
          <ul>
            <li><a href="#/lab">Lab Virtual 3D & Reaksi</a></li>
            <li><a href="#/table">Tabel Periodik 118 Unsur</a></li>
            <li><a href="#/compare">Bandingkan Molekul</a></li>
            <li><a href="#/quiz">Kuis & Lencana Juara</a></li>
            <li><a href="#/glossary">Kamus & Glosarium Kimia</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Pendidikan & Guru</h4>
          <ul>
            <li><a href="#/learn">Kurikulum SD, SMP, SMA, Kuliah</a></li>
            <li><a href="#/teacher">Ruang Guru & Modul Ajar</a></li>
            <li><a href="#/saved">Koleksi Molekul & Catatan</a></li>
            <li><a href="#/about">PubChem API & Transparansi Data</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="source-credit">
          ${ui.officialSource}. Data struktur 2D/3D & deskripsi diambil secara resmi dari National Center for Biotechnology Information (NCBI / NLM / NIH).
        </p>
        <p class="copyright">
          © 2026 <strong>ChemTaxa</strong> · Dibuat untuk Pelajar, Mahasiswa & Pengajar Kimia Seluruh Dunia.
        </p>
      </div>
    </div>
  `;
}
