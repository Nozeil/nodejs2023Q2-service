import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);
    return artist;
  }

  @Get()
  async findAll() {
    const artists = await this.artistsService.findAll();
    return artists;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    const updatedArtist = await this.artistsService.update(id, updateArtistDto);

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artistsService.remove(id);
  }
}
