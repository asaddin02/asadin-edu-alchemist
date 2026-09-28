// Shared helpers for lab modules: labelled sliders, an accessible SVG line chart and a canvas sizer.
import { esc } from '../core/dom.js';

export const slider = ({ id, label, min, max, step = 1, value, unit = '' }) =>
  `<div class="field slider"><label for="${id}">${esc(label)} <output id="${id}-out" for="${id}">${value}${unit ? ` ${esc(unit)}` : ''}</output></label>
   <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" /></div>`;

/** Keeps a slider's <output> in sync and returns the numeric value. */
export function readSlider(root, id, unit = '', format = v => v) {
  const input = root.querySelector(`#${id}`);
  const v = Number(input.value);
  root.querySelector(`#${id}-out`).textContent = `${format(v)}${unit ? ` ${unit}` : ''}`;
  return v;
}

/**
 * Line chart as SVG. series: [{ points: [[x,y]], cls }]; marks: [{ x, y, label }]; point: [x, y].
 * `label` is the accessible description.
 */
export function lineChart({
  series,
  xMin,
  xMax,
  yMin,
  yMax,
  xLabel = '',
  yLabel = '',
  marks = [],
  point = null,
  hLines = [],
  label = '',
  w = 560,
  h = 300,
}) {
  const pad = { l: 46, r: 14, t: 14, b: 40 };
  const X = x => pad.l + ((x - xMin) / (xMax - xMin || 1)) * (w - pad.l - pad.r);
  const Y = y => h - pad.b - ((y - yMin) / (yMax - yMin || 1)) * (h - pad.t - pad.b);
  const ticks = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
  const fmt = v => (Math.abs(v) >= 100 || Number.isInteger(v) ? Math.round(v) : v.toFixed(1));
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet">
    ${ticks(yMin, yMax, 5)
      .map(
        v =>
          `<line class="grid-line" x1="${pad.l}" x2="${w - pad.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="tick" x="${pad.l - 6}" y="${Y(v) + 4}" text-anchor="end">${fmt(v)}</text>`
      )
      .join('')}
    ${ticks(xMin, xMax, 5)
      .map(v => `<text class="tick" x="${X(v)}" y="${h - pad.b + 16}" text-anchor="middle">${fmt(v)}</text>`)
      .join('')}
    <line class="axis" x1="${pad.l}" x2="${w - pad.r}" y1="${h - pad.b}" y2="${h - pad.b}"/><line class="axis" x1="${pad.l}" x2="${pad.l}" y1="${pad.t}" y2="${h - pad.b}"/>
    ${hLines.map(l => `<line class="h-line" x1="${pad.l}" x2="${w - pad.r}" y1="${Y(l.y)}" y2="${Y(l.y)}"/><text class="mark-label" x="${w - pad.r - 4}" y="${Y(l.y) - 4}" text-anchor="end">${esc(l.label)}</text>`).join('')}
    ${series.map(s => `<polyline class="series ${s.cls || ''}" fill="none" points="${s.points.map(([x, y]) => `${X(x).toFixed(1)},${Y(Math.max(yMin, Math.min(yMax, y))).toFixed(1)}`).join(' ')}"/>`).join('')}
    ${marks.map(m => `<circle class="mark" cx="${X(m.x)}" cy="${Y(m.y)}" r="5"/><text class="mark-label" x="${X(m.x) + 8}" y="${Y(m.y) - 8}">${esc(m.label)}</text>`).join('')}
    ${point ? `<circle class="point" cx="${X(point[0])}" cy="${Y(Math.max(yMin, Math.min(yMax, point[1])))}" r="7"/>` : ''}
    <text class="axis-label" x="${(w + pad.l) / 2}" y="${h - 6}" text-anchor="middle">${esc(xLabel)}</text>
    <text class="axis-label" transform="translate(12 ${(h - pad.b) / 2}) rotate(-90)" text-anchor="middle">${esc(yLabel)}</text>
  </svg>`;
}

/** Sizes a canvas to its CSS box (device-pixel aware); returns { ctx, w, h } and keeps it updated. */
export function fitCanvas(canvas, onResize) {
  const ctx = canvas.getContext('2d');
  const box = { ctx, w: 0, h: 0 };
  const resize = notify => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    box.w = r.width;
    box.h = r.height;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (notify) onResize?.(box);
  };
  const ro = new ResizeObserver(() => resize(true));
  ro.observe(canvas);
  resize(false);
  box.stop = () => ro.disconnect();
  return box;
}
