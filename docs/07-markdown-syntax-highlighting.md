# Markdown, Syntax Highlighting & Terminal Colors

## Markdown styling

Markdown elements reuse the type scale and semantic color tokens already defined — nothing here is a new color.

| Element | Styling |
|---|---|
| H1–H6 | `h1`–`h6` type tokens, `text.primary`, `space-6`/`space-4` margin above/below |
| Paragraph | `body-md`, `text.primary`, `space-4` margin-bottom |
| Lists (ul/ol) | `space-2` gap between items, marker in `text.tertiary` |
| Task lists | Checkbox component recipe for the box; completed items get `text.disabled` + strikethrough |
| Tables | Header row: `background.surface` + `text.secondary`; body rows: `border.subtle` bottom border; optional zebra striping at `background.base` |
| Code blocks | See Syntax Highlighting below; block wrapper: `background.surface`, `radius-md`, `code-md` |
| Inline code | `background.surface` background, `border.subtle` 1px border, `code-sm`, `space-1` horizontal padding, `text.primary` |
| Blockquote | 3px left border in `border.strong`, text in `text.secondary`, no italic (italics reduce legibility at body sizes) |
| Links | `text.link` default, `text.linkHover` on hover, underline on hover only (not by default, to reduce visual noise in text-heavy docs) |
| Images | `radius-md`, optional `border.subtle` 1px frame, caption below in `caption` type token + `text.tertiary` |
| Horizontal rules | 1px `border.subtle`, full width, `space-8` margin above/below |
| Footnotes | Reference marker: superscript `text.link`; footnote text: `caption` token + `text.tertiary` |
| Callouts / admonitions | Reuse the **Alert** component recipe exactly — Note→info, Tip→success, Warning→warning, Caution/Danger→danger |
| Keyboard keys (`<kbd>`) | `background.surface` bg, `border.default` 1px border, bottom-heavier border to imply a physical key, `code-sm`, `radius-sm` |
| Math blocks (KaTeX/MathJax) | Inherit `body-md` sizing for inline math; block math centered with `space-4` vertical margin, no background |
| Mermaid diagrams | Diagram canvas: `background.surface`; node fills pull from the 12-color chart palette in `01-color-system.md`; connector lines: `border.default` |
| Emoji | Native glyphs, sized to match surrounding line-height — no color token needed |
| Details/Summary | `<summary>` styled like an Accordion header; content styled like Accordion content |
| GitHub Flavored Markdown | Strikethrough → `text.disabled`; autolinks → `text.link`; tables → as above |

## Syntax highlighting

Real syntax themes work by **token type**, not by language — a `keyword` is colored the same whether it's Python's `def`, Rust's `fn`, or C#'s `void`. That's what makes one mapping apply consistently across every language in the list below, rather than needing 20 separate palettes.

| Token type | Dark value | Light value | Notes |
|---|---|---|---|
| Keyword (`if`, `return`, `class`, `import`) | Coral `danger-400` `#ff8591` | Coral `danger-600` `#cd3c55` | |
| String | Amber `warning-400` `#d0ab45` | Amber `warning-700` `#765b00` | |
| Number | Violet `primary-400` `#ca9ed0` | Violet `primary-600` `#916797` | |
| Comment | Graphite `graphite-500` `#929398` | Graphite `graphite-600` `#78787d` | italic |
| Class / Type | Teal `secondary-400` `#77c1a4` | Teal `secondary-700` `#296d56` | |
| Function / method name | Lime `success-400` `#a2bd4d` | Lime `success-700` `#556800` | |
| Constant (`true`, `null`, `ALL_CAPS`) | Tangerine `accent-400` `#f3945b` | Tangerine `accent-700` `#944503` | |
| Variable | `text.primary` | `text.primary` | plain identifiers stay neutral so colored tokens stand out |
| Property / attribute (`obj.prop`, JSX attr) | Sapphire `info-400` `#70b6f4` | Sapphire `info-700` `#226397` | |
| Operator (`+ - = =>`) | `text.secondary` | `text.secondary` | |
| Decorator / annotation (`@Component`, `#[derive]`) | Rose `rose-400` `#e394b3` | Rose `rose-700` `#884662` | italic |
| Punctuation (brackets, commas, semicolons) | `text.tertiary` | `text.tertiary` | deliberately faded |
| Error (squiggle + gutter) | `status.danger.solidBg` underline, `status.danger.subtleBg` line highlight | same mapping | |
| Warning (squiggle + gutter) | `status.warning.solidBg` underline, `status.warning.subtleBg` line highlight | same mapping | |
| Diff insertion | text: `success-300`/`success-700`, line bg: `status.success.subtleBg` | | |
| Diff deletion | text: `danger-300`/`danger-700`, line bg: `status.danger.subtleBg` | | |

Applies to: JavaScript, TypeScript, React (JSX/TSX), HTML, CSS/SCSS, Tailwind class strings, JSON, Markdown, YAML, Bash, PowerShell, Python, Java, C#, C++, SQL, Rust, Go, Dockerfile, Git, and diff/terminal output — the type-based mapping above is intentionally language-agnostic. Language-specific quirks (e.g., Python decorators, C# attributes, Rust macros, Go struct tags) all route to the **Decorator** row; SQL keywords and Bash builtins both route to **Keyword**.

## Terminal (ANSI-16)

Measured from a real Filter-Octagon export for the dark set; the light set is the same seven hues retuned for a white background.

| Slot | Dark | Light |
|---|---|---|
| Background | `#282a3a` | `#f9faff` |
| Foreground | `#eaf2f1` | `#2e2f33` |
| Black (0/8) | `#282a3a` | `#2e2f33` |
| Red (1/9) | `#ff657a` | `#cd3c55` |
| Green (2/10) | `#bad761` | `#6d8400` |
| Yellow (3/11) | `#ffd76d` | `#765b00` |
| Blue (4/12) | `#ff9b5e`\* | `#377eb9` |
| Magenta (5/13) | `#c39ac9` | `#916797` |
| Cyan (6/14) | `#9cd1bb` | `#296d56` |
| White (7/15) | `#eaf2f1` | `#c8c8ce` |
| Selection | `#3d404e` | `#dddee3` |
| Cursor | `#eaf2f1` | `#2e2f33` |

\* Filter Octagon's own ANSI-4 slot is a tangerine, not a true blue — that's a real quirk of the original theme, kept here for authenticity. If a terminal emulator or tool assumes ANSI-4 is blue-hued (some `ls` color configs do), swap in Sapphire `info-500` `#509ad9` instead.
