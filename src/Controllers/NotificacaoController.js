const db = require('../Config/db');

const NotificacaoController = {
    getNotificacoes: async (req, res) => {
        try {
            let id = req.session.aluno ? req.session.aluno.id : req.session.userId;
            let campo = req.session.aluno ? 'aluno_id' : 'usuario_id';

            const result = await db.query(
                `SELECT * FROM notificacoes WHERE ${campo} = $1 AND lida = false ORDER BY data_criacao DESC LIMIT 20`, [id]
            );
            const count = await db.query(
                `SELECT COUNT(*) as total FROM notificacoes WHERE ${campo} = $1 AND lida = false`, [id]
            );

            res.json({ notificacoes: result.rows, totalNaoLidas: parseInt(count.rows[0].total) });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar notificações' });
        }
    },

    marcarLida: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.session.aluno ? req.session.aluno.id : req.session.userId;
            const campo = req.session.aluno ? 'aluno_id' : 'usuario_id';

            await db.query(`UPDATE notificacoes SET lida = true WHERE id = $1 AND ${campo} = $2`, [id, userId]);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: 'Erro' });
        }
    }
};

module.exports = NotificacaoController;