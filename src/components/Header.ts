export function Header() {
  return `
    <header class="topo">
      <a class="logo" href="#" aria-label="Página inicial da TUDOBRAZ">
        <span class="logo-icone">🛍️</span>

        <span class="logo-texto">
          <strong>TUDOBRAZ</strong>
          <small>Tudo o que você precisa</small>
        </span>
      </a>

      <div class="area-busca">
        <span class="icone-busca" aria-hidden="true">🔍</span>

        <input
          id="busca"
          class="busca"
          type="search"
          placeholder="Buscar produtos..."
          aria-label="Buscar produtos"
          autocomplete="off"
        />
      </div>

      <div class="acoes-topo">
        <button
          id="carrinho"
          class="carrinho"
          type="button"
          aria-label="Abrir carrinho"
        >
          🛒 Carrinho: 0
        </button>

        <a
          class="whats"
          href="https://wa.me/5575991934618"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a TUDOBRAZ pelo WhatsApp"
        >
          💬 WhatsApp
        </a>
      </div>
    </header>
  `
}