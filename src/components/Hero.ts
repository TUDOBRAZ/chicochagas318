import heroImagem from '../assets/imagens/hero.png'

export function Hero() {
  return `
    <section class="hero">

      <div class="hero-texto">

        <span class="selo">
          🔥 Ofertas Inteligentes
        </span>

        <h1>
          Bem-vindo à <span>TUDOBRAZ</span>
        </h1>

        <p>
          Tudo o que você precisa, em um só lugar.
          Produtos selecionados com qualidade,
          preço justo e entrega para todo o Brasil.
        </p>

        <div class="hero-botoes">

          <a href="#produtos" class="btn-hero">
            🛒 Ver Ofertas
          </a>

          <a
            href="https://wa.me/5575991934618"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hero-secundario"
          >
            💬 Falar no WhatsApp
          </a>

        </div>

      </div>

      <div class="hero-imagem">

        <img
          src="${heroImagem}"
          alt="Banner principal da TUDOBRAZ"
        />

      </div>

    </section>
  `
}