const db = require('../Config/db');

const Usuario = {
    findByEmail: async (email) => {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await db.query('SELECT id, nome, email, cargo, status, data_criacao FROM usuarios WHERE id = $1', [id]);
        return result.rows[0];
    },

    findAll: async () => {
        const result = await db.query('SELECT id, nome, email, cargo, status FROM usuarios ORDER BY nome ASC');
        return result.rows;
    },

    create: async (nome, email, senha, cargo) => {
        return await db.query(
            'INSERT INTO usuarios (nome, email, senha, status, cargo) VALUES ($1, $2, $3, $4, $5)',
            [nome, email, senha, 'ATIVO', cargo || 'Professor']
        );
    },

    update: async (id, nome, email, cargo, status) => {
        return await db.query(
            'UPDATE usuarios SET nome=$1, email=$2, cargo=$3, status=$4 WHERE id=$5',
            [nome, email, cargo, status, id]
        );
    },

    delete: async (id) => {
        return await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    },

    updateSenha: async (id, novaSenha) => {
        return await db.query('UPDATE usuarios SET senha = $1 WHERE id = $2', [novaSenha, id]);
    }
};

module.exports = Usuario;