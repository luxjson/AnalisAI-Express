# Navegação e carregamento das informações

A troca de páginas internas usa a History API: o aplicativo continua montado e substitui o conteúdo central. A mensagem visual “Carregando AnalisAI...” foi removida. A sidebar permanece montada nas páginas do mesmo perfil; seus menus continuam funcionando sem duplicação de eventos.

Cada uma das 25 páginas possui um componente individual em `src/skeletons/`. Esse componente renderiza o JSX da própria página sob um contexto de loading: os containers, classes, IDs, estilos inline, títulos, ícones, botões, abas e rodapés são os mesmos da página carregada. Não existe uma segunda grade de layout para aproximar sua aparência.

Todos os elementos visuais recebem skeleton durante o carregamento. Textos fixos, títulos, descrições e rodapés viram barras; valores dinâmicos e nomes já conhecidos também ficam mascarados. Ícones, logos, imagens, campos, abas e botões viram blocos. A barra lateral entra no mesmo estado ao trocar de página, mantendo seu container montado. Os textos conservam a fonte, a altura de linha e as quebras originais para reservar seu espaço; não há efeito de blur sobre conteúdo visível. `LoadingCanvas` respeita os containers de 300/400px e as regras responsivas originais dos gráficos. O calendário conserva o mês solicitado, a quantidade real de dias e a posição inicial da semana. Ranking, editor, tarefas, perfil, configurações e evolução usam suas próprias estruturas, inclusive listas, filtros e abas.

Os módulos individuais contêm formas de apresentação para reservar linhas e cards durante a espera. Essas formas não são respostas da API: seus números, datas e textos neutros são mascarados, não inicializam interações e nunca são enviados ao backend. A quantidade final de registros vem da API. Páginas de conteúdo estático, como manuais, termos e equipe, também entram no skeleton completo. Os PDFs não são abertos nos iframes enquanto o skeleton está ativo. Os controles de uma área pendente ficam `inert`, e scripts de dados são omitidos até a resposta real. A faixa estreita de brilho respeita `prefers-reduced-motion`.

Os 26 CSS originais foram formatados e seus comentários removidos; as regras permanecem equivalentes por AST. O CSS novo fica em `src/styles/skeleton.css` e afeta apenas os placeholders. O carregador mantém a ordem original dos estilos, inclusive os links repetidos; reaproveita os links existentes e antecipa CSS local ao passar o mouse ou focar um link interno.

## Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/App.jsx` | Layout persistente, sessão, página atual, carregamento e erros |
| `src/services/navigation.js` | Links internos, filtros GET, voltar/avançar e posição de rolagem |
| `src/services/page-loader.js` | Busca dos dados, CSRF e regras de acesso já existentes |
| `src/services/lifecycle.js` | Cancelamento e limpeza das interações ao sair da página |
| `src/services/interactions.js` | Inicialização por página e redirecionamento dos formulários |
| `src/components/PageSkeleton.jsx` | Seleciona o skeleton individual da rota |
| `src/skeletons/*.jsx` | Estado de espera específico das 25 páginas, com o JSX nativo |
| `src/components/loading-layout.jsx` | Contexto e máscaras de textos, controles, ícones, mídia, valores e gráficos |
| `src/components/layout-context.js` | Evita renderizar novamente a sidebar dentro das páginas |
| `src/styles/skeleton.css` | Animação e formas de carregamento |

As páginas exportam seu `PageHeader` quando possuem um cabeçalho de dashboard. Os componentes de sidebar também podem ser renderizados isoladamente, preservando a comparação com os templates originais.

Ao navegar, as buscas pendentes são canceladas e resultados antigos são descartados. Listeners, intervalos, timers, gráficos Chart.js e componentes dinâmicos da página anterior são limpos. Os módulos em `src/interactions/` usam esse ciclo de vida. Formulários que já saíram da tela não redirecionam a navegação quando uma resposta atrasada chega.

Filtros mantêm os parâmetros na URL; voltar e avançar continuam funcionando. Configurações respeitam os parâmetros `aba` e `settings`, inclusive durante a navegação interna. Downloads, links externos, âncoras, novas abas e cliques com teclas modificadoras conservam seus tratamentos próprios. Erros de carregamento exibem uma mensagem e a ação “Tentar novamente”.

As permissões permanecem validadas pela API. A navegação confirma a sessão e respeita os perfis aluno/professor e os recursos administrativos. O frontend continua usando apenas `VITE_API_URL` como variável configurável. Nenhuma nova credencial ou dependência foi adicionada.

## Validação

- 51 testes do site aprovados nesta rodada; build Vite concluído. A API não foi alterada e conserva a última suíte aprovada de 42 testes.
- Navegação com API lenta, descarte de respostas antigas, filtros GET, histórico do navegador e limpeza de eventos/timers/gráficos.
- Visitas repetidas a todas as rotas autenticadas de aluno e professor, troca de perfil e links de configuração.
- Comparação dos containers, classes e estilos inline dos 25 skeletons com as páginas nativas correspondentes; textos fixos e dinâmicos, controles, ícones e mídia mascarados. Ambos os perfis de sidebar foram conferidos.
- Calendário de fevereiro de 2028 com 29 dias, áreas de gráficos de altura nativa e histórico da evolução preservado.
- Regressões de novo chat, ícones, sugestões e redefinição de senha de aluno mantidas.
- 62 recursos visuais sem CSS idênticos ao original e 26 CSS equivalentes por AST; ordem de estilos das 25 páginas preservada.
- Estrutura/classes/IDs/estilos inline das 25 páginas carregadas equivalentes ao original com os mesmos DTOs; 26 estados dinâmicos e nove configurações de gráficos equivalentes.

Os testes de interface usam React/JSDOM e redes simuladas; os testes da API usam dados isolados. A comparação estrutural não é uma comparação por pixels. JSDOM não renderiza o layout real nem Canvas; não foi possível executar Chromium neste ambiente para confirmar a renderização por pixels em desktop e celular. Nenhum teste alterou o banco de produção ou executou redefinições reais de senha.

Para publicar, mantenha as configurações já existentes de API no Render e site no Vercel. Na pasta `site`, execute `npm ci`, `npm test` e `npm run build`; publique novamente o frontend. As rotas diretas continuam sendo atendidas pelos rewrites existentes.

## Documentação utilizada

- [MDN: box-decoration-break e preservação de linhas](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-decoration-break)
- [React: useContext](https://react.dev/reference/react/useContext)
- [MDN: atributo inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)
- [React: useEffect e limpeza de efeitos](https://react.dev/reference/react/useEffect)
- [MDN: History API, pushState, replaceState e popstate](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

As evidências atuais estão em `docs/evidencias/skeletons-completos.json` e `cobertura-skeletons-completos.json`. Os relatórios anteriores de skeletons individuais permanecem como histórico.
