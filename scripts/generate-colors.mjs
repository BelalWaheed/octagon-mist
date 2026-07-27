import { writeFileSync, mkdirSync } from 'fs';

function oklchToRgb(l, c, hDeg) {
  const hRad = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(gamma(v) * 255)));

  const R = clamp(r);
  const G = clamp(g);
  const B = clamp(bl);
  const hex = '#' + [R, G, B].map((x) => x.toString(16).padStart(2, '0')).join('');

  // HSL calculation
  const rNorm = R / 255, gNorm = G / 255, bNorm = B / 255;
  const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
  let hHsl = 0, sHsl = 0, lHsl = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    sHsl = lHsl > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: hHsl = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: hHsl = (bNorm - rNorm) / d + 2; break;
      case bNorm: hHsl = (rNorm - gNorm) / d + 4; break;
    }
    hHsl /= 6;
  }

  return {
    hex,
    rgb: { css: `rgb(${R}, ${G}, ${B})`, r: R, g: G, b: B },
    hsl: { css: `hsl(${Math.round(hHsl * 360)}, ${Math.round(sHsl * 100)}%, ${Math.round(lHsl * 100)}%)` },
    oklch: { css: `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${hDeg}°)` }
  };
}

const stepsConfig = [
  { step: '50',  l: 0.985, cMult: 0.038 },
  { step: '100', l: 0.955, cMult: 0.12 },
  { step: '200', l: 0.895, cMult: 0.35 },
  { step: '300', l: 0.835, cMult: 0.49 },
  { step: '400', l: 0.750, cMult: 0.78 },
  { step: '500', l: 0.665, cMult: 1.00 },
  { step: '600', l: 0.575, cMult: 0.96 },
  { step: '700', l: 0.485, cMult: 0.88 },
  { step: '800', l: 0.395, cMult: 0.75 },
  { step: '900', l: 0.305, cMult: 0.63 },
  { step: '950', l: 0.220, cMult: 0.47 }
];

const colors = {
  graphite:  { h: 279, c: 0.007, flatC: true },
  primary:   { h: 322, c: 0.090 },
  secondary: { h: 167, c: 0.090 },
  accent:    { h: 51,  c: 0.142 },
  success:   { h: 121, c: 0.148 },
  warning:   { h: 89,  c: 0.132 },
  danger:    { h: 15,  c: 0.187 },
  info:      { h: 247, c: 0.120 },
  rose:      { h: 350, c: 0.110 },
  indigo:    { h: 285, c: 0.110 },
  ochre:     { h: 75,  c: 0.110 },
  sage:      { h: 145, c: 0.080 }
};

const primitives = {};

for (const [name, cfg] of Object.entries(colors)) {
  primitives[name] = {};
  for (const sConf of stepsConfig) {
    const cVal = cfg.flatC ? cfg.c : cfg.c * sConf.cMult;
    primitives[name][sConf.step] = oklchToRgb(sConf.l, cVal, cfg.h);
  }
}

mkdirSync('tokens', { recursive: true });
mkdirSync('scripts', { recursive: true });

writeFileSync('tokens/primitives.json', JSON.stringify(primitives, null, 2));
console.log('Wrote: tokens/primitives.json');
