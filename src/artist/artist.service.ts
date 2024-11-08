import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { TrackService } from '../track/track.service';
import { Artist } from './artist.interfaces';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly repositoryService: RepositoryService<Artist>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.repositoryService.create(createArtistDto);
  }

  findAll() {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Artist | null> {
    const artist = await this.repositoryService.findOne(id);
    if (!artist) {
      return null;
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
    await this.trackService.setArtistToNull(id);
    await this.albumService.setArtistToNull(id);
    await this.favsService.removeArtist(id);
  }
}
