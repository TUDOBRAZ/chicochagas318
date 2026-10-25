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

## Guias e validação das páginas

O build gera `/guias` e o guia de panelas de 9 peças, com navegação por links HTML. O comando `npm run build` também verifica as páginas geradas: links internos, sitemap, título, descrição, um único h1, canonical e JSON-LD válido. Uma falha impede a conclusão do build. O sitemap final fica em `dist/sitemap.xml`; o build não altera o arquivo de origem em `public/`.

Antes de publicar, sincronize o catálogo e as imagens com a vitrine em produção: esta versão contém 12 produtos, enquanto a vitrine consultada em 25/10/2026 continha 16. Não use esta branch como substituição direta da hospedagem atual. A validação técnica não confirma estoque, preço na Shopee nem indexação no Google.
