# Design Philosophy

## What this is

A framework-agnostic design system: a set of **tokens** (small named values like colors, spacing, and font sizes) and rules for using them. It's built so the same source of truth can drive a React web app, a React Native app, an Electron/Tauri desktop app, or a docs site, without redoing the work each time.

It ships two themes that share one identity:

- **Dark — "Filter Octagon"**: a warm, rich dark theme in the spirit of Monokai Pro's Filter Octagon, tuned for long coding sessions.
- **Light — "Minimal Mist"**: a clean, soft-white, low-noise light theme.

Both themes pull from the *same* seven accent hues (violet, teal, tangerine, lime, amber, coral, sapphire) and the *same* neutral gray family — just tuned differently for a dark canvas vs. a bright one. That's what makes them feel like one family instead of two unrelated products.

## Three-tier token architecture

Every value in this system lives at one of three layers. This is the single most important structural decision in the whole system, because it's what makes theming, rebranding, and dark/light switching cheap instead of a rewrite.

1. **Primitives** — raw values with no meaning attached. `primary-500`, `space-4`, `radius-md`. These never change based on theme or context; they're just a palette and a scale to draw from.
2. **Semantic tokens** — primitives given a *job*. `text.primary`, `background.surface`, `status.danger.solidBg`. These are what change between light and dark mode — the same semantic name points at a different primitive step depending on theme.
3. **Component tokens** — semantic tokens given to a *specific part of a specific component*. A button's hover background is not a new color; it's a reference to `interaction.hoverOverlay` layered over `background.surface`.

The rule that keeps this system maintainable: **components only ever reference semantic tokens, never primitives directly.** If a button needs to change color, that's a semantic-layer edit, and every component using that semantic token updates automatically. This is the same approach used by Material Design 3's "roles," Radix Themes' scales, and GitHub Primer's functional variables.

## Why these two themes specifically

Long coding sessions punish harsh whites and low-contrast grays alike — Filter Octagon's dark canvas sits in between, with enough warmth in the accent hues that the UI doesn't feel sterile. Minimal Mist mirrors that same restraint in the opposite direction: soft white rather than stark `#fff`, calm gray rather than blue-tinted gray, and the same seven accent hues turned down in luminance and up in saturation just enough to stay legible on a bright surface.

## How the pieces fit together

```
primitives.json  ──►  semantic.json (light + dark)  ──►  component tokens (docs/05)
      │                        │
      ├─► css/tokens.css       ├─► tailwind/theme.v4.css
      ├─► scss/_variables.scss ├─► tailwind/tailwind.config.js
      └─► style-dictionary/    └─► figma/figma-variables.json
```

Everything under `css/`, `scss/`, `tailwind/`, `style-dictionary/`, and `figma/` is *generated* from `tokens/primitives.json` and `tokens/semantic.json` by the scripts in `scripts/`. Don't hand-edit the generated files — change a seed color or a semantic mapping and re-run the build. That's what keeps eight output formats from drifting out of sync with each other.

## Reading order

1. `01-color-system.md` — the palette, semantic mapping, charts, code/syntax colors
2. `02-typography.md` — type scale and font pairing
3. `03-spacing-layout.md` — spacing, containers, breakpoints, grid
4. `04-radius-shadow-elevation.md`
5. `05-components.md` — component token recipes and states
6. `06-icons-motion.md`
7. `07-markdown-syntax-highlighting.md`
8. `08-accessibility.md` — including measured contrast ratios, not just claims
9. `09-multi-format-tokens.md` — how to consume each output format
10. `10-app-examples.md` — preset overrides for 10 common app types
11. `11-extras.md` — brand customization, dynamic accent, performance notes
