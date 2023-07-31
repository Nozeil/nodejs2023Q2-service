import { Injectable } from '@nestjs/common';
import db from 'src/db';

@Injectable()
export class FavsService {
  findAll() {
    return db.getFavorites();
  }

  addTrackToFavorites(id: string) {
    db.addTrackToFavorites(id);
    return `Track with ${id} was added to favorites`;
  }

  addAlbumToFavorites(id: string) {
    db.addAlbumToFavorites(id);
    return `Album with ${id} was added to favorites`;
  }

  addArtistToFavorites(id: string) {
    db.addArtistToFavorites(id);
    return `Artist with ${id} was added to favorites`;
  }

  removeTrack(id: string) {
    return db.deleteTrackFromFavorites(id);
  }

  removeAlbum(id: string) {
    return db.deleteAlbumFromFavorites(id);
  }

  removeArtist(id: string) {
    return db.deleteArtistFromFavorites(id);
  }
}
