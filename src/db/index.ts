import { randomUUID } from 'crypto';
import { Track, User } from 'src/interfaces';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

class DB {
  private _users: User[];
  private _tracks: Track[];

  constructor() {
    this._users = [];
    this._tracks = [];
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

  getTracks() {
    const tracks = this._tracks;
    return tracks;
  }

  getTrack(id: string) {
    const track = this._tracks.find((track) => track.id === id);
    return track;
  }

  createTrack(trackDto: CreateTrackDto) {
    const track = { id: randomUUID(), ...trackDto };
    this._tracks.push(track);

    return track;
  }

  private findTrackIndexById(id: string) {
    const trackIndex = this._tracks.findIndex((track) => track.id === id);

    return trackIndex;
  }

  updateTrack(id: string, trackDto: UpdateTrackDto) {
    const trackIndex = this.findTrackIndexById(id);
    const track = this._tracks[trackIndex];

    const updatedTrack: Track = {
      id: track.id,
      ...trackDto,
    };

    this._tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = this.findTrackIndexById(id);

    this._tracks.splice(trackIndex, 1);
  }
}

const db = new DB();

export default db;
