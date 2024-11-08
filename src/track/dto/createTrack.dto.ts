import { IsInt, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
