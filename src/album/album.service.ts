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
    const album = await this.repositoryService.albums.findOne(id);
    if (!album) {
      return null;
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    const updatedAlbum = await this.repositoryService.albums.update(
      id,
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  async remove(id: string): Promise<Album | null> {
    const removedAlbum = await this.repositoryService.albums.remove(id);
    if (!removedAlbum) {
      return null;
    }

    const tracks = await this.repositoryService.tracks.findAll();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.repositoryService.tracks.update(track.id, {
          ...track,
          albumId: null,
        });
      }
    }
    return removedAlbum;
  }
}
