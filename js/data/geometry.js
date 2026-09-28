// VSEPR shapes used by molecule pages and the VSEPR lab: AXₘEₙ notation, ideal angles and hybridisation.
export const GEOMETRIES = {
  linear: { axe: 'AX₂', bonds: 2, lone: 0, angle: '180°', hyb: 'sp', name: ['Linear', 'Linear'] },
  'trigonal-planar': { axe: 'AX₃', bonds: 3, lone: 0, angle: '120°', hyb: 'sp²', name: ['Segitiga datar', 'Trigonal planar'] },
  bent: { axe: 'AX₂E₂ / AX₂E', bonds: 2, lone: 2, angle: '≈104,5–119°', hyb: 'sp³ / sp²', name: ['Bengkok (V)', 'Bent (V-shaped)'] },
  tetrahedral: { axe: 'AX₄', bonds: 4, lone: 0, angle: '109,5°', hyb: 'sp³', name: ['Tetrahedral', 'Tetrahedral'] },
  'trigonal-pyramidal': { axe: 'AX₃E', bonds: 3, lone: 1, angle: '≈107°', hyb: 'sp³', name: ['Piramida segitiga', 'Trigonal pyramidal'] },
  'trigonal-bipyramidal': { axe: 'AX₅', bonds: 5, lone: 0, angle: '90° · 120°', hyb: 'sp³d', name: ['Bipiramida segitiga', 'Trigonal bipyramidal'] },
  seesaw: { axe: 'AX₄E', bonds: 4, lone: 1, angle: '<90° · <120°', hyb: 'sp³d', name: ['Jungkat-jungkit', 'Seesaw'] },
  't-shaped': { axe: 'AX₃E₂', bonds: 3, lone: 2, angle: '<90°', hyb: 'sp³d', name: ['Bentuk T', 'T-shaped'] },
  octahedral: { axe: 'AX₆', bonds: 6, lone: 0, angle: '90°', hyb: 'sp³d²', name: ['Oktahedral', 'Octahedral'] },
  'square-pyramidal': { axe: 'AX₅E', bonds: 5, lone: 1, angle: '<90°', hyb: 'sp³d²', name: ['Piramida segi empat', 'Square pyramidal'] },
  'square-planar': { axe: 'AX₄E₂', bonds: 4, lone: 2, angle: '90°', hyb: 'sp³d² (dsp² pada logam)', name: ['Segi empat datar', 'Square planar'] },
};
