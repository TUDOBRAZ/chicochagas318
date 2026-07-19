import patineteImagem from '../assets/imagens/patinete.png'
import chaleiraImagem from '../assets/imagens/chaleira.png'
import panelaImagem from '../assets/imagens/panela.png'

export type Produto = {
  id: number
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

export const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Patinete Infantil Premium',
    categoria: 'infantil',
    imagem: patineteImagem,
    imagens: [
      patineteImagem
    ],
    emoji: '🛴',
    preco: 'R$ 149,90',
    valor: 149.9,
    antigo: 'R$ 199,90',
    desconto: '25% OFF',
    avaliacao: '★★★★★',
    descricao:
      'Seguro, divertido e ideal para passeios infantis.',
    selo: 'Mais Vendido',
    avaliacoes: '128 avaliações',
    parcelamento: '💳 Em até 3x sem juros',
    linkShopee:
      'https://shopee.com.br/chicochagas318?originalCategoryId=11060116#product_list'
  },
  {
    id: 2,
    nome: 'Chaleira Inox 2,5L',
    categoria: 'cozinha',
    imagem: chaleiraImagem,
    imagens: [
      chaleiraImagem
    ],
    emoji: '☕',
    preco: 'R$ 79,90',
    valor: 79.9,
    antigo: 'R$ 119,90',
    desconto: '33% OFF',
    avaliacao: '★★★★★',
    descricao:
      'Elegância, resistência e praticidade para sua cozinha.',
    selo: 'Oferta Especial',
    avaliacoes: '94 avaliações',
    parcelamento: '💳 Em até 3x sem juros',
    linkShopee:
      'https://shopee.com.br/chicochagas318?originalCategoryId=11060116#product_list'
  },
  {
    id: 3,
    nome: 'Panela de Pressão',
    categoria: 'cozinha',
    imagem: panelaImagem,
    imagens: [
      panelaImagem
    ],
    emoji: '🍲',
    preco: 'R$ 129,90',
    valor: 129.9,
    antigo: 'R$ 179,90',
    desconto: '28% OFF',
    avaliacao: '★★★★★',
    descricao:
      'Mais rapidez, economia e segurança no preparo das refeições.',
    selo: 'Frete Grátis',
    avaliacoes: '156 avaliações',
    parcelamento: '💳 Em até 3x sem juros',
    linkShopee:
      'https://shopee.com.br/chicochagas318?originalCategoryId=11060116#product_list'
  }
]