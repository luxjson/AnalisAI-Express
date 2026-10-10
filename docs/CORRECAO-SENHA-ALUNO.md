# Correção da redefinição de senha do aluno

No modal de edição, o evento do botão chamava `gerarNovaSenhaAluno("id")`. Isso gerava uma requisição com a string `id` no lugar do identificador numérico do aluno, rejeitada corretamente pela validação da API.

O evento agora chama `gerarNovaSenhaAluno(id)`, usando o ID capturado na abertura do modal. Não foram alterados CSS, validações da API, autenticação, CSRF nem banco de dados.

O teste de regressão abre o modal para os alunos fictícios 17 e 42, clica no botão e verifica a URL numérica correta em cada requisição. Também confirma a exibição da nova senha de teste e verifica que cancelar a confirmação não envia outra requisição. As respostas da API são simuladas e nenhuma senha real foi redefinida.

A suíte completa do frontend aprovou 37/37 testes e o build Vite foi concluído. Para corrigir uma instalação já publicada, atualize o frontend e faça um novo deploy.
