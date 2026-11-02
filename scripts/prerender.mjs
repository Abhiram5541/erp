// Post-build step: server-render the page markup and inject it into dist/index.html.
// No extra dependencies: uses Vite's own SSR build and React's renderToString.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist-ssr');

await build({ root, configFile: false, plugins: [react()], logLevel: 'warn', build: { ssr: 'src/entry-prerender.jsx', outDir: out, emptyOutDir: true, rollupOptions: { output: { format: 'esm', entryFileNames: 'entry.mjs' } } } });
const { render } = await import(pathToFileURL(path.join(out, 'entry.mjs')).href);

const file = path.join(root, 'dist/index.html');
const html = await readFile(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: #root marker not found in dist/index.html');
await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(out, { recursive: true, force: true });
console.log('prerender: injected static markup into dist/index.html');
