# Color System

## Where the full data lives

Every color below has a complete 11-step ramp (`50` through `950`), each step given in **HEX, RGB, HSL, and OKLCH** (a newer color format that matches how the human eye perceives lightness — useful because it means "step 500 of red" and "step 500 of blue" actually *look* like the same brightness, which plain RGB/HSL can't promise).

- The exhaustive machine-readable version: `tokens/primitives.json` and `css/tokens.css`.
- This doc shows a **readable subset** (7 of the 11 steps) so a human can scan it. Don't hand-copy hex codes from here for production use — import the generated files instead, so a future palette tweak only requires re-running the build script.

## How the ramp is built (so the numbers are trustworthy, not eyeballed)

1. Every ramp shares one **lightness curve** across all 11 steps (98.5% → 22% in OKLCH lightness). Only the hue and the peak saturation differ per color. That means `danger-700` and `success-700` are always similarly dark, `*-300` are always similarly light — contrast behavior is predictable regardless of which color you reach for.
2. Chroma (color intensity) tapers off automatically near white and near black, because a fully-saturated color can't exist at those extremes without breaking (going outside what a screen can display). Every value below was run through gamut-clamping so nothing you see here will render as an approximated or clipped color in a browser.
3. The dark-theme seed colors (background, foreground, muted gray, and the six accent hues) were measured from a real Monokai Pro Filter Octagon export, not guessed from memory. The one addition is **Sapphire** (info-blue) — Filter Octagon's native palette doesn't include a blue, so this hue was synthesized to match the saturation/lightness character of the other six.

## Primitive ramps

### Graphite (neutral)
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#f9faff` | 249 250 255 | 98.5% 0.007 279° |
| 100 | `#eff0f5` | 239 240 245 | 95.5% 0.007 279° |
| 300 | `#c8c8ce` | 200 200 206 | 83.5% 0.007 279° |
| 500 | `#929398` | 146 147 152 | 66.5% 0.007 279° |
| 700 | `#5e5f63` | 94 95 99 | 48.5% 0.007 279° |
| 900 | `#2e2f33` | 46 47 51 | 30.5% 0.007 279° |
| 950 | `#1a1a1e` | 26 26 30 | 22.0% 0.007 279° |

### Primary — Violet
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#fef8ff` | 254 248 255 | 98.5% 0.012 322° |
| 100 | `#fce9ff` | 252 233 255 | 95.5% 0.036 322° |
| 300 | `#e2b8e8` | 226 184 232 | 83.5% 0.079 322° |
| 500 | `#ae81b5` | 174 129 181 | 66.5% 0.090 322° |
| 700 | `#744f7a` | 116 79 122 | 48.5% 0.079 322° |
| 900 | `#3c2540` | 60 37 64 | 30.5% 0.057 322° |
| 950 | `#241326` | 36 19 38 | 22.0% 0.043 322° |

### Secondary — Mint / Teal
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#eefff7` | 238 255 247 | 98.5% 0.021 167° |
| 100 | `#c7ffe7` | 199 255 231 | 95.5% 0.065 167° |
| 300 | `#96dabe` | 150 218 190 | 83.5% 0.079 167° |
| 500 | `#57a688` | 87 166 136 | 66.5% 0.090 167° |
| 700 | `#296d56` | 41 109 86 | 48.5% 0.079 167° |
| 900 | `#083829` | 8 56 41 | 30.5% 0.057 167° |
| 950 | `#012116` | 1 33 22 | 22.0% 0.043 167° |

### Accent — Tangerine
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#fff9f5` | 255 249 245 | 98.5% 0.008 51° |
| 100 | `#ffece1` | 255 236 225 | 95.5% 0.025 51° |
| 300 | `#ffb68c` | 255 182 140 | 83.5% 0.102 51° |
| 500 | `#d77738` | 215 119 56 | 66.5% 0.142 51° |
| 700 | `#944503` | 148 69 3 | 48.5% 0.125 51° |
| 900 | `#4d2000` | 77 32 0 | 30.5% 0.080 51° |
| 950 | `#2f1100` | 47 17 0 | 22.0% 0.058 51° |

### Success — Lime
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#f6ffe1` | 246 255 225 | 98.5% 0.041 121° |
| 100 | `#e5fcaa` | 229 252 170 | 95.5% 0.107 121° |
| 300 | `#bcd671` | 188 214 113 | 83.5% 0.130 121° |
| 500 | `#86a122` | 134 161 34 | 66.5% 0.148 121° |
| 700 | `#556800` | 85 104 0 | 48.5% 0.117 121° |
| 900 | `#2a3400` | 42 52 0 | 30.5% 0.073 121° |
| 950 | `#171e00` | 23 30 0 | 22.0% 0.053 121° |

### Warning — Amber
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#fffaed` | 255 250 237 | 98.5% 0.018 89° |
| 100 | `#ffefc7` | 255 239 199 | 95.5% 0.055 89° |
| 300 | `#e8c56b` | 232 197 107 | 83.5% 0.116 89° |
| 500 | `#b48e11` | 180 142 17 | 66.5% 0.132 89° |
| 700 | `#765b00` | 118 91 0 | 48.5% 0.099 89° |
| 900 | `#3c2d00` | 60 45 0 | 30.5% 0.062 89° |
| 950 | `#231900` | 35 25 0 | 22.0% 0.045 89° |

### Danger — Coral
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#fff8f8` | 255 248 248 | 98.5% 0.007 15° |
| 100 | `#ffeaeb` | 255 234 235 | 95.5% 0.022 15° |
| 300 | `#ffb1b6` | 255 177 182 | 83.5% 0.092 15° |
| 500 | `#f0576e` | 240 87 110 | 66.5% 0.187 15° |
| 700 | `#a82640` | 168 38 64 | 48.5% 0.165 15° |
| 900 | `#5c031b` | 92 3 27 | 30.5% 0.118 15° |
| 950 | `#39000d` | 57 0 13 | 22.0% 0.088 15° |

### Info — Sapphire *(synthesized)*
| Step | Hex | RGB | OKLCH |
|---|---|---|---|
| 50 | `#f6fbff` | 246 251 255 | 98.5% 0.007 247° |
| 100 | `#e4f2ff` | 228 242 255 | 95.5% 0.023 247° |
| 300 | `#9acfff` | 154 207 255 | 83.5% 0.087 247° |
| 500 | `#509ad9` | 80 154 217 | 66.5% 0.120 247° |
| 700 | `#226397` | 34 99 151 | 48.5% 0.106 247° |
| 900 | `#043152` | 4 49 82 | 30.5% 0.075 247° |
| 950 | `#001c33` | 0 28 51 | 22.0% 0.057 247° |

### Chart-only extras
Four extra hues exist *only* for data visualization, so a chart can go past seven categories without reusing a status color out of context: **Rose** (`#c77797` at 500), **Indigo** (`#878cd3` at 500), **Ochre** (`#ba8b32` at 500), **Sage** (`#67a479` at 500). Full ramps for these are in `tokens/primitives.json` too.

## Semantic layer (what components actually use)

Components never point at `primary-500` directly — they point at a semantic name, and that name resolves to a different primitive step per theme. A sample of the mapping (full list in `tokens/semantic.json`):

| Semantic token | Dark value | Light value |
|---|---|---|
| `background.canvas` | graphite-950 `#1a1a1e` | graphite-100 `#eff0f5` |
| `background.base` | graphite-900 `#2e2f33` | graphite-50 `#f9faff` |
| `background.surface` (cards) | graphite-800 `#45464a` | `#ffffff` |
| `background.sidebar` | graphite-950 `#1a1a1e` | graphite-100 `#eff0f5` |
| `text.primary` | graphite-50 `#f9faff` | graphite-900 `#2e2f33` |
| `text.secondary` | graphite-300 `#c8c8ce` | graphite-700 `#5e5f63` |
| `text.tertiary` (meta/caption only — see accessibility notes) | graphite-500 `#929398` | graphite-600 `#78787d` |
| `text.link` | primary-400 `#ca9ed0` | primary-700 `#744f7a` |
| `border.default` | graphite-700 `#5e5f63` | graphite-300 `#c8c8ce` |
| `border.focus` | info-400 `#70b6f4` | info-600 `#377eb9` |

Notice the pattern: dark mode pulls **light** steps (50–400) for anything meant to read against a dark canvas, and light mode pulls **dark** steps (600–900) for the same job. That's the whole trick to theme-flipping without a second design pass.

### Status colors — two intensities, both themes
Every status color (`success`, `warning`, `danger`, `info`) ships two variants:
- **subtle** — a tinted background for banners/alerts (`subtleBg` + `subtleBorder` + `subtleFg`)
- **solid** — a filled background for buttons/badges (`solidBg` + `solidFg`)

All eight solid-fill combinations (4 statuses × 2 themes) were checked against WCAG AA and pass at 5.98:1 or better — see `08-accessibility.md` for the measured numbers.

## Data visualization palette
A 12-color categorical sequence for charts, built from the semantic layer at whichever step reads best per theme (step 400 in dark mode, step 500 in light mode — lighter accents pop more on a dark canvas, darker ones read better on white):

`primary → secondary → accent → success → warning → danger → info → rose → indigo → ochre → sage → graphite`

Keep series in this order for consistency across charts in the same product. For colorblind-safe pairs (avoiding red/green as the *only* differentiator), pair danger with a shape or pattern, not color alone — see Accessibility.

## Code, terminal, and markdown colors
These are covered in `07-markdown-syntax-highlighting.md` since they're really one system (a token-type → color mapping applied consistently across every language), not a separate palette.
