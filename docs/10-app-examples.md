# App-Type Presets

The same primitives and semantic tokens work across all ten of these — nothing below introduces a new color. What changes is *which* tokens get emphasized, the density, and a couple of component choices.

## Dashboard
- Density: compact (`space-3` internal padding instead of `space-4`).
- Lean on the **chart palette** and **Card** elevation (`shadow-xs` resting) heavily — a dashboard is mostly cards and charts.
- Sidebar always present at `lg`+ breakpoints; collapses to a Sidebar-as-Sheet below that.
- Status badges (subtle variant) for KPI deltas — never rely on a bare `+`/`-` number color alone (color-blindness note in `08-accessibility.md`).

## Documentation site
- Reading-width container (`72ch`) for body content; full-width only for code blocks and diagrams.
- Sidebar = Tree View recipe (nested nav), not the flat Sidebar-item recipe.
- Heavy use of the Markdown + Syntax Highlighting doc — this is the one app type where those tokens are the majority of the UI, not a minority.
- Table of contents uses `text.tertiary` default → `text.link` on hover, current-section indicator via a 2px left border in `primary` solid step (mirrors the Sidebar active-item pattern).

## Code editor
- This is the dark theme's home turf — default to dark, make light an explicit opt-in rather than following `prefers-color-scheme`.
- Full syntax highlighting + terminal ANSI-16 tables apply directly, unmodified.
- Minimize chrome: thin `border.subtle` panel dividers instead of shadows between editor/sidebar/terminal panes — panes are adjacent, not floating, so elevation shadows would be wrong here.
- Command Palette is the primary navigation metaphor; keep its shadow (`shadow-2xl`) as the heaviest one on screen so it visually "wins" over the editor beneath it.

## Developer tool (CLI companion apps, API consoles, etc.)
- Pair Terminal ANSI colors with the UI chrome directly — e.g. a request/response console can use the same Sapphire/Coral/Lime as both its syntax highlighting *and* its status badges, reinforcing "this is a tool for developers" rather than borrowing a separate generic app palette.
- Code-heavy panels default to `code-md`; avoid mixing more than two type roles (Body + Code) in a single dense panel.

## Portfolio
- The one app type where **Display** type tokens and `radius-2xl`/`3xl` actually get used — everywhere else in this list mostly lives in Heading/Title/Body.
- Generous spacing: `space-16`–`space-32` section gaps rather than the compact defaults.
- Chart/data-viz palette is irrelevant here; lean entirely on Primary + Accent for visual interest, neutrals for everything else.

## Landing page
- Similar to Portfolio for type/spacing, but with heavier use of **status/accent color for CTAs** — the primary button recipe, full-width or prominent, is the one element allowed to break from the otherwise-restrained neutral-dominant layout.
- Motion: page-load entrance animations (`ease-decelerate`, staggered `duration-moderate`) are appropriate here in a way they're not for a dashboard or admin panel — a landing page is seen once per session, a dashboard is seen fifty times a day and staggered entrance animation becomes an annoyance fast.

## Admin panel
- Same density and Card/Table-heavy structure as Dashboard, but with more **Form** and **Dialog** usage (create/edit records) and less charting.
- Bulk-action states: Table row `selected` background (`interaction.selectionBg`) plus a persistent action bar that slides up from the bottom using the Toast elevation recipe.

## Project management app
- Kanban columns = Card recipe repeated in a horizontal scroll region; column headers use `title-sm` + a count badge (neutral variant).
- Status/priority uses the status-color subtle badges directly — a task's "priority: high" badge literally reuses `status.danger.subtleBg/Fg`, no new color needed.
- Due-date coloring: on-time = `text.tertiary`, due soon = `status.warning.subtleFg`, overdue = `status.danger.subtleFg` — color communicates urgency, but always paired with the actual date text, never color alone.

## Notes app
- The most restrained of the ten: Body type tokens dominate, minimal chrome, sidebar/list uses the plain Sidebar-item recipe (no Tree View nesting needed unless notebooks/folders are hierarchical).
- Markdown styling doc applies almost in full if notes support Markdown input.
- Autosave/sync status: a small `caption` token indicator in `text.tertiary` ("Saved" / "Saving…"), never a modal or toast for routine autosave — reserve Toast for things the person needs to notice.

## Terminal UI (in-app terminal panes, not the OS terminal app)
- Use the **Terminal (ANSI-16)** table from `07-markdown-syntax-highlighting.md` directly for text output.
- Chrome around the terminal pane (tab bar, split-pane dividers) uses the regular UI semantic tokens (`background.surface`, `border.subtle`) — don't let the ANSI palette leak into the surrounding chrome, or focus/hover states become impossible to distinguish from terminal *content*.
- Cursor blink respects `duration-slow` (320ms on, 320ms off) and is disabled entirely under `prefers-reduced-motion`.
