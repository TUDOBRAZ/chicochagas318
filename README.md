# Tudo Braz

Implementação alternativa da vitrine, com os 16 produtos disponíveis em tudobraz.com.br sincronizados em 25/10/2026 e links individuais para a Shopee. Catálogo: `src/data/catalogo.json`.

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

O catálogo foi sincronizado com os 16 produtos disponíveis da hospedagem em 25/10/2026, preservando slugs, descrições, imagens e destinos da Shopee. Os 4 registros indisponíveis da hospedagem não foram ativados nesta vitrine. A implementação publicada em React/Vinext é mantida no repositório de origem do Sites; este GitHub mantém a implementação alternativa em Vite. As publicações são independentes. A validação técnica não confirma estoque, preço na Shopee nem indexação no Google.
