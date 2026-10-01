# Tudo Braz

Vitrine com os 12 produtos presentes em tudobraz.com.br em 30/09/2026 e links individuais para a Shopee. Catálogo: `src/data/catalogo.json`.

```sh
npm ci
npm run build
npm start
```

O build gera HTML completo, metadados próprios, canonical, sitemap e robots.txt. O servidor serve as páginas reais, responde 404 para endereços desconhecidos e 410 para a minimoto desativada e os três produtos numéricos antigos. Não redireciona produtos removidos para itens diferentes. Preços são uma referência do site na data acima; preço final, disponibilidade e frete devem ser confirmados na Shopee. Atualize o catálogo antes de publicar.

O domínio publicado atualmente utiliza outra origem de hospedagem; um commit neste GitHub não comprova publicação no domínio. Se a pasta `dist` for usada em outro servidor, configure os mesmos status 404/410 e HTTPS permanente na hospedagem. Não configure fallback global para index.html.

A minimoto não pertence ao catálogo e não deve ser reinserida enquanto estiver desativada na Shopee. Uma URL removida responder 404/410 é esperado; retirar do sitemap não apaga imediatamente o histórico no Search Console.
