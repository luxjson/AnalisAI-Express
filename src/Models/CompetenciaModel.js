const db = require('../Config/db');

const Competencia = {
    listarTodas: async () => {
        const result = await db.query('SELECT * FROM competencias ORDER BY nome ASC');
        return result.rows;
    },

    getRankingGeral: async () => {
        return (await db.query(`
            SELECT c.nome, COALESCE(AVG(ac.nota), 0) as media, COUNT(ac.id) as total_avaliacoes
            FROM competencias c
            LEFT JOIN aluno_competencias ac ON c.id = ac.competencia_id
            GROUP BY c.id, c.nome HAVING COUNT(ac.id) > 0 ORDER BY media DESC
        `)).rows;
    },

    getRankingPorFiltro: async (filtroEscolar) => {
        return (await db.query(`
            SELECT c.nome, COALESCE(AVG(ac.nota), 0) as media, COUNT(ac.id) as total_avaliacoes
            FROM competencias c
            LEFT JOIN aluno_competencias ac ON c.id = ac.competencia_id
            LEFT JOIN alunos a ON ac.aluno_id = a.id
            WHERE a.ano_escolar LIKE $1
            GROUP BY c.id, c.nome HAVING COUNT(ac.id) > 0 ORDER BY media DESC
        `, [`%${filtroEscolar}%`])).rows;
    },

    adicionarNota: async (alunoId, compId, nota, obs) => {
        return await db.query(
            'INSERT INTO aluno_competencias (aluno_id, competencia_id, nota, observacoes) VALUES ($1, $2, $3, $4)',
            [alunoId, compId, nota, obs]
        );
    }
};

module.exports = Competencia;