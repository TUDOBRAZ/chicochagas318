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
if (!featured) throw new Error('O guia precisa de um produto ativo no catálogo.')
function guidePage(path, title, description, content) {
  const page = renderPage()
  page.meta = { ...page.meta, title, description, canonical: `https://tudobraz.com.br/${path}`, image: featured.imagem }
  page.body = `<header class="topo"><a class="logo" href="/">Tudo Braz</a></header><nav class="navegacao-loja" aria-label="Navegação da loja"><a href="/">Produtos</a><a href="/guias">Guias de compra</a></nav><main class="guia-compra">${content}</main><footer>Tudo Braz</footer>`
  page.structured = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: page.meta.canonical, description }
  return page
}
const guide = guidePage(
  'guias/conjunto-panelas-9-pecas',
  'Como escolher um conjunto de panelas de 9 peças | Tudo Braz',
  'Veja o que conferir em um conjunto de panelas antiaderente de 9 peças: composição, tampas, compatibilidade com o fogão, cuidados e condições na Shopee.',
  `<p><a href="/guias">← Todos os guias</a></p>
  <h1>Como escolher um conjunto de panelas antiaderente de 9 peças</h1>
  <p>Antes de comprar, compare a composição do conjunto com as receitas e quantidades que você prepara no dia a dia. O número de peças sozinho não informa os tamanhos nem a capacidade das panelas.</p>
  <h2>O que conferir no anúncio</h2>
  <ul><li><strong>Composição:</strong> confira quais panelas, tampas e acessórios entram na contagem de nove peças.</li>
  <li><strong>Tamanhos:</strong> verifique diâmetros e capacidades para saber se atendem à sua rotina.</li>
  <li><strong>Fogão:</strong> confirme a compatibilidade na descrição do fabricante, principalmente se você usa indução.</li>
  <li><strong>Cuidados:</strong> consulte as instruções de limpeza e os utensílios indicados para preservar o revestimento antiaderente.</li></ul>
  <h2>Conheça o conjunto da vitrine</h2>
  <p>${esc(featured.descricao)}</p>
  <p><a href="/produto/${featured.slug}">Ver fotos e detalhes do ${esc(featured.nome)}</a></p>
  <h2>Antes de finalizar a compra</h2>
  <p>Confira o preço atualizado, o estoque, o frete para o seu CEP e o prazo de entrega na Shopee. A compra e o pagamento são realizados por lá.</p>
  <p><a href="${esc(featured.linkShopee)}" target="_blank" rel="noopener noreferrer">Conferir o anúncio na Shopee</a></p>`
)
await save('guias/conjunto-panelas-9-pecas', guide)
const guides = guidePage(
  'guias', 'Guias de compra para casa e cozinha | Tudo Braz',
  'Guias da Tudo Braz para comparar produtos de casa e cozinha e conferir os detalhes antes de comprar na Shopee.',
  `<h1>Guias de compra da Tudo Braz</h1><p>Confira o que observar antes de escolher produtos para sua casa e cozinha.</p><article><h2><a href="/guias/conjunto-panelas-9-pecas">Como escolher um conjunto de panelas de 9 peças</a></h2><p>Composição, tamanhos, compatibilidade com o fogão e cuidados com o revestimento antiaderente.</p></article><p><a href="/">Explorar os produtos da vitrine</a></p>`
)
await save('guias', guides)
const urls = ['https://tudobraz.com.br', ...produtos.map(p => `https://tudobraz.com.br/produto/${p.slug}`), guides.meta.canonical, guide.meta.canonical]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/404.html', '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Página indisponível | Tudo Braz</title></head><body><h1>Página indisponível</h1><p>Este produto não está mais na vitrine.</p><a href="/">Ver produtos da Tudo Braz</a></body></html>')
console.log(`Pré-renderizadas ${urls.length} páginas; sitemap sem produtos desativados.`)
