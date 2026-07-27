import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const tokensCss = readFileSync('css/tokens.css', 'utf8');

const galleryCss = `
* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  font-family: var(--font-sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  background: var(--background-canvas);
  color: var(--text-primary);
  transition: background 180ms ease, color 180ms ease;
}
:root { --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }

.shell { max-width: 1180px; margin: 0 auto; padding: var(--space-8) var(--space-6) var(--space-24); }
.topbar {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background: var(--background-nav);
  border-bottom: 1px solid var(--border-subtle);
}
.topbar h1 { font-size: 16px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
.topbar .sub { color: var(--text-tertiary); font-size: 12px; margin-top: 2px; }
.toggle {
  display: inline-flex; align-items: center; gap: var(--space-2);
  background: var(--background-surface); border: 1px solid var(--border-default);
  border-radius: var(--radius-full); padding: 4px; cursor: pointer; user-select: none;
}
.toggle button {
  border: none; background: transparent; font: inherit; font-size: 13px; font-weight: 500;
  padding: 6px 14px; border-radius: var(--radius-full); cursor: pointer; color: var(--text-secondary);
  transition: background 120ms ease, color 120ms ease;
}
.toggle button.active { background: var(--interaction-selection-bg); color: var(--text-primary); }

section.block { margin-top: var(--space-16); }
section.block h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 var(--space-1); }
section.block p.desc { color: var(--text-secondary); font-size: 14px; margin: 0 0 var(--space-6); max-width: 640px; }

.swatch-row { display: grid; grid-template-columns: repeat(11, 1fr); gap: 6px; }
.swatch { border-radius: var(--radius-sm); aspect-ratio: 1; display: flex; align-items: flex-end; padding: 4px; font-size: 9px; font-family: var(--font-mono); border: 1px solid var(--border-subtle); }
.ramp-label { font-size: 12px; font-weight: 600; margin: var(--space-4) 0 var(--space-2); color: var(--text-secondary); }

.grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-4); }
.card { background: var(--background-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); box-shadow: var(--shadow-xs); }
.card h3 { font-size: 14px; margin: 0 0 var(--space-1); }
.card p { font-size: 13px; color: var(--text-secondary); margin: 0; }

.btn-row, .badge-row, .input-row, .alert-stack { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }
.btn { font: inherit; font-size: 13px; font-weight: 500; border-radius: var(--radius-sm); padding: 9px 16px; cursor: pointer; border: 1px solid transparent; transition: background 120ms ease, filter 120ms ease; }
.btn:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
.btn-primary { background: var(--status-info-solid-bg); color: var(--status-info-solid-fg); }
.btn-primary:hover { filter: brightness(1.08); }
.btn-secondary { background: var(--background-surface); color: var(--text-primary); border-color: var(--border-default); }
.btn-secondary:hover { background: var(--interaction-hover-overlay); }
.btn-ghost { background: transparent; color: var(--text-primary); }
.btn-ghost:hover { background: var(--interaction-hover-overlay); }
.btn-danger { background: var(--status-danger-solid-bg); color: var(--status-danger-solid-fg); }
.btn-danger:hover { filter: brightness(1.08); }
.btn[disabled] { background: var(--background-surface); color: var(--text-disabled); cursor: not-allowed; border-color: var(--border-subtle); }

.badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 3px 10px; border-radius: var(--radius-full); border: 1px solid transparent; }
.badge-success { background: var(--status-success-subtle-bg); color: var(--status-success-subtle-fg); border-color: var(--status-success-subtle-border); }
.badge-warning { background: var(--status-warning-subtle-bg); color: var(--status-warning-subtle-fg); border-color: var(--status-warning-subtle-border); }
.badge-danger { background: var(--status-danger-subtle-bg); color: var(--status-danger-subtle-fg); border-color: var(--status-danger-subtle-border); }
.badge-info { background: var(--status-info-subtle-bg); color: var(--status-info-subtle-fg); border-color: var(--status-info-subtle-border); }

.field { display: flex; flex-direction: column; gap: 6px; min-width: 200px; }
.field label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.field input { font: inherit; font-size: 14px; padding: 9px 12px; border-radius: var(--radius-sm); background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text); }
.field input::placeholder { color: var(--input-placeholder); }
.field input:hover { border-color: var(--input-border-hover); }
.field input:focus { outline: none; border-color: var(--input-border-focus); box-shadow: 0 0 0 3px color-mix(in srgb, var(--border-focus) 25%, transparent); }
.field input[disabled] { background: var(--input-disabled-bg); color: var(--input-disabled-text); }
.field .help { font-size: 12px; color: var(--text-tertiary); }
.field.error input { border-color: var(--status-danger-subtle-border); }
.field.error .help { color: var(--status-danger-subtle-fg); }

.alert { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border: 1px solid; font-size: 13px; }
.alert-success { background: var(--status-success-subtle-bg); border-color: var(--status-success-subtle-border); color: var(--status-success-subtle-fg); }
.alert-warning { background: var(--status-warning-subtle-bg); border-color: var(--status-warning-subtle-border); color: var(--status-warning-subtle-fg); }
.alert-danger { background: var(--status-danger-subtle-bg); border-color: var(--status-danger-subtle-border); color: var(--status-danger-subtle-fg); }
.alert-info { background: var(--status-info-subtle-bg); border-color: var(--status-info-subtle-border); color: var(--status-info-subtle-fg); }

.code-block { background: var(--background-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); font-family: var(--font-mono); font-size: 13px; line-height: 1.7; overflow-x: auto; }
.tok-kw { color: var(--color-danger-400); } .tok-str { color: var(--color-warning-400); } .tok-num { color: var(--color-primary-400); }
.tok-com { color: var(--color-graphite-500); font-style: italic; } .tok-fn { color: var(--color-success-400); }
.tok-cls { color: var(--color-secondary-400); } .tok-prop { color: var(--color-info-400); } .tok-punc { color: var(--text-tertiary); }
[data-theme="light"] .tok-kw { color: var(--color-danger-600); } [data-theme="light"] .tok-str { color: var(--color-warning-700); }
[data-theme="light"] .tok-num { color: var(--color-primary-600); } [data-theme="light"] .tok-com { color: var(--color-graphite-600); }
[data-theme="light"] .tok-fn { color: var(--color-success-700); } [data-theme="light"] .tok-cls { color: var(--color-secondary-700); }
[data-theme="light"] .tok-prop { color: var(--color-info-700); }

.chart-bars { display: flex; align-items: flex-end; gap: var(--space-2); height: 140px; padding: var(--space-4); background: var(--background-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.chart-bars .bar { flex: 1; border-radius: 4px 4px 0 0; }

.sidebar-demo { display: flex; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; height: 220px; }
.sidebar-demo nav { width: 180px; background: var(--background-sidebar); border-right: 1px solid var(--border-subtle); padding: var(--space-3); font-size: 13px; }
.sidebar-demo nav .item { padding: 8px 10px; border-radius: var(--radius-sm); color: var(--text-secondary); cursor: pointer; margin-bottom: 2px; }
.sidebar-demo nav .item:hover { background: var(--interaction-hover-overlay); }
.sidebar-demo nav .item.active { background: var(--interaction-selection-bg); color: var(--text-primary); border-left: 2px solid var(--color-primary-500); padding-left: 8px; }
.sidebar-demo main { flex: 1; background: var(--background-base); padding: var(--space-4); font-size: 13px; color: var(--text-secondary); }

.footer-note { margin-top: var(--space-24); padding-top: var(--space-6); border-top: 1px solid var(--border-subtle); color: var(--text-tertiary); font-size: 12px; }
`;

const body = `
<div class="topbar">
  <div>
    <h1>Design System Preview</h1>
    <div class="sub">Filter Octagon (dark) &middot; Minimal Mist (light)</div>
  </div>
  <div class="toggle" id="toggle">
    <button data-theme-btn="dark" class="active">Dark</button>
    <button data-theme-btn="light">Light</button>
  </div>
</div>

<div class="shell">

  <section class="block">
    <h2>Color ramps</h2>
    <p class="desc">Every ramp shares one lightness curve — only hue and peak chroma differ. Hover a swatch to see its hex.</p>
    <div id="ramps"></div>
  </section>

  <section class="block">
    <h2>Buttons</h2>
    <p class="desc">Primary, secondary, ghost, danger — default, hover (try it), disabled.</p>
    <div class="btn-row">
      <button class="btn btn-primary">Primary action</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-danger">Delete</button>
      <button class="btn btn-primary" disabled>Disabled</button>
    </div>
  </section>

  <section class="block">
    <h2>Badges &amp; status</h2>
    <div class="badge-row">
      <span class="badge badge-success">Success</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-danger">Danger</span>
      <span class="badge badge-info">Info</span>
    </div>
  </section>

  <section class="block">
    <h2>Form fields</h2>
    <div class="input-row">
      <div class="field">
        <label>Project name</label>
        <input type="text" placeholder="e.g. thistle-task-app">
        <span class="help">Lowercase, hyphen-separated.</span>
      </div>
      <div class="field error">
        <label>API key</label>
        <input type="text" value="sk-••••">
        <span class="help">This key has expired.</span>
      </div>
      <div class="field">
        <label>Disabled field</label>
        <input type="text" value="Locked" disabled>
      </div>
    </div>
  </section>

  <section class="block">
    <h2>Alerts</h2>
    <div class="alert-stack" style="flex-direction: column; align-items: stretch;">
      <div class="alert alert-info">Heads up — this preview regenerates from tokens.css, nothing here is hand-tuned.</div>
      <div class="alert alert-success">Build finished — 8 output formats generated.</div>
      <div class="alert alert-warning">One ramp step is near-AA — see the accessibility doc.</div>
      <div class="alert alert-danger">Contrast failed before tuning — since fixed, see docs/08.</div>
    </div>
  </section>

  <section class="block">
    <h2>Cards</h2>
    <div class="grid-cards">
      <div class="card"><h3>Elevation: xs</h3><p>Resting card state, the default for most surfaces.</p></div>
      <div class="card" style="box-shadow: var(--shadow-md);"><h3>Elevation: md</h3><p>Popover / dropdown level elevation.</p></div>
      <div class="card" style="box-shadow: var(--shadow-xl);"><h3>Elevation: xl</h3><p>Modal / dialog level elevation.</p></div>
    </div>
  </section>

  <section class="block">
    <h2>Syntax highlighting</h2>
    <p class="desc">Same token-type mapping, applied here to a TypeScript snippet.</p>
    <div class="code-block"><span class="tok-kw">export function</span> <span class="tok-fn">buildRamp</span><span class="tok-punc">(</span><span class="tok-prop">name</span><span class="tok-punc">:</span> <span class="tok-cls">string</span><span class="tok-punc">,</span> <span class="tok-prop">seed</span><span class="tok-punc">:</span> <span class="tok-cls">string</span><span class="tok-punc">) {</span>
  <span class="tok-com">// anchor the ramp to the seed's own OKLCH lightness</span>
  <span class="tok-kw">const</span> <span class="tok-prop">peak</span> <span class="tok-punc">=</span> <span class="tok-num">0.66</span><span class="tok-punc">;</span>
  <span class="tok-kw">return</span> <span class="tok-fn">clampChroma</span><span class="tok-punc">(</span><span class="tok-prop">seed</span><span class="tok-punc">,</span> <span class="tok-str">'oklch'</span><span class="tok-punc">);</span>
<span class="tok-punc">}</span></div>
  </section>

  <section class="block">
    <h2>Chart palette</h2>
    <div class="chart-bars">
      <div class="bar" style="height:60%;background:var(--color-primary-400)"></div>
      <div class="bar" style="height:85%;background:var(--color-secondary-400)"></div>
      <div class="bar" style="height:40%;background:var(--color-accent-400)"></div>
      <div class="bar" style="height:70%;background:var(--color-success-400)"></div>
      <div class="bar" style="height:55%;background:var(--color-warning-400)"></div>
      <div class="bar" style="height:30%;background:var(--color-danger-400)"></div>
      <div class="bar" style="height:65%;background:var(--color-info-400)"></div>
    </div>
  </section>

  <section class="block">
    <h2>Sidebar navigation</h2>
    <div class="sidebar-demo">
      <nav>
        <div class="item active">Dashboard</div>
        <div class="item">Projects</div>
        <div class="item">Team</div>
        <div class="item">Settings</div>
      </nav>
      <main>Main canvas uses <code>background.base</code>, distinct from the sidebar's <code>background.sidebar</code>.</main>
    </div>
  </section>

  <div class="footer-note">Toggle the theme above — every element on this page is reading the same CSS variables from <code>css/tokens.css</code>, nothing here has a second copy of the styles per theme.</div>
</div>
`;

const rampNames = ['graphite', 'primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info'];
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const P = JSON.parse(readFileSync('tokens/primitives.json', 'utf8'));

const script = `
const toggle = document.getElementById('toggle');
toggle.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-theme-btn]');
  if (!btn) return;
  const theme = btn.dataset.themeBtn;
  document.documentElement.setAttribute('data-theme', theme);
  toggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
});

const ramps = ${JSON.stringify(rampNames)};
const steps = ${JSON.stringify(steps)};
const P = ${JSON.stringify(Object.fromEntries(rampNames.map(n => [n, Object.fromEntries(steps.map(s => [s, P[n][s].hex]))])))};
const rampsEl = document.getElementById('ramps');
for (const name of ramps) {
  const label = document.createElement('div');
  label.className = 'ramp-label';
  label.textContent = name;
  rampsEl.appendChild(label);
  const row = document.createElement('div');
  row.className = 'swatch-row';
  for (const step of steps) {
    const hex = P[name][step];
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.style.background = hex;
    sw.style.color = step >= 500 ? '#fff' : '#000';
    sw.title = name + '-' + step + ' ' + hex;
    sw.textContent = step;
    row.appendChild(sw);
  }
  rampsEl.appendChild(row);
}
`;

const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Design System Preview — Filter Octagon / Minimal Mist</title>
<style>
${tokensCss}
${galleryCss}
</style>
</head>
<body>
${body}
<script>
${script}
</script>
</body>
</html>
`;

mkdirSync('preview', { recursive: true });
writeFileSync('preview/index.html', html);
console.log('Wrote preview/index.html (' + (html.length / 1024).toFixed(0) + ' KB)');
