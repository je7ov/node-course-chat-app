/* --------- */
/* SOCKET IO */
/* --------- */

const socket = io();

// ON CONNECT TO SERVER
socket.on('connect', () => {
  console.log('connected to server');
});

// ON DISCONNECTED FROM SERVER
socket.on('disconnect', () => {
  console.log('disconnected to server');
});

socket.on('updateRoomList', (rooms) => {
  console.log(rooms);
});