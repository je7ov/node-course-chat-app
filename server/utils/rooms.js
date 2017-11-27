class Rooms {
  constructor() {
    this.rooms = [];
  }

  /** @param {string} id
   *  @param {string} name
   *  @param {string} room
   */
  addUser(id, name, room) {
    let user;
    this.rooms.some(r => {
      if (r.name === room) {
        user = { id, name };
        r.users.push(user);
        return true;
      }
    });

    if (!user) {
      user = { id, name };
      this.rooms.push({
        name: room,
        users: [user]
      });
    }

    return user;
  }

  /** @param {string} id */
  removeUser(id) {
    let user;
    this.rooms.some((r, roomIndex) => {
      r.users.some((u, i) => {
        if (u.id === id) {
          user = u;
          r.users.splice(i, 1);
          this.cleanupRoom(roomIndex);
          return true;
        }
        return user; // return true if user is found to stop loop
      });
    });

    return user;
  }

  /** @param {number} index */
  cleanupRoom(index) {
    if (this.rooms[index].users.length === 0) {
      this.rooms.splice(index, 1);
    }
  }

  /** @param {string} id */

  getUser(id) {
    let user;
    this.rooms.some(r => {
      r.users.some(u => {
        if (u.id === id) {
          user = u;
          user.room = r.name;
          return true;
        }
      });
      return user; // return true if user is found to stop loop
    });

    return user;
  }

  /** @param {string} name */
  getUserByName(name) {
    name = name.toLowerCase();
    let user;
    this.rooms.some(r => {
      if (!r.users) return false;

      r.users.some(u => {
        if (u.name.toLowerCase() === name) {
          user = u;
          user.room = r.name;
          return true;
        }
      });
      return user; // return true if user is found to stop loop
    });

    return user;
  }

  /** @param {string} room */
  getUserList(room) {
    let userList;

    this.rooms.some(r => {
      if (r.name === room) {
        userList = r.users.map(u => u.name);
        return true;
      }
    });

    return userList;
  }

  getRoomList() {
    let roomList = [];
    this.rooms.map(r => roomList.push(r.name));

    return roomList;
  }

  /** @param {string} room */
  roomExists(room) {
    room = room.toLowerCase();
    let exists = false;
    this.rooms.some(r => {
      if (r.name.toLowerCase() === room) return (exists = true);
    });

    return exists;
  }
}

module.exports = {
  Rooms
};
