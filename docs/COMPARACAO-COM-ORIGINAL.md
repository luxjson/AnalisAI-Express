# Comparação dos estilos com o projeto original

Revisão em 10/10/2026 do ZIP original contra a entrega React/Vite. O inventário varreu os 190 arquivos originais, incluindo as referências de estilo em templates e scripts. Recursos binários foram comparados por bytes e SHA-256. Esta revisão preserva a lógica de negócio e não redesenha a interface.

| Verificação | Resultado |
| --- | --- |
| CSS locais originais | 26/26 equivalentes por AST após a formatação |
| CSS extraídos dos templates | 2/2 com regras equivalentes aos blocos `<style>` |
| Fontes locais originais | 39/39 idênticas |
| Imagens locais originais | 20/20 idênticas |
| Recursos visuais locais, incluindo PDF e favicon | 62/62 recursos sem CSS idênticos; 26 CSS equivalentes |
| Declarações / regras CSS originais | 6.927 / 2.018 preservadas |
| Media queries / keyframes / font-face originais | 86 / 21 / 7 preservados |
| Referências locais em `url(...)` dos CSS | Nenhum recurso ausente |
| Estrutura de páginas com os mesmos dados | 25/25 com tags, classes, IDs e estilos inline equivalentes |
| Ordem final de folhas de estilo | 25/25 equivalente à ordem renderizada original |
| Estados de modais e abas testados | 26/26 equivalentes |
| Configurações visuais de gráficos capturadas | 9/9 equivalentes em 25 páginas inicializadas |
| Testes do site / build Vite | 50/50 aprovados / aprovado |

## Ajustes realizados após a comparação

1. **Contêiner do React:** o `#root` acrescentava uma caixa entre o `body` e os elementos originais. Isso podia interferir nos layouts flex, especialmente login e dashboards. `src/styles/react-root.css` define `display: contents` para esse contêiner técnico, permitindo a participação das caixas originais no layout. Nenhuma regra dos CSS originais foi modificada. A verificação automatizada confirma a propriedade, sem medir dimensões reais em navegador.

2. **Cascata:** o carregador anterior eliminava links repetidos. O original reaplicava `sidebar.css` depois de outras folhas em sete páginas: `manualDoAluno` e as seis páginas do aluno. A entrega restaura as repetições e a sequência original, explicitamente registrada no manifesto. Uma repetição pode influenciar regras de mesma especificidade, mesmo com os mesmos arquivos copiados.

3. **Ícones:** os CSS Phosphor antes importados globalmente agora entram nas posições correspondentes dos templates. As fontes e os CSS bold/regular são cópias sem alterações do pacote oficial 2.1.1, servidas em `public/vendor/phosphor`, com licença e origem. O link legado de Phosphor na documentação da API aponta para essa cópia local. A folha Font Awesome daquela página não foi transportada: nenhum ícone do template usa suas classes; os sete ícones são Phosphor. Não se afirma identidade de bytes dos serviços externos.

## CSS por arquivo

| Arquivo original | Regras | Declarações | Media queries | Resultado |
| --- | ---: | ---: | ---: | --- |
| `src/public/css/base/dashboard.css` | 268 | 911 | 10 | Equivalente por AST |
| `src/public/css/base/light-theme.css` | 60 | 204 | 2 | Equivalente por AST |
| `src/public/css/components/notifications.css` | 39 | 148 | 2 | Equivalente por AST |
| `src/public/css/components/sidebar.css` | 143 | 604 | 7 | Equivalente por AST |
| `src/public/css/pages/ai.css` | 181 | 565 | 7 | Equivalente por AST |
| `src/public/css/pages/calendar.css` | 127 | 372 | 5 | Equivalente por AST |
| `src/public/css/pages/charts.css` | 66 | 210 | 5 | Equivalente por AST |
| `src/public/css/pages/competencies.css` | 58 | 197 | 2 | Equivalente por AST |
| `src/public/css/pages/config.css` | 86 | 299 | 3 | Equivalente por AST |
| `src/public/css/pages/dashboard-config.css` | 92 | 272 | 5 | Equivalente por AST |
| `src/public/css/pages/edit.css` | 326 | 1156 | 7 | Equivalente por AST |
| `src/public/css/pages/evolution.css` | 67 | 197 | 2 | Equivalente por AST |
| `src/public/css/pages/forgot-password.css` | 19 | 72 | 1 | Equivalente por AST |
| `src/public/css/pages/home.css` | 34 | 95 | 4 | Equivalente por AST |
| `src/public/css/pages/login.css` | 33 | 105 | 1 | Equivalente por AST |
| `src/public/css/pages/manuals.css` | 9 | 45 | 1 | Equivalente por AST |
| `src/public/css/pages/requests.css` | 24 | 89 | 1 | Equivalente por AST |
| `src/public/css/pages/student-evolution.css` | 13 | 62 | 1 | Equivalente por AST |
| `src/public/css/pages/student-manual.css` | 7 | 29 | 1 | Equivalente por AST |
| `src/public/css/pages/student-profile.css` | 87 | 283 | 5 | Equivalente por AST |
| `src/public/css/pages/student-tasks.css` | 49 | 184 | 2 | Equivalente por AST |
| `src/public/css/pages/tasks.css` | 93 | 355 | 2 | Equivalente por AST |
| `src/public/css/pages/teacher-manual.css` | 7 | 29 | 1 | Equivalente por AST |
| `src/public/css/pages/team.css` | 50 | 168 | 4 | Equivalente por AST |
| `src/public/css/pages/terms.css` | 16 | 47 | 1 | Equivalente por AST |
| `src/public/css/pages/users.css` | 64 | 229 | 4 | Equivalente por AST |

## Evidências e alcance

`evidencias/full-style-inventory.json` registra hashes, destinos, referências de fontes/imagens e portadores de estilo em todos os templates e scripts analisados. O mapeamento dos 190 arquivos para a nova arquitetura permanece em `api/docs/auditoria-arquivos.csv` e `.json`.

`evidencias/final-style-load.json` mostra a ordem renderizada original, a sequência anterior e a sequência final, incluindo aliases dos ícones locais. `inline-styles.json` registra os blocos de CSS extraídos.

`evidencias/markup-comparison.json` compara as 25 páginas com dados fictícios iguais. `dynamic-style-audit.json` identifica cada estado testado: abas de login/configuração/perfil/calendário, modais de calendário, criação/edição/visualização/avaliação de tarefas e edição/importação/exportação/filtro/credenciais de alunos. Foram usados cinco estados de tarefa e notas 7, 5 e 2 para cobrir as três classes de desempenho, com projeção da API real. Estilos inline foram normalizados pelo mesmo parser DOM para evitar diferenças entre a atribuição via React e o parsing HTML.

`evidencias/chart-style-audit.json` compara opções, fontes, cores, bordas, legenda e demais configurações capturadas, excluindo valores de séries e rótulos. Não renderiza Canvas. O CDN Chart.js original não fixava versão; o novo pacote tem versão resolvida no lockfile. Configurações iguais não provam desenho idêntico entre versões.

**Limite da revisão:** não houve comparação por screenshot/pixels, renderização Canvas real, teste de todos os dados possíveis, estados de interação ou larguras de tela. JSDOM não calcula o layout completo. A igualdade dos arquivos preserva as regras responsivas existentes, mas não certifica a aparência em cada viewport. Fontes Google preservam as URLs originais; serviços externos podem mudar o conteúdo servido.

Documentação oficial para o contêiner: [MDN — relação entre Flexbox e outros métodos de layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Relationship_with_other_layout_methods). Origem dos ícones: [Phosphor Web](https://github.com/phosphor-icons/web).
