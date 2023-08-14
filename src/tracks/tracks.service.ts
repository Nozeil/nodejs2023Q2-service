import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = createTrackDto;
    const track = await this.prisma.track.create({
      data: {
        name,
        duration,
        album: albumId ? { connect: { id: albumId } } : undefined,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
    return track;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    return track;
  }

  async update(
    id: string,
    { albumId, artistId, duration, name }: UpdateTrackDto,
  ) {
    const track = await this.prisma.track.update({
      data: {
        name,
        duration,
        album: albumId ? { connect: { id: albumId } } : undefined,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
      where: { id },
    });
    return track;
  }

  async remove(id: string) {
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
