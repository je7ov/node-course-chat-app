const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log("New message:", JSON.stringify(message, undefined, 2));
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#message-list').append(li);
});

$('#message-form').on('submit', (event) => {
  event.preventDefault();
  
  const input = $('#message-input');
  if (input.val() !== '') {
    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
    }, (res) => {
      console.log(res);
    });

    $('[name=message]').val('');
  }
});