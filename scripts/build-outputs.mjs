import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const P = JSON.parse(readFileSync('tokens/primitives.json', 'utf8'));
const ref = (name, step) => P[name][step].hex;

// ---------------------------------------------------------------------------
// SEMANTIC LAYER — same primitive ramps, different step chosen per theme.
// This is the layer that actually gets consumed by components.
// ---------------------------------------------------------------------------
function statusSet(name, theme) {
  return theme === 'dark'
    ? { subtleBg: ref(name, 950), subtleBorder: ref(name, 800), subtleFg: ref(name, 300),
        solidBg: ref(name, 400), solidFg: ref('graphite', 950) }
    : { subtleBg: ref(name, 50), subtleBorder: ref(name, 200), subtleFg: ref(name, 700),
        solidBg: ref(name, 700), solidFg: ref('graphite', 50) };
}

function buildTheme(theme) {
  const isDark = theme === 'dark';
  const g = (step) => ref('graphite', step);
  return {
    background: {
      canvas: isDark ? g(950) : g(100),
      base: isDark ? g(900) : g(50),
      surface: isDark ? g(800) : '#ffffff',
      surfaceRaised: isDark ? g(700) : '#ffffff',
      overlay: isDark ? g(700) : '#ffffff',
      sidebar: isDark ? g(950) : g(100),
      nav: isDark ? g(900) : '#ffffff',
      popover: isDark ? g(700) : '#ffffff',
      dialog: isDark ? g(700) : '#ffffff',
      tooltip: isDark ? g(600) : g(900),
    },
    border: {
      subtle: isDark ? g(800) : g(200),
      default: isDark ? g(700) : g(300),
      strong: isDark ? g(500) : g(400),
      focus: isDark ? ref('info', 400) : ref('info', 600),
    },
    text: {
      primary: isDark ? g(50) : g(900),
      secondary: isDark ? g(300) : g(700),
      tertiary: isDark ? g(500) : g(600),
      disabled: isDark ? g(600) : g(400),
      inverseOnSolid: isDark ? g(950) : g(50),
      link: isDark ? ref('primary', 400) : ref('primary', 700),
      linkHover: isDark ? ref('primary', 300) : ref('primary', 800),
      tooltipFg: isDark ? g(50) : '#ffffff',
    },
    input: {
      bg: isDark ? g(900) : '#ffffff',
      border: isDark ? g(700) : g(300),
      borderHover: isDark ? g(600) : g(400),
      borderFocus: isDark ? ref('info', 400) : ref('info', 600),
      placeholder: isDark ? g(600) : g(400),
      text: isDark ? g(50) : g(900),
      disabledBg: isDark ? g(800) : g(100),
      disabledText: isDark ? g(600) : g(400),
    },
    interaction: {
      hoverOverlay: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,15,20,0.045)',
      activeOverlay: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,15,20,0.08)',
      selectionBg: isDark ? ref('primary', 800) : ref('primary', 200),
      focusRing: isDark ? ref('info', 400) : ref('info', 600),
    },
    overlay: {
      scrim: isDark ? 'rgba(10,10,14,0.72)' : 'rgba(20,20,28,0.45)',
    },
    scrollbar: {
      track: isDark ? g(900) : g(100),
      thumb: isDark ? g(600) : g(300),
      thumbHover: isDark ? g(500) : g(400),
    },
    status: {
      success: statusSet('success', theme),
      warning: statusSet('warning', theme),
      danger: statusSet('danger', theme),
      info: statusSet('info', theme),
    },
    chart: {
      categorical: [
        ref('primary', isDark ? 400 : 500),
        ref('secondary', isDark ? 400 : 500),
        ref('accent', isDark ? 400 : 500),
        ref('success', isDark ? 400 : 500),
        ref('warning', isDark ? 400 : 500),
        ref('danger', isDark ? 400 : 500),
        ref('info', isDark ? 400 : 500),
        ref('rose', isDark ? 400 : 500),
        ref('indigo', isDark ? 400 : 500),
        ref('ochre', isDark ? 400 : 500),
        ref('sage', isDark ? 400 : 500),
        ref('graphite', isDark ? 400 : 500),
      ],
    },
  };
}

const semantic = { light: buildTheme('light'), dark: buildTheme('dark') };
writeFileSync('tokens/semantic.json', JSON.stringify(semantic, null, 2));

// ---------------------------------------------------------------------------
// Flatten helper: turns nested semantic object into --kebab-case entries
// ---------------------------------------------------------------------------
function flatten(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = [...prefix, k];
    if (Array.isArray(v)) {
      v.forEach((item, i) => out.push([[...path, i].join('-'), item]));
    } else if (typeof v === 'object' && v !== null) {
      out.push(...flatten(v, path));
    } else {
      out.push([path.join('-'), v]);
    }
  }
  return out;
}
const toKebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// ---------------------------------------------------------------------------
// CSS CUSTOM PROPERTIES  (primitives on :root, semantics on [data-theme])
// ---------------------------------------------------------------------------
let css = `/* Design System — CSS Custom Properties\n * Generated from tokens/primitives.json + tokens/semantic.json\n * Do not hand-edit — change the seeds/curve in scripts/ and rebuild.\n */\n\n:root {\n`;
for (const [name, ramp] of Object.entries(P)) {
  for (const step of Object.keys(ramp)) {
    css += `  --color-${toKebab(name)}-${step}: ${ramp[step].hex};\n`;
  }
}
css += `\n  /* radius */\n  --radius-xs: 4px;\n  --radius-sm: 6px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --radius-xl: 16px;\n  --radius-2xl: 24px;\n  --radius-3xl: 32px;\n  --radius-full: 9999px;\n`;
css += `\n  /* spacing (4pt base) */\n`;
const spacing = { 0: 0, px: 1, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 36, 10: 40, 12: 48, 14: 56, 16: 64, 20: 80, 24: 96, 28: 112, 32: 128, 40: 160, 48: 192, 56: 224, 64: 256 };
for (const [k, v] of Object.entries(spacing)) css += `  --space-${k}: ${v}px;\n`;
css += `\n  /* motion */\n  --duration-instant: 80ms;\n  --duration-fast: 120ms;\n  --duration-base: 180ms;\n  --duration-moderate: 240ms;\n  --duration-slow: 320ms;\n  --duration-slower: 480ms;\n  --ease-standard: cubic-bezier(0.2, 0, 0, 1);\n  --ease-decelerate: cubic-bezier(0, 0, 0, 1);\n  --ease-accelerate: cubic-bezier(0.3, 0, 1, 1);\n  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n`;
css += `}\n\n`;

function themeBlock(theme) {
  const t = semantic[theme];
  const flat = flatten(t);
  let block = `[data-theme="${theme}"] {\n`;
  for (const [k, v] of flat) block += `  --${toKebab(k)}: ${v};\n`;
  // theme-specific shadows (dark = hairline + soft glow, light = classic soft shadow)
  if (theme === 'dark') {
    block += `\n  --shadow-xs: 0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02);\n`;
    block += `  --shadow-sm: 0 2px 4px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.03);\n`;
    block += `  --shadow-md: 0 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);\n`;
    block += `  --shadow-lg: 0 10px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);\n`;
    block += `  --shadow-xl: 0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);\n`;
    block += `  --shadow-2xl: 0 32px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06);\n`;
  } else {
    block += `\n  --shadow-xs: 0 1px 2px rgba(16,16,24,0.06);\n`;
    block += `  --shadow-sm: 0 1px 3px rgba(16,16,24,0.08), 0 1px 2px rgba(16,16,24,0.04);\n`;
    block += `  --shadow-md: 0 4px 8px rgba(16,16,24,0.08), 0 2px 4px rgba(16,16,24,0.05);\n`;
    block += `  --shadow-lg: 0 10px 20px rgba(16,16,24,0.10), 0 4px 8px rgba(16,16,24,0.05);\n`;
    block += `  --shadow-xl: 0 20px 40px rgba(16,16,24,0.12), 0 8px 16px rgba(16,16,24,0.06);\n`;
    block += `  --shadow-2xl: 0 32px 64px rgba(16,16,24,0.16), 0 12px 24px rgba(16,16,24,0.08);\n`;
  }
  block += `}\n\n`;
  return block;
}
css += themeBlock('dark') + themeBlock('light');
css += `/* Default to dark; opt into light via data-theme="light" or prefers-color-scheme */\n:root:not([data-theme]) {\n  color-scheme: dark;\n}\n@media (prefers-color-scheme: light) {\n  :root:not([data-theme]) {\n    /* consumers using auto mode should mirror the [data-theme="light"] block above */\n  }\n}\n`;

mkdirSync('css', { recursive: true });
writeFileSync('css/tokens.css', css);

// ---------------------------------------------------------------------------
// TAILWIND v4 (@theme) — CSS-first config
// ---------------------------------------------------------------------------
let tw4 = `@import "tailwindcss";\n@import "../css/tokens.css";\n\n@theme {\n`;
for (const name of Object.keys(P)) {
  for (const step of Object.keys(P[name])) {
    tw4 += `  --color-${toKebab(name)}-${step}: var(--color-${toKebab(name)}-${step});\n`;
  }
}
tw4 += `\n  --radius-xs: var(--radius-xs);\n  --radius-sm: var(--radius-sm);\n  --radius-md: var(--radius-md);\n  --radius-lg: var(--radius-lg);\n  --radius-xl: var(--radius-xl);\n  --radius-2xl: var(--radius-2xl);\n  --radius-3xl: var(--radius-3xl);\n`;
tw4 += `\n  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n`;
tw4 += `}\n`;
mkdirSync('tailwind', { recursive: true });
writeFileSync('tailwind/theme.v4.css', tw4);

// ---------------------------------------------------------------------------
// TAILWIND v3 config.js
// ---------------------------------------------------------------------------
function rampObj(name) {
  const lines = Object.entries(P[name]).map(([step, v]) => `        ${step}: '${v.hex}',`).join('\n');
  return `      ${name}: {\n${lines}\n      },`;
}
const tw3 = `/** Tailwind v3 config — generated */\nmodule.exports = {\n  darkMode: ['class', '[data-theme="dark"]'],\n  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],\n  theme: {\n    extend: {\n      colors: {\n${Object.keys(P).map(rampObj).join('\n')}\n      },\n      borderRadius: {\n        xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', '3xl': '32px',\n      },\n      fontFamily: {\n        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],\n        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],\n      },\n      spacing: {\n${Object.entries(spacing).map(([k, v]) => `        '${k}': '${v}px',`).join('\n')}\n      },\n      transitionDuration: {\n        instant: '80ms', fast: '120ms', base: '180ms', moderate: '240ms', slow: '320ms', slower: '480ms',\n      },\n    },\n  },\n  plugins: [],\n};\n`;
writeFileSync('tailwind/tailwind.config.js', tw3);

// ---------------------------------------------------------------------------
// SCSS variables
// ---------------------------------------------------------------------------
let scss = `// Design System — SCSS variables (generated)\n\n`;
for (const name of Object.keys(P)) {
  for (const [step, v] of Object.entries(P[name])) {
    scss += `$color-${toKebab(name)}-${step}: ${v.hex};\n`;
  }
}
scss += `\n$radius-xs: 4px;\n$radius-sm: 6px;\n$radius-md: 8px;\n$radius-lg: 12px;\n$radius-xl: 16px;\n$radius-2xl: 24px;\n$radius-3xl: 32px;\n$radius-full: 9999px;\n\n`;
scss += `$font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n$font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n\n`;
scss += `$theme-light: (\n${flatten(semantic.light).map(([k, v]) => `  '${toKebab(k)}': ${typeof v === 'string' && v.startsWith('#') ? v : `"${v}"`},`).join('\n')}\n);\n\n`;
scss += `$theme-dark: (\n${flatten(semantic.dark).map(([k, v]) => `  '${toKebab(k)}': ${typeof v === 'string' && v.startsWith('#') ? v : `"${v}"`},`).join('\n')}\n);\n`;
mkdirSync('scss', { recursive: true });
writeFileSync('scss/_variables.scss', scss);

// ---------------------------------------------------------------------------
// STYLE DICTIONARY format
// ---------------------------------------------------------------------------
const sd = { color: {} };
for (const [name, ramp] of Object.entries(P)) {
  sd.color[name] = {};
  for (const [step, v] of Object.entries(ramp)) {
    sd.color[name][step] = { value: v.hex, type: 'color', attributes: { rgb: v.rgb.css, hsl: v.hsl.css, oklch: v.oklch.css } };
  }
}
sd.color.semantic = {
  light: Object.fromEntries(flatten(semantic.light).map(([k, v]) => [k, { value: v, type: 'color' }])),
  dark: Object.fromEntries(flatten(semantic.dark).map(([k, v]) => [k, { value: v, type: 'color' }])),
};
mkdirSync('style-dictionary', { recursive: true });
writeFileSync('style-dictionary/tokens.style-dictionary.json', JSON.stringify(sd, null, 2));

// ---------------------------------------------------------------------------
// FIGMA VARIABLES (simplified importable structure)
// ---------------------------------------------------------------------------
const figma = { collections: [] };
const primitiveCollection = { name: 'Primitives', modes: ['Value'], variables: [] };
for (const [name, ramp] of Object.entries(P)) {
  for (const [step, v] of Object.entries(ramp)) {
    primitiveCollection.variables.push({ name: `color/${name}/${step}`, type: 'COLOR', valuesByMode: { Value: v.hex } });
  }
}
figma.collections.push(primitiveCollection);
const semanticCollection = { name: 'Semantic', modes: ['Light', 'Dark'], variables: [] };
const lightFlat = Object.fromEntries(flatten(semantic.light));
const darkFlat = Object.fromEntries(flatten(semantic.dark));
for (const key of Object.keys(lightFlat)) {
  semanticCollection.variables.push({ name: `semantic/${toKebab(key)}`, type: 'COLOR', valuesByMode: { Light: lightFlat[key], Dark: darkFlat[key] } });
}
figma.collections.push(semanticCollection);
mkdirSync('figma', { recursive: true });
writeFileSync('figma/figma-variables.json', JSON.stringify(figma, null, 2));

console.log('Wrote: tokens/semantic.json, css/tokens.css, tailwind/theme.v4.css, tailwind/tailwind.config.js, scss/_variables.scss, style-dictionary/tokens.style-dictionary.json, figma/figma-variables.json');
