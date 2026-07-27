# Multi-Format Token Output

All seven formats below are **generated** from `tokens/primitives.json` + `tokens/semantic.json` by `scripts/build-outputs.mjs`. Never hand-edit a generated file — change a seed color or a semantic mapping in the scripts and re-run `node scripts/build-outputs.mjs`. That's the one rule that keeps eight consumers of the same palette from drifting apart.

## 1. Raw JSON — `tokens/primitives.json` + `tokens/semantic.json`
The source of truth. `primitives.json` holds every ramp (hex/rgb/hsl/oklch per step). `semantic.json` holds the light/dark mapping. Any tool, script, or custom build pipeline should read from here first.

## 2. CSS Custom Properties — `css/tokens.css`
Plain CSS variables. Primitives sit on `:root` (theme-independent); semantic tokens sit inside `[data-theme="dark"]` and `[data-theme="light"]` blocks, including theme-specific shadows. Works in any framework — React, Vue, plain HTML — since it's just CSS.

```html
<html data-theme="dark">
  <!-- or toggle data-theme via JS for a light/dark switch -->
</html>
```
```css
.card { background: var(--background-surface); color: var(--text-primary); }
```

## 3. Tailwind v4 — `tailwind/theme.v4.css`
Tailwind v4 reads theme values from CSS (`@theme`), not a JS config. This file imports `css/tokens.css` and re-exposes every primitive as a Tailwind color, so `bg-primary-500`, `text-graphite-300`, etc. are available as utility classes immediately. Semantic tokens stay as plain CSS variables (`var(--background-surface)`) since Tailwind v4's `@theme` block is for design-time primitives, not runtime theme-switching values.

## 4. Tailwind v3 — `tailwind/tailwind.config.js`
For projects still on v3's JS config format. Extends `theme.colors`, `borderRadius`, `fontFamily`, `spacing`, and `transitionDuration`. `darkMode` is set to `['class', '[data-theme="dark"]']` so either Tailwind's own `dark:` variant or this system's `data-theme` attribute triggers dark styles.

## 5. SCSS — `scss/_variables.scss`
Flat `$color-*` variables plus two SCSS maps (`$theme-light`, `$theme-dark`) for projects that prefer `map-get()` lookups over CSS custom properties, or that need compile-time values (e.g., for a Sass function that can't read a runtime CSS variable).

## 6. Style Dictionary — `style-dictionary/tokens.style-dictionary.json`
For teams already running an [Style Dictionary](https://amzn.github.io/style-dictionary/) pipeline to fan tokens out to iOS (Swift/UIKit), Android (XML/Compose), or other platforms this system doesn't natively target. Each color carries its hex `value` plus `rgb`/`hsl`/`oklch` as `attributes`, so a custom Style Dictionary transform can pick whichever format a given platform needs.

## 7. Figma Variables — `figma/figma-variables.json`
A simplified, importable structure: one **Primitives** collection (single "Value" mode, every ramp/step) and one **Semantic** collection (Light/Dark modes, matching `semantic.json` exactly). Structured so a Figma plugin that supports variable import (or a short custom script using the Figma Plugin API's `Variables` namespace) can recreate the same two-collection setup inside a Figma file, keeping design files and code in sync.

## Picking a format
- **New React/web project, Tailwind already in use** → Tailwind v4 (`theme.v4.css`) or v3 config, whichever matches your Tailwind version.
- **React Native / Electron / Tauri, no Tailwind** → `css/tokens.css` directly (React Native needs a small adapter to read CSS vars, or consume `primitives.json`/`semantic.json` directly as a JS object — trivial since it's already JSON).
- **Existing Sass codebase** → `scss/_variables.scss`.
- **Multi-platform (mobile native + web) design system team** → Style Dictionary as the pipeline input, generating platform-specific outputs from there.
- **Design handoff / keeping Figma in sync** → `figma/figma-variables.json`.
