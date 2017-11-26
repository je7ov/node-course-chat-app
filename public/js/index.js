/* --------- */
/* SOCKET IO */
/* --------- */

const socket = io();

// ON CONNECTED TO SERVER
socket.on('connect', () => {
  console.log('connected to server');
});

// ON DISCONNECTED FROM SERVER
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

// ON NEW MESSAGE RECIEVED
socket.on('newMessage', (message) => {
  const formattedTime = moment(message.timestamp).format('h:mm a');
  const li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#message-list').append(li);
});

// ON NEW LOCATION MESSAGE RECIEVED
socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.timestamp).format('h:mm a');
  const li = $('<li></li>');
  const a = $('<a target="blank">My current location</a>')

  li.text(`${message.from} ${formattedTime}: `);
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