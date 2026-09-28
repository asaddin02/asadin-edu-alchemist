// Reaction rate: A + B → AB by collisions. Temperature, concentration and a catalyst change the rate.
import { esc, reducedMotion } from '../core/dom.js';
import { S, num } from '../core/prefs.js';
import { slider, readSlider, lineChart, fitCanvas } from './kit.js';

const s = S({
  T: ['Suhu', 'Temperature'],
  c: ['Konsentrasi (jumlah partikel A dan B)', 'Concentration (particles of A and B)'],
  cat: ['Tambahkan katalis (menurunkan energi aktivasi)', 'Add a catalyst (lowers activation energy)'],
  start: ['Mulai ulang', 'Restart'],
  collisions: ['Tumbukan: {n}', 'Collisions: {n}'],
  effective: ['Tumbukan efektif (bereaksi): {n}', 'Effective collisions (reacted): {n}'],
  product: ['Produk AB: {n}', 'Product AB: {n}'],
  chart: ['Jumlah produk terhadap waktu', 'Product formed over time'],
  time: ['Waktu (s)', 'Time (s)'],
  count: ['Produk', 'Product'],
  legend: ['Biru = A · Merah = B · Ungu = AB', 'Blue = A · Red = B · Purple = AB'],
  explain: [
    'Reaksi terjadi hanya jika tumbukan cukup keras (energi ≥ energi aktivasi). Suhu tinggi membuat lebih banyak tumbukan yang cukup keras; katalis menurunkan batas energinya.',
    'A reaction happens only when a collision is hard enough (energy ≥ activation energy). Higher temperature gives more hard collisions; a catalyst lowers the energy threshold.',
  ],
});

export function mount(host) {
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      ${slider({ id: 'r-T', label: s.T, min: 250, max: 500, step: 5, value: 300, unit: 'K' })}
      ${slider({ id: 'r-c', label: s.c, min: 10, max: 60, step: 2, value: 30 })}
      <label class="check"><input type="checkbox" id="r-cat" /> ${esc(s.cat)}</label>
      <p><button class="btn btn-primary" type="button" data-restart>${esc(s.start)}</button></p>
      <div data-stats aria-live="polite"></div>
      <p class="muted small">${esc(s.legend)}</p>
      <p class="muted small">${esc(s.explain)}</p>
    </div>
    <div class="card"><canvas class="lab-canvas" aria-hidden="true"></canvas></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.chart)}</h3><div data-chart></div></div>
  </div>`;
  const box = fitCanvas(host.querySelector('canvas'));
  let parts = [];
  let collisions = 0;
  let effective = 0;
  let series = [];
  let t0 = performance.now();
  let frame = 0;
  let lastSample = 0;

  function restart() {
    const T = readSlider(host, 'r-T', 'K');
    const c = readSlider(host, 'r-c');
    const speed = Math.sqrt(T / 300) * 1.8;
    parts = [];
    for (let i = 0; i < c * 2; i++) {
      const a = Math.random() * Math.PI * 2;
      parts.push({
        k: i % 2 ? 'B' : 'A',
        x: Math.random() * (box.w - 20) + 10,
        y: Math.random() * (box.h - 20) + 10,
        vx: Math.cos(a) * speed * (0.5 + Math.random()),
        vy: Math.sin(a) * speed * (0.5 + Math.random()),
      });
    }
    collisions = 0;
    effective = 0;
    series = [[0, 0]];
    t0 = performance.now();
    lastSample = 0;
    stats();
    chart();
  }
  function stats() {
    host.querySelector('[data-stats]').innerHTML =
      `<p>${s.collisions.replace('{n}', collisions)}</p><p>${s.effective.replace('{n}', effective)}</p><p><strong>${s.product.replace('{n}', parts.filter(p => p.k === 'AB').length)}</strong></p>`;
  }
  function chart() {
    const maxT = Math.max(20, series[series.length - 1][0]);
    host.querySelector('[data-chart]').innerHTML = lineChart({
      series: [{ points: series }],
      xMin: 0,
      xMax: maxT,
      yMin: 0,
      yMax: Math.max(10, readSlider(host, 'r-c')),
      xLabel: s.time,
      yLabel: s.count,
      label: `${s.chart}: ${num(series[series.length - 1][1], 0)}`,
    });
  }
  function step() {
    const { ctx, w, h } = box;
    const T = Number(host.querySelector('#r-T').value);
    const Ea = host.querySelector('#r-cat').checked ? 0.6 : 1.3;
    // Probability that a collision has enough energy: Boltzmann factor scaled to the model temperature.
    const pReact = Math.exp(-Ea / (T / 300));
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 6 || p.x > w - 6) p.vx *= -1;
      if (p.y < 6 || p.y > h - 6) p.vy *= -1;
    }
    for (let i = 0; i < parts.length; i++)
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i];
        const b = parts[j];
        if (a.k === 'AB' || b.k === 'AB' || a.dead || b.dead) continue;
        if (Math.abs(a.x - b.x) > 12 || Math.abs(a.y - b.y) > 12) continue;
        if (Math.hypot(a.x - b.x, a.y - b.y) > 12) continue;
        if (a.k === b.k) {
          [a.vx, b.vx] = [b.vx, a.vx];
          [a.vy, b.vy] = [b.vy, a.vy];
          continue;
        }
        collisions++;
        if (Math.random() < pReact * 0.35) {
          effective++;
          a.k = 'AB';
          a.vx = (a.vx + b.vx) / 2;
          a.vy = (a.vy + b.vy) / 2;
          b.dead = true;
        } else {
          [a.vx, b.vx] = [b.vx, a.vx];
          [a.vy, b.vy] = [b.vy, a.vy];
        }
      }
    parts = parts.filter(p => !p.dead);
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.k === 'AB' ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = p.k === 'A' ? '#4a7fe0' : p.k === 'B' ? '#e8663d' : '#8e44ad';
      ctx.fill();
    }
    const t = (performance.now() - t0) / 1000;
    if (t - lastSample > 0.5) {
      lastSample = t;
      series.push([Math.round(t * 10) / 10, parts.filter(p => p.k === 'AB').length]);
      stats();
      chart();
    }
  }
  function loop() {
    frame = requestAnimationFrame(loop);
    if (!document.hidden) step();
  }
  host.querySelector('[data-restart]').addEventListener('click', restart);
  for (const id of ['r-T', 'r-c']) host.querySelector(`#${id}`).addEventListener('change', restart);
  host.querySelector('#r-T').addEventListener('input', () => readSlider(host, 'r-T', 'K'));
  host.querySelector('#r-c').addEventListener('input', () => readSlider(host, 'r-c'));
  restart();
  if (!reducedMotion()) loop();
  else step();
  return () => {
    cancelAnimationFrame(frame);
    box.stop();
  };
}
