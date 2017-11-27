const expect = require('expect');
const { Rooms } = require('./rooms');

describe('Rooms', () => {

  let rooms;
  beforeEach(() => {
    rooms = new Rooms();
    rooms.rooms = [
      {
        name: 'room1',
        users: [
          {
            id: '1',
            name: 'John'
          },
          {
            id: '2',
            name: 'Jacob'
          }
        ]
      },
      {
        name: 'room2',
        users: [
          {
            id: '3',
            name: 'Jingle'
          }
        ]
      }
    ];
  });

  it('should add a user to existing room', () => {
    const id = '4';
    const name = 'Heimer';
    const room = 'room2';
    
    const user = rooms.addUser(id, name, room);
    expect(user).toEqual(expect.objectContaining({ id, name }));
    expect(rooms.rooms[1].users).toEqual(expect.arrayContaining([ user ]));
  });

  it('should add a user to a new room', () => {
    const id = '4';
    const name = 'Heimer';
    const room = 'room3';

    const user = rooms.addUser(id, name, room);
    expect(user).toEqual(expect.objectContaining({ id, name }));
    expect(rooms.rooms[2].users).toEqual(expect.arrayContaining([ user ]));
  });

  it('should remove a user', () => {
    const id = '2';
    const user = rooms.removeUser(id);

    expect(user.id).toBe(id);
    expect(rooms.rooms[0].users).not.toEqual(expect.arrayContaining([ user ]));
  });

  it('should remove a room if all users are removed', () => {
    const id = '3';
    const user = rooms.removeUser(id);

    expect(user.id).toBe(id);
    expect(rooms.rooms[1]).toBeFalsy();
  });

  it('should find a user', () => {
    const id = '1';
    const user = rooms.getUser(id);

    expect(user.id).toBe(id);
  });

  it('should not find a non-existent user', () => {
    const id = '100';
    const user = rooms.getUser(id);

    expect(user).toBeFalsy();
  });

  it('should find a user by name', () => {
    const name = 'Jingle';
    const user = rooms.getUserByName(name);

    expect(user.name).toBe(name);
  });

  it('should get all users in room1', () => {
    const room = 'room1';
    const users = rooms.getUserList(room);

    expect(users).toEqual(rooms.rooms[0].users);
  });

  it('should get all users in room2', () => {
    const room = 'room2';
    const users = rooms.getUserList(room);

    expect(users).toEqual(rooms.rooms[1].users);
  });

  it('should get all room names', () => {
    const roomList = rooms.getRoomList();

    expect(roomList.length).toBe(2);
  });
});