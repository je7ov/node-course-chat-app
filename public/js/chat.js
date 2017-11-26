/* --------- */
/* SOCKET IO */
/* --------- */

const socket = io();

// ON CONNECTED TO SERVER
socket.on('connect', () => {
  console.log('connected to server');

  const params = $.deparam();
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {

    }
  });
});

// ON DISCONNECTED FROM SERVER
socket.on('disconnect', () => {
  console.log('disconnected from server');
});


// ON USER LIST UPDATED
const peopleList = $('#users');
socket.on('updateUserList', (users) => {
  const ol = $('<ol></ol>')
  for(user of users) {
    ol.append($('<li></li>').text(user));
  }

  peopleList.html(ol);
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
  scrollToBottom();
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
  scrollToBottom();  
});

/* ---------------- */
/* DOM MANIPULATION */
/* ---------------- */

const input = $('#message-input');
const messageForm = $('#message-form');
messageForm.on('submit', (event) => {
  event.preventDefault();
  
  socket.emit('createMessage', {
    text: input.val()
  }, (res) => {
    input.val('');
  });
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
      locationButton.removeAttr('disabled');    
      locationButton.text('Send location');
    });
  }, () => {
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');    
    alert('Unable to fetch location');
  });
});

function scrollToBottom() {
  // Selectors
  const messages = $('#message-list');
  const newMessage = messages.children('li:last-child');

  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}