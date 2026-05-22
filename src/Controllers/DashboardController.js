const Aluno = require('../Models/AlunoModel');
const Usuario = require('../Models/UsuarioModel');
const db = require('../Config/db');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const { criarNotificacao } = require('../Services/notificationService');

const DashboardController = {
    
    getMain: async (req, res) => {
        try {
            const alunosRaw = await Aluno.findAllWithCompetencias();
            
            
            const alunosComNivel = alunosRaw.map(aluno => {
                let mediaCompetencias = 0;
                if (aluno.competencias && aluno.competencias.length > 0) {
                    const soma = aluno.competencias.reduce((acc, comp) => acc + parseFloat(comp.nota), 0);
                    mediaCompetencias = soma / aluno.competencias.length;
                }
                let nivel = 'EM DESENVOLVIMENTO';
                if (mediaCompetencias >= 7 && aluno.presenca >= 75) nivel = 'APTO';
                else if (mediaCompetencias < 5 || aluno.presenca < 50) nivel = 'INAPTO';

                return {
                    ...aluno,
                    nivel,
                    media_competencias: mediaCompetencias.toFixed(1)
                };
            });

            
            const rankingGeral = (await db.query(`
                SELECT c.nome, COALESCE(AVG(ac.nota), 0) as media, COUNT(ac.id) as total_avaliacoes
                FROM competencias c LEFT JOIN aluno_competencias ac ON c.id = ac.competencia_id
                GROUP BY c.id, c.nome HAVING COUNT(ac.id) > 0 ORDER BY media DESC
            `)).rows;

            const rankingMedio = (await db.query(`
                SELECT c.nome, COALESCE(AVG(ac.nota), 0) as media, COUNT(ac.id) as total_avaliacoes
                FROM competencias c LEFT JOIN aluno_competencias ac ON c.id = ac.competencia_id
                LEFT JOIN alunos a ON ac.aluno_id = a.id
                WHERE a.ano_escolar LIKE '%MÉDIO%'
                GROUP BY c.id, c.nome HAVING COUNT(ac.id) > 0 ORDER BY media DESC
            `)).rows;

            const rankingFundamental = (await db.query(`
                SELECT c.nome, COALESCE(AVG(ac.nota), 0) as media, COUNT(ac.id) as total_avaliacoes
                FROM competencias c LEFT JOIN aluno_competencias ac ON c.id = ac.competencia_id
                LEFT JOIN alunos a ON ac.aluno_id = a.id
                WHERE a.ano_escolar LIKE '%FUNDAMENTAL%'
                GROUP BY c.id, c.nome HAVING COUNT(ac.id) > 0 ORDER BY media DESC
            `)).rows;

            res.render('dashboard/main', { 
                user: req.session.user, 
                alunos: alunosComNivel,
                rankingGeral,
                rankingMedio,
                rankingFundamental,
                userCargo: req.session.userCargo,
                isAdmin: req.session.userCargo === 'Admin'
            });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao carregar dashboard');
            res.redirect('/login');
        }
    },

    
    getEdit: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT a.*,
                COALESCE((SELECT json_agg(nd.* ORDER BY nd.id ASC) FROM notas_detalhadas nd WHERE nd.aluno_id = a.id), '[]'::json) as notas_individuais,
                COALESCE((SELECT json_agg(json_build_object('id', ac.id, 'nome', c.nome, 'nota', ac.nota, 'categoria', c.categoria) ORDER BY ac.id ASC)
                FROM aluno_competencias ac JOIN competencias c ON ac.competencia_id = c.id WHERE ac.aluno_id = a.id), '[]'::json) as competencias
                FROM alunos a ORDER BY a.id ASC
            `);

            const competenciasList = await db.query('SELECT id, nome, descricao, categoria FROM competencias ORDER BY id ASC');
            
            res.render('dashboard/edit', { 
                alunos: result.rows,
                listaCompetencias: competenciasList.rows,
                user: req.session.user,
                userCargo: req.session.userCargo,
                isAdmin: req.session.userCargo === 'Admin'
            });
        } catch (err) {
            console.error(err);
            res.redirect('/dashboard');
        }
    },

    
    getGraficos: async (req, res) => {
        try {
            const alunos = (await db.query(`
                SELECT a.*, 
                COALESCE((SELECT json_agg(ac.nota) FROM aluno_competencias ac WHERE ac.aluno_id = a.id), '[]'::json) as competencias
                FROM alunos a`)).rows;

            let stats = { total: 0, apto: 0, inapto: 0, somaMedio: 0, countMedio: 0, somaFundamental: 0, countFundamental: 0 };

            alunos.forEach(aluno => {
                stats.total++;
                let media = aluno.competencias.length > 0 ? (aluno.competencias.reduce((a, b) => a + parseFloat(b), 0) / aluno.competencias.length) : 0;
                
                if (media >= 7 && aluno.presenca >= 75) stats.apto++;
                else if (media < 5 || aluno.presenca < 50) stats.inapto++;

                if (aluno.ano_escolar.includes('MÉDIO')) { stats.somaMedio += media; stats.countMedio++; }
                else if (aluno.ano_escolar.includes('FUNDAMENTAL')) { stats.somaFundamental += media; stats.countFundamental++; }
            });

            res.render('dashboard/graficos', { 
                stats: {
                    total: stats.total, apto: stats.apto, inapto: stats.inapto,
                    mediaMedio: stats.countMedio > 0 ? (stats.somaMedio / stats.countMedio).toFixed(1) : 0,
                    mediaFundamental: stats.countFundamental > 0 ? (stats.somaFundamental / stats.countFundamental).toFixed(1) : 0
                },
                userCargo: req.session.userCargo,
                isAdmin: req.session.userCargo === 'Admin'
            });
        } catch (err) {
            res.redirect('/dashboard');
        }
    },

    
    addAluno: async (req, res) => {
        const { nome, ano_escolar, idade } = req.body;
        try {
            const nomeLower = nome.toLowerCase().replace(/\s+/g, '.');
            const numeroAleatorio = Math.floor(Math.random() * 90 + 10);
            const email = `${nomeLower}${numeroAleatorio}@aluno.analisai.com`;
            const matricula = `ALU${Date.now().toString().slice(-8)}`;
            
            await Aluno.createFull(nome, ano_escolar, idade, email, 'aluno123', matricula);
            
            req.flash('success_msg', `Aluno cadastrado! Login: ${email} / Senha: aluno123`);
            res.redirect('/dashboard/edit');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao adicionar aluno');
            res.redirect('/dashboard/edit');
        }
    },

    
    baixarModelo: async (req, res) => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relatório AnalisAI');
            
            
            
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=modelo_importacao_analisai.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            res.status(500).send('Erro ao gerar modelo');
        }
    },

    
    getConfig: async (req, res) => {
        try {
            const aba = req.query.aba || 'dados';
            const config = (await db.query('SELECT * FROM configuracoes_notificacoes WHERE usuario_id = $1', [req.session.userId])).rows[0] || {};
            const user = await Usuario.findById(req.session.userId);
            
            res.render('dashboard/config', {
                config,
                nome: user.nome,
                email: user.email,
                cargo: user.cargo,
                dataCadastro: new Date(user.data_criacao).toLocaleDateString('pt-BR'),
                ultimoAcesso: req.session.ultimoAcesso || '---',
                stats: { tarefas: 0, alunos: 0 }, 
                abaAtiva: aba,
                userCargo: req.session.userCargo,
                isAdmin: req.session.userCargo === 'Admin'
            });
        } catch (err) {
            res.redirect('/dashboard');
        }
    },

    
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.render('dashboard/usuarios', { 
                usuarios,
                isAdmin: req.session.userCargo === 'Admin',
                userCargo: req.session.userCargo,
                userId: req.session.userId,
                user: req.session.user
            });
        } catch (err) {
            res.redirect('/dashboard');
        }
    }
};

module.exports = DashboardController;