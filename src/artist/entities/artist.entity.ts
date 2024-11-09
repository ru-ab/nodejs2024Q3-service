import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Freddie Mercury',
  })
  name: string;

  @ApiProperty({
    example: false,
  })
  grammy: boolean;
}
