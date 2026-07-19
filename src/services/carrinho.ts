import type { Produto } from '../data/produtos'

export type ItemCarrinho = {
  produto: Produto
  quantidade: number
}

let itensCarrinho: ItemCarrinho[] = []

export function obterItensCarrinho() {
  return itensCarrinho
}

export function adicionarAoCarrinho(produto: Produto) {
  const itemExistente = itensCarrinho.find(
    item => item.produto.id === produto.id
  )

  if (itemExistente) {
    itemExistente.quantidade++
  } else {
    itensCarrinho.push({
      produto,
      quantidade: 1
    })
  }
}

export function aumentarQuantidade(produtoId: number) {
  const item = itensCarrinho.find(
    itemCarrinho => itemCarrinho.produto.id === produtoId
  )

  if (item) {
    item.quantidade++
  }
}

export function diminuirQuantidade(produtoId: number) {
  const item = itensCarrinho.find(
    itemCarrinho => itemCarrinho.produto.id === produtoId
  )

  if (!item) {
    return
  }

  if (item.quantidade > 1) {
    item.quantidade--
  } else {
    removerDoCarrinho(produtoId)
  }
}

export function removerDoCarrinho(produtoId: number) {
  itensCarrinho = itensCarrinho.filter(
    item => item.produto.id !== produtoId
  )
}

export function calcularQuantidadeTotal() {
  return itensCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  )
}

export function calcularValorTotal() {
  return itensCarrinho.reduce(
    (total, item) =>
      total + item.produto.valor * item.quantidade,
    0
  )
}

export function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function limparCarrinho() {
  itensCarrinho = []
}