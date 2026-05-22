const db = require('../db');
const { criarNotificacao } = require('../utils/notificacao');
const crypto = require('crypto');

exports.showHome = (req, res) => {
    res.render('index');
};

exports.showTermos = (req, res) => {
    res.render('termos');
};

exports.showManuais = (req, res) => {
    res.render('manuais', {
        userCargo: req.session.userCargo,
        isAdmin: req.session.userCargo === 'Admin'
    });
};

exports.showManualDeUso = (req, res) => {
    res.render('manualDoProfessor', {
        userCargo: req.session.userCargo,
        isAdmin: req.session.userCargo === 'Admin'
    });
};

exports.showManualDoAluno = (req, res) => {
    res.render('manualDoAluno', {
        userCargo: req.session.userCargo,
        isAdmin: req.session.userCargo === 'Admin'
    });
};

exports.showLogin = (req, res) => {
    const tipo = req.query.tipo || 'professor';
    res.render('login', {
        error_msg: req.flash('error_msg')[0],
        success_msg: req.flash('success_msg')[0],
        tipo: tipo
    });
};

exports.loginProfessor = async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [usuario]);
        if (result.rows.length === 0) {
            req.flash('error_msg', 'E-mail não encontrado');
            return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: 'professor' });
        }
        const user = result.rows[0];
        if (user.status !== 'ATIVO') {
            req.flash('error_msg', 'Sua conta está inativa. Contate o administrador.');
            return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: 'professor' });
        }
        if (senha !== user.senha) {
            req.flash('error_msg', 'Senha incorreta');
            return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: 'professor' });
        }
        req.session.user = user.nome;
        req.session.userStatus = user.status;
        req.session.userId = user.id;
        req.session.userCargo = user.cargo;
        req.flash('success_msg', `Bem-vindo, ${user.nome}!`);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Erro ao conectar ao banco de dados.');
        return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: 'professor' });
    }
};

exports.loginAluno = async (req, res) => {
    const { matricula, email, senha } = req.body;
    const tipo = 'aluno';
    if (!matricula && !email) {
        req.flash('error_msg', 'Informe matrícula ou e-mail');
        return res.render('login', {
            error_msg: req.flash('error_msg')[0],
            success_msg: null,
            tipo: tipo
        });
    }
    try {
        let query;
        let params;
        if (matricula) {
            query = 'SELECT * FROM alunos_login WHERE matricula = $1';
            params = [matricula];
        } else {
            query = 'SELECT * FROM alunos_login WHERE email = $1';
            params = [email];
        }
        const result = await db.query(query, params);
        if (result.rows.length === 0) {
            req.flash('error_msg', 'Matrícula/E-mail não encontrado');
            return res.render('login', {
                error_msg: req.flash('error_msg')[0],
                success_msg: null,
                tipo: tipo
            });
        }
        const aluno = result.rows[0];
        if (aluno.status !== 'ATIVO') {
            req.flash('error_msg', 'Acesso bloqueado. Contate a secretaria.');
            return res.render('login', {
                error_msg: req.flash('error_msg')[0],
                success_msg: null,
                tipo: tipo
            });
        }
        if (senha !== aluno.senha) {
            req.flash('error_msg', 'Senha incorreta');
            return res.render('login', {
                error_msg: req.flash('error_msg')[0],
                success_msg: null,
                tipo: tipo
            });
        }
        const alunoDados = await db.query(
            'SELECT id, nome, ano_escolar, presenca FROM alunos WHERE id = $1',
            [aluno.aluno_id]
        );
        if (alunoDados.rows.length === 0) {
            req.flash('error_msg', 'Erro ao carregar dados do aluno');
            return res.render('login', {
                error_msg: req.flash('error_msg')[0],
                success_msg: null,
                tipo: tipo
            });
        }
        const dados = alunoDados.rows[0];
        req.session.aluno = {
            id: aluno.aluno_id,
            nome: aluno.nome,
            matricula: aluno.matricula,
            ano_escolar: dados.ano_escolar,
            login_id: aluno.id
        };
        req.flash('success_msg', `Bem-vindo, ${aluno.nome}!`);
        return res.redirect('/aluno/dashboard');
    } catch (err) {
        console.error('ERRO NO LOGIN DO ALUNO:', err);
        req.flash('error_msg', 'Erro ao conectar ao banco de dados.');
        return res.render('login', {
            error_msg: req.flash('error_msg')[0],
            success_msg: null,
            tipo: tipo
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

exports.showCadastro = (req, res) => {
    res.render('cadastro', { erro: null });
};

exports.cadastro = async (req, res) => {
    const { nome, usuario, senha, confirmar_senha } = req.body;
    if (senha !== confirmar_senha) {
        req.flash('error_msg', 'As senhas não coincidem!');
        return res.redirect('/cadastro');
    }
    if (senha.length < 6) {
        req.flash('error_msg', 'A senha deve ter no mínimo 6 caracteres!');
        return res.redirect('/cadastro');
    }
    try {
        await db.query(
            'INSERT INTO usuarios (nome, email, senha, status, cargo) VALUES ($1, $2, $3, $4, $5)',
            [nome, usuario, senha, 'ATIVO', 'Professor']
        );
        req.flash('success_msg', 'Cadastro realizado com sucesso! Faça login.');
        res.redirect('/login');
    } catch (err) {
        if (err.code === '23505') {
            req.flash('error_msg', 'Este e-mail já está cadastrado!');
        } else {
            req.flash('error_msg', 'Erro ao realizar cadastro.');
        }
        res.redirect('/cadastro');
    }
};

exports.showEsqueciSenha = (req, res) => {
    res.render('esqueciSenha', {
        error_msg: req.flash('error_msg')[0],
        success_msg: req.flash('success_msg')[0]
    });
};

exports.solicitarRedefinicaoSenha = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        req.flash('error_msg', 'E-mail é obrigatório');
        return res.render('esqueciSenha', {
            error_msg: req.flash('error_msg')[0],
            success_msg: null
        });
    }
    try {
        const result = await db.query('SELECT id, nome FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            req.flash('error_msg', 'E-mail não encontrado');
            return res.render('esqueciSenha', {
                error_msg: req.flash('error_msg')[0],
                success_msg: null
            });
        }
        const usuario = result.rows[0];
        const token = crypto.randomBytes(32).toString('hex');
        await db.query(
            `INSERT INTO solicitacoes_senha (usuario_id, email, token, status) VALUES ($1, $2, $3, 'PENDENTE')`,
            [usuario.id, email, token]
        );
        const admins = await db.query('SELECT id FROM usuarios WHERE cargo = $1', ['Admin']);
        for (const admin of admins.rows) {
            await criarNotificacao(
                'solicitacao_senha',
                admin.id,
                null,
                'Solicitação de Redefinição de Senha',
                `${usuario.nome} (${email}) solicitou redefinição de senha`,
                `/dashboard/solicitacoes-senha`,
                'fas fa-key',
                '#ff0101'
            );
        }
        req.flash('success_msg', 'Solicitação enviada! Um administrador irá analisar.');
        res.render('esqueciSenha', {
            error_msg: null,
            success_msg: req.flash('success_msg')[0]
        });
    } catch (err) {
        console.error('Erro ao solicitar recuperação:', err);
        req.flash('error_msg', 'Erro ao processar solicitação');
        return res.render('esqueciSenha', {
            error_msg: req.flash('error_msg')[0],
            success_msg: null
        });
    }
};