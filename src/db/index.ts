import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist, Track, User } from 'src/interfaces';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

class DB {
  private _users: User[];
  private _tracks: Track[];
  private _artists: Artist[];
  private _albums: any[];

  constructor() {
    this._users = [];
    this._tracks = [];
    this._artists = [];
    this._albums = [];
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

  getArtists() {
    return this._artists;
  }

  getArtist(id: string) {
    const artist = this._artists.find((artist) => artist.id === id);
    return artist;
  }

  createArtist(artistDto: CreateArtistDto) {
    const artist = { id: randomUUID(), ...artistDto };
    this._artists.push(artist);
    return artist;
  }

  private findArtistIndexById(id: string) {
    const artistIndex = this._artists.findIndex((artist) => artist.id === id);
    return artistIndex;
  }

  updateArtist(id: string, artistDto: UpdateArtistDto) {
    const artistIndex = this.findArtistIndexById(id);
    const artist = this._artists[artistIndex];

    const updatedArtist: Artist = {
      id: artist.id,
      ...artistDto,
    };

    this._artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  private setArtistIdToNull(
    id: string,
    storage: typeof this._tracks | typeof this._albums,
  ) {
    storage.forEach((item, index, storage) => {
      if (item.artistId === id) {
        storage[index].artistId = null;
      }
    });
  }

  deleteArtist(id: string) {
    const artistIndex = this.findArtistIndexById(id);
    this.setArtistIdToNull(id, this._tracks);
    this.setArtistIdToNull(id, this._albums);

    this._artists.splice(artistIndex, 1);
  }
}

const db = new DB();

export default db;
