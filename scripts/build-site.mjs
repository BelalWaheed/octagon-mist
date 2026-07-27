import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('Building site resources...');
mkdirSync('site/css', { recursive: true });
copyFileSync('css/tokens.css', 'site/css/tokens.css');
console.log('Wrote: site/css/tokens.css');
