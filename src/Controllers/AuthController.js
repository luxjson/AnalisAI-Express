const Usuario = require('../Models/UsuarioModel');
const Aluno = require('../Models/AlunoModel');
const db = require('../Config/db');

const AuthController = {
    
    renderIndex: (req, res) => {
        res.render('index');
    },

    
    renderTermos: (req, res) => {
        res.render('termos');
    },

    
    renderManuais: (req, res) => {
        res.render('manuais', {
            userCargo: req.session.userCargo,
            isAdmin: req.session.userCargo === 'Admin'
        });
    },

    renderManualUso: (req, res) => {
        res.render('manual-de-uso', {
            userCargo: req.session.userCargo,
            isAdmin: req.session.userCargo === 'Admin'
        });
    },

    renderManualAluno: (req, res) => {
        res.render('manual-do-aluno', {
            userCargo: req.session.userCargo,
            isAdmin: req.session.userCargo === 'Admin'
        });
    },

    
    renderCadastro: (req, res) => {
        res.render('cadastro', { erro: null });
    },

    processarCadastro: async (req, res) => {
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
            await Usuario.create(nome, usuario, senha, 'Professor');
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
    },

    
    renderLogin: (req, res) => {
        const tipo = req.query.tipo || 'professor';
        res.render('login', {
            error_msg: req.flash('error_msg')[0],
            success_msg: req.flash('success_msg')[0],
            tipo: tipo
        });
    },

    loginProfessor: async (req, res) => {
        const { usuario, senha } = req.body;
        try {
            const user = await Usuario.findByEmail(usuario);
            
            if (!user) {
                req.flash('error_msg', 'E-mail não encontrado');
                return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: 'professor' });
            }

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
    },

    loginAluno: async (req, res) => {
        const { matricula, email, senha } = req.body;
        const tipo = 'aluno';
        
        if (!matricula && !email) {
            req.flash('error_msg', 'Informe matrícula ou e-mail');
            return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
        }

        try {
            const identificador = matricula || email;
            const alunoLogin = await Aluno.findLoginByMatriculaOrEmail(identificador);

            if (!alunoLogin) {
                req.flash('error_msg', 'Matrícula/E-mail não encontrado');
                return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
            }

            if (alunoLogin.status !== 'ATIVO') {
                req.flash('error_msg', 'Acesso bloqueado. Contate a secretaria.');
                return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
            }

            if (senha !== alunoLogin.senha) {
                req.flash('error_msg', 'Senha incorreta');
                return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
            }

            
            const dados = await Aluno.findById(alunoLogin.aluno_id);

            if (!dados) {
                req.flash('error_msg', 'Erro ao carregar dados do aluno');
                return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
            }

            
            req.session.aluno = {
                id: alunoLogin.aluno_id,
                nome: alunoLogin.nome,
                matricula: alunoLogin.matricula,
                ano_escolar: dados.ano_escolar,
                login_id: alunoLogin.id
            };

            req.flash('success_msg', `Bem-vindo, ${alunoLogin.nome}!`);
            return res.redirect('/aluno/dashboard');

        } catch (err) {
            console.error('ERRO NO LOGIN DO ALUNO:', err);
            req.flash('error_msg', 'Erro ao conectar ao banco de dados.');
            return res.render('login', { error_msg: req.flash('error_msg')[0], success_msg: null, tipo: tipo });
        }
    },

    
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = AuthController;