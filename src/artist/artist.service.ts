import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { Artist } from './artist.interfaces';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly repositoryService: RepositoryService<Artist>) {}

  create(createArtistDto: CreateArtistDto) {
    return this.repositoryService.create(createArtistDto);
  }

  findAll() {
    return this.repositoryService.findAll();
  }

  async findOne(id: string) {
    const artist = await this.repositoryService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.repositoryService.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist) {
      throw new NotFoundException();
    }
    return updatedArtist;
  }

  async remove(id: string) {
    const removedArtist = await this.repositoryService.remove(id);
    if (!removedArtist) {
      throw new NotFoundException();
    }
  }
}
