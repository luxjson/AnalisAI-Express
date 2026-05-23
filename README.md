<img src="./src/Public/IMG/gitlogo.png" width="100px" align="left">

### `AnalisAI`

![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-green)
![Environment](https://img.shields.io/badge/ENV-SENAI_CIC-red)
![Stack](https://img.shields.io/badge/STACK-PERN-blue)

**AnalisAI** é uma plataforma de gestão pedagógica projetada para converter dados brutos de avaliações em inteligência visual, monitorando competências e desempenho acadêmico em tempo real.

### Estrutura do Subsistema (`/src`)

- **`/src/`** – Raiz do back-end. Contém toda a lógica do servidor, organizada nos subdiretórios abaixo.

- **`/src/controllers/`** – Camada de controle: recebe as requisições HTTP, aplica regras de negócio e devolve respostas (renderização de views ou JSON).

- **`/src/models/`** – Camada de dados: consultas SQL e manipulação do banco PostgreSQL. Cada arquivo representa uma entidade (Usuário, Aluno, Tarefa, etc.).

- **`/src/routes/`** – Definição das rotas da aplicação. Cada grupo de rotas (professor, aluno, admin, api) fica em um arquivo separado.

- **`/src/middlewares/`** – Funções que interceptam as requisições para realizar tarefas como autenticação, upload de arquivos e injeção de mensagens flash.

- **`/src/utils/`** – Funções auxiliares reutilizáveis (ex.: criação de notificações, validações).

- **`/src/public/`** – Arquivos estáticos servidos diretamente ao navegador: CSS, imagens, JavaScript front-end, favicon e PDFs de manuais.

- **`/src/views/`** – Templates EJS com a estrutura HTML das páginas. Organizados por área (`aluno/`, `dashboard/`, `partials/`).

- **`/src/uploads/`** – Pasta de armazenamento dos arquivos enviados por alunos (anexos de tarefas). Gerada automaticamente pelo `multer`.


<div align="center"> 
<sub>Built with ☕ and 🌙 by LuxJson</sub>
</div>
