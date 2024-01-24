const socket = io()

const messageFrom = document.getElementById('messageFrom')
const messageInput = document.getElementById('messageInput')
const chatMessages = document.getElementById('chatMessages')

//Enviar el mensaje
messageFrom.addEventListener('submit', (event) => {
    event.preventDefault()
    const message = messageInput.value

    //Emitir el mensaje al servidor
    socket.emit('message', message)

    //limpiar campo
    messageInput.value = ''
})

////////////////////////////////////////////////////////////////////////////////////
// // Manejar la recepcion de mensajes y mostrarlos (manera simple sin array)
// socket.on('lista_mensajes', (data) => {
//     const messageParagraph = document.createElement('p')
//     messageParagraph.textContent = data
//     chatMessages.appendChild(messageParagraph)
// })
///////////////////////////////////////////////////////////////////////////////////

// Manejar la recepción de mensajes individuales y agregarlos a la lista de mensajes en la vista
socket.on('lista_mensajes', (data) => {
    // Limpiar mensajes antiguos en la pantalla
    chatMessages.innerHTML = ''

    // Recorrer el array 
    data.forEach((messageData) => {
        const messageParagraph = document.createElement('p')
        messageParagraph.textContent = `${messageData.socketid}: ${messageData.message}`
        chatMessages.appendChild(messageParagraph)
    })
})

////////////////////////////////////////////////////////////////////////////

// socket.emit('message', 'Hola, me estoy comunicando desde un websocket')

// socket.on('evento_para_socket_individual', data => {
//     console.log(data)
// })

// socket.on('evento_para_todos_menos_el_socket_actual', data => {
//     console.log(data)
// })

// socket.on('evento_para_todos', data => {
//     console.log(data)
// })


///////////////////////////////////////////////////////////////////////////


/* 
const socket = io();

socket.on('connect', () => {
    console.log('Conexión establecida con el servidor')
    
    socket.emit('message', 'Hola, me estoy comunicando desde un websocket')
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor')
})
 */