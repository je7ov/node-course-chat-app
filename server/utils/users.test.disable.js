const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Frank',
        room: 'room1'
      },
      {
        id: '2',
        name: 'Ben',
        room: 'room2'
      },
      {
        id: '3',
        name: 'Jen',
        room: 'room1'
      }
    ]
  });
  
  it('should add new user', () => {
    const users = new Users();

    const id = 'abc123';
    const name = 'user';
    const room = 'new room';

    const user = users.addUser(id, name, room);
    expect(user).toEqual(expect.objectContaining({ id, name, room }));
    expect(users.users).toEqual([ user ]);
  });

  it('should remove a user', () => {
    const id = '1';
    const user = users.removeUser(id);

    expect(user.id).toBe(id);
    expect(users.users).not.toBe(expect.objectContaining({ id }));
    expect(users.users.length).toBe(2);
  });

  it('should not remove a non-existent user', () => {
    const id = '100';
    const user = users.removeUser(id);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const id = '1';
    const user = users.getUser(id);

    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    const id = '100';
    const user = users.getUser(id);

    expect(user).toBeFalsy();
  });

  it('should return names in a room1', () => {
    const usersInRoom = users.getUserList('room1');
    expect(usersInRoom).toEqual([ users.users[0].name, users.users[2].name ]);
  });

  it('should return names in a room2', () => {
    const usersInRoom = users.getUserList('room2');
    expect(usersInRoom).toEqual([ users.users[1].name ]);
  });
});