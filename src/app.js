const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login'); // Importa las rutas de login
const registerRoutes = require('./routes/register'); // Importa las rutas de registro

const app = express();
app.set('port', 5000);

// Configuración de vistas y motor de plantillas
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de conexión a la base de datos
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodelogin'
}, 'single'));

// Configuración de sesiones
app.use(session({
    secret: 'secret', // Cambia esto a una clave más segura en producción
    resave: true,
    saveUninitialized: true
}));

// Rutas
app.use('/', loginRoutes); // Maneja las rutas de login
app.use('/', registerRoutes); // Maneja las rutas de registro

// Ruta principal
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        let name = req.session.name;
        res.render('home', { name }); // Renderiza la vista home con el nombre del usuario
    } else {
        res.redirect('/login'); // Redirige a la página de login si no está autenticado
    }
});

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('listening on port ', app.get('port'));
});
