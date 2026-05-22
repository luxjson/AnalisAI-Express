const express = require('express');
const router = express.Router();
const DashCtrl = require('../Controllers/DashboardController');
const TarefaCtrl = require('../Controllers/TarefaController');
const { checkAuth, checkAdmin } = require('../Middlewares/authMiddleware');


router.get('/', checkAuth, DashCtrl.getMain);
router.get('/edit', checkAuth, DashCtrl.getEdit);
router.get('/graficos', checkAuth, DashCtrl.getGraficos);
router.post('/add-aluno', checkAuth, DashCtrl.addAluno);


router.get('/tarefas', checkAuth, TarefaCtrl.listarTarefas);
router.post('/tarefas/criar', checkAuth, TarefaCtrl.criarTarefa);
router.get('/tarefas/:id', checkAuth, TarefaCtrl.getDetalhes);
router.post('/tarefas/avaliar-aluno', checkAuth, TarefaCtrl.avaliarAluno);

module.exports = router;