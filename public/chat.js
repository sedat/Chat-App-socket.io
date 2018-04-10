// Make connection
const socket = io.connect('http://localhost:8080/');

// Query
let message = document.getElementById('message'),
      name = document.getElementById('name'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', () =>{
    socket.emit('chat', {
        message: message.value,
        name: name.value
    })
});

message.addEventListener('keypress', () => {
    socket.emit('typing', name.value);
});

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
})