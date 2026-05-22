const db = require('../Config/db');
const { criarNotificacao } = require('../Services/notificationService');

const AlunoController = {
    
    getDashboard: async (req, res) => {
        try {
            const alunoId = req.session.aluno.id;
            const alunoResult = await db.query(`
                SELECT a.*, al.matricula, al.email, TO_CHAR(al.data_criacao, 'DD/MM/YYYY') as data_cadastro
                FROM alunos a JOIN alunos_login al ON a.id = al.aluno_id
                WHERE a.id = $1`, [alunoId]);

            const aluno = alunoResult.rows[0];
            const competencias = (await db.query(`
                SELECT ac.*, c.nome, c.descricao, c.categoria, TO_CHAR(ac.data_registro, 'DD/MM/YYYY') as data_formatada
                FROM aluno_competencias ac JOIN competencias c ON ac.competencia_id = c.id
                WHERE ac.aluno_id = $1 ORDER BY ac.data_registro DESC`, [alunoId])).rows;

            let mediaGeral = competencias.length > 0 ? (competencias.reduce((acc, comp) => acc + parseFloat(comp.nota), 0) / competencias.length) : 0;

            const categoriasMap = new Map();
            competencias.forEach(comp => {
                if (!categoriasMap.has(comp.categoria)) categoriasMap.set(comp.categoria, { categoria: comp.categoria, soma: 0, count: 0 });
                const cat = categoriasMap.get(comp.categoria);
                cat.soma += parseFloat(comp.nota);
                cat.count++;
            });
            const categorias = Array.from(categoriasMap.values()).map(c => ({ ...c, media: (c.soma / c.count) * 10 }));

            await db.query("UPDATE alunos_login SET ultimo_acesso = CURRENT_TIMESTAMP WHERE aluno_id = $1", [alunoId]);

            res.render('aluno/main', { aluno, competencias, mediaGeral, categorias });
        } catch (err) {
            res.redirect('/logout');
        }
    },

    
    getTarefas: async (req, res) => {
        try {
            const alunoId = req.session.aluno.id;
            const tarefas = (await db.query(`
                SELECT ta.id as tarefa_aluno_id, t.titulo, t.descricao, t.data_entrega as data_limite, 
                c.nome as competencia_nome, ta.status, ta.nota, ta.feedback,
                TO_CHAR(t.data_entrega, 'DD/MM/YYYY') as data_limite_formatada,
                CASE WHEN ta.status = 'PENDENTE' AND t.data_entrega < CURRENT_DATE THEN 'ATRASADA' ELSE ta.status END as status_real
                FROM tarefas t JOIN tarefas_alunos ta ON t.id = ta.tarefa_id
                LEFT JOIN competencias c ON t.competencia_id = c.id
                WHERE ta.aluno_id = $1 ORDER BY t.data_entrega ASC`, [alunoId])).rows;

            const stats = (await db.query(`
                SELECT COUNT(*) as total, COUNT(CASE WHEN status = 'ENTREGUE' THEN 1 END) as aguardando,
                COUNT(CASE WHEN status = 'CONCLUIDA' THEN 1 END) as concluidas
                FROM tarefas_alunos WHERE aluno_id = $1`, [alunoId])).rows[0];

            res.render('aluno/tarefas', { aluno: req.session.aluno, tarefas, stats });
        } catch (err) {
            res.redirect('/aluno/dashboard');
        }
    },

    
    enviarTarefa: async (req, res) => {
        const tarefaAlunoId = req.params.id;
        const { resposta_texto } = req.body;
        const arquivo = req.file ? req.file.filename : null;

        try {
            await db.query(`
                UPDATE tarefas_alunos SET status = 'ENTREGUE', data_entrega = CURRENT_TIMESTAMP, 
                resposta_texto = $1, resposta_arquivo = $2 
                WHERE id = $3 AND aluno_id = $4`, 
                [resposta_texto, arquivo, tarefaAlunoId, req.session.aluno.id]);

            const info = (await db.query('SELECT criado_por, titulo FROM tarefas WHERE id = (SELECT tarefa_id FROM tarefas_alunos WHERE id = $1)', [tarefaAlunoId])).rows[0];
            await criarNotificacao('entrega', info.criado_por, null, 'Tarefa Entregue', `${req.session.aluno.nome} entregou: ${info.titulo}`, `/dashboard/tarefas`);

            req.flash('success_msg', 'Tarefa enviada com sucesso!');
            res.redirect('/aluno/tarefas');
        } catch (err) {
            res.redirect('/aluno/tarefas');
        }
    }
};

module.exports = AlunoController;