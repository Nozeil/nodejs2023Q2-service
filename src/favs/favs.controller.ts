import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Favorites } from './entities/favs.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const favorites = await this.favsService.findAll();
    const serializedFavorites = new Favorites(favorites);
    return serializedFavorites;
  }

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    const message = await this.favsService.addTrackToFavorites(id);

    return message;
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const message = this.favsService.addAlbumToFavorites(id);

    return message;
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const message = this.favsService.addArtistToFavorites(id);

    return message;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favsService.removeTrack(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favsService.removeAlbum(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favsService.removeArtist(id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
