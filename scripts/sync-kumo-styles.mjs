import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
const require = createRequire(import.meta.url);
const postcss = require('postcss');
const packageRoot = dirname(require.resolve('@cloudflare/kumo/package.json'));
const stylesheet = postcss.parse(readFileSync(resolve(packageRoot, 'dist/styles/kumo-standalone.css'), 'utf8'));
stylesheet.walkAtRules('layer', rule => {
  rule.params = rule.params.replace(/\b(base|components|utilities|theme|properties)\b/g, 'kumo-$1');
});
mkdirSync('src/styles', { recursive: true });
writeFileSync('src/styles/kumo.css', `/* ${readFileSync(resolve(packageRoot, 'LICENSE'), 'utf8')} */\n${stylesheet}`);
