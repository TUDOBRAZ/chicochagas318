import { produtos, type Produto } from './data/produtos'

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Categorias } from './components/Categorias'
import { ProdutoCard } from './components/ProdutoCard'

import {
  Carrinho,
  abrirCarrinho,
  fecharCarrinho,
  atualizarVisualCarrinho
} from './components/Carrinho'

import {
  adicionarAoCarrinho,
  aumentarQuantidade,
  diminuirQuantidade,
  removerDoCarrinho,
  calcularQuantidadeTotal,
  obterItensCarrinho
} from './services/carrinho'

import { navegar } from './router/Router'

let textoDaBusca = ''
let categoriaSelecionada = 'todos'

export function App() {
  return `
    ${Header()}

    <main>
      ${Hero()}

      <section class="beneficios">
        <div>🚚 Ofertas especiais</div>
        <div>🔒 Compra segura</div>
        <div>💳 Parcelamento facilitado</div>
        <div>⭐ Produtos selecionados</div>
      </section>

      <section class="titulo-secao">
        <span>🔥 Promoções selecionadas</span>
        <h2>Ofertas em destaque</h2>
        <p>Tudo o que você precisa, em um só lugar.</p>
      </section>

      ${Categorias()}

      <section
        id="produtos"
        class="produtos"
        aria-live="polite"
      ></section>
    </main>

    <footer>
      <strong>🛍️ TUDOBRAZ © 2026</strong>
      <p>Tudo o que você precisa, em um só lugar.</p>
    </footer>

    ${Carrinho()}
  `
}

export function iniciarLoja() {
  mostrarProdutos(produtos)
  iniciarBusca()
  iniciarCategorias()
  iniciarEventosDosProdutos()
  iniciarEventosDoCarrinho()
  atualizarContadorCarrinho()
  atualizarVisualCarrinho()
}

function mostrarProdutos(lista: Produto[]) {
  const areaProdutos =
    document.querySelector<HTMLElement>('#produtos')

  if (!areaProdutos) {
    return
  }

  if (lista.length === 0) {
    areaProdutos.innerHTML = `
      <div class="sem-resultados">
        <h3>Nenhum produto encontrado</h3>
        <p>
          Tente buscar outro produto ou selecionar outra categoria.
        </p>
      </div>
    `
    return
  }

  areaProdutos.innerHTML = lista
    .map(produto => ProdutoCard(produto))
    .join('')
}

function filtrarProdutos() {
  const listaFiltrada = produtos.filter(produto => {
    const correspondeCategoria =
      categoriaSelecionada === 'todos' ||
      produto.categoria === categoriaSelecionada

    const conteudoDoProduto = `
      ${produto.nome}
      ${produto.descricao}
      ${produto.categoria}
      ${produto.selo}
    `
      .toLowerCase()
      .trim()

    const correspondeBusca =
      textoDaBusca === '' ||
      conteudoDoProduto.includes(textoDaBusca)

    return correspondeCategoria && correspondeBusca
  })

  mostrarProdutos(listaFiltrada)
}

function iniciarBusca() {
  const campoBusca =
    document.querySelector<HTMLInputElement>('#busca')

  if (!campoBusca) {
    return
  }

  campoBusca.addEventListener('input', evento => {
    textoDaBusca = (evento.target as HTMLInputElement)
      .value
      .toLowerCase()
      .trim()

    filtrarProdutos()
  })
}

function iniciarCategorias() {
  const botoes =
    document.querySelectorAll<HTMLButtonElement>(
      '.categorias button'
    )

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      categoriaSelecionada =
        botao.dataset.categoria ?? 'todos'

      botoes.forEach(item => {
        item.classList.remove('categoria-ativa')
      })

      botao.classList.add('categoria-ativa')

      filtrarProdutos()
    })
  })
}

function iniciarEventosDosProdutos() {
  const areaProdutos =
    document.querySelector<HTMLElement>('#produtos')

  if (!areaProdutos) {
    return
  }

  areaProdutos.addEventListener('click', evento => {
    const elemento = evento.target as HTMLElement

    const botaoAdicionar =
      elemento.closest<HTMLButtonElement>('.btn-comprar')

    const botaoDetalhes =
      elemento.closest<HTMLButtonElement>('.btn-detalhes')

    if (botaoDetalhes) {
      const produtoId = Number(
        botaoDetalhes.dataset.produto
      )

      if (!produtoId) {
        return
      }

      navegar(`/produto/${produtoId}`)
      return
    }

    if (!botaoAdicionar) {
      return
    }

    const produtoId = Number(
      botaoAdicionar.dataset.index
    )

    const produto = produtos.find(
      item => item.id === produtoId
    )

    if (!produto) {
      return
    }

    adicionarAoCarrinho(produto)
    atualizarContadorCarrinho()
    atualizarVisualCarrinho()

    const textoOriginal =
      botaoAdicionar.textContent ??
      '🛒 Adicionar ao carrinho'

    botaoAdicionar.textContent = '✅ Produto adicionado'
    botaoAdicionar.disabled = true

    setTimeout(() => {
      botaoAdicionar.textContent = textoOriginal
      botaoAdicionar.disabled = false
    }, 1200)
  })
}

function iniciarEventosDoCarrinho() {
  const botaoCarrinho =
    document.querySelector<HTMLButtonElement>('#carrinho')

  const botaoFechar =
    document.querySelector<HTMLButtonElement>(
      '#fechar-carrinho'
    )

  const fundoCarrinho =
    document.querySelector<HTMLElement>('#fundo-carrinho')

  const botaoContinuar =
    document.querySelector<HTMLButtonElement>(
      '#continuar-comprando'
    )

  const botaoFinalizar =
    document.querySelector<HTMLButtonElement>(
      '#finalizar-compra'
    )

  const listaCarrinho =
    document.querySelector<HTMLElement>('#lista-carrinho')

  botaoCarrinho?.addEventListener('click', () => {
    atualizarVisualCarrinho()
    abrirCarrinho()
  })

  botaoFechar?.addEventListener('click', fecharCarrinho)
  fundoCarrinho?.addEventListener('click', fecharCarrinho)
  botaoContinuar?.addEventListener('click', fecharCarrinho)

  listaCarrinho?.addEventListener('click', evento => {
    const elemento = evento.target as HTMLElement

    const botaoAumentar =
      elemento.closest<HTMLButtonElement>('.aumentar-item')

    const botaoDiminuir =
      elemento.closest<HTMLButtonElement>('.diminuir-item')

    const botaoRemover =
      elemento.closest<HTMLButtonElement>('.remover-item')

    if (botaoAumentar) {
      const produtoId = Number(botaoAumentar.dataset.id)
      aumentarQuantidade(produtoId)
    }

    if (botaoDiminuir) {
      const produtoId = Number(botaoDiminuir.dataset.id)
      diminuirQuantidade(produtoId)
    }

    if (botaoRemover) {
      const produtoId = Number(botaoRemover.dataset.id)
      removerDoCarrinho(produtoId)
    }

    atualizarVisualCarrinho()
    atualizarContadorCarrinho()
  })

  botaoFinalizar?.addEventListener('click', () => {
    const itens = obterItensCarrinho()

    if (itens.length === 0) {
      alert('Seu carrinho está vazio.')
      return
    }

    window.open(
      'https://shopee.com.br/chicochagas318?originalCategoryId=11060116#product_list',
      '_blank',
      'noopener,noreferrer'
    )
  })

  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') {
      fecharCarrinho()
    }
  })
}

function atualizarContadorCarrinho() {
  const botaoCarrinho =
    document.querySelector<HTMLButtonElement>('#carrinho')

  if (!botaoCarrinho) {
    return
  }

  const quantidade = calcularQuantidadeTotal()

  botaoCarrinho.textContent = `🛒 Carrinho: ${quantidade}`
}
