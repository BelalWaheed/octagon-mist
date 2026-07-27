# Icons & Motion

## Icon system

| Property | Value |
|---|---|
| Grid | 24×24px source, drawn on a 20px live area (2px padding each side) so icons from different sets align optically |
| Size scale | `icon-xs` 12px · `icon-sm` 16px · `icon-md` 20px · `icon-lg` 24px · `icon-xl` 32px |
| Stroke width | 1.5px at 20–24px sizes, 1.75px at 16px and below (thin strokes disappear at small sizes, so weight compensates) |
| Corner radius (of the icon style itself) | Rounded joins/caps, matching the softness of `radius-sm`/`radius-md` used elsewhere — avoid perfectly sharp icon corners, they clash with the rounded UI shell |
| Spacing to adjacent text | `space-2` (8px) between an icon and its label, regardless of icon size |
| Alignment | Optically centered on the text's cap-height, not its full line-height box — icons sitting on the baseline read as "sinking" |
| Color | Icons inherit `currentColor` by default (so they always match their surrounding text token) except status icons, which hard-set to their `status.<x>.solidBg`/`subtleFg` color regardless of surrounding text |

Recommended icon set: something with a **consistent stroke-based style** at 1.5–2px (e.g. Lucide, Phosphor, Feather) rather than mixing filled and outlined sets — mixing styles is one of the fastest ways a UI reads as assembled-from-parts rather than designed.

## Motion tokens

### Duration
| Token | Value | Use |
|---|---|---|
| `duration-instant` | 80ms | micro-feedback: checkbox tick, switch toggle |
| `duration-fast` | 120ms | hover states, small color/opacity transitions |
| `duration-base` | 180ms | default for most UI transitions |
| `duration-moderate` | 240ms | dropdown/popover open-close, tab indicator slide |
| `duration-slow` | 320ms | modal/dialog enter-exit |
| `duration-slower` | 480ms | page transitions, large layout shifts |

### Easing
| Token | Curve | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | default for most transitions — fast start, gentle stop |
| `ease-decelerate` | `cubic-bezier(0, 0, 0, 1)` | things entering the screen (modals, toasts, dropdowns) |
| `ease-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | things leaving the screen |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | playful, low-stakes feedback (a like button, a drag-and-drop snap) — used sparingly, not on core navigation |

### Spring presets (for engines that take actual spring physics, e.g. Framer Motion / React Native Reanimated)
| Preset | Stiffness | Damping | Use |
|---|---|---|---|
| `spring-snappy` | 500 | 30 | toggles, small controls |
| `spring-gentle` | 260 | 26 | modals, sheets |
| `spring-bouncy` | 420 | 16 | drag-and-drop release, celebratory moments |

### Applied patterns
- **Page transitions** — 240ms cross-fade + 8px vertical settle, `ease-standard`. Avoid full-page slide transitions on the web; they read as native-app mimicry and fight with browser back/forward gestures.
- **Hover** — 120ms color/background transition only. Never animate `transform` on hover for static content (causes layout jitter on trackpads sending sub-pixel deltas).
- **Modal enter** — backdrop fades in over 180ms; the dialog itself fades + scales from 0.98→1 over 240ms `ease-decelerate`, starting 20ms after the backdrop so it doesn't feel like everything moves as one flat unit.
- **Modal exit** — reverse of enter, but faster (160ms total) — exits should always feel snappier than entries.
- **Loading states** — skeleton shimmer sweeps every 1.4s, `ease-standard`, opacity 0.5→0.8→0.5 — deliberately slow and low-contrast so it reads as "waiting," not as an alarming flicker.

### Reduced motion
Every animation above must have a `prefers-reduced-motion: reduce` fallback that keeps the *state change* but drops the *motion*: cross-fades become instant opacity swaps, slides become instant position changes, spring bounces become a plain 1-frame snap. Never simply disable the transition and leave a jarring instant layout jump where a smooth one was expected — swap to an equally intentional but motion-free version.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```
