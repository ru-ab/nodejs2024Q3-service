import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Innuendo',
  })
  name: string;

  @ApiProperty({
    type: 'integer',
    example: 1991,
  })
  year: number;

  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;
}
