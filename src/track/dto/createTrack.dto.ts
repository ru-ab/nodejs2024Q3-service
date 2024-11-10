import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { AlbumExists } from '../../album/decorators/albumExists.decorator';
import { ArtistExists } from '../../artist/decorators/artistExists.decorator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bohemian Rhapsody',
  })
  name: string;

  @ArtistExists()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

  @AlbumExists()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Refers to Album',
    nullable: true,
    format: 'uuid',
  })
  albumId: string | null;

  @IsInt()
  @ApiProperty({
    description: 'In seconds',
    type: 'integer',
    example: 355,
  })
  duration: number;
}
