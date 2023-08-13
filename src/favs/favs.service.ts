import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const albums = await this.prisma.favoriteToAlbum.findMany({
      select: { album: true },
    });
    const tracks = await this.prisma.favoriteToTrack.findMany({
      select: { track: true },
    });
    const artists = await this.prisma.favoriteToArtist.findMany({
      select: { artist: true },
    });
    const favorites = { albums, tracks, artists };

    return favorites;
  }

  async addTrackToFavorites(id: string) {
    await this.prisma.favoriteToTrack.create({
      data: {
        track: { connect: { id } },
      },
    });
    return `Track with ${id} was added to favorites`;
  }

  async addAlbumToFavorites(id: string) {
    await this.prisma.favoriteToAlbum.create({
      data: {
        album: { connect: { id } },
      },
    });
    return `Album with ${id} was added to favorites`;
  }

  async addArtistToFavorites(id: string) {
    await this.prisma.favoriteToArtist.create({
      data: {
        artist: { connect: { id } },
      },
    });
    return `Artist with ${id} was added to favorites`;
  }

  async removeTrack(id: string) {
    await this.prisma.favoriteToTrack.delete({
      where: { trackId: id },
    });
  }

  async removeAlbum(id: string) {
    await this.prisma.favoriteToAlbum.delete({
      where: { albumId: id },
    });
  }

  async removeArtist(id: string) {
    await this.prisma.favoriteToArtist.delete({
      where: { artistId: id },
    });
  }
}
