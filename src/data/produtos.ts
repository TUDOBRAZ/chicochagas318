import catalogo from './catalogo.json'

export type Produto = {
  id: number
  slug: string
  nome: string
  categoria: string
  imagem: string
  imagens: string[]
  emoji: string
  preco: string
  valor: number
  antigo: string
  desconto: string
  avaliacao: string
  descricao: string
  selo: string
  avaliacoes: string
  parcelamento: string
  linkShopee: string
}

export const produtos: Produto[] = catalogo
