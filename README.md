# AnalisAI — Site React + Vite

Visual original convertido para JSX nativo: 25 páginas e 4 componentes compartilhados. CSS, imagens, fontes, favicon e PDFs originais foram preservados. A lógica pedagógica, persistência, sessões, importações/exportações e chamadas de IA ficam na API em `../api`.

A única variável configurável do site é:

```dotenv
VITE_API_URL=http://localhost:3000
```

Ela deve conter a origem da API, sem `/api/v1`. No Vercel, use `https://sua-api.onrender.com`. Não coloque credenciais de banco, chaves de IA, segredo de sessão ou senha administrativa aqui.

```bash
cd site
npm ci
npm run dev
npm test
npm run build
```

Abra `http://localhost:5173`, a mesma origem definida em `APP_ORIGIN` no backend. O proxy do Vite encaminha `/backend/*` para `/api/v1/*`. `npm run preview` serve apenas o build estático; para testar a API, use `npm run dev` ou o deploy do Vercel.

No Vercel, selecione Root Directory `site`, framework Vite, build `npm run build` e output `dist`. Configure somente `VITE_API_URL`. `vercel.mjs` usa a configuração programática oficial para resolver o destino antes de definir os rewrites; não gera `vercel.json` depois que as rotas de publicação já foram lidas. O encaminhamento é um rewrite da plataforma; nenhuma regra de negócio ou função de backend fica no site.

O navegador chama `/backend` na mesma origem do site. Isso permite cookies HttpOnly sem depender de cookies de terceiros entre Vercel e Render. O servidor continua validando a sessão, o perfil, o proprietário do recurso, a origem e o CSRF. Mudanças em `VITE_API_URL` exigem redeploy.

Consulte `../api/docs/DEPLOY.md` e `../api/docs/SEGURANCA-E-TESTES.md`. `docs/PRESERVACAO-VISUAL.md` descreve exatamente o que foi comparado e os limites da validação visual.

A navegação interna mantém o aplicativo montado, com sidebar persistente e layouts de skeleton com blocos vazios em cinza escuro, seguindo o padrão do site enviado como referência. Veja [Navegação e skeletons](docs/NAVEGACAO-E-SKELETONS.md) para implementação e testes.

O código usa indentação de dois espaços, conforme `.prettierrc.json`. Veja [Revisão do código](../api/docs/REVISAO-E-FORMATACAO.md) para as correções, documentação consultada e verificações desta versão.
