# Component Tokens

## How to read this file

Every line below is a **reference**, not a new color. `bg: surface` means "use whatever `background.surface` currently resolves to" — in dark mode that's graphite-800, in light mode that's white, and the component never needs to know which. This is the payoff of the three-tier architecture from `00-philosophy.md`: change a semantic mapping once, every component listed here updates.

States are only listed where they're meaningful for that component — a Tooltip doesn't have a `disabled` state, an Avatar doesn't have `error`.

---

## Button
- **default** — bg: `accent.solidBg`-equivalent per variant (primary variant uses `primary-600`/`primary-400` per theme) · text: `inverseOnSolid` · radius: `sm` · shadow: none
- **hover** — bg darkens/lightens one ramp step toward `900`/`50` · overlay: `interaction.hoverOverlay`
- **focus** — ring: 2px `border.focus`, 2px offset
- **active** — bg moves one further step + `interaction.activeOverlay`
- **disabled** — bg: `background.surface` · text: `text.disabled` · no shadow, no hover response
- **loading** — same as default + centered spinner in `text.inverseOnSolid`, label opacity 0.6
- Variants: **primary** (solid brand), **secondary** (bg: `background.surface`, border: `border.default`), **ghost** (transparent, text: `text.primary`, hover: `interaction.hoverOverlay` only), **danger** (uses `status.danger.solidBg`)

## Input
- **default** — bg: `input.bg` · border: `input.border` · text: `input.text` · placeholder: `input.placeholder` · radius: `sm`
- **hover** — border: `input.borderHover`
- **focus** — border: `input.borderFocus` · ring: 2px `border.focus` at 30% alpha
- **disabled** — bg: `input.disabledBg` · text: `input.disabledText` · cursor not-allowed
- **error** — border: `status.danger.subtleBorder` · helper text: `status.danger.subtleFg`
- **success** — border: `status.success.subtleBorder`

## Textarea
Inherits every Input state above; adds a resize-handle affordance colored `border.default` and a bottom-right character counter in `text.tertiary` (switches to `status.warning.subtleFg` past 90% of the limit, `status.danger.subtleFg` over limit).

## Checkbox
- **default** — box border: `border.default` · bg: transparent
- **hover** — border: `border.strong`
- **focus** — ring: 2px `border.focus`
- **checked** — bg: `primary` solid step (400 dark / 600 light) · check-mark: `inverseOnSolid`
- **disabled** — border: `text.disabled` · bg: `background.surface`
- **error** — border: `status.danger.subtleBorder`

## Radio
Same state recipe as Checkbox, circular instead of square; **checked** renders as a filled inner dot (same solid step as Checkbox) inside an outer ring in `border.strong`.

## Switch
- **off** — track: `background.surface` · border: `border.default` · thumb: `text.primary`-inverse (i.e. white/near-white regardless of theme, for a consistent physical "toggle" look)
- **on** — track: `primary` solid step · thumb unchanged
- **hover** — track darkens/lightens one step
- **focus** — ring: 2px `border.focus` around the whole control
- **disabled** — 50% opacity on the whole control, no hover/active response

## Slider
- **track (inactive)** — `border.default`
- **track (filled/active)** — `primary` solid step
- **thumb (default)** — bg: `background.surface` (or white) · border: 2px `primary` solid step · shadow: `shadow-sm`
- **thumb (hover/focus)** — ring: 4px `primary` at 20% alpha
- **thumb (active/dragging)** — scale 1.1, `shadow-md`
- **disabled** — track and thumb both drop to `text.disabled`

## Badge
- **default (subtle)** — bg: `status.<x>.subtleBg` · text: `status.<x>.subtleFg` · border: `status.<x>.subtleBorder` (1px) · radius: `full`
- **solid** — bg: `status.<x>.solidBg` · text: `status.<x>.solidFg`
- **neutral** — bg: `background.surface` · text: `text.secondary` · border: `border.default`

## Avatar
- **default** — bg (fallback/initials): a deterministic pick from the 12-color chart palette, keyed by name hash so the same person always gets the same color · text: `inverseOnSolid` or `text.primary` depending on which reads better against that specific chart color
- **ring** (online/selected state) — 2px `primary` solid step, 2px offset from `background.canvas`
- **status dot** — `status.success.solidBg` (online), `status.warning.solidBg` (away), `text.disabled` (offline)

## Tooltip
- **default** — bg: `background.tooltip` · text: `text.tooltipFg` · radius: `sm` · shadow: `shadow-md` · max-width: 240px
- Arrow uses the same bg as the tooltip body, rotated 45°, no separate token

## Toast
- **default** — bg: `background.surfaceRaised` · border: `border.subtle` · shadow: `shadow-lg` · radius: `md`
- **success / warning / danger / info** — left border-accent (4px) in `status.<x>.solidBg`, small leading icon in the same color
- **dismiss button** — ghost-button recipe, `text.tertiary` default → `text.primary` hover

## Alert
Same recipe as Toast's status variants, but persistent (inline in the page, not floating) and full-width by default: bg: `status.<x>.subtleBg` · border: `status.<x>.subtleBorder` · text: `status.<x>.subtleFg` · icon: same color as text.

## Card
- **default** — bg: `background.surface` · border: `border.subtle` (dark theme) or none (light theme, shadow alone implies edge) · radius: `md` · shadow: `shadow-xs`
- **hover** (if interactive/clickable) — shadow: `shadow-sm` · border: `border.default`
- **selected** — border: 2px `primary` solid step, replacing the default border

## Dialog (Modal)
- **scrim** — `overlay.scrim`
- **surface** — bg: `background.dialog` · radius: `lg` · shadow: `shadow-xl`
- **header border** — `border.subtle`
- **footer border** — `border.subtle`

## Tabs
- **tab (default)** — text: `text.secondary` · bottom border: transparent
- **tab (hover)** — text: `text.primary`
- **tab (selected)** — text: `text.primary` · bottom border: 2px `primary` solid step
- **tab (disabled)** — text: `text.disabled`
- **focus** — ring: 2px `border.focus` on the tab button itself

## Accordion
- **header (default)** — bg: `background.surface` · text: `text.primary` · chevron: `text.tertiary`
- **header (hover)** — bg + `interaction.hoverOverlay`
- **header (expanded)** — chevron rotates 180°, no color change
- **content** — bg: `background.base`, border-left: 2px `border.subtle` (visually nests the content under its header)

## Table
- **header row** — bg: `background.surface` · text: `text.secondary` · border-bottom: `border.default`
- **row (default)** — border-bottom: `border.subtle`
- **row (hover)** — bg: `interaction.hoverOverlay`
- **row (selected)** — bg: `selectionBg` (interaction.selectionBg)
- **cell (sortable, active sort)** — text: `text.primary`, sort-arrow: `primary` solid step

## Pagination
- **page button (default)** — text: `text.secondary` · bg: transparent
- **page button (hover)** — bg: `interaction.hoverOverlay`
- **page button (current)** — bg: `primary` solid step · text: `inverseOnSolid`
- **page button (disabled)** — text: `text.disabled`, no hover response

## Breadcrumb
- **item (default)** — text: `text.secondary`
- **item (hover)** — text: `text.link`
- **item (current/last)** — text: `text.primary`, not a link
- **separator** — `text.tertiary`, not interactive

## Navbar
- **default** — bg: `background.nav` · border-bottom: `border.subtle` · shadow: `shadow-sm` only if not edge-to-edge with page content
- **item (default)** — text: `text.secondary`
- **item (hover)** — text: `text.primary`
- **item (active route)** — text: `text.primary`, underline or background chip in `interaction.selectionBg`

## Sidebar
- **default** — bg: `background.sidebar` · border-right: `border.subtle`
- **item (default)** — text: `text.secondary`
- **item (hover)** — bg: `interaction.hoverOverlay`
- **item (active)** — bg: `interaction.selectionBg` · text: `text.primary` · left border-accent 2–3px `primary` solid step
- **section label** — `text.tertiary`, `label-sm` type token, uppercase optional

## Tree View
Inherits Sidebar item states. Adds: **expand/collapse chevron** in `text.tertiary` (rotates, no color change) and **indent guide lines** in `border.subtle` at each depth level.

## Context Menu
- **surface** — bg: `background.popover` · shadow: `shadow-md` · radius: `md`
- **item (default)** — text: `text.primary`
- **item (hover/highlighted via keyboard)** — bg: `interaction.hoverOverlay`
- **item (destructive)** — text: `status.danger.subtleFg`
- **item (disabled)** — text: `text.disabled`
- **separator** — 1px `border.subtle`

## Command Palette
- **scrim** — `overlay.scrim`
- **surface** — bg: `background.dialog` · shadow: `shadow-2xl` · radius: `lg`
- **search input** — borderless, bg transparent, text: `text.primary`, placeholder: `input.placeholder`
- **result item (default)** — text: `text.primary`
- **result item (keyboard-highlighted)** — bg: `interaction.selectionBg`
- **result group label** — `text.tertiary`, `label-sm`
- **kbd hint** (e.g. "↵") — bg: `background.surface`, border: `border.default`, `code-sm` type token

## Calendar / Date Picker
- **day cell (default)** — text: `text.primary`
- **day cell (outside current month)** — text: `text.disabled`
- **day cell (hover)** — bg: `interaction.hoverOverlay`
- **day cell (today)** — border: 1px `primary` solid step (outline only, not filled — keeps "today" distinct from "selected")
- **day cell (selected)** — bg: `primary` solid step · text: `inverseOnSolid`
- **day cell (in-range, for range pickers)** — bg: `interaction.selectionBg`
- **day cell (disabled/out-of-bounds)** — text: `text.disabled`, no hover response

## Charts
Covered in `01-color-system.md` → Data visualization palette. Axis lines and gridlines use `border.subtle`; axis labels use `text.tertiary`; the plot background is `background.surface`, never `background.canvas` (charts should read as a distinct surface, like a card).

## Forms (composition rules, not new tokens)
- Label above field, `space-2` (8px) gap, `label-md` type token in `text.secondary`.
- Helper text below field, `space-1` (4px) gap, `caption` type token in `text.tertiary` (or the matching status color if the field has an error/success state).
- Field groups separated by `space-6` (24px); fields within a logical group by `space-4` (16px).
- Required-field marker: a single `*` in `status.danger.subtleFg`, never conveyed by color alone (see Accessibility → color-blindness notes).
