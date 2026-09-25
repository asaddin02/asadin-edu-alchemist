// ChemTaxa · Interactive Pure-Canvas 3D Molecular Engine
import { getElement } from '../data/periodicTable.js';

export const CPK_COLORS = {
  H: '#f8fafc',
  C: '#334155',
  N: '#3b82f6',
  O: '#ef4444',
  F: '#22c55e',
  Cl: '#10b981',
  Br: '#991b1b',
  I: '#7e22ce',
  P: '#f97316',
  S: '#eab308',
  Na: '#a855f7',
  K: '#8b5cf6',
  Ca: '#64748b',
  Fe: '#ea580c',
  DEFAULT: '#94a3b8'
};

const VDW_RADII = {
  H: 1.2,
  C: 1.7,
  N: 1.55,
  O: 1.52,
  F: 1.47,
  Cl: 1.75,
  Br: 1.85,
  I: 1.98,
  P: 1.8,
  S: 1.8,
  Na: 2.27,
  K: 2.75,
  DEFAULT: 1.6
};

export class MoleculeViewer3D {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      mode: 'ball-and-stick', // 'ball-and-stick' | 'space-filling' | 'wireframe'
      autoRotate: true,
      showLabels: true,
      zoom: 1.0,
      ...options
    };

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'mol-3d-canvas';
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', '3D Interactive Molecular Structure View');
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.atoms = [];
    this.bonds = [];
    this.rotX = 0.3;
    this.rotY = 0.4;
    this.rotZ = 0;
    this.scale = 45;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.hoveredAtom = null;
    this.animId = null;

    this.initEvents();
    this.resize();
  }

  setData(atoms = [], bonds = []) {
    this.atoms = atoms.map((a, i) => ({ ...a, id: i }));
    this.bonds = bonds || [];

    // Center molecule around center of mass
    if (this.atoms.length > 0) {
      let cx = 0, cy = 0, cz = 0;
      this.atoms.forEach(a => { cx += a.x; cy += a.y; cz += a.z; });
      cx /= this.atoms.length;
      cy /= this.atoms.length;
      cz /= this.atoms.length;

      this.atoms = this.atoms.map(a => ({
        ...a,
        x: a.x - cx,
        y: a.y - cy,
        z: a.z - cz
      }));

      // Calculate bounding box for auto scale
      let maxDist = 1;
      this.atoms.forEach(a => {
        const d = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
        if (d > maxDist) maxDist = d;
      });

      const minDim = Math.min(this.canvas.width, this.canvas.height);
      this.scale = (minDim * 0.32) / (maxDist || 1);
    }

    this.draw();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 400;
    this.height = rect.height || 340;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(dpr, dpr);
    this.draw();
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousedown', e => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', e => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.rotY += dx * 0.01;
        this.rotX += dy * 0.01;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.options.autoRotate = false;
        this.draw();
      } else {
        this.checkHover(e);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile & tablet students
    this.canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', e => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.lastMouseX;
        const dy = e.touches[0].clientY - this.lastMouseY;
        this.rotY += dx * 0.01;
        this.rotX += dy * 0.01;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
        this.options.autoRotate = false;
        this.draw();
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Zoom
    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      this.scale = Math.max(10, Math.min(this.scale * delta, 250));
      this.draw();
    }, { passive: false });

    this.startLoop();
  }

  checkHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    if (this.projectedAtoms) {
      for (const pa of this.projectedAtoms) {
        const d = Math.hypot(pa.px - mx, pa.py - my);
        if (d <= pa.r + 2) {
          found = pa;
          break;
        }
      }
    }

    if (found !== this.hoveredAtom) {
      this.hoveredAtom = found;
      this.canvas.style.cursor = found ? 'pointer' : 'grab';
      this.draw();
    }
  }

  startLoop() {
    const loop = () => {
      if (this.options.autoRotate && !this.isDragging) {
        this.rotY += 0.008;
        this.rotX += 0.003;
        this.draw();
      }
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  project(x, y, z) {
    // Rotation around Y
    const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    // Rotation around X
    const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const fov = 400;
    const depth = fov / (fov + z2 * 15);
    const px = this.width / 2 + x1 * this.scale * depth;
    const py = this.height / 2 + y2 * this.scale * depth;

    return { px, py, pz: z2, depth };
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.atoms.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Memuat data 3D molekul...', this.width / 2, this.height / 2);
      return;
    }

    // Project all atoms
    const projectedAtoms = this.atoms.map(a => {
      const p = this.project(a.x, a.y, a.z);
      const elem = a.element.toUpperCase();
      const baseR = this.options.mode === 'space-filling'
        ? (VDW_RADII[elem] || VDW_RADII.DEFAULT) * 16
        : (VDW_RADII[elem] || VDW_RADII.DEFAULT) * 9;

      const r = Math.max(3, baseR * (this.scale / 45) * p.depth * (this.options.mode === 'wireframe' ? 0.3 : 1));
      return { ...a, px: p.px, py: p.py, pz: p.pz, r, depth: p.depth };
    });
    this.projectedAtoms = projectedAtoms;

    // Collect render items for depth sorting
    const renderItems = [];

    // Add bonds
    if (this.options.mode !== 'space-filling') {
      this.bonds.forEach(b => {
        const a1 = projectedAtoms[b.from];
        const a2 = projectedAtoms[b.to];
        if (a1 && a2) {
          const zAvg = (a1.pz + a2.pz) / 2;
          renderItems.push({ type: 'bond', a1, a2, order: b.order || 1, z: zAvg });
        }
      });
    }

    // Add atoms
    projectedAtoms.forEach(a => {
      renderItems.push({ type: 'atom', atom: a, z: a.pz });
    });

    // Painter's algorithm: sort back to front (ascending z)
    renderItems.sort((a, b) => a.z - b.z);

    // Render sorted items
    renderItems.forEach(item => {
      if (item.type === 'bond') {
        this.renderBond(ctx, item.a1, item.a2, item.order);
      } else {
        this.renderAtom(ctx, item.atom);
      }
    });

    // Render tooltip for hovered atom
    if (this.hoveredAtom) {
      this.renderTooltip(ctx, this.hoveredAtom);
    }
  }

  renderBond(ctx, a1, a2, order = 1) {
    const dx = a2.px - a1.px;
    const dy = a2.py - a1.py;
    const len = Math.hypot(dx, dy);
    if (len === 0) return;

    ctx.save();
    ctx.lineCap = 'round';

    const width = this.options.mode === 'wireframe' ? 2 : Math.max(2, 6 * (this.scale / 45) * ((a1.depth + a2.depth) / 2));

    if (order === 1) {
      // Gradient along bond from atom 1 color to atom 2 color
      const c1 = CPK_COLORS[a1.element.toUpperCase()] || CPK_COLORS.DEFAULT;
      const c2 = CPK_COLORS[a2.element.toUpperCase()] || CPK_COLORS.DEFAULT;
      const grad = ctx.createLinearGradient(a1.px, a1.py, a2.px, a2.py);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);

      ctx.strokeStyle = grad;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(a1.px, a1.py);
      ctx.lineTo(a2.px, a2.py);
      ctx.stroke();
    } else {
      // Double or triple bond: draw parallel offset lines
      const offX = (-dy / len) * (width * 0.9);
      const offY = (dx / len) * (width * 0.9);

      [-1, 1].forEach(sign => {
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.7)';
        ctx.lineWidth = width * 0.6;
        ctx.beginPath();
        ctx.moveTo(a1.px + offX * sign, a1.py + offY * sign);
        ctx.lineTo(a2.px + offX * sign, a2.py + offY * sign);
        ctx.stroke();
      });
    }

    ctx.restore();
  }

  renderAtom(ctx, a) {
    const color = CPK_COLORS[a.element.toUpperCase()] || CPK_COLORS.DEFAULT;
    const isHovered = this.hoveredAtom && this.hoveredAtom.id === a.id;

    ctx.save();
    ctx.beginPath();
    ctx.arc(a.px, a.py, a.r, 0, Math.PI * 2);

    if (this.options.mode === 'wireframe') {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      // 3D Sphere Radial Gradient with specular light
      const lightX = a.px - a.r * 0.35;
      const lightY = a.py - a.r * 0.35;
      const grad = ctx.createRadialGradient(lightX, lightY, a.r * 0.08, a.px, a.py, a.r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.25, color);
      grad.addColorStop(1, '#050b14');

      ctx.fillStyle = grad;
      ctx.fill();

      // Outer glow or border
      if (isHovered) {
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Element symbol label
    if (this.options.showLabels && a.r > 10) {
      ctx.fillStyle = (a.element === 'H' || a.element === 'C') ? '#0f172a' : '#ffffff';
      ctx.font = `bold ${Math.max(10, Math.round(a.r * 0.75))}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.element, a.px, a.py);
    }

    ctx.restore();
  }

  renderTooltip(ctx, a) {
    const el = getElement(a.element);
    const title = el ? `${el.nameId} (${a.element})` : a.element;
    const subtitle = el ? `No. Atom ${el.n} • Massa ${el.mass}` : '';

    ctx.save();
    ctx.font = 'bold 12px sans-serif';
    const textWidth = Math.max(ctx.measureText(title).width, ctx.measureText(subtitle).width);
    const boxW = textWidth + 24;
    const boxH = subtitle ? 44 : 26;
    const boxX = Math.min(this.width - boxW - 10, Math.max(10, a.px - boxW / 2));
    const boxY = Math.max(10, a.py - a.r - boxH - 8);

    // Glass backdrop
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#00f2fe';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(title, boxX + 12, boxY + 8);

    if (subtitle) {
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(subtitle, boxX + 12, boxY + 24);
    }

    ctx.restore();
  }
}
