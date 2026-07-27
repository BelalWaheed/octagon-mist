# Accessibility

## Contrast — measured, not assumed

Every pair below was run through the actual WCAG relative-luminance formula against the generated hex values (not eyeballed). AA for normal text is 4.5:1, AA for large text (18px+ or 14px+ bold) and UI components is 3:1, AAA for normal text is 7:1.

| Pair | Dark ratio | Light ratio | Level |
|---|---|---|---|
| `text.primary` on `background.base` | 12.83:1 | 12.83:1 | AAA |
| `text.secondary` on `background.surface` | 5.66:1 | 6.38:1 | AA |
| `text.link` on `background.base` | 5.93:1 | 6.41:1 | AA |
| `border.focus` visibility on `background.base` | 6.17:1 | — | AA (UI component) |
| Status **solid** buttons — success | 8.20:1 | 5.98:1 | AA/AAA |
| Status **solid** buttons — warning | 7.93:1 | 6.17:1 | AA/AAA |
| Status **solid** buttons — danger | 7.45:1 | 6.68:1 | AA/AAA |
| Status **solid** buttons — info | 8.00:1 | 6.11:1 | AA/AAA |
| Status **subtle** banner text on subtle bg | 10.3–10.6:1 | 6.6:1+ | AAA/AA |
| `text.tertiary` on `background.base` | 4.36:1 | 4.21:1 | **Near-AA — see note below** |
| `text.disabled` on `background.base` | 3.04:1 | — | Exempt (see note) |

**Two intentional exceptions, documented rather than hidden:**
- `text.tertiary` sits at 4.2–4.4:1, just under the 4.5:1 normal-text threshold. It's reserved for meta text — timestamps, helper captions, secondary labels — set at 12–13px alongside a higher-contrast primary/secondary token doing the actual reading work. If a product uses `text.tertiary` for anything load-bearing (a form's only helper text, an error message), size it 14px+ or promote it to `text.secondary`.
- `text.disabled` is WCAG-exempt by definition — disabled controls aren't required to meet contrast minimums since they convey "not currently interactive," and are never used for content someone needs to read.

## Focus rings

- **Style**: 2px solid ring in `border.focus`, 2px offset from the element (not inset — an inset ring gets clipped by rounded corners and overflow).
- **Never** remove `:focus-visible` styling without replacing it with an equally visible alternative. `outline: none` alone is not acceptable anywhere in this system.
- Use `:focus-visible` rather than `:focus` so the ring appears for keyboard navigation but doesn't add visual noise to a mouse click — this matches how Chrome, Firefox, and Safari already treat native form controls.
- Focus ring color is intentionally `info` (blue) in **both** themes regardless of brand color — a focus indicator needs to be instantly recognizable as "system focus," not blended in with whatever the brand's primary hue happens to be that week.

## Keyboard navigation

- Every interactive component in `05-components.md` has a defined `focus` state — that's not optional polish, it's the minimum bar for the token set to be usable.
- Tab order follows visual/DOM order; nothing in this system relies on a positive `tabindex`.
- Modals and the Command Palette trap focus while open and return it to the triggering element on close.
- The Command Palette, Context Menu, and Tree View all define a keyboard-highlighted state (`interaction.selectionBg`) distinct from hover, since keyboard and mouse can both be "pointing" at different rows simultaneously.

## Reduced motion

Covered fully in `06-icons-motion.md` → Reduced motion. Every animation has a defined motion-free fallback that preserves the state change.

## High contrast mode

- Respect `forced-colors: active` (Windows High Contrast Mode) by letting the OS override colors — don't fight it with `forced-color-adjust: none` except on purely decorative elements (chart fills, illustrations) where the OS's automatic recoloring would make the content unreadable.
- Maintain at least a 3:1 border on all interactive controls even in the default (non-forced) themes, so a control's boundary doesn't rely on background-color contrast alone — this also happens to be why every input, button, and card in `05-components.md` gets an explicit border token rather than "just" a background change.

## Color blindness considerations

- **Never** use color as the only signal for a state that matters. Every status usage in this system pairs color with a second cue:
  - Form errors: color **and** an icon **and** text, never a red border alone.
  - Diff insert/delete: color **and** a `+`/`-` prefix **and** optionally a gutter icon.
  - Chart series: color **and** distinct point/line shapes when there are more than 4–5 series, since red/green and blue/purple confusions become likely past that count.
- The 12-color chart palette in `01-color-system.md` was chosen from hues spaced widely enough in hue-angle to stay distinguishable under the two most common forms of color blindness (deuteranopia and protanopia), but for any chart where a category **must** be distinguishable (e.g., pass/fail), pair it with a pattern or label rather than relying on the categorical palette alone.
- Danger (coral/red) and Success (lime/green) sit close in lightness by design at matching steps — this is exactly the pairing most likely to collide for red-green color blindness, so any success/danger pairing in the same view (e.g. a diff, a pass/fail badge) should also differ in icon (✓ vs ✕) or shape, not color alone.
