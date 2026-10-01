export function Categorias() {
  return `
    <section class="categorias">

      <button
        class="categoria-ativa"
        data-categoria="todos"
        type="button"
      >
        ⭐
        <span>Todos</span>
      </button>

      <button
        data-categoria="casa"
        type="button"
      >
        🏠
        <span>Casa</span>
      </button>

      <button
        data-categoria="cozinha"
        type="button"
      >
        🍳
        <span>Cozinha</span>
      </button>

    </section>
  `
}