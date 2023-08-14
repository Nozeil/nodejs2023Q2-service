import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}
  async create({ artistId, name, year }: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        name,
        year,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
    return album;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    return album;
  }

  async update(id: string, { artistId, name, year }: UpdateAlbumDto) {
    const album = await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        name,
        year,
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
    return album;
  }

  async remove(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
