import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import db from 'src/db';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    return db.createTrack(createTrackDto);
  }

  findAll() {
    return db.getTracks();
  }

  findOne(id: string) {
    return db.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return db.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return db.deleteTrack(id);
  }
}
