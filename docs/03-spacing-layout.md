# Spacing & Layout

## Base unit

**4px base grid.** Every spacing value is a multiple of 4px, which itself is a multiple of 2 — so the scale also works cleanly if a product needs an 8pt-only subset later (just use the even-numbered steps).

| Token | Value | Typical use |
|---|---|---|
| `space-0` | 0px | resets |
| `space-px` | 1px | hairline borders |
| `space-1` | 4px | icon-to-label gap |
| `space-2` | 8px | tight stacks, chip padding |
| `space-3` | 12px | input padding, small gaps |
| `space-4` | 16px | default component padding |
| `space-5` | 20px | |
| `space-6` | 24px | card padding, section gaps |
| `space-7` | 28px | |
| `space-8` | 32px | between grouped sections |
| `space-9` | 36px | |
| `space-10` | 40px | |
| `space-12` | 48px | large section gaps |
| `space-14` | 56px | |
| `space-16` | 64px | page-level vertical rhythm |
| `space-20` | 80px | |
| `space-24` | 96px | |
| `space-28` | 112px | |
| `space-32` | 128px | hero sections |
| `space-40` | 160px | |
| `space-48` | 192px | |
| `space-56` | 224px | |
| `space-64` | 256px | |

## Margins & padding conventions

- **Component internal padding** defaults to `space-4` (16px), tightened to `space-3` (12px) for dense/compact density modes, or `space-2` (8px) for chips and badges.
- **Stack gaps** (vertical rhythm between sibling elements in a form or list) default to `space-3` for tightly related fields and `space-6` between unrelated groups.
- **Page margins** use the container system below, not a fixed pixel value — so the same page works from a 360px phone to a 34" monitor.

## Breakpoints

| Name | Min-width | Typical device |
|---|---|---|
| `xs` | 0 | phones (portrait) |
| `sm` | 640px | phones (landscape), small tablets |
| `md` | 768px | tablets |
| `lg` | 1024px | small laptops |
| `xl` | 1280px | desktops |
| `2xl` | 1536px | large / ultrawide monitors |

## Container widths

| Breakpoint | Max container width | Side padding |
|---|---|---|
| `xs` | 100% | 16px |
| `sm` | 100% | 24px |
| `md` | 720px | 24px |
| `lg` | 960px | 32px |
| `xl` | 1200px | 32px |
| `2xl` | 1400px | 40px |

A **docs/reading-width** variant caps at `72ch` (about 680px at body-md size) regardless of breakpoint — long-form text and code explanations stay readable rather than stretching edge-to-edge on a wide monitor.

## Grid

- **12-column grid** at `md` and above, with `space-6` (24px) gutters.
- **4-column grid** below `md`, with `space-4` (16px) gutters — 12 columns on a 360px phone produces columns too narrow to be useful.
- Grid gap and column count are independent tokens (`--grid-columns`, `--grid-gutter`) so a dashboard can opt into a denser 16-column grid without touching the gutter value.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 12), minmax(0, 1fr));
  gap: var(--grid-gutter, var(--space-6));
}
@media (max-width: 767px) {
  .grid { --grid-columns: 4; --grid-gutter: var(--space-4); }
}
```
