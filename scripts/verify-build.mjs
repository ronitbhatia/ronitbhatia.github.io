import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const read = path => readFileSync(path, 'utf8');
const walk = dir => readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? walk(path) : [path]; });
const files = walk(root);
const documents = files.filter(path => path.endsWith('.html'));
assert(documents.length === 31, 'Missing static route documents');
for (const path of documents) {
  const html = read(path);
  assert(!html.includes('/src/main.tsx'), `Development entry in ${path}`);
  assert(/<title>[^<]+<\/title>/.test(html), `Missing title in ${path}`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `Missing description in ${path}`);
  assert(html.includes('rel="canonical"'), `Missing canonical in ${path}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)/g)) {
    assert(existsSync(join(root, match[1])), `Missing ${match[1]} in ${path}`);
  }
}
assert(!existsSync(join(root, 'desktop')), 'Removed desktop route must not be emitted');
assert(!files.some(file => /\/Index-[^/]+\.js$/.test(file)), 'Legacy desktop bundle must not be emitted');
assert(read(join(root, 'studio/lab/iphone-air-monocoque/index.html')).includes('<title>Monocoque |'), 'Detail page metadata is not specific');
assert(read(join(root, 'studio/index.html')).includes('rel="canonical" href="https://ronitbhatia.github.io/"'), 'Studio alias should canonicalize to home');
assert(read(join(root, 'studio/search/index.html')).includes('noindex,follow'), 'Search should not be indexed');
assert(read(join(root, '404.html')).includes('noindex,follow'), '404 should not be indexed');
for (const match of read(join(root, 'sitemap.xml')).matchAll(/<loc>https:\/\/ronitbhatia.github.io([^<]*)<\/loc>/g)) {
  assert(existsSync(join(root, match[1], 'index.html')), `Missing sitemap destination ${match[1]}`);
}
for (const source of ['src/data/productLabCases.ts', 'src/data/resumePreview.json']) {
  for (const match of read(source).matchAll(/["'](\/(?:product-lab|resume-preview)\/[^"']+)["']/g)) assert(existsSync(join(root, match[1])), `Missing content asset ${match[1]}`);
}
for (const asset of ['resume.pdf', 'new-pic.png', 'pixel-ronit/poses.png', 'favicon.svg', '.nojekyll']) assert(existsSync(join(root, asset)), `Missing ${asset}`);
const oversized = files.filter(file => file.endsWith('.js') && statSync(file).size > 500_000);
assert.deepEqual(oversized, [], 'JavaScript chunks exceed the 500 kB budget');
console.log(`Production checks passed: ${documents.length} route documents, sitemap destinations, metadata, local assets, and JavaScript chunk budget.`);
