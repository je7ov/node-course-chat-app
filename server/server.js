const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Rooms } = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const rooms = new Rooms();

app.use(express.static(publicPath));

// ON CONNECTION WITH NEW USER
io.on('connection', socket => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    params.name = params.name.trim();
    params.room = params.room.trim();

    if (
      params.name.toLowerCase() === 'admin' ||
      params.name.toLowerCase() === 'je7ov'
    ) {
      return callback('Name is reserved');
    }

    const userCheck = rooms.getUserByName(params.name);
    if (
      userCheck &&
      userCheck.room.toLowerCase() === params.room.toLowerCase()
    ) {
      return callback('Name is currently in use in room');
    }

    socket.join(params.room);

    rooms.removeUser(socket.id);
    rooms.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', rooms.getUserList(params.room));
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app!')
    );
    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined the chat!`)
      );

    callback();
  });

  // ON NEW MESSAGE CREATED
  socket.on('createMessage', (message, callback) => {
    const user = rooms.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io
        .to(user.room)
        .emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  // ON NEW LOCATION MESSAGE CREATED
  socket.on('createLocationMessage', (position, callback) => {
    const user = rooms.getUser(socket.id);

    if (user) {
      io
        .to(user.room)
        .emit(
          'newLocationMessage',
          generateLocationMessage(
            user.name,
            position.latitude,
            position.longitude
          )
        );
    }

    callback();
  });

  // ON USER DISONNECTED
  socket.on('disconnect', () => {
    const user = rooms.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', rooms.getUserList(user.room));
      io
        .to(user.room)
        .emit(
          'newMessage',
          generateMessage('Admin', `${user.name} has left the chat.`)
        );
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
