import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorite {
  id: string;

  @ApiProperty({
    isArray: true,
    type: Track,
  })
  tracks: Track[];

  @ApiProperty({
    isArray: true,
    type: Album,
  })
  albums: Album[];

  @ApiProperty({
    isArray: true,
    type: Artist,
  })
  artists: Artist[];
}
