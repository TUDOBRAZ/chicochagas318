import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { renderPage, produtos } from '../dist-ssr/render.js'
const template = await readFile('dist/index.html', 'utf8')
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
async function save(path, page) {
  const head = `<title>${esc(page.meta.title)}</title><meta name="description" content="${esc(page.meta.description)}"><meta name="robots" content="${page.meta.robots}"><link rel="canonical" href="${page.meta.canonical}"><meta property="og:title" content="${esc(page.meta.title)}"><meta property="og:description" content="${esc(page.meta.description)}"><meta property="og:url" content="${page.meta.canonical}"><meta property="og:image" content="${page.meta.image}"><script type="application/ld+json">${JSON.stringify(page.structured).replaceAll('<', '\\u003c')}</script>`
  const html = template.replace(/<title>.*?<\/title>/s, '').replace(/<meta name="(?:description|robots)"[^>]*>/g, '').replace(/<link rel="canonical"[^>]*>/g, '').replace('</head>', head + '</head>').replace('<div id="app"></div>', `<div id="app">${page.body}</div>`)
  await mkdir(`dist/${path}`, { recursive: true })
  await writeFile(`dist/${path}/index.html`, html)
}
await save('', renderPage())
for (const p of produtos) await save(`produto/${p.slug}`, renderPage(p.slug))
const featured = produtos.find(p => p.slug === 'conjunto-panelas-antiaderente-9-pecas-azul')
const guide = renderPage()
guide.meta.title = 'Conjunto de Panelas Antiaderente 9 Peças na Shopee | Tudo Braz'
guide.meta.description = featured.descricao
guide.meta.canonical = 'https://tudobraz.com.br/guias/conjunto-panelas-9-pecas'
guide.body = `<header><a href="/">Tudo Braz</a></header><main class="pagina-produto"><h1>${featured.nome}</h1><p>${featured.descricao}</p><p>Confira fotos, preço, disponibilidade e frete no anúncio da Tudo Braz.</p><a href="/produto/${featured.slug}">Ver detalhes do conjunto</a><p><a href="${featured.linkShopee}" target="_blank" rel="noopener noreferrer">Comprar na Shopee</a></p></main>`
guide.structured = { '@context': 'https://schema.org', '@type': 'WebPage', name: guide.meta.title, url: guide.meta.canonical, description: guide.meta.description }
await save('guias/conjunto-panelas-9-pecas', guide)
const urls = ['https://tudobraz.com.br', ...produtos.map(p => `https://tudobraz.com.br/produto/${p.slug}`), guide.meta.canonical]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('public/sitemap.xml', sitemap)
await writeFile('dist/404.html', '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Página indisponível | Tudo Braz</title></head><body><h1>Página indisponível</h1><p>Este produto não está mais na vitrine.</p><a href="/">Ver produtos da Tudo Braz</a></body></html>')
console.log(`Pré-renderizadas ${urls.length} páginas; sitemap sem produtos desativados.`)
