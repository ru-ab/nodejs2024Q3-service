import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './createTrack.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
