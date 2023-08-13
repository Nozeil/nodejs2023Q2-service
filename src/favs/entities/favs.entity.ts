import { Transform } from 'class-transformer';
import type { Album, Artist, Track } from 'src/interfaces';

type Albums = { album: Album }[];
type Tracks = { track: Track }[];
type Artists = { artist: Artist }[];

export class Favorites {
  @Transform(({ value }) => (value as Albums).map((item) => item.album))
  albums: Albums;

  @Transform(({ value }) => (value as Tracks).map((item) => item.track))
  tracks: Tracks;

  @Transform(({ value }) => (value as Artists).map((item) => item.artist))
  artists: Artists;

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
