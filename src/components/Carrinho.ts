import {
  obterItensCarrinho,
  calcularValorTotal,
  formatarMoeda
} from '../services/carrinho'

export function Carrinho() {
  return `
    <div
      id="fundo-carrinho"
      class="fundo-carrinho"
      aria-hidden="true"
    ></div>

    <aside
      id="painel-carrinho"
      class="painel-carrinho"
      aria-label="Carrinho de compras"
    >
      <div class="cabecalho-carrinho">
        <div>
          <span class="titulo-menor">Sua seleção</span>
          <h2>🛒 Meu Carrinho</h2>
        </div>

        <button
          id="fechar-carrinho"
          class="fechar-carrinho"
          type="button"
          aria-label="Fechar carrinho"
        >
          ✕
        </button>
      </div>

      <div
        id="lista-carrinho"
        class="lista-carrinho"
        aria-live="polite"
      >
        ${mensagemCarrinhoVazio()}
      </div>

      <div class="rodape-carrinho">
        <div class="resumo-carrinho">
          <span>Subtotal</span>
          <strong id="valor-total">R$ 0,00</strong>
        </div>

        <p class="aviso-carrinho">
          O preço final e o frete serão confirmados na loja parceira.
        </p>

        <button
          id="finalizar-compra"
          class="btn-finalizar"
          type="button"
        >
          Finalizar compra
        </button>

        <button
          id="continuar-comprando"
          class="btn-continuar"
          type="button"
        >
          Continuar comprando
        </button>
      </div>
    </aside>
  `
}

export function atualizarVisualCarrinho() {
  const listaCarrinho =
    document.querySelector<HTMLElement>('#lista-carrinho')

  const valorTotal =
    document.querySelector<HTMLElement>('#valor-total')

  if (!listaCarrinho || !valorTotal) {
    return
  }

  const itens = obterItensCarrinho()

  if (itens.length === 0) {
    listaCarrinho.innerHTML = mensagemCarrinhoVazio()
    valorTotal.textContent = formatarMoeda(0)
    return
  }

  listaCarrinho.innerHTML = itens
    .map(item => {
      const subtotalItem =
        item.produto.valor * item.quantidade

      return `
        <article class="item-carrinho">
          <img
            src="${item.produto.imagem}"
            alt="${item.produto.nome}"
            class="foto-item-carrinho"
          />

          <div class="dados-item-carrinho">
            <h3>${item.produto.nome}</h3>

            <div class="preco-item-carrinho">
              <strong>
                ${formatarMoeda(subtotalItem)}
              </strong>

              <small>
                ${item.produto.preco} por unidade
              </small>
            </div>

            <div class="controle-quantidade">
              <button
                class="diminuir-item"
                data-id="${item.produto.id}"
                type="button"
                aria-label="Diminuir quantidade de ${item.produto.nome}"
              >
                −
              </button>

              <span aria-label="Quantidade">
                ${item.quantidade}
              </span>

              <button
                class="aumentar-item"
                data-id="${item.produto.id}"
                type="button"
                aria-label="Aumentar quantidade de ${item.produto.nome}"
              >
                +
              </button>

              <button
                class="remover-item"
                data-id="${item.produto.id}"
                type="button"
              >
                Remover
              </button>
            </div>
          </div>
        </article>
      `
    })
    .join('')

  valorTotal.textContent =
    formatarMoeda(calcularValorTotal())
}

export function abrirCarrinho() {
  const painel =
    document.querySelector<HTMLElement>('#painel-carrinho')

  const fundo =
    document.querySelector<HTMLElement>('#fundo-carrinho')

  painel?.classList.add('painel-carrinho-aberto')
  fundo?.classList.add('fundo-carrinho-aberto')

  painel?.setAttribute('aria-hidden', 'false')
  fundo?.setAttribute('aria-hidden', 'false')

  document.body.classList.add('carrinho-aberto')
}

export function fecharCarrinho() {
  const painel =
    document.querySelector<HTMLElement>('#painel-carrinho')

  const fundo =
    document.querySelector<HTMLElement>('#fundo-carrinho')

  painel?.classList.remove('painel-carrinho-aberto')
  fundo?.classList.remove('fundo-carrinho-aberto')

  painel?.setAttribute('aria-hidden', 'true')
  fundo?.setAttribute('aria-hidden', 'true')

  document.body.classList.remove('carrinho-aberto')
}

function mensagemCarrinhoVazio() {
  return `
    <div class="carrinho-vazio">
      <span>🛍️</span>
      <h3>Seu carrinho está vazio</h3>
      <p>Adicione produtos para vê-los aqui.</p>
    </div>
  `
}