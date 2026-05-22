const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.get('/', authController.showHome);
router.get('/termos', authController.showTermos);
router.get('/manuais', authController.showManuais);
router.get('/manuais/manual-de-uso', authController.showManualDeUso);
router.get('/manuais/manual-do-aluno', authController.showManualDoAluno);
router.get('/cadastro', authController.showCadastro);
router.post('/cadastro', authController.cadastro);
router.get('/login', authController.showLogin);
router.post('/login/professor', authController.loginProfessor);
router.post('/login/aluno', authController.loginAluno);
router.get('/logout', authController.logout);
router.get('/esqueci-senha', authController.showEsqueciSenha);
router.post('/esqueci-senha/solicitar', authController.solicitarRedefinicaoSenha);

module.exports = router;