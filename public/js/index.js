/* --------- */
/* SOCKET IO */
/* --------- */

const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (message) => {
  // console.log("New message:", JSON.stringify(message, undefined, 2));

  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#message-list').append(li);
});

socket.on('newLocationMessage', (message) => {
  // console.log("New location message:", JSON.stringify(message, undefined, 2));

  const li = $('<li></li>');
  const a = $('<a target="blank">My current location</a>')

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#message-list').append(li);
});

/* ---------------- */
/* DOM MANIPULATION */
/* ---------------- */

const input = $('#message-input');
const messageForm = $('#message-form');
messageForm.on('submit', (event) => {
  event.preventDefault();
  
  if (input.val() !== '') {
    socket.emit('createMessage', {
      from: 'User',
      text: input.val()
    }, (res) => {
      input.val('');
    });
  }
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.attr('disabled', true);
    locationButton.text('Sending location...');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      console.log('callback');
      locationButton.removeAttr('disabled');    
      locationButton.text('Send location');
    });
  }, () => {
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');    
    alert('Unable to fetch location');
  });
});