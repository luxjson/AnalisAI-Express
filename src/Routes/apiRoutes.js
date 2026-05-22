const express = require('express');
const router = express.Router();
const NotifCtrl = require('../Controllers/NotificacaoController');

router.get('/notificacoes', NotifCtrl.getNotificacoes);
router.post('/notificacoes/marcar-lida/:id', NotifCtrl.marcarLida);

module.exports = router;