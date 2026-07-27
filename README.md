# Octagon Mist — Filter Octagon / Minimal Mist Design System

[![npm version](https://img.shields.io/npm/v/@belalwaheed/octagon-mist.svg?color=cb3837)](https://www.npmjs.com/package/@belalwaheed/octagon-mist)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-Octagon%20Mist-4f46e5)](https://octagon-mist.vercel.app)

A framework-agnostic design system with two themes that share one identity:

- 📖 **Documentation Site & Demo**: [https://octagon-mist.vercel.app](https://octagon-mist.vercel.app)
- 🎨 **Interactive Component Showcase**: [https://octagon-mist.vercel.app/components.html](https://octagon-mist.vercel.app/components.html)
- 📦 **npm Package**: [https://www.npmjs.com/package/@belalwaheed/octagon-mist](https://www.npmjs.com/package/@belalwaheed/octagon-mist)
- 💻 **GitHub Repository**: [https://github.com/BelalWaheed/octagon-mist](https://github.com/BelalWaheed/octagon-mist)

---

## Themes

- **Dark — Filter Octagon** — warm, rich, built for long coding sessions, in the spirit of Monokai Pro's Filter Octagon.
- **Light — Minimal Mist** — clean, soft-white, calm-gray, low visual noise.

Everything is generated from one source of truth, so CSS, Tailwind v3/v4, SCSS, Style Dictionary, and Figma Variables all stay in sync.

## Install

```bash
npm install @belalwaheed/octagon-mist
```

## Quick start

### CSS / Vite / Webpack / Next.js

```js
import '@belalwaheed/octagon-mist/css';
```

### Tailwind v4

```css
@import "@belalwaheed/octagon-mist/tailwind/v4";
```

### Tailwind v3

```js
// tailwind.config.js
const octagonMist = require('@belalwaheed/octagon-mist/tailwind/v3');
module.exports = { presets: [octagonMist] };
```

### SCSS

```scss
@import "@belalwaheed/octagon-mist/scss";
```

### HTML (no bundler)

```html
<link rel="stylesheet" href="node_modules/@belalwaheed/octagon-mist/css/tokens.css">
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

Copy `tokens.css` directly into any project without installing npm packages:

```bash
npx @belalwaheed/octagon-mist init              # copies to ./src/styles/tokens.css
npx @belalwaheed/octagon-mist init ./public/css  # copies to a custom folder
```

## File map

```
octagon-mist/
├── README.md
├── package.json
├── vercel.json                    ← Vercel deployment config
├── bin/
│   └── cli.mjs                    ← npx CLI tool
├── site/                          ← live website & component library
│   ├── index.html                 ← landing page
│   ├── components.html            ← component showcase
│   ├── docs.html                  ← integration guides
│   ├── tokens.html                ← token explorer
│   └── assets/
├── docs/                          ← full spec documentation
├── scripts/                       ← build pipeline
├── tokens/
│   ├── primitives.json            ← color ramps
│   └── semantic.json              ← light + dark mapping
├── css/
│   └── tokens.css                 ← CSS custom properties
├── tailwind/
│   ├── theme.v4.css
│   └── tailwind.config.js
├── scss/
│   └── _variables.scss
├── style-dictionary/
└── figma/
```

## Development

Rebuild everything from the seed colors:

```bash
npm run all        # generate → build → preview → site
```

## License

MIT
