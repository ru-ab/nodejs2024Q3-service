import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { TrackService } from '../track/track.service';
import { Album } from './album.interfaces';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly repositoryService: RepositoryService<Album>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.repositoryService.create(createAlbumDto);
  }

  findAll() {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Album | null> {
    const album = await this.repositoryService.findOne(id);
    if (!album) {
      return null;
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.repositoryService.update(
      id,
      updateAlbumDto,
    );
    if (!updatedAlbum) {
      throw new NotFoundException();
    }
    return updatedAlbum;
  }

  async remove(id: string) {
    const removedAlbum = await this.repositoryService.remove(id);
    if (!removedAlbum) {
      throw new NotFoundException();
    }
    await this.trackService.setAlbumToNull(id);
    await this.favsService.removeAlbum(id);
  }

  async setArtistToNull(artistId: string) {
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
