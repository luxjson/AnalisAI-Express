const db = require('../Config/db');

const Aluno = {
    // Busca todos com as competências em formato JSON para o Dashboard
    findAllWithCompetencias: async () => {
        const result = await db.query(`
            SELECT a.*,
            COALESCE((SELECT json_agg(json_build_object('nota', ac.nota)) FROM aluno_competencias ac WHERE ac.aluno_id = a.id), '[]'::json) as competencias
            FROM alunos a ORDER BY a.nome ASC
        `);
        return result.rows;
    },

    findById: async (id) => {
        const result = await db.query(`
            SELECT a.*, al.email, al.matricula, al.status, al.ultimo_acesso
            FROM alunos a
            LEFT JOIN alunos_login al ON a.id = al.aluno_id
            WHERE a.id = $1
        `, [id]);
        return result.rows[0];
    },

    findLoginByMatriculaOrEmail: async (identificador) => {
        const result = await db.query(
            'SELECT * FROM alunos_login WHERE matricula = $1 OR email = $2',
            [identificador, identificador]
        );
        return result.rows[0];
    },

    // Cria Aluno e Login usando Transação (Segurança total)
    createFull: async (nome, ano, idade, email, senha, matricula) => {
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const res = await client.query(
                `INSERT INTO alunos (nome, ano_escolar, idade, nota, presenca, nivel) 
                 VALUES ($1, $2, $3, 0, 100, 'EM DESENVOLVIMENTO') RETURNING id`,
                [nome, ano, idade]
            );
            const alunoId = res.rows[0].id;
            await client.query(
                `INSERT INTO alunos_login (nome, email, senha, matricula, aluno_id, status) 
                 VALUES ($1, $2, $3, $4, $5, 'ATIVO')`,
                [nome, email, senha, matricula, alunoId]
            );
            await client.query('COMMIT');
            return alunoId;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    },

    delete: async (id) => {
        return await db.query('DELETE FROM alunos WHERE id = $1', [id]);
    },

    updatePresenca: async (id, presenca) => {
        return await db.query('UPDATE alunos SET presenca = $1 WHERE id = $2', [presenca, id]);
    }
};

module.exports = Aluno;