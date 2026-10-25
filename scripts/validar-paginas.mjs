import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const origin = 'https://tudobraz.com.br'
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? htmlFiles(join(dir, entry.name))
    : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []))).flat()
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.equal(new Set(urls).size, urls.length, 'Sitemap com URLs duplicadas')
const pages = new Map()
for (const file of await htmlFiles('dist')) {
  const html = await readFile(file, 'utf8')
  if (file.endsWith('404.html')) {
    assert.match(html, /noindex/, 'Página de erro precisa de noindex')
    continue
  }
  const route = '/' + relative('dist', file).replace(/index\.html$/, '').replace(/\/$/, '')
  pages.set(route, html)
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `${route}: precisa de um único h1`)
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: título ausente`)
  assert.match(html, /<meta name="description" content="[^"]+">/, `${route}: descrição ausente`)
  assert.match(html, /<meta name="robots" content="index, follow">/, `${route}: robots incorreto`)
  const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)]
  assert.equal(canonical.length, 1, `${route}: canonical ausente ou duplicada`)
  assert.equal(canonical[0][1], origin + (route === '/' ? '' : route), `${route}: canonical incorreta`)
  const json = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  assert.ok(json.length, `${route}: dados estruturados ausentes`)
  for (const match of json) JSON.parse(match[1])
}
assert.deepEqual(new Set(urls), new Set([...pages.keys()].map(route => origin + (route === '/' ? '' : route))), 'Sitemap deve conter todas e somente as páginas indexáveis')
for (const [route, html] of pages) {
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), origin + route)
    if (url.origin !== origin) continue
    assert.ok(pages.has(url.pathname.replace(/\/$/, '') || '/'), `${route}: link interno sem página: ${href}`)
  }
}
console.log(`Validadas ${pages.size} páginas: sitemap, links internos, títulos, canonical e dados estruturados.`)
