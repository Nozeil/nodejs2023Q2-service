import { randomUUID } from 'crypto';
import { User } from 'src/interfaces';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

class DB {
  private _users: User[];

  constructor() {
    this._users = [];
  }

  getAllUsers() {
    return this._users;
  }

  createUser({ login, password }: CreateUserDto) {
    const user: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this._users.push(user);

    return user;
  }

  getUser(id: string) {
    const user = this._users.find((user) => user.id === id);

    return user;
  }

  updateUser(id: string, newPassword: string) {
    const userIndex = this.findUserIndexById(id);

    const user = this._users[userIndex];

    const updatedUser: User = {
      id: user.id,
      login: user.login,
      password: newPassword,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
      version: ++user.version,
    };

    this._users[userIndex] = updatedUser;

    return updatedUser;
  }

  deleteUser(id: string) {
    const userIndex = this.findUserIndexById(id);

    this._users.splice(userIndex, 1);
  }

  private findUserIndexById(id: string) {
    const userIndex = this._users.findIndex((user) => user.id === id);
    return userIndex;
  }
}

const db = new DB();

export default db;
