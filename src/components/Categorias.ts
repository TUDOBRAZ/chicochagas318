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
        data-categoria="infantil"
        type="button"
      >
        🛴
        <span>Infantil</span>
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