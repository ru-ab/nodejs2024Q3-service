import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.repositoryService.artists.create(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.repositoryService.artists.findAll();
  }

  async findOne(id: string): Promise<Artist | null> {
    return this.repositoryService.artists.findOne(id);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return this.repositoryService.artists.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<Artist | null> {
    return this.repositoryService.artists.remove(id);
  }
}
