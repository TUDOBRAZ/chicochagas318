import './style.css'
import './styles/produto.css'

import { App, iniciarLoja } from './App'
import { carregarPagina } from './router/Router'

const app = document.querySelector<HTMLElement>('#app')

if (!app) {
  throw new Error('Elemento #app não encontrado.')
}

app.innerHTML = App()

iniciarLoja()

carregarPagina()