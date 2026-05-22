const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const favicon = require('serve-favicon');

const app = express();

// 1. Configurações de View (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 2. Arquivos Estáticos
app.use(favicon(path.join(__dirname, 'Public', 'favicon.ico')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'src', 'Public')));

// 3. Middlewares Base
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'chave-analisai-pro',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// 4. Variáveis Globais
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// 5. Importação e Ativação das Rotas
const authRoutes = require('./Routes/authRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
const alunoRoutes = require('./Routes/alunoRoutes');
const apiRoutes = require('./Routes/apiRoutes'); // se criou o das notificações

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/aluno', alunoRoutes);
app.use('/api', apiRoutes);

// 6. Erro 404
app.use((req, res) => {
    res.status(404).render('error', { 
        titulo: 'Página não encontrada', 
        user: req.session.user, 
        isAdmin: req.session.userCargo === 'Admin' 
    });
});

// 7. Start
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 AnalisAI MVC rodando em http://localhost:${PORT}`));