import type { Produto } from '../../data/produtos'

export function Detalhes(produto: Produto) {
  const miniaturas = produto.imagens
    .map(
      (imagem, index) => `
        <button
          class="miniatura ${index === 0 ? 'miniatura-ativa' : ''}"
          type="button"
          data-imagem="${imagem}"
          aria-label="Visualizar imagem ${index + 1} de ${produto.nome}"
        >
          <img
            src="${imagem}"
            alt="${produto.nome} - imagem ${index + 1}"
          />
        </button>
      `
    )
    .join('')

  return `
    <section class="pagina-produto">

      <button
        id="voltar-loja"
        class="btn-voltar"
        type="button"
      >
        ← Voltar para a loja
      </button>

      <div class="produto-detalhes">

        <div class="galeria-produto">

          <div class="imagem-principal">
            <img
              id="imagem-principal-produto"
              src="${produto.imagem}"
              alt="${produto.nome}"
            />
          </div>

          <div class="miniaturas">
            ${miniaturas}
          </div>

        </div>

        <div class="info-produto">

          <span class="selo-detalhes">
            ${produto.selo}
          </span>

          <h1>
            ${produto.emoji} ${produto.nome}
          </h1>

          <div class="avaliacao-detalhes">
            <span>${produto.avaliacao}</span>
            <small>${produto.avaliacoes}</small>
          </div>

          <p class="descricao-detalhes">
            ${produto.descricao}
          </p>

          <div class="preco-detalhes">
            <strong>${produto.preco}</strong>
            <small>${produto.antigo}</small>
            <span>${produto.desconto}</span>
          </div>

          <div class="parcelamento-detalhes">
            ${produto.parcelamento}
          </div>

          <div class="vantagens-detalhes">

            <div>
              <strong>🚚 Entrega</strong>
              <span>
                Disponível para diversas regiões do Brasil.
              </span>
            </div>

            <div>
              <strong>🔒 Compra segura</strong>
              <span>
                Pagamento processado pela Shopee.
              </span>
            </div>

            <div>
              <strong>⭐ Seleção TUDOBRAZ</strong>
              <span>
                Produto escolhido por qualidade e custo-benefício.
              </span>
            </div>

          </div>

          <div class="acoes-detalhes">

            <button
              id="adicionar-detalhes"
              class="btn-comprar-grande"
              type="button"
              data-id="${produto.id}"
            >
              🛒 Adicionar ao carrinho
            </button>

            <a
              class="btn-shopee-grande"
              href="${produto.linkShopee}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar na Shopee
            </a>

          </div>

        </div>

      </div>

      <section class="descricao-completa">

        <h2>Descrição do produto</h2>

        <p>
          ${produto.descricao}
        </p>

        <p>
          Produto selecionado pela TUDOBRAZ para oferecer
          praticidade, qualidade e excelente custo-benefício.
        </p>

        <h2>Compra Inteligente</h2>

        <div class="compra-inteligente">

          <article>
            <strong>Para quem é ideal?</strong>
            <p>
              Para pessoas que procuram praticidade,
              bom acabamento e uma compra segura.
            </p>
          </article>

          <article>
            <strong>Quais problemas resolve?</strong>
            <p>
              Ajuda a tornar a rotina mais prática,
              rápida e organizada.
            </p>
          </article>

          <article>
            <strong>Vale a pena?</strong>
            <p>
              É uma boa opção para quem busca equilíbrio
              entre qualidade, utilidade e preço.
            </p>
          </article>

        </div>

        <h2>Informações importantes</h2>

        <ul>
          <li>Compra realizada com segurança pela Shopee.</li>
          <li>Preço e disponibilidade sujeitos à loja parceira.</li>
          <li>Prazo e frete confirmados na página oficial.</li>
          <li>As imagens podem apresentar pequenas variações de cor.</li>
        </ul>

      </section>

    </section>
  `
}