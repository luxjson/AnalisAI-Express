# Correção do visual ao criar outro chat

O reset capturava o HTML da tela de boas-vindas e o enviava ao sanitizador destinado às respostas da IA. A lista de tags permitidas removia os contêineres `div`, os botões e o ícone `i`. Isso eliminava os elementos aos quais os CSS originais se aplicam.

As boas-vindas do professor e do aluno agora são componentes JSX compartilhados entre a primeira renderização e o reset, em `src/components/ChatWelcome.jsx`. Os textos, sugestões, classes e ícones Phosphor permanecem iguais aos originais. Nenhum CSS foi alterado e nenhum HTML fornecido pelo usuário passou a ser aceito. As respostas da IA continuam sanitizadas pelo DOMPurify.

O listener das sugestões fica no contêiner estável das mensagens, para continuar funcionando após os botões serem recriados. A substituição desmonta as raízes React auxiliares e remove o conteúdo anterior. A mesma limpeza é aplicada ao histórico para evitar mensagens e cartões duplicados ao reabri-lo.

## Validação

Os dois testes de regressão falharam antes da correção e passaram depois dela. A suíte atual aprova 36/36 testes do frontend. Para cada perfil, os testes com React/JSDOM comparam cinco resets com a estrutura inicial, acionam as três sugestões, verificam o envio exatamente uma vez com `conversationId: null`, o foco e a limpeza do campo, a remoção das mensagens anteriores e duas trocas pelo histórico sem duplicação. As requisições e respostas são simuladas; não usam a IA real.

A comparação das 25 páginas com os templates originais continua aprovada. Os 88 recursos visuais locais, incluindo os 26 CSS, permanecem idênticos em bytes. O build de produção Vite foi concluído. Não houve nova comparação por pixels em navegador nem publicação desta alteração.

Veja `evidencias/novo-chat.json` e `api/docs/evidencias/test-site.log`.
