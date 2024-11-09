import { PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './createArtist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
