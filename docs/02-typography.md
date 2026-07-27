# Typography

## Typefaces

| Role | Font | Why |
|---|---|---|
| UI (Display, Heading, Title, Body, Label, Caption) | **Inter** | Extremely legible at small sizes, huge weight range, near-universal language coverage. The safe, professional choice for interface text — this system spends its personality budget on color and motion, not on the body font. |
| Code, terminal, keyboard keys | **JetBrains Mono** | Built specifically for reading code: distinct `l`/`1`/`I`, distinct `0`/`O`, ligatures available. Ties the dark theme back to its Monokai coding-editor roots. |

Fallback stacks (used if the primary font hasn't loaded yet, or isn't available):
```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

## Scale

Sizes are in `px` for clarity here; the generated tokens expose both `px` and `rem`. Line-height is given as an absolute px value (not a unitless ratio) so it stays predictable across nested components.

### Display — hero numbers, marketing headers
| Token | Size / Line-height | Weight | Tracking |
|---|---|---|---|
| `display-lg` | 57 / 64 | 700 | -0.02em |
| `display-md` | 45 / 52 | 700 | -0.02em |
| `display-sm` | 36 / 44 | 700 | -0.01em |

### Heading — page and section titles
| Token | Size / Line-height | Weight | Tracking |
|---|---|---|---|
| `h1` | 32 / 40 | 700 | -0.01em |
| `h2` | 28 / 36 | 700 | -0.01em |
| `h3` | 24 / 32 | 600 | -0.005em |
| `h4` | 20 / 28 | 600 | 0 |
| `h5` | 18 / 26 | 600 | 0 |
| `h6` | 16 / 24 | 600 | 0 |

### Title — component/card headers, smaller than a page heading
| Token | Size / Line-height | Weight |
|---|---|---|
| `title-lg` | 18 / 26 | 600 |
| `title-md` | 16 / 24 | 600 |
| `title-sm` | 14 / 20 | 600 |

### Body
| Token | Size / Line-height | Weight |
|---|---|---|
| `body-lg` | 16 / 26 | 400 |
| `body-md` | 14 / 22 | 400 — the default for UI copy |
| `body-sm` | 13 / 20 | 400 |

### Label — buttons, form labels, nav items
| Token | Size / Line-height | Weight | Tracking |
|---|---|---|---|
| `label-lg` | 14 / 20 | 500 | 0 |
| `label-md` | 13 / 18 | 500 | 0 |
| `label-sm` | 12 / 16 | 500 | 0.01em |

### Caption
| Token | Size / Line-height | Weight |
|---|---|---|
| `caption` | 12 / 16 | 400 — pairs with `text.tertiary` |
| `caption-strong` | 12 / 16 | 600 |

### Code
| Token | Size / Line-height | Weight |
|---|---|---|
| `code-lg` | 15 / 24 | 400 |
| `code-md` | 13.5 / 22 | 400 — inline code and default code blocks |
| `code-sm` | 12 / 18 | 400 |

## Responsive scaling

Body, Label, and Caption stay **fixed** across breakpoints — resizing running text hurts reading rhythm more than it helps. Display and Heading scale down on small screens using `clamp()`, so a hero headline doesn't overflow a phone screen:

```css
--text-display-lg: clamp(2.5rem, 1.85rem + 2.6vw, 3.5625rem);   /* 40px → 57px */
--text-display-md: clamp(2rem, 1.55rem + 1.9vw, 2.8125rem);      /* 32px → 45px */
--text-h1: clamp(1.5rem, 1.28rem + 0.9vw, 2rem);                 /* 24px → 32px */
--text-h2: clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem);             /* 22px → 28px */
```

`h3` and smaller don't need fluid scaling in practice — the difference between mobile and desktop at those sizes is small enough that a single fixed value reads fine everywhere.
