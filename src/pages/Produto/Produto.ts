import type { Produto } from '../../data/produtos'

export function PaginaProduto(produto: Produto) {
  return `
    <main class="pagina-produto">
      <nav class="navegacao-produto" aria-label="Navegação">
        <button
          id="voltar-inicio"
          class="btn-voltar-inicio"
          type="button"
        >
          ← Voltar para a loja
        </button>

        <span>
          Início / ${produto.categoria} / ${produto.nome}
        </span>
      </nav>

      <section class="detalhes-produto">
        <div class="galeria-produto">
          <div class="imagem-principal-produto">
            <span class="desconto-pagina">
              ${produto.desconto}
            </span>

            <img
              id="imagem-principal"
              src="${produto.imagem}"
              alt="${produto.nome}"
            />
          </div>

          <div class="miniaturas-produto">
            <button
              class="miniatura-produto miniatura-ativa"
              type="button"
              data-imagem="${produto.imagem}"
              aria-label="Visualizar imagem de ${produto.nome}"
            >
              <img
                src="${produto.imagem}"
                alt="${produto.nome}"
              />
            </button>
          </div>
        </div>

        <div class="informacoes-produto">
          <span class="selo-pagina-produto">
            ${produto.selo}
          </span>

          <h1>
            ${produto.emoji} ${produto.nome}
          </h1>

          <div class="avaliacao-pagina-produto">
            <span>${produto.avaliacao}</span>
            <small>${produto.avaliacoes}</small>
          </div>

          <p class="descricao-pagina-produto">
            ${produto.descricao}
          </p>

          <div class="preco-pagina-produto">
            <small>De ${produto.antigo}</small>
            <strong>${produto.preco}</strong>
            <span>${produto.desconto}</span>
          </div>

          <p class="parcelamento-pagina-produto">
            ${produto.parcelamento}
          </p>

          <div class="vantagens-pagina-produto">
            <div>
              <span>🚚</span>
              <p>
                <strong>Entrega para todo o Brasil</strong>
                Consulte prazo e valor na loja parceira.
              </p>
            </div>

            <div>
              <span>🔒</span>
              <p>
                <strong>Compra protegida</strong>
                Pagamento processado pela Shopee.
              </p>
            </div>

            <div>
              <span>⭐</span>
              <p>
                <strong>Produto selecionado</strong>
                Escolhido pela equipe TUDOBRAZ.
              </p>
            </div>
          </div>

          <div class="acoes-pagina-produto">
            <button
              id="adicionar-pagina-produto"
              class="btn-adicionar-pagina-produto"
              type="button"
              data-id="${produto.id}"
            >
              🛒 Adicionar ao carrinho
            </button>

            <a
              class="btn-comprar-pagina-produto"
              href="${produto.linkShopee}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar agora na Shopee
            </a>
          </div>
        </div>
      </section>

      <section class="conteudo-detalhado-produto">
        <div class="bloco-informacoes-produto">
          <h2>Descrição do produto</h2>

          <p>
            ${produto.descricao}
            Este produto foi selecionado para oferecer praticidade,
            qualidade e excelente custo-benefício para sua rotina.
          </p>
        </div>

        <div class="bloco-informacoes-produto">
          <h2>Características principais</h2>

          <ul>
            <li>Produto selecionado pela TUDOBRAZ</li>
            <li>Compra realizada com segurança pela Shopee</li>
            <li>Condições especiais de pagamento</li>
            <li>Entrega disponível para diversas regiões do Brasil</li>
            <li>Suporte antes e depois da compra</li>
          </ul>
        </div>

        <div class="bloco-informacoes-produto">
          <h2>Informações importantes</h2>

          <p>
            O preço, a disponibilidade, o prazo de entrega e o valor
            do frete devem ser confirmados na página oficial do produto
            dentro da Shopee.
          </p>
        </div>
      </section>
    </main>
  `
}