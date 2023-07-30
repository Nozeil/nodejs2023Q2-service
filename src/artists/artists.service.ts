import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db from 'src/db';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    return db.createArtist(createArtistDto);
  }

  findAll() {
    return db.getArtists();
  }

  findOne(id: string) {
    return db.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return db.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return db.deleteArtist(id);
  }
}
