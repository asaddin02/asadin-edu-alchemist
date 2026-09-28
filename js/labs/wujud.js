// Particles & states of matter: heat or cool a substance and watch its particles and heating curve.
import { esc, reducedMotion } from '../core/dom.js';
import { S, fmt } from '../core/prefs.js';
import { slider, readSlider, lineChart, fitCanvas } from './kit.js';

const s = S({
  substance: ['Zat', 'Substance'],
  temp: ['Suhu', 'Temperature'],
  solid: ['Padat', 'Solid'],
  liquid: ['Cair', 'Liquid'],
  gas: ['Gas', 'Gas'],
  now: ['Wujud sekarang: {state}', 'State now: {state}'],
  solidText: [
    'Partikel tersusun rapat dan teratur, hanya bergetar di tempatnya. Bentuk dan volume tetap.',
    'Particles are packed in a regular pattern and only vibrate in place. Fixed shape and volume.',
  ],
  liquidText: [
    'Partikel masih berdekatan tetapi dapat bergeser dan mengalir. Volume tetap, bentuk mengikuti wadah.',
    'Particles stay close but slide past each other. Fixed volume, shape follows the container.',
  ],
  gasText: [
    'Partikel berjauhan dan bergerak cepat ke segala arah, memenuhi seluruh ruang.',
    'Particles are far apart and move fast in every direction, filling the whole space.',
  ],
  mp: ['titik leleh', 'melting point'],
  bp: ['titik didih', 'boiling point'],
  curve: [
    'Kurva pemanasan (energi yang diberikan terhadap suhu)',
    'Heating curve (energy added vs temperature)',
  ],
  energy: ['Energi yang diberikan →', 'Energy added →'],
  plateau: [
    'Pada dataran kurva, energi dipakai untuk mengubah wujud, bukan menaikkan suhu.',
    'On the flat parts, energy changes the state instead of raising the temperature.',
  ],
  water: ['Air', 'Water'],
  ethanol: ['Etanol', 'Ethanol'],
  nitrogen: ['Nitrogen', 'Nitrogen'],
});

const SUBSTANCES = {
  water: { mp: 0, bp: 100, min: -40, max: 140, color: '#4a9fe0' },
  ethanol: { mp: -114, bp: 78, min: -150, max: 120, color: '#e9a23b' },
  nitrogen: { mp: -210, bp: -196, min: -230, max: -150, color: '#7c7fe8' },
};

export function mount(host) {
  let key = 'water';
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="field"><label for="w-sub">${esc(s.substance)}</label><select id="w-sub">${Object.keys(
        SUBSTANCES
      )
        .map(k => `<option value="${k}">${esc(s[k])}</option>`)
        .join('')}</select></div>
      <div data-slider></div>
      <p class="state-now" data-state aria-live="polite"></p>
      <p data-text></p>
    </div>
    <div class="card"><canvas class="lab-canvas" aria-hidden="true"></canvas></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.curve)}</h3><div data-chart></div><p class="muted small">${esc(s.plateau)}</p></div>
  </div>`;
  const canvas = host.querySelector('canvas');
  const box = fitCanvas(canvas, () => place());
  const N = 64;
  let parts = [];
  let temp = 25;
  let frame = 0;

  const state = () => {
    const sub = SUBSTANCES[key];
    return temp < sub.mp ? 'solid' : temp < sub.bp ? 'liquid' : 'gas';
  };
  function place() {
    const cols = 8;
    const size = Math.min(box.w, box.h) / 14;
    parts = Array.from({ length: N }, (_, i) => {
      const gx = box.w / 2 - (cols / 2) * size + (i % cols) * size + size / 2;
      const gy = box.h - size * 1.2 - Math.floor(i / cols) * size;
      return {
        gx,
        gy,
        x: gx,
        y: gy,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: size * 0.42,
      };
    });
  }
  function drawSetup() {
    const sub = SUBSTANCES[key];
    host.querySelector('[data-slider]').innerHTML = slider({
      id: 'w-t',
      label: s.temp,
      min: sub.min,
      max: sub.max,
      value: Math.min(sub.max, Math.max(sub.min, key === 'water' ? 25 : sub.mp + 5)),
      unit: '°C',
    });
    host.querySelector('#w-t').addEventListener('input', update);
    update();
  }
  function update() {
    temp = readSlider(host, 'w-t', '°C');
    const st = state();
    host.querySelector('[data-state]').textContent = fmt(s.now, { state: s[st] });
    host.querySelector('[data-text]').textContent = s[`${st}Text`];
    const sub = SUBSTANCES[key];
    // Heating curve: slope in each phase, flat segments for fusion and vaporisation.
    const span = sub.max - sub.min;
    const pts = [
      [0, sub.min],
      [((sub.mp - sub.min) / span) * 30, sub.mp],
      [((sub.mp - sub.min) / span) * 30 + 12, sub.mp],
      [((sub.mp - sub.min) / span) * 30 + 12 + ((sub.bp - sub.mp) / span) * 30, sub.bp],
      [((sub.mp - sub.min) / span) * 30 + 12 + ((sub.bp - sub.mp) / span) * 30 + 34, sub.bp],
      [100, sub.max],
    ];
    const energyAt = t => {
      if (t < sub.mp) return pts[0][0] + ((t - sub.min) / (sub.mp - sub.min)) * (pts[1][0] - pts[0][0]);
      if (t < sub.bp) return pts[2][0] + ((t - sub.mp) / (sub.bp - sub.mp)) * (pts[3][0] - pts[2][0]);
      return pts[4][0] + ((t - sub.bp) / (sub.max - sub.bp)) * (pts[5][0] - pts[4][0]);
    };
    host.querySelector('[data-chart]').innerHTML = lineChart({
      series: [{ points: pts }],
      xMin: 0,
      xMax: 100,
      yMin: sub.min,
      yMax: sub.max,
      xLabel: s.energy,
      yLabel: '°C',
      hLines: [
        { y: sub.mp, label: `${s.mp} ${sub.mp} °C` },
        { y: sub.bp, label: `${s.bp} ${sub.bp} °C` },
      ],
      point: [energyAt(temp), temp],
      label: `${s.curve}: ${s[key]}`,
    });
    if (reducedMotion()) draw(true);
  }
  function draw(still = false) {
    const { ctx, w, h } = box;
    const st = state();
    const sub = SUBSTANCES[key];
    const kinetic = Math.max(0.2, (temp - sub.min) / (sub.max - sub.min));
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      if (!still) {
        if (st === 'solid') {
          p.x = p.gx + (Math.random() - 0.5) * p.r * kinetic * 1.2;
          p.y = p.gy + (Math.random() - 0.5) * p.r * kinetic * 1.2;
        } else {
          const speed = st === 'gas' ? 1.5 + kinetic * 5 : 0.4 + kinetic * 1.6;
          p.vx += (Math.random() - 0.5) * 0.4;
          p.vy += (Math.random() - 0.5) * 0.4 + (st === 'liquid' ? 0.12 : 0);
          const v = Math.hypot(p.vx, p.vy) || 1;
          p.vx = (p.vx / v) * speed;
          p.vy = (p.vy / v) * speed;
          p.x += p.vx;
          p.y += p.vy;
          const top = st === 'liquid' ? h * 0.42 : p.r;
          if (p.x < p.r || p.x > w - p.r) p.vx *= -1;
          if (p.y < top || p.y > h - p.r) p.vy *= -1;
          p.x = Math.max(p.r, Math.min(w - p.r, p.x));
          p.y = Math.max(top, Math.min(h - p.r, p.y));
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = sub.color;
      ctx.fill();
    }
  }
  function loop() {
    frame = requestAnimationFrame(loop);
    if (!document.hidden) draw();
  }
  host.querySelector('#w-sub').addEventListener('change', e => {
    key = e.target.value;
    place();
    drawSetup();
  });
  place();
  drawSetup();
  if (!reducedMotion()) loop();
  else draw(true);
  return () => {
    cancelAnimationFrame(frame);
    box.stop();
  };
}
