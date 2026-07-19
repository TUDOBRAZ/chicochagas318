import type { Produto } from '../data/produtos'

export function ProdutoCard(produto: Produto) {
  return `
    <article class="card">

      <div class="topo-card">
        <span class="desconto">
          ${produto.desconto}
        </span>

        <span class="tag-produto">
          ${produto.selo}
        </span>
      </div>

      <figure class="imagem-produto">
        <img
          class="foto-produto"
          src="${produto.imagem}"
          alt="${produto.nome}"
          loading="lazy"
        />
      </figure>

      <div class="conteudo-card">

        <div class="avaliacao">
          <span>${produto.avaliacao}</span>
          <small>${produto.avaliacoes}</small>
        </div>

        <h3>
          <span class="emoji">${produto.emoji}</span>
          ${produto.nome}
        </h3>

        <p class="descricao">
          ${produto.descricao}
        </p>

        <div class="precos">
          <strong class="preco-atual">
            ${produto.preco}
          </strong>

          <small class="preco-antigo">
            ${produto.antigo}
          </small>
        </div>

        <div class="parcelamento">
          ${produto.parcelamento}
        </div>

        <div class="acoes-card">

          <button
            class="btn-comprar"
            data-index="${produto.id}"
            type="button"
          >
            🛒 Adicionar ao carrinho
          </button>

          <button
            class="btn-detalhes"
            data-produto="${produto.id}"
            type="button"
          >
            👁️ Ver detalhes
          </button>

          <a
            class="btn-shopee"
            href="${produto.linkShopee}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Comprar na Shopee
          </a>

        </div>

      </div>

    </article>
  `
}
