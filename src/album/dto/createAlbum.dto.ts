import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ArtistExists } from '../../artist/decorators/artistExists.decorator';

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

  @ArtistExists()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;
}
