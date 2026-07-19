import { produtos } from '../data/produtos'
import { Detalhes } from '../pages/Produto/Detalhes'

import {
  atualizarVisualCarrinho
} from '../components/Carrinho'

import {
  adicionarAoCarrinho
} from '../services/carrinho'

export function navegar(url: string) {
  window.history.pushState({}, '', url)
  carregarPagina()
}

export function carregarPagina() {
  const caminho = window.location.pathname

  if (caminho.startsWith('/produto/')) {
    carregarPaginaDoProduto(caminho)
  }
}

function carregarPaginaDoProduto(caminho: string) {
  const partes = caminho.split('/')
  const produtoId = Number(partes[2])

  const produto = produtos.find(
    item => item.id === produtoId
  )

  const conteudoPrincipal =
    document.querySelector<HTMLElement>('main')

  if (!produto || !conteudoPrincipal) {
    window.history.replaceState({}, '', '/')
    window.location.reload()
    return
  }

  conteudoPrincipal.innerHTML = Detalhes(produto)

  iniciarEventosDaPaginaDoProduto(produto.id)

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function iniciarEventosDaPaginaDoProduto(
  produtoId: number
) {
  const botaoVoltar =
    document.querySelector<HTMLButtonElement>(
      '#voltar-loja'
    )

  const botaoAdicionar =
    document.querySelector<HTMLButtonElement>(
      '#adicionar-detalhes'
    )

  const imagemPrincipal =
    document.querySelector<HTMLImageElement>(
      '#imagem-principal-produto'
    )

  const miniaturas =
    document.querySelectorAll<HTMLButtonElement>(
      '.miniatura'
    )

  botaoVoltar?.addEventListener('click', () => {
    window.history.pushState({}, '', '/')
    window.location.reload()
  })

  botaoAdicionar?.addEventListener('click', () => {
    const produto = produtos.find(
      item => item.id === produtoId
    )

    if (!produto) {
      return
    }

    adicionarAoCarrinho(produto)
    atualizarVisualCarrinho()

    botaoAdicionar.textContent =
      '✅ Produto adicionado'

    botaoAdicionar.disabled = true

    setTimeout(() => {
      botaoAdicionar.textContent =
        '🛒 Adicionar ao carrinho'

      botaoAdicionar.disabled = false
    }, 1200)
  })

  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {
      const novaImagem =
        miniatura.dataset.imagem

      if (!novaImagem || !imagemPrincipal) {
        return
      }

      imagemPrincipal.src = novaImagem

      miniaturas.forEach(item => {
        item.classList.remove('miniatura-ativa')
      })

      miniatura.classList.add('miniatura-ativa')
    })
  })
}

window.addEventListener('popstate', () => {
  window.location.reload()
})