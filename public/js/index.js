const socket = io();

socket.on('connect', () => {
  console.log('connected to server');

  socket.emit('createMessage', {
      text: 'This is a new message from the client side!',
      from: 'John'
    }
  );
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log("New message:", message);
});