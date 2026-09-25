// ChemTaxa · Interactive Ambient Atomic Particle Background
export function initBackgroundCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 36;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create initial nodes with valence orbits
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.5,
      orbitR: Math.random() * 18 + 12,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() - 0.5) * 0.04,
      color: ['#00f2fe', '#8a2be2', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.orbitAngle += p.orbitSpeed;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw subtle orbital ring
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.orbitR, 0, Math.PI * 2);
      ctx.stroke();

      // Draw central nucleus
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbiting valence electron
      const ex = p.x + Math.cos(p.orbitAngle) * p.orbitR;
      const ey = p.y + Math.sin(p.orbitAngle) * p.orbitR;
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Connect near neighbors with faint bonds
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      const mouseDist = Math.hypot(p.x - mouseX, p.y - mouseY);
      if (mouseDist < 140) {
        ctx.strokeStyle = '#00f2fe';
        ctx.globalAlpha = (1 - mouseDist / 140) * 0.25;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
