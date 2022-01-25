const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const fs = require ('fs');
const { info } = require('console');

//lee un archivo json el cual contiene todo los msj, lo convierte en un string
// y lo guarda en la nueva variable json_mensaje

let json_mensaje = fs.readFileSync('infoConta.json');

// convierte un string a json y lo guarda en la variable
let mensajes = JSON.parse(json_mensaje); 


// index pagina principal 
router.get('/', (req, res) => {
    res.render('paginas/index');

});

// pagna de los ingenieros
router.get('/ingeniero', (req, res) => {
    res.render('paginas/ing');
});


//pagina de los arquitectos  
router.get('/arquitecto', (req, res) => {
    res.render('paginas/arq');
});

// recivionde los datos del formulario

router.post('/curriculo', (req, res) => {
    //  importo req.body  nombre,ip,fecha,corre,mensaje, y los guardo en la const

    const { nombre, ip, fecha, correo, mensaje} = req.body;
    
    //validacion para verificar que todos los campos del formulario esten rellenado por el usuario
    
    if (!nombre || !ip || !fecha || !correo || !mensaje ) {
        res.status(404).render('paginas/volver');
        return;
    }
    
    let nuevoMensaje = {
        nombre,
        ip,
        fecha,
        correo,
        mensaje
    } 

    var transporter = nodemailer.createTransport({

        host: 'smtp.hostinger.com',
        port: 465,
        secure: false,
        auth:{
            user:'pg2_test@arodu.xyz',
            pass: '123Qwerty'
        }
    });
    
    var mailOptions = {
        from: "pg2_test@arodu.xyz",
        to: 'gabof1309@gmail.com,programacion2ais@dispostable.com',
        subject: "Curriculo de fernando Quintana",
        text: `Nombre: ${nuevoMensaje.nombre}`
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            res.status(500).send(error.message);
        } else{

            console.log("mensaje enviado ccon exito");
            res.status(200).json(req.body);
        }
    })
    // agrega una nueva lista o valor a la variable mensaje
    mensajes.push(nuevoMensaje);
    
    const agrega_mensaje = JSON.stringify(mensajes)

    // lee la informacion que viene de agrega_mensaje y la guarda en el archivo json en un
    // formato utf-8
    fs.writeFileSync('infoConta.json' , agrega_mensaje , 'utf-8' );

    res.redirect('/');
});

router.get('/curriculo', (req, res) => {
    res.render('paginas/curriculo');
});

// exportamos router

module.exports = router;