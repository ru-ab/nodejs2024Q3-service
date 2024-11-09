import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty()
  albumId: string | null; // refers to Album

  @IsInt()
  @ApiProperty()
  duration: number; // integer number
}
