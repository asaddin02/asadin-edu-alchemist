// Gas laws: particles in a box; pressure follows PV = nRT as temperature, volume and amount change.
import { esc, reducedMotion } from '../core/dom.js';
import { S, num } from '../core/prefs.js';
import { slider, readSlider, lineChart, fitCanvas } from './kit.js';

const s = S({
  T: ['Suhu', 'Temperature'],
  V: ['Volume', 'Volume'],
  n: ['Jumlah gas', 'Amount of gas'],
  P: ['Tekanan', 'Pressure'],
  law: ['Hukum yang berlaku', 'The law at work'],
  boyle: [
    'Boyle: pada suhu tetap, P × V tetap (P berbanding terbalik dengan V).',
    'Boyle: at constant temperature, P × V is constant (P is inversely proportional to V).',
  ],
  charles: [
    'Gay-Lussac: pada volume tetap, P sebanding dengan suhu mutlak T.',
    'Gay-Lussac: at constant volume, P is proportional to absolute temperature T.',
  ],
  avogadro: [
    'Avogadro: pada T dan V tetap, P sebanding dengan jumlah mol n.',
    'Avogadro: at constant T and V, P is proportional to the number of moles n.',
  ],
  chart: [
    'Grafik P terhadap V pada suhu dan jumlah gas saat ini',
    'P versus V at the current temperature and amount',
  ],
  formula: ['PV = nRT, R = 8,314 J mol⁻¹ K⁻¹', 'PV = nRT, R = 8.314 J mol⁻¹ K⁻¹'],
  hits: ['Tumbukan ke dinding per detik (model): {n}', 'Wall collisions per second (model): {n}'],
});

const R = 8.314;

export function mount(host) {
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      ${slider({ id: 'g-T', label: s.T, min: 100, max: 1000, step: 10, value: 300, unit: 'K' })}
      ${slider({ id: 'g-V', label: s.V, min: 5, max: 25, step: 0.5, value: 20, unit: 'L' })}
      ${slider({ id: 'g-n', label: s.n, min: 0.05, max: 1, step: 0.05, value: 0.4, unit: 'mol' })}
      <p class="ph-value" data-P aria-live="polite"></p>
      <p class="muted small">${esc(s.formula)}</p>
      <p class="muted small" data-hits></p>
      <p data-law></p>
    </div>
    <div class="card"><canvas class="lab-canvas gas" aria-hidden="true"></canvas></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.chart)}</h3><div data-chart></div></div>
  </div>`;
  const canvas = host.querySelector('canvas');
  const box = fitCanvas(canvas);
  let T = 300;
  let V = 20;
  let n = 0.4;
  let last = { T, V, n };
  const parts = [];
  let hits = 0;
  let frame = 0;
  let clock = performance.now();

  function spawn() {
    const count = Math.round(n * 120);
    while (parts.length < count)
      parts.push({
        x: Math.random() * 50 + 10,
        y: Math.random() * (box.h - 20) + 10,
        a: Math.random() * Math.PI * 2,
      });
    parts.length = count;
  }
  function update() {
    T = readSlider(host, 'g-T', 'K');
    V = readSlider(host, 'g-V', 'L', v => num(v, 1));
    n = readSlider(host, 'g-n', 'mol', v => num(v, 2));
    const P = (n * R * T) / V; // kPa, because V is in litres
    host.querySelector('[data-P]').innerHTML =
      `<strong>${esc(s.P)}: ${num(P, 1)} kPa</strong> (${num(P / 101.325, 3)} atm)`;
    const changed = T !== last.T ? 'charles' : V !== last.V ? 'boyle' : n !== last.n ? 'avogadro' : null;
    if (changed)
      host.querySelector('[data-law]').innerHTML = `<strong>${esc(s.law)}:</strong> ${esc(s[changed])}`;
    last = { T, V, n };
    const pts = Array.from({ length: 81 }, (_, i) => {
      const v = 5 + i * 0.25;
      return [v, (n * R * T) / v];
    });
    host.querySelector('[data-chart]').innerHTML = lineChart({
      series: [{ points: pts }],
      xMin: 5,
      xMax: 25,
      yMin: 0,
      yMax: Math.max(200, (n * R * T) / 5),
      xLabel: `${s.V} (L)`,
      yLabel: `${s.P} (kPa)`,
      point: [V, P],
      label: `${s.chart}: ${num(P, 1)} kPa`,
    });
    spawn();
  }
  function draw() {
    const { ctx, w, h } = box;
    const width = (V / 25) * (w - 20);
    const speed = Math.sqrt(T / 300) * 2.2;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(74,159,224,0.08)';
    ctx.fillRect(10, 10, width, h - 20);
    ctx.strokeStyle = '#8b93a3';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width, h - 20);
    ctx.fillStyle = '#e9a23b';
    for (const p of parts) {
      if (!reducedMotion()) {
        p.x += Math.cos(p.a) * speed;
        p.y += Math.sin(p.a) * speed;
        if (p.x < 14 || p.x > 6 + width) {
          p.a = Math.PI - p.a;
          hits++;
        }
        if (p.y < 14 || p.y > h - 14) {
          p.a = -p.a;
          hits++;
        }
        p.x = Math.max(14, Math.min(6 + width, p.x));
        p.y = Math.max(14, Math.min(h - 14, p.y));
      } else if (p.x > 6 + width) p.x = 6 + width;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    const now = performance.now();
    if (now - clock > 1000) {
      host.querySelector('[data-hits]').textContent = s.hits.replace('{n}', hits);
      hits = 0;
      clock = now;
    }
  }
  function loop() {
    frame = requestAnimationFrame(loop);
    if (!document.hidden) draw();
  }
  for (const id of ['g-T', 'g-V', 'g-n'])
    host.querySelector(`#${id}`).addEventListener('input', () => {
      update();
      if (reducedMotion()) draw();
    });
  update();
  if (reducedMotion()) draw();
  else loop();
  return () => {
    cancelAnimationFrame(frame);
    box.stop();
  };
}
