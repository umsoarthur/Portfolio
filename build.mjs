// Build do portfólio: gera a pasta "dist" com o site pronto para publicar.
//   npm run build        -> gera dist/
//   npm run dev          -> gera dist/ e abre um servidor local em http://localhost:5173
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = [
  { name: 'home', entry: 'src/main-home.jsx', html: 'index.html' },
  { name: 'case-pier', entry: 'src/main-case-pier.jsx', html: 'projetos/evolucao-coberturas-seguro-auto/index.html' },
  { name: 'case-caju', entry: 'src/main-case-caju.jsx', html: 'projetos/melhorias-gestao-cartoes/index.html' },
  { name: 'home-en', entry: 'src/main-home-en.jsx', html: 'en/index.html' },
  { name: 'case-pier-en', entry: 'src/main-case-pier-en.jsx', html: 'en/projects/auto-insurance-coverage/index.html' },
];

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });

const result = await esbuild.build({
  entryPoints: Object.fromEntries(pages.map((p) => [p.name, p.entry])),
  bundle: true,
  minify: true,
  format: 'esm',
  splitting: true,
  outdir: 'dist/static',
  entryNames: '[name]-[hash]',
  chunkNames: 'chunk-[hash]',
  jsx: 'automatic',
  loader: { '.jsx': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  target: ['es2019'],
  metafile: true,
  logLevel: 'info',
});

// Liga cada página HTML aos arquivos gerados (JS e CSS com hash no nome).
for (const p of pages) {
  const outs = Object.entries(result.metafile.outputs).filter(([, o]) => o.entryPoint === p.entry);
  const js = outs.map(([f]) => f).find((f) => f.endsWith('.js'));
  const css = Object.keys(result.metafile.outputs).find((f) => f.endsWith('.css') && new RegExp(`/${p.name}-[A-Z0-9]+\\.css$`).test(f));
  let html = readFileSync(p.html, 'utf8');
  if (css) html = html.replace('</head>', `  <link rel="stylesheet" href="/${css.replace(/^dist\//, '')}">\n  </head>`);
  html = html.replace(/<script type="module" src="\/src\/[^"]+"><\/script>/, `<script type="module" src="/${js.replace(/^dist\//, '')}"></script>`);
  const out = join('dist', p.html);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}
console.log('\n✔ Site gerado em dist/');

if (process.argv.includes('--serve')) {
  // Servidor local simples para conferir o site antes de publicar.
  const http = await import('node:http');
  const { existsSync, statSync } = await import('node:fs');
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
  http.createServer((req, res) => {
    let file = join('dist', decodeURIComponent(req.url.split('?')[0]));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404); return res.end('Não encontrado'); }
    res.writeHead(200, { 'Content-Type': types[file.slice(file.lastIndexOf('.'))] || 'application/octet-stream' });
    res.end(readFileSync(file));
  }).listen(5173, () => console.log('Abra http://localhost:5173'));
}
