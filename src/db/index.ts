import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist, Track, User, Album, Favorites } from 'src/interfaces';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

class DB {
  private _users: User[];
  private _tracks: Track[];
  private _artists: Artist[];
  private _albums: Album[];
  private _favorites: Favorites;

  constructor() {
    this._users = [];
    this._tracks = [];
    this._artists = [];
    this._albums = [];
    this._favorites = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  private findItemIndexById<T extends Array<User | Track | Artist | Album>>(
    id: string,
    items: T,
  ) {
    const index = items.findIndex((item) => item.id === id);
    return index;
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
    const userIndex = this.findItemIndexById(id, this._users);

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
    const userIndex = this.findItemIndexById(id, this._users);

    this._users.splice(userIndex, 1);
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

  updateTrack(id: string, trackDto: UpdateTrackDto) {
    const trackIndex = this.findItemIndexById(id, this._tracks);
    const track = this._tracks[trackIndex];

    const updatedTrack: Track = {
      id: track.id,
      ...trackDto,
    };

    this._tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = this.findItemIndexById(id, this._tracks);

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

  updateArtist(id: string, artistDto: UpdateArtistDto) {
    const artistIndex = this.findItemIndexById(id, this._artists);
    const artist = this._artists[artistIndex];

    const updatedArtist: Artist = {
      id: artist.id,
      ...artistDto,
    };

    this._artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  private setPropIdToNull<T extends Array<Track | Album>>(
    id: string,
    propKey: 'artistId' | 'albumId',
    storage: T,
  ) {
    storage.forEach((item, index, storage) => {
      if (item[propKey] === id) {
        storage[index][propKey] = null;
      }
    });
  }

  deleteArtist(id: string) {
    const artistIndex = this.findItemIndexById(id, this._artists);
    this.setPropIdToNull(id, 'artistId', this._tracks);
    this.setPropIdToNull(id, 'artistId', this._albums);

    this._artists.splice(artistIndex, 1);
  }

  getAlbums() {
    return this._albums;
  }

  getAlbum(id: string) {
    const album = this._albums.find((album) => album.id === id);
    return album;
  }

  createAlbum(albumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...albumDto,
    };

    this._albums.push(album);

    return album;
  }

  updateAlbum(id: string, albumDto: UpdateAlbumDto) {
    const albumIndex = this.findItemIndexById(id, this._albums);
    const album = this._albums[albumIndex];

    const updatedAlbum = {
      id: album.id,
      ...albumDto,
    };

    this._albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const albumIndex = this.findItemIndexById(id, this._albums);
    this.setPropIdToNull(id, 'albumId', this._tracks);

    this._albums.splice(albumIndex, 1);
  }

  getFavorites() {
    const favorites = {
      artists: this._artists.filter((artist) =>
        this._favorites.artists.includes(artist.id),
      ),
      albums: this._albums.filter((album) =>
        this._favorites.albums.includes(album.id),
      ),
      tracks: this._tracks.filter((track) =>
        this._favorites.tracks.includes(track.id),
      ),
    };

    return favorites;
  }

  addTrackToFavorites(id: string) {
    this._favorites.tracks.push(id);
  }

  addAlbumToFavorites(id: string) {
    this._favorites.albums.push(id);
  }

  addArtistToFavorites(id: string) {
    this._favorites.artists.push(id);
  }

  deleteTrackFromFavorites(id: string) {
    let isDeleted = false;
    const trackIndex = this._favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIndex) {
      this._favorites.tracks.splice(trackIndex, 1);
      isDeleted = true;
    }

    return isDeleted;
  }

  deleteAlbumFromFavorites(id: string) {
    let isDeleted = false;
    const albumIndex = this._favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIndex) {
      this._favorites.albums.splice(albumIndex, 1);
      isDeleted = true;
    }

    return isDeleted;
  }

  deleteArtistFromFavorites(id: string) {
    let isDeleted = false;
    const artistIndex = this._favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex) {
      this._favorites.artists.splice(artistIndex, 1);
      isDeleted = true;
    }

    return isDeleted;
  }
}

const db = new DB();

export default db;
