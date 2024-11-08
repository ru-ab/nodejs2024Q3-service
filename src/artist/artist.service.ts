import { forwardRef, Inject, Injectable } from '@nestjs/common';
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

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.repositoryService.create(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Artist | null> {
    const artist = await this.repositoryService.findOne(id);
    if (!artist) {
      return null;
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    const updatedArtist = await this.repositoryService.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist) {
      return null;
    }
    return updatedArtist;
  }

  async remove(id: string): Promise<Artist | null> {
    const removedArtist = await this.repositoryService.remove(id);
    if (!removedArtist) {
      return null;
    }
    await this.trackService.setArtistToNull(id);
    await this.albumService.setArtistToNull(id);
    await this.favsService.removeArtist(id);
    return removedArtist;
  }
}
