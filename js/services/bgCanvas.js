// Decorative, slowly drifting molecule network for the home page hero.
// Paused when off-screen or hidden, and static when the user prefers reduced motion.
import { reducedMotion } from '../core/dom.js';

export function heroCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const colors = ['#3fb5a3', '#4a9fe0', '#e9a23b', '#e06fa8', '#7c7fe8'];
  let nodes = [];
  let w = 0;
  let h = 0;
  let frame = 0;
  let visible = true;

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(46, (w * h) / 16000));
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 3 + Math.random() * 5,
      c: colors[i % colors.length],
    }));
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.globalAlpha = (1 - d / 110) * 0.35;
          ctx.strokeStyle = a.c;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    ctx.globalAlpha = 0.55;
    for (const n of nodes) {
      ctx.fillStyle = n.c;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function step() {
    frame = requestAnimationFrame(step);
    if (!visible || document.hidden) return;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    draw();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);
  resize();
  if (!reducedMotion()) step();
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
  };
}
