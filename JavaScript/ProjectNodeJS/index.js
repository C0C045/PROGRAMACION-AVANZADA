const express = require("express")
const app = express() //Inicializar

const flash = require('connect-flash')
const session = require('express-session')
const toastr = require('express-toastr')

const bodyParser = require('body-parser')
const fileupload = require('express-fileupload'); //Poder subir archivos

//Utilizar json al envio de body por post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(toastr());

//Variable global
app.use((req, res, next) => {
    res.locals.toasts = req.toastr.render()
    next()
});

//Rutas
app.use(require("./controlador/controlC"))
app.use(require("./controlador/controlE"))
app.use(require("./funcionalidad/funciones"))

//Archivos públicos
app.use(express.static("public"))

//Correr el servidor
app.listen(3000, () => {
    console.log("Servidor Iniciado...");
})