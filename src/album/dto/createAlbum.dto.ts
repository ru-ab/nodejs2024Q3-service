import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty({
    type: 'integer',
  })
  year: number;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;
}
