class Users {
  constructor () {
    this.users = [];
  }

  /** @param {string} id 
   *  @param {string} name
   *  @param {string} room
  */
  addUser (id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  /** @param {string} id */
  removeUser (id) {
    const userToRemove = this.getUser(id);
    if (userToRemove) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return userToRemove;
  }

  /** @param {string} id */  
  getUser (id) {
    return this.users.find((user) => user.id === id);
  }
  
  /** @param {string} name */
  getUserByName (name) {
    name = name.toLowerCase();
    return this.users.find((user) => user.name.toLowerCase() === name);
  }

  /** @param {string} room */
  getUserList (room) {
    const usersInRoom = this.users.filter((user) => user.room === room);
    return usersInRoom.map((user) => user.name)
  }
}

module.exports = {
  Users
}