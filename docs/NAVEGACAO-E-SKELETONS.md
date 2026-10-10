# Navegação e skeletons

A navegação interna mantém o aplicativo montado, preserva o container da barra lateral, cancela buscas antigas e descarta respostas de rotas encerradas. Os skeletons aparecem enquanto a sessão e as informações da página estão sendo carregadas.

## Padrão visual atual

A implementação foi refeita a partir de `src/components/ui/Skeleton.jsx` e da regra `.skeleton` de `src/styles/global.css` do arquivo enviado `Deadsmile-Games-Website(2).zip`.

Os placeholders são elementos vazios. Não há texto invisível para desenhar as barras, imagens deslocadas, blur ou formulários reais dentro do skeleton. Cada tela possui um componente de carregamento; os layouts ficam em `src/skeletons/layouts.jsx` e reaproveitam as classes estruturais do AnalisAI para grades, tabelas, cards, cabeçalhos, calendário, perfil, chat, manuais e autenticação.

O padrão da referência foi mantido:

- Gradiente de 100 graus: `#242424` em 20%, `#333` em 45% e `#242424` em 70%.
- Fundo com tamanho de `220% 100%`, percorrendo `100% 0` até `-100% 0`.
- Animação de 1,8 segundo, `ease-in-out`, contínua.
- Raio padrão de 10 px; linhas com 16 px de altura, raio de 6 px e distância de 12 px.
- Última linha do grupo com 65% da largura; grupos de cards, linhas, ações, avatares e áreas grandes com dimensões próprias.

Banners e superfícies de espera usam cinza escuro, mesmo quando seu conteúdo carregado é vermelho, verde ou amarelo. O CSS dos skeletons só afeta os elementos de carregamento. Os CSS originais das páginas, logos e fontes não foram alterados nesta rodada.

A página inicial também tem uma barra lateral pública de skeleton. Os perfis aluno e professor usam seus próprios espaços de navegação. Durante uma troca de rota autenticada, o container da barra lateral permanece montado e seu conteúdo passa a usar placeholders vazios. Os controles móveis ficam inativos durante a espera.

O calendário conserva a quantidade de dias e o deslocamento semanal do mês solicitado na URL. O gráfico de evolução reserva sua área de 400 px. As tabelas reservam colunas e linhas, e os perfis consideram a aba solicitada. Quantidades de cards e linhas são estimativas de apresentação até a resposta real; não são registros fictícios enviados ao backend.

## Arquivos principais

| Arquivo | Função |
| --- | --- |
| `src/components/Skeleton.jsx` | Blocos vazios, linhas, ações, cards, tabelas, cabeçalhos e conteúdo da barra lateral |
| `src/skeletons/layouts.jsx` | Layouts de carregamento para os diferentes tipos de página |
| `src/skeletons/*.jsx` | Entrada individual das 25 páginas |
| `src/components/PageSkeleton.jsx` | Skeleton da página atual, barra lateral e fallback de módulo |
| `src/components/loading-layout.jsx` | Mantém os adaptadores das páginas carregadas e troca o conteúdo da barra lateral durante a espera |
| `src/styles/skeleton.css` | Gradiente da referência, superfícies neutras e ajustes de responsividade |
| `src/App.jsx` | Sessão, carregamento da rota e ciclo de vida das interações |

## Validação

Foram aprovados 52 testes do site e o build Vite. A suíte cobre o bloco vazio de cada uma das 25 páginas, ausência de textos reais, formulários e mídia durante a espera, animação e dimensões da referência, calendário bissexto, altura do gráfico, navegação com rede lenta, cancelamento de respostas antigas, revisitas, menus e mudanças de perfil.

As 25 páginas carregadas tiveram seu HTML comparado com a versão anterior usando os mesmos dados e ficaram idênticas. A API não foi alterada nesta rodada e conserva a última suíte aprovada de 42 testes. Os testes usam dados isolados e rede simulada; não houve escrita no banco de produção.

A comparação não mede pixels: Chromium encerrou com SIGSEGV neste ambiente. A conferência visual final em navegador publicado, em desktop e celular, continua necessária. As evidências atuais estão em `docs/evidencias/skeletons-referencia.json`, `cobertura-skeletons-referencia.json` e nos logs de testes e build. Os relatórios de versões anteriores permanecem como histórico.

## Publicação

Publique novamente a pasta `site` no Vercel ou no ambiente de teste já configurado. Não há novas dependências ou variáveis: o frontend continua com apenas `VITE_API_URL`. Os comandos e rewrites anteriores continuam válidos. O ZIP mantém as pastas `api` e `site`.

## Fontes

- Código do site enviado: `Deadsmile-Games-Website(2).zip`, componentes de skeleton e CSS.
- [React: useContext](https://react.dev/reference/react/useContext)
- [React: limpeza de useEffect](https://react.dev/reference/react/useEffect)
- [MDN: inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
