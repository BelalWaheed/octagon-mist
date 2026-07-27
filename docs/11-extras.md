# Extras

## Semantic naming conventions

Names describe **job**, never appearance — `background.canvas` not `gray-950`, `status.danger.solidBg` not `red-solid`. This is what lets a rebrand or a new theme swap the underlying hex without renaming anything a component references. A name like `text-purple` becomes a lie the day someone reskins the brand to blue; `text.link` never does.

Pattern used throughout: `<category>.<role>.<variant>` — e.g. `status.warning.subtleBg`. Category groups the token's domain (background, text, border, status...), role says which specific one, variant distinguishes intensity/emphasis when a role has more than one (subtle vs solid).

## Dark/light automatic switching

Three ways to drive theme, in order of recommendation:

1. **Respect the OS** by default: don't set `data-theme` at all, and let `:root:not([data-theme])` fall back to `prefers-color-scheme` (the CSS in `css/tokens.css` has a hook for this — fill in the light-mode overrides inside that media query, or, simpler, mirror the `[data-theme="light"]` block's variables into it).
2. **Let the person override it**: a theme toggle sets `data-theme="dark"` / `data-theme="light"` on `<html>` and persists the choice (localStorage on web, UserDefaults/SharedPreferences on native). This should always win over step 1 once set.
3. **Never** ship a theme that isn't one of the two full token sets above — a "half-themed" screen (dark chrome, light modal) is a common bug when a component hardcodes a color instead of reading the semantic token.

## Dynamic accent color

Because Primary is a **semantic name**, not a hardcoded hue, a product can offer user-selectable accent colors without touching any component:

1. Keep `primary`'s *ramp shape* (the lightness/chroma curve from `01-color-system.md`) fixed.
2. Let the person pick a hue (a color wheel, or a short list of the system's existing hues: violet, teal, tangerine, etc.).
3. Regenerate just the `primary` ramp with `scripts/generate-colors.mjs` using the new hue, keeping everything else untouched.

Because every component in `05-components.md` references `primary` semantically, switching the accent is a one-ramp regeneration, not a find-and-replace across the codebase.

## Theme inheritance

A sub-brand or a white-labeled variant should **extend**, not fork:
- Keep all of `graphite` (neutrals) and the status colors (`success`/`warning`/`danger`/`info`) untouched — these carry meaning (errors are still red) regardless of brand.
- Override only `primary`/`secondary`/`accent` seeds and re-run the build.
- If a sub-brand needs a genuinely different type scale or spacing system, that's a sign it should be a new theme file, not an override — inheritance works for color, and works poorly for structural tokens.

## Brand customization checklist

To retheme this system for a different brand entirely:
1. Replace the seven accent seeds in `scripts/generate-colors.mjs` (keep `graphite` unless the brand needs a warmer/cooler neutral undertone).
2. Re-run `generate-colors.mjs` then `build-outputs.mjs`.
3. Re-check the contrast table in `08-accessibility.md` — a new hue can shift which step clears 4.5:1, exactly like the light-theme retuning documented there.
4. Swap the two typefaces in `02-typography.md` only if the brand has strong typographic requirements — the scale (sizes/weights/line-heights) rarely needs to change even when the fonts do.
5. Leave the three-tier architecture, the spacing scale, and the motion tokens alone — those are the parts of this system that aren't really "brand," they're product craftsmanship, and changing them per-brand is usually a mistake that fragments a multi-brand portfolio for no benefit.

## CSS variable architecture (why two layers of CSS custom properties)

`css/tokens.css` deliberately has primitives on `:root` and semantics inside `[data-theme]` blocks rather than putting everything in one flat list. This means:
- Primitives are always available for one-off cases a semantic token doesn't cover (a data-viz library that wants a raw hex, a marketing page that wants `accent-300` specifically).
- Semantic tokens are the *only* thing that changes when `data-theme` flips — the browser only has to recompute the (much smaller) semantic set on a theme toggle, not the whole palette.
- Component code should almost never reference a primitive directly (see `00-philosophy.md`) — the two-layer split makes that discipline easy to enforce in a lint rule (flag any `var(--color-*)` usage outside of the semantic-token generation script itself).

## Performance considerations

- CSS custom properties for theming (rather than swapping stylesheets or re-rendering with new inline styles) means a theme toggle is a single attribute change (`data-theme`) and the browser repaints — no JS re-render, no flash of unstyled content if the attribute is set before first paint (e.g., a tiny inline `<script>` in `<head>` reading the persisted preference, before the rest of the page loads).
- Avoid `filter: invert()` or similar tricks for dark mode — this system's dark theme is independently tuned (see `04-radius-shadow-elevation.md` on shadows), and an inverted-light-theme is never actually equivalent to a properly tuned dark theme.
- The generated Tailwind/SCSS/Style-Dictionary files are all flat lookups (no runtime color math) — the OKLCH computation happens once, at build time, in `scripts/`, never in the browser.

## Best practices & future scalability

- **New component?** Write its token recipe as references to existing semantic tokens first (per `05-components.md`'s format). Only add a new semantic token if no existing one fits — and if you do, ask whether it's really a new *role* or just a new *component* reusing an existing role.
- **New theme (e.g., a seasonal or high-contrast variant)?** It only needs a new entry in `buildTheme()` inside `scripts/build-outputs.mjs` — the primitives, spacing, type scale, and motion tokens are shared automatically.
- **Scaling to a design team using Figma heavily?** Treat `figma/figma-variables.json` as generated output, same as the CSS — resist the urge to hand-tune colors inside Figma once this pipeline exists, or Figma and code will drift within a month.
- **Versioning**: tag the `design-system/` folder (or its own repo) with semver. A patch bump = new component recipes or docs; a minor bump = new primitives (e.g. a new chart-only hue); a major bump = any change to an *existing* semantic token's mapping, since that can silently change contrast ratios in every product consuming it.
