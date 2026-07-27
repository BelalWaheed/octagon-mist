#!/usr/bin/env node

import { copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgRoot = resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'help';

const PKG = '@belal/octagon-mist';

console.log(`\n🎨 ${PKG} — Filter Octagon / Minimal Mist Design System\n`);

switch (command.toLowerCase()) {
  case 'init':
  case 'copy': {
    const targetDir = args[1] || './src/styles';
    const destCss = resolve(process.cwd(), targetDir, 'tokens.css');
    mkdirSync(dirname(destCss), { recursive: true });

    const srcCss = join(pkgRoot, 'css', 'tokens.css');
    copyFileSync(srcCss, destCss);
    console.log(`✅ Copied tokens.css -> ${targetDir}/tokens.css`);
    console.log(`
Import in your project:
  import "${targetDir}/tokens.css";

Toggle themes using:
  <html data-theme="dark">  or  <html data-theme="light">
`);
    break;
  }

  case 'info':
  case 'help':
  default: {
    console.log(`Usage:
  npx ${PKG} init [target-folder]   Copy tokens.css to your project (default: ./src/styles)
  npx ${PKG} info                   Display usage guide

Quick Import Examples:
  • CSS / Webpack / Vite:
      import "${PKG}/css";

  • HTML:
      <link rel="stylesheet" href="node_modules/${PKG}/css/tokens.css">

  • Tailwind v4 (@theme):
      @import "${PKG}/tailwind/v4";

  • Tailwind v3 (config):
      const theme = require('${PKG}/tailwind/v3');

  • SCSS:
      @import "${PKG}/scss";

  • JSON tokens (for custom pipelines):
      import primitives from '${PKG}/tokens/primitives';
      import semantic from '${PKG}/tokens/semantic';
`);
    break;
  }
}
