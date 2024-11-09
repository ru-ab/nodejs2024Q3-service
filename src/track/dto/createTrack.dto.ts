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
  @ApiProperty({
    example: 'Bohemian Rhapsody',
  })
  name: string;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Refers to Artist',
    nullable: true,
    format: 'uuid',
  })
  artistId: string | null;

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
