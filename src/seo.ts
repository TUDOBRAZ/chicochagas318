import type { Produto } from './data/produtos'
export const origem = 'https://tudobraz.com.br'
export function metadados(produto?: Produto | null, indisponivel = false) {
  return {
    title: indisponivel ? 'Produto indisponível | Tudo Braz' : produto ? `${produto.nome} na Shopee | Tudo Braz` : 'Tudo Braz | Loja Oficial na Shopee',
    description: produto?.descricao ?? 'Tudo Braz: panelas, lixeiras e utilidades para casa com links diretos para comprar na Shopee.',
    canonical: produto ? `${origem}/produto/${produto.slug}` : origem,
    robots: indisponivel ? 'noindex, follow' : 'index, follow',
    image: produto?.imagem ?? `${origem}/brand/tudo-braz-logo.png`
  }
}
export function aplicarMetadados(produto?: Produto | null, indisponivel = false) {
  const meta = metadados(produto, indisponivel)
  document.title = meta.title
  for (const name of ['description', 'robots'] as const) {
    let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    if (!element) { element = document.createElement('meta'); element.name = name; document.head.append(element) }
    element.content = meta[name]
  }
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', meta.canonical)
}
