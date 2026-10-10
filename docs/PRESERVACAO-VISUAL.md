# Preservação do visual

A conversão mantém 25 páginas e 4 partials como componentes JSX. Não há `.ejs` nem renderização de templates no site ou na API. Componentes e modais dinâmicos utilizam React; o texto rico do assistente é o único conteúdo HTML sanitizado.

Os 26 CSS originais e os dois blocos extraídos dos templates foram formatados nesta revisão, com comentários removidos. A comparação das árvores CSS confirma que regras, valores, seletores e ordem continuam equivalentes. Imagens, fontes, favicon e PDFs permanecem idênticos em bytes. O relatório `../api/docs/evidencias/visual-assets.json` contém os hashes e a comparação.

O carregamento mantém a ordem renderizada original, incluindo repetições de CSS em sete páginas. O contêiner técnico do React usa `display: contents` para preservar a participação dos elementos no layout do `body`. O relatório detalhado e as evidências adicionais estão em `COMPARACAO-COM-ORIGINAL.md` e `evidencias/`.

Ícones mantêm a versão Phosphor 2.1.1 usada no projeto original, agora servida localmente. Classes, IDs, atributos de estilo inline, ordem de elementos e estrutura das 25 páginas foram comparados entre EJS original e JSX com os mesmos DTOs de teste. Veja `../api/docs/evidencias/markup-comparison.json`.

Textos técnicos da página de documentação da API foram atualizados para os recursos/métodos REST; cores e classes visuais das badges foram preservadas. Correções de fluxo, credenciais aleatórias e mensagens de validação podem alterar o conteúdo de uma mensagem, sem redesenhar o componente.

A comparação DOM não prova equivalência de pixels. Não houve inspeção visual em Chromium, pois o navegador local não funcionou neste ambiente. Também não houve renderização real dos gráficos Canvas nos testes JSDOM. A entrega conserva os CSS responsivos originais e não afirma ter aprovado todos os tamanhos de viewport, toque ou leitores de tela. Verifique a aparência final no navegador após publicar, especialmente gráficos, calendário e modais.

A recriação das boas-vindas de um novo chat também usa JSX nativo. A correção e os testes estão descritos em `CORRECAO-NOVO-CHAT.md`.

Os estados de carregamento usam `src/styles/skeleton.css`, preservando as regras dos CSS originais. A navegação preserva a sidebar e reaproveita os cabeçalhos das páginas. Veja `NAVEGACAO-E-SKELETONS.md`.
