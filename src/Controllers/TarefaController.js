const db = require('../Config/db');
const Tarefa = require('../Models/TarefaModel');
const { criarNotificacao } = require('../Services/notificationService');

const TarefaController = {
    
    listarTarefas: async (req, res) => {
        try {
            const turmaFilter = req.query.turma || '';
            const statusFilter = req.query.status || '';
            
            
            const tarefas = await Tarefa.findAll(turmaFilter, statusFilter);

            const alunosResult = await db.query(`
                SELECT id, nome, ano_escolar FROM alunos ORDER BY nome ASC
            `);

            const stats = await Tarefa.getStats();

            const competenciasResult = await db.query(
                'SELECT id, nome FROM competencias ORDER BY nome ASC'
            );

            res.render('dashboard/tarefas', {
                tarefas: tarefas,
                alunos: alunosResult.rows,
                stats: stats,
                user: req.session.user,
                userCargo: req.session.userCargo,
                listaCompetencias: competenciasResult.rows,
                filtros: { turma: turmaFilter, status: statusFilter }
            });
        } catch (err) {
            console.error('Erro ao carregar tarefas:', err);
            req.flash('error_msg', 'Erro ao carregar tarefas');
            res.redirect('/dashboard');
        }
    },

    
    criarTarefa: async (req, res) => {
        const { titulo, descricao, turma, data_entrega, prioridade, alunos, competencia_id } = req.body;
        
        if (!titulo || !turma) {
            req.flash('error_msg', 'Título e turma são obrigatórios');
            return res.redirect('/dashboard/tarefas');
        }

        const client = await db.connect();
        try {
            await client.query('BEGIN');
            
            const tarefaResult = await client.query(
                `INSERT INTO tarefas (titulo, descricao, turma, data_entrega, prioridade, competencia_id, criado_por, data_atualizacao) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING id`,
                [titulo, descricao, turma, data_entrega || null, prioridade || 'MEDIA', competencia_id || null, req.session.userId]
            );
            
            const tarefaId = tarefaResult.rows[0].id;
            
            
            let idsAlunos = [];
            if (alunos && alunos.length > 0) {
                idsAlunos = Array.isArray(alunos) ? alunos : [alunos];
            } else {
                const alunosTurma = await client.query('SELECT id FROM alunos WHERE ano_escolar = $1', [turma]);
                idsAlunos = alunosTurma.rows.map(a => a.id);
            }

            for (const alunoId of idsAlunos) {
                await client.query(
                    `INSERT INTO tarefas_alunos (tarefa_id, aluno_id, status) VALUES ($1, $2, 'PENDENTE')`,
                    [tarefaId, alunoId]
                );
                
                await criarNotificacao(
                    'tarefa', null, alunoId, 'Nova Tarefa',
                    `Você recebeu uma nova tarefa: ${titulo}`, '/aluno/tarefas',
                    'fas fa-tasks', '#217346'
                );
            }

            await client.query('COMMIT');
            req.flash('success_msg', 'Tarefa criada com sucesso!');
            res.redirect('/dashboard/tarefas');
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Erro ao criar tarefa:', err);
            req.flash('error_msg', 'Erro ao criar tarefa');
            res.redirect('/dashboard/tarefas');
        } finally {
            client.release();
        }
    },

    
    getDetalhes: async (req, res) => {
        try {
            const tarefaId = req.params.id;
            const tarefaResult = await db.query(`
                SELECT t.*, c.nome as competencia_nome, u.nome as professor_nome
                FROM tarefas t
                LEFT JOIN competencias c ON t.competencia_id = c.id
                LEFT JOIN usuarios u ON t.criado_por = u.id
                WHERE t.id = $1`, [tarefaId]);

            if (tarefaResult.rows.length === 0) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const alunosResult = await db.query(`
                SELECT a.id, a.nome, a.ano_escolar, COALESCE(ta.status, 'PENDENTE') as status_tarefa,
                ta.nota, ta.feedback, ta.resposta_texto, ta.resposta_arquivo,
                TO_CHAR(ta.data_entrega, 'DD/MM/YYYY HH24:MI') as data_entrega_formatada
                FROM alunos a
                LEFT JOIN tarefas_alunos ta ON a.id = ta.aluno_id AND ta.tarefa_id = $1
                WHERE a.ano_escolar = $2
                ORDER BY CASE WHEN ta.status = 'ENTREGUE' THEN 1 ELSE 2 END, a.nome ASC`, 
                [tarefaId, tarefaResult.rows[0].turma]);

            res.json({ tarefa: tarefaResult.rows[0], alunos: alunosResult.rows });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar tarefa' });
        }
    },

    
    avaliarAluno: async (req, res) => {
        const { tarefa_id, aluno_id, nota, feedback } = req.body;
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            
            await client.query(
                `UPDATE tarefas_alunos SET nota = $1, feedback = $2, status = 'CONCLUIDA', data_avaliacao = CURRENT_TIMESTAMP
                 WHERE tarefa_id = $3 AND aluno_id = $4`,
                [nota, feedback, tarefa_id, aluno_id]
            );

            const tarefa = await client.query('SELECT competencia_id FROM tarefas WHERE id = $1', [tarefa_id]);
            
            let virouCompetencia = false;
            if (tarefa.rows[0].competencia_id) {
                await client.query(
                    `INSERT INTO aluno_competencias (aluno_id, competencia_id, nota, observacoes)
                     VALUES ($1, $2, $3, $4)`,
                    [aluno_id, tarefa.rows[0].competencia_id, nota, `Avaliado via tarefa ID ${tarefa_id}`]
                );
                virouCompetencia = true;
                
                
                const media = await client.query('SELECT AVG(nota) as media FROM aluno_competencias WHERE aluno_id = $1', [aluno_id]);
                await client.query('UPDATE alunos SET nota = $1 WHERE id = $2', [media.rows[0].media, aluno_id]);
            }

            await criarNotificacao(
                'avaliacao', null, aluno_id, 'Tarefa Avaliada',
                `Sua tarefa foi avaliada com nota ${nota}`, '/aluno/tarefas',
                'fas fa-star', '#217346'
            );

            await client.query('COMMIT');
            res.json({ success: true, virouCompetencia });
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ success: false, error: err.message });
        } finally {
            client.release();
        }
    },

    
    devolverAluno: async (req, res) => {
        const { tarefa_id, aluno_id } = req.body;
        try {
            await db.query(
                `UPDATE tarefas_alunos SET status = 'DEVOLVIDA', nota = NULL, feedback = NULL, data_avaliacao = NULL
                 WHERE tarefa_id = $1 AND aluno_id = $2`, [tarefa_id, aluno_id]
            );
            await criarNotificacao(
                'devolucao', null, aluno_id, 'Tarefa Devolvida',
                `Sua tarefa foi devolvida para correção`, '/aluno/tarefas',
                'fas fa-undo-alt', '#ffa500'
            );
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false });
        }
    },

    
    excluirTarefa: async (req, res) => {
        try {
            await db.query('DELETE FROM tarefas WHERE id = $1', [req.params.id]);
            req.flash('success_msg', 'Tarefa excluída com sucesso!');
            res.redirect('/dashboard/tarefas');
        } catch (err) {
            req.flash('error_msg', 'Erro ao excluir tarefa');
            res.redirect('/dashboard/tarefas');
        }
    }
};

module.exports = TarefaController;