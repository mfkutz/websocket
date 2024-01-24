import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express()
const httpServer = app.listen(process.env.PORT || 8080, () => console.log("Listening on PORT 8080"))

const socketServer = new Server(httpServer) //socketServer será un servidor para trabajar con sockets

//Plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)

const msgBaseData = []

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    //Enviar la lista completa de mensajes al cliente recien conectado
    socket.emit('lista_mensajes', msgBaseData)

    socket.on('message', data => {
        console.log(data)

        //Almacenar el mensaje en el servidor
        msgBaseData.push({ socketid: socket.id, message: data })


        //Utilizo socketServer.emit para mostrar el mensaje a todos
        socketServer.emit('lista_mensajes', msgBaseData)


        // socketServer.emit('lista_mensajes', data)
    })

    // socket.emit('evento_para_socket_individual', 'Este mensaje solo lo debe recibir el socket')

    // socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', `Este evento lo veran todos los sockets conectados, MENOS el socket actual desde el que se envió el mensaje`)

    // socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados')
})