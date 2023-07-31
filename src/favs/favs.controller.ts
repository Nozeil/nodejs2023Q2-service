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
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    const message = this.favsService.addTrackToFavorites(id);

    return message;
  }

  @Post('album/:id')
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const message = this.favsService.addAlbumToFavorites(id);

    return message;
  }

  @Post('artist/:id')
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const message = this.favsService.addArtistToFavorites(id);

    return message;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const isDeleted = this.favsService.removeTrack(id);

    if (!isDeleted) {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const isDeleted = this.favsService.removeAlbum(id);

    if (!isDeleted) {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const isDeleted = this.favsService.removeArtist(id);

    if (!isDeleted) {
      throw new UnprocessableEntityException();
    }
  }
}
