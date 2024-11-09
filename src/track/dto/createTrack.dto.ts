import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty()
  albumId: string | null; // refers to Album

  @IsInt()
  @ApiProperty()
  duration: number; // integer number
}
