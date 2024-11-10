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
    const artist = await this.repositoryService.artists.findOne(id);
    if (!artist) {
      return null;
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    const updatedArtist = await this.repositoryService.artists.update(
      id,
      updateArtistDto,
    );
    if (!updatedArtist) {
      return null;
    }
    return updatedArtist;
  }

  async remove(id: string): Promise<Artist | null> {
    const removedArtist = await this.repositoryService.artists.remove(id);
    if (!removedArtist) {
      return null;
    }

    const tracks = await this.repositoryService.tracks.findAll();
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.repositoryService.tracks.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    }

    const albums = await this.repositoryService.albums.findAll();
    for (const album of albums) {
      if (album.artistId === id) {
        await this.repositoryService.albums.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    }

    await this.repositoryService.favs.artists.remove(id);
    return removedArtist;
  }
}
