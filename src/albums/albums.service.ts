import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import db from 'src/db';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    return db.createAlbum(createAlbumDto);
  }

  findAll() {
    return db.getAlbums();
  }

  findOne(id: string) {
    return db.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return db.deleteAlbum(id);
  }
}
