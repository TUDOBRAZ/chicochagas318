import { App } from './App'
import { Header } from './components/Header'
import { Carrinho } from './components/Carrinho'
import { Detalhes } from './pages/Produto/Detalhes'
import { produtos } from './data/produtos'
import { metadados, origem } from './seo'
export { produtos }
export function renderPage(slug?: string) {
  const produto = produtos.find(item => item.slug === slug)
  if (slug && !produto) throw new Error(`Produto desconhecido: ${slug}`)
  const meta = metadados(produto)
  const body = produto ? `${Header()}<main>${Detalhes(produto)}</main><footer>Tudo Braz</footer>${Carrinho()}` : App()
  const structured = produto ? {
    '@context': 'https://schema.org', '@type': 'WebPage', name: produto.nome,
    url: meta.canonical, description: produto.descricao, image: produto.imagens,
    potentialAction: { '@type': 'ViewAction', target: produto.linkShopee }
  } : {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Produtos da Tudo Braz',
    itemListElement: produtos.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.nome, url: `${origem}/produto/${p.slug}` }))
  }
  return { body, meta, structured }
}
