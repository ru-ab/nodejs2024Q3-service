import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favsService.addTrack(id);
    if (!track) {
      throw new UnprocessableEntityException(`Track with ${id} doesn't exist`);
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedTrackId = await this.favsService.removeTrack(id);
    if (!removedTrackId) {
      throw new NotFoundException('Track is not favorite');
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favsService.addAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException(`Album with ${id} doesn't exist`);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedAlbumId = await this.favsService.removeAlbum(id);
    if (!removedAlbumId) {
      throw new NotFoundException('Album is not favorite');
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favsService.addArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with ${id} doesn't exist`);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedArtistId = await this.favsService.removeArtist(id);
    if (!removedArtistId) {
      throw new NotFoundException('Artist is not favorite');
    }
  }
}
