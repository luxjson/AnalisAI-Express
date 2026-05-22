const db = require('../Config/db');

const Notificacao = {
    buscarPorUsuario: async (id, tipo) => {
        const campo = tipo === 'aluno' ? 'aluno_id' : 'usuario_id';
        const result = await db.query(
            `SELECT * FROM notificacoes WHERE ${campo} = $1 AND lida = false ORDER BY data_criacao DESC LIMIT 20`,
            [id]
        );
        return result.rows;
    },

    marcarLida: async (id, userId, tipo) => {
        const campo = tipo === 'aluno' ? 'aluno_id' : 'usuario_id';
        return await db.query(`UPDATE notificacoes SET lida = true WHERE id = $1 AND ${campo} = $2`, [id, userId]);
    },

    contarNaoLidas: async (id, tipo) => {
        const campo = tipo === 'aluno' ? 'aluno_id' : 'usuario_id';
        const result = await db.query(`SELECT COUNT(*) as total FROM notificacoes WHERE ${campo} = $1 AND lida = false`, [id]);
        return parseInt(result.rows[0].total);
    }
};

module.exports = Notificacao;