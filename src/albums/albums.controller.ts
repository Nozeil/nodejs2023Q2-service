import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    const updatedAlbum = this.albumsService.update(id, updateAlbumDto);

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return this.albumsService.remove(id);
  }
}
