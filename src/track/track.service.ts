import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly repositoryService: RepositoryService<Track>,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.repositoryService.create(createTrackDto);
  }

  findAll(): Promise<Track[]> {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Track | null> {
    const track = await this.repositoryService.findOne(id);
    if (!track) {
      return null;
    }
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    const updatedTrack = await this.repositoryService.update(
      id,
      updateTrackDto,
    );
    if (!updatedTrack) {
      return null;
    }
    return updatedTrack;
  }

  async remove(id: string): Promise<Track | null> {
    const removedTrack = await this.repositoryService.remove(id);
    if (!removedTrack) {
      return null;
    }
    await this.favsService.removeTrack(id);
    return removedTrack;
  }

  async setArtistToNull(artistId: string): Promise<void> {
    const tracks = await this.repositoryService.findAll();
    for (const track of tracks) {
      if (track.artistId === artistId) {
        await this.repositoryService.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    }
  }

  async setAlbumToNull(albumId: string): Promise<void> {
    const tracks = await this.repositoryService.findAll();
    for (const track of tracks) {
      if (track.albumId === albumId) {
        await this.repositoryService.update(track.id, {
          ...track,
          albumId: null,
        });
      }
    }
  }
}
