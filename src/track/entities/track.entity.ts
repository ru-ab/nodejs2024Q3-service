import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'The Show Must Go On',
  })
  name: string;

  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Refers to Album',
    nullable: true,
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    example: 262,
  })
  duration: number;
}
