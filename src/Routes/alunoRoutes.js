const express = require('express');
const router = express.Router();
const AlunoCtrl = require('../Controllers/AlunoController');
const { checkAlunoAuth } = require('../Middlewares/authMiddleware');
const upload = require('../Config/multer');

router.get('/dashboard', checkAlunoAuth, AlunoCtrl.getDashboard);
router.get('/tarefas', checkAlunoAuth, AlunoCtrl.getTarefas);
router.post('/tarefas/enviar/:id', checkAlunoAuth, upload.single('arquivo'), AlunoCtrl.enviarTarefa);

module.exports = router;