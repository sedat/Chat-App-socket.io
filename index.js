const express = require('express'),
    app = express()
    socket = require('socket.io'),
    server = app.listen(8080, () => {
        console.log("Listening on port 8080");
    });

// Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', (socket) =>{
    console.log('socket connection made', socket.id);

    socket.on('chat', (data) =>{
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})

