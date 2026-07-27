# Border Radius, Shadow & Elevation

## Border radius

| Token | Value | Typical use |
|---|---|---|
| `radius-xs` | 4px | checkboxes, small chips |
| `radius-sm` | 6px | buttons, inputs, badges |
| `radius-md` | 8px | cards, dropdown menus |
| `radius-lg` | 12px | modals, popovers |
| `radius-xl` | 16px | large panels, sheets |
| `radius-2xl` | 24px | marketing/hero surfaces |
| `radius-3xl` | 32px | rare — large illustrative containers |
| `radius-full` | 9999px | pills, avatars, switches |

## Shadows — themed, not just darkened

A shadow that looks right on white looks like a smudge on near-black — box-shadows lose most of their visible falloff once the background is already dark. So the two themes use **different shadow recipes**, not the same rgba values at different opacity:

- **Light theme** — classic soft, layered drop shadows (a small tight shadow + a larger soft one), the way Material and Primer do it.
- **Dark theme** — a much lighter, tighter shadow *plus* a 1px near-white hairline at very low opacity, which reads as a subtle "lift" edge rather than trying to cast a shadow into the dark.

### Light theme
| Token | Value |
|---|---|
| `shadow-xs` | `0 1px 2px rgba(16,16,24,0.06)` |
| `shadow-sm` | `0 1px 3px rgba(16,16,24,0.08), 0 1px 2px rgba(16,16,24,0.04)` |
| `shadow-md` | `0 4px 8px rgba(16,16,24,0.08), 0 2px 4px rgba(16,16,24,0.05)` |
| `shadow-lg` | `0 10px 20px rgba(16,16,24,0.10), 0 4px 8px rgba(16,16,24,0.05)` |
| `shadow-xl` | `0 20px 40px rgba(16,16,24,0.12), 0 8px 16px rgba(16,16,24,0.06)` |
| `shadow-2xl` | `0 32px 64px rgba(16,16,24,0.16), 0 12px 24px rgba(16,16,24,0.08)` |

### Dark theme
| Token | Value |
|---|---|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)` |
| `shadow-sm` | `0 2px 4px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.03)` |
| `shadow-md` | `0 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)` |
| `shadow-lg` | `0 10px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)` |
| `shadow-xl` | `0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)` |
| `shadow-2xl` | `0 32px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)` |

Both sets are already in `css/tokens.css` under each theme's `[data-theme]` block as `--shadow-*`, so `box-shadow: var(--shadow-md)` picks the right recipe automatically.

## Elevation levels

Elevation is really just "which shadow + which surface token," made explicit so nobody has to guess which of the six shadow steps a given surface should use:

| Surface | Shadow | Background token |
|---|---|---|
| Card (resting) | `shadow-xs` | `background.surface` |
| Card (hover / draggable) | `shadow-sm` | `background.surface` |
| Dropdown / select menu | `shadow-md` | `background.popover` |
| Popover / date picker | `shadow-md` | `background.popover` |
| Navigation bar (if not edge-to-edge) | `shadow-sm` | `background.nav` |
| Floating action button | `shadow-lg` | component's own solid-fill token |
| Toast / snackbar | `shadow-lg` | `background.surfaceRaised` |
| Modal / dialog | `shadow-xl` | `background.dialog` |
| Command palette | `shadow-2xl` | `background.dialog` |

Rule of thumb: elevation should track how *temporary and floating* something is, not how *important* it is. A permanent sidebar sits flat against the canvas (no shadow) even though it's important; a command palette is the most transient, floating-est thing in the whole system, so it gets the heaviest shadow.
