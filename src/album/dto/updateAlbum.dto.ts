import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './createAlbum.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
