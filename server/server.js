const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected')

  const now = Date.now();
  socket.emit('newMessage', {
    text: 'Welcome to the chat!',
    from: 'Admin',
    timestamp: now
  });

  socket.broadcast.emit('newMessage', {
    text: 'A new user has joined the chat!',
    from: 'Admin',
    timestamp: now
  });

  socket.on('createMessage', (message) => {
    console.log('New message recieved:', JSON.stringify(message, undefined, 2));
    message.timestamp = Date.now();
    io.emit('newMessage', message);

    // socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
