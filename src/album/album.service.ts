import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './entities/album.entity';
@Injectable()
export class AlbumService {
  constructor(
    private readonly repositoryService: RepositoryService<Album>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.repositoryService.create(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Album | null> {
    const album = await this.repositoryService.findOne(id);
    if (!album) {
      return null;
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    const updatedAlbum = await this.repositoryService.update(
      id,
      updateAlbumDto,
    );
    if (!updatedAlbum) {
      return null;
    }
    return updatedAlbum;
  }

  async remove(id: string): Promise<Album | null> {
    const removedAlbum = await this.repositoryService.remove(id);
    if (!removedAlbum) {
      return null;
    }
    await this.trackService.setAlbumToNull(id);
    await this.favsService.removeAlbum(id);
    return removedAlbum;
  }

  async setArtistToNull(artistId: string): Promise<void> {
    const albums = await this.repositoryService.findAll();
    for (const album of albums) {
      if (album.artistId === artistId) {
        await this.repositoryService.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    }
  }
}
