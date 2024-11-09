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
  @ApiProperty()
  year: number;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty()
  artistId: string | null; // refers to Artist
}
