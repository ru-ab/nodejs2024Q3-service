import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './entities/album.entity';
@Injectable()
export class AlbumService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.repositoryService.albums.create(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.repositoryService.albums.findAll();
  }

  async findOne(id: string): Promise<Album | null> {
    return this.repositoryService.albums.findOne(id);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    return this.repositoryService.albums.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<Album | null> {
    return this.repositoryService.albums.remove(id);
  }
}
