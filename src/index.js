const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io')(http);

const mongoose = require('mongoose');

const app = express();

const server = http.createServer(app);

//gracias a esto, puedo enviar y recibir mensajes desde el cliente y el servidor
const io = socketio.listen(server);

//Conexion a base de datos
//
mongoose.connect('mongodb+srv://admin:admin@cluster0.0lfgv.mongodb.net/chatNode?retryWrites=true&w=majority')
  .then(db => console.log("La base de datos está conectada."))
  .catch(e => { console.log(e) })

/*app.get("/", (req, res) => {
  res.setHeader("set-cookie", ["setfromserver=1","cookiesegura=este es el valor de mi cookie segura;httponly"])
  res.sendFile(`${__dirname}`)
})*/

app.get("/", (req, res) => {
  res.setHeader("set-cookie", ["setfromserver=1","cookiesegura=este es el valor de mi cookie segura;secure"])
  res.sendFile(`${__dirname}`)
})


//Ajustes
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//envia la carpeta public al navegador cada vez que lo ejecuta
app.use(express.static(path.join(__dirname, 'public')));

//ejecuta un servidor que se queda escuchando
server.listen(app.get('port'), () => {
    console.log("El servidor está ejecutado en el puerto ", app.get('port'));
});
