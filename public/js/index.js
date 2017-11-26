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

const messageList = $('#message-list');

// ON NEW MESSAGE RECIEVED
socket.on('newMessage', (message) => {
  const formattedTime = moment(message.timestamp).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    timestamp: formattedTime
  });

  messageList.append(html);
});

// ON NEW LOCATION MESSAGE RECIEVED
socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.timestamp).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    timestamp: formattedTime
  });

  messageList.append(html);
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