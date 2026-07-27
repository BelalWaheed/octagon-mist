# Octagon Mist — Filter Octagon / Minimal Mist Design System

A framework-agnostic design system with two themes that share one identity:

- **Dark — Filter Octagon** — warm, rich, built for long coding sessions, in the spirit of Monokai Pro's Filter Octagon.
- **Light — Minimal Mist** — clean, soft-white, calm-gray, low visual noise.

Everything is generated from one source of truth, so CSS, Tailwind v3/v4, SCSS, Style Dictionary, and Figma Variables all stay in sync.

## Install

```bash
npm install @belal/octagon-mist
```

## Quick start

### CSS / Vite / Webpack / Next.js

```js
import '@belal/octagon-mist/css';
```

### Tailwind v4

```css
@import "@belal/octagon-mist/tailwind/v4";
```

### Tailwind v3

```js
// tailwind.config.js
const octagonMist = require('@belal/octagon-mist/tailwind/v3');
module.exports = { presets: [octagonMist] };
```

### SCSS

```scss
@import "@belal/octagon-mist/scss";
```

### HTML (no bundler)

```html
<link rel="stylesheet" href="node_modules/@belal/octagon-mist/css/tokens.css">
```

### Theme switching

```html
<html data-theme="dark"><!-- or data-theme="light" --></html>
```

Toggle at runtime with one line of JavaScript:

```js
document.documentElement.dataset.theme = 'light'; // or 'dark'
```

## npx CLI

Copy `tokens.css` directly into any project:

```bash
npx @belal/octagon-mist init              # copies to ./src/styles/tokens.css
npx @belal/octagon-mist init ./public/css  # copies to a custom folder
```

## File map

```
octagon-mist/
├── README.md
├── package.json
├── bin/
│   └── cli.mjs                    ← npx CLI tool
├── docs/                          ← full spec, read 00 → 11 in order
│   ├── 00-philosophy.md
│   ├── 01-color-system.md
│   ├── 02-typography.md
│   ├── 03-spacing-layout.md
│   ├── 04-radius-shadow-elevation.md
│   ├── 05-components.md
│   ├── 06-icons-motion.md
│   ├── 07-markdown-syntax-highlighting.md
│   ├── 08-accessibility.md
│   ├── 09-multi-format-tokens.md
│   ├── 10-app-examples.md
│   └── 11-extras.md
├── scripts/                       ← build pipeline
│   ├── generate-colors.mjs        ← edit seed colors here, then re-run
│   ├── build-outputs.mjs          ← generates all output formats
│   └── build-preview.mjs          ← generates preview gallery
├── tokens/
│   ├── primitives.json            ← every color ramp, hex/rgb/hsl/oklch × 50–950
│   └── semantic.json              ← light + dark mapping
├── css/
│   └── tokens.css                 ← CSS custom properties (drop-in, any framework)
├── tailwind/
│   ├── theme.v4.css               ← Tailwind v4 (@theme, CSS-first)
│   └── tailwind.config.js         ← Tailwind v3
├── scss/
│   └── _variables.scss
├── style-dictionary/
│   └── tokens.style-dictionary.json
├── figma/
│   └── figma-variables.json
└── preview/
    └── index.html                 ← interactive component gallery, both themes
```

## Development

Rebuild everything from the seed colors:

```bash
npm run all        # generate → build → preview
```

Or run each step individually:

```bash
npm run generate   # regenerate tokens/primitives.json from OKLCH seeds
npm run build      # generate CSS, Tailwind, SCSS, Style Dictionary, Figma outputs
npm run preview    # generate preview/index.html
```

## Where to start reading

Read `docs/00-philosophy.md` first — it explains the three-tier token architecture (primitive → semantic → component). Then `docs/01-color-system.md` and `docs/05-components.md` cover the two things you'll touch most often.

## About the palette

The dark theme's seed colors were measured from a real Monokai Pro Filter Octagon export, not approximated. One color (Sapphire, used for `info`) is synthesized since Filter Octagon's native palette doesn't include a blue. Full reasoning is in `docs/01-color-system.md`.

Contrast for every text/background and button pairing was verified against the WCAG formula — see `docs/08-accessibility.md` for measured ratios.

## License

MIT
