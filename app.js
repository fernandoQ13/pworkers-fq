const express = require('express');
const morganl = require('morgan');
const path = require('path');
const app = express();


// archivos estaticos  para los arcchivos css, js y tos las imagenes 
app.use(express.static(path.join(__dirname, 'public')));


// configuracines
app.set('port', process.env.PORT || 3000);//posicionamiento del puerto el cual sera establecido por el servidor 
// en tal caso que no entonces que se ubique en el pueto 3000

app.set('views', path.join(__dirname, 'views')); //estableciendo la direccion donde se escuentra la carpeta views con todas las vistas
//utilizando la constante __dirname que nos ofrece la direccion del archivo
//modulo path.join nos contatena los directorios y lo vuelve multi plataforma

app.set('view engine', 'ejs');// establece el motor de plantillas en cual sera ejs


//Middleware

app.use(morganl('dev'));

app.use(express.urlencoded({ extended: false })); // permite enterder los datos del formularios, nos combiertes los datos formulario en 
// un formato json la utilizarlos


//rutas

app.use(require('./rutas/index'))


// 404

app.use((req, res, next) => {
  res.status(404).render('paginas/404');
})

// servidor escuchando en el puerto este mensaje es en la consola  

app.listen(app.get('port'), () => {
  console.log('servidor escuchando en el puerto', app.get('port'));
});
