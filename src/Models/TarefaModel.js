const db = require('../Config/db');

const Tarefa = {
    findAll: async (turma, status) => {
        let query = `
            SELECT t.*, u.nome as professor_nome,
            COUNT(ta.id) as total_alunos,
            COUNT(CASE WHEN ta.status = 'CONCLUIDA' THEN 1 END) as concluidas,
            COUNT(CASE WHEN ta.status = 'ENTREGUE' THEN 1 END) as entregues,
            COUNT(CASE WHEN ta.status = 'DEVOLVIDA' THEN 1 END) as devolvidas,
            COUNT(CASE WHEN ta.status = 'PENDENTE' AND t.data_entrega < CURRENT_DATE THEN 1 END) as atrasadas
            FROM tarefas t
            LEFT JOIN usuarios u ON t.criado_por = u.id
            LEFT JOIN tarefas_alunos ta ON t.id = ta.tarefa_id
            WHERE 1=1 `;
        
        const params = [];
        if (turma) { params.push(turma); query += ` AND t.turma = $${params.length}`; }
        if (status) { params.push(status); query += ` AND t.status = $${params.length}`; }

        query += ` GROUP BY t.id, u.nome ORDER BY CASE WHEN t.status = 'ATIVA' THEN 1 ELSE 2 END, t.data_criacao DESC`;
        const result = await db.query(query, params);
        return result.rows;
    },

    getStats: async () => {
        const result = await db.query(`
            SELECT COUNT(*) as total,
            COUNT(CASE WHEN status = 'ATIVA' THEN 1 END) as ativas,
            COUNT(CASE WHEN data_entrega < CURRENT_DATE AND status = 'ATIVA' THEN 1 END) as atrasadas,
            (SELECT COUNT(*) FROM tarefas_alunos WHERE status = 'ENTREGUE') as aguardando_correcao
            FROM tarefas`);
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await db.query(`
            SELECT t.*, c.nome as competencia_nome, u.nome as professor_nome
            FROM tarefas t
            LEFT JOIN competencias c ON t.competencia_id = c.id
            LEFT JOIN usuarios u ON t.criado_por = u.id
            WHERE t.id = $1`, [id]);
        return result.rows[0];
    }
};

module.exports = Tarefa;