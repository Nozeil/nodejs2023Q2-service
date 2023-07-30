import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [TracksModule, AlbumsModule, ArtistsModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
