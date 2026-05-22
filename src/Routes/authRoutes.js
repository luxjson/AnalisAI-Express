const express = require('express');
const router = express.Router();
const AuthCtrl = require('../Controllers/AuthController');

router.get('/', AuthCtrl.renderIndex);
router.get('/termos', AuthCtrl.renderTermos);
router.get('/cadastro', AuthCtrl.renderCadastro);
router.post('/cadastro', AuthCtrl.processarCadastro);

router.get('/login', AuthCtrl.renderLogin);
router.post('/login/professor', AuthCtrl.loginProfessor);
router.post('/login/aluno', AuthCtrl.loginAluno);
router.get('/logout', AuthCtrl.logout);

router.get('/manuais', AuthCtrl.renderManuais);
router.get('/manuais/manual-de-uso', AuthCtrl.renderManualUso);
router.get('/manuais/manual-do-aluno', AuthCtrl.renderManualAluno);

module.exports = router;