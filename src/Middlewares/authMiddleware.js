module.exports = {
    checkAuth: (req, res, next) => {
        if (req.session.user && req.session.userStatus === 'ATIVO') return next();
        req.session.destroy();
        res.redirect('/login');
    },
    checkAdmin: (req, res, next) => {
        if (req.session.userCargo === 'Admin') return next();
        req.flash('error_msg', 'Acesso negado. Apenas administradores podem acessar.');
        res.redirect('/dashboard');
    },
    checkAlunoAuth: (req, res, next) => {
        if (req.session.aluno) return next();
        res.redirect('/login');
    }
};