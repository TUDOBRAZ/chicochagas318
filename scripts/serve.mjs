import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
const root = resolve('dist')
const mime = { '.html': 'text/html; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' }
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    const retired = /^\/produto\/[^/]*mini[-_ ]?moto[^/]*\/?$/i.test(pathname) || /^\/produto\/[123]\/?$/.test(pathname)
    if (retired) { res.writeHead(410, { 'Content-Type': mime['.html'], 'X-Robots-Tag': 'noindex, follow' }); res.end(await readFile(resolve(root, '404.html'))); return }
    if (pathname !== '/' && pathname.endsWith('/')) { res.writeHead(301, { Location: pathname.slice(0, -1) }); res.end(); return }
    let file = resolve(root, '.' + pathname)
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path')
    const info = await stat(file)
    if (info.isDirectory()) file = resolve(file, 'index.html')
    res.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' }); res.end(await readFile(file))
  } catch {
    res.writeHead(404, { 'Content-Type': mime['.html'], 'X-Robots-Tag': 'noindex, follow' }); res.end(await readFile(resolve(root, '404.html')))
  }
}).listen(Number(process.env.PORT ?? 4173), '0.0.0.0', () => console.log('Tudo Braz em http://localhost:' + (process.env.PORT ?? 4173)))
