// Heç bir paket tələb etməyən sadə yerli server. İşə salmaq: npm run dev
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(req.url.split('?')[0]); } catch (e) { res.writeHead(400); return res.end('Bad request'); }

  const requested = p === '/' ? '/index.html' : p;
  const file = path.resolve(root, `.${requested}`);
  const rootDir = path.resolve(root);
  if (file !== rootDir && !file.startsWith(rootDir + path.sep)) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  const send = (f) => fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); return res.end('Tapılmadı'); }
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(data);
  });

  // /admin kimi qısa ünvanlar admin.html faylını açır (Vercel-də cleanUrls ilə eyni)
  if (!path.extname(file)) return fs.access(file + '.html', (e) => send(e ? file : file + '.html'));
  send(file);
}).listen(port, () => console.log('Qisaget işləyir: http://localhost:' + port));
