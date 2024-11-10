import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.repositoryService.tracks.create(createTrackDto);
  }

  findAll(): Promise<Track[]> {
    return this.repositoryService.tracks.findAll();
  }

  async findOne(id: string): Promise<Track | null> {
    const track = await this.repositoryService.tracks.findOne(id);
    if (!track) {
      return null;
    }
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    const updatedTrack = await this.repositoryService.tracks.update(
      id,
      updateTrackDto,
    );
    if (!updatedTrack) {
      return null;
    }
    return updatedTrack;
  }

  async remove(id: string): Promise<Track | null> {
    const removedTrack = await this.repositoryService.tracks.remove(id);
    if (!removedTrack) {
      return null;
    }
    await this.favsService.removeTrack(id);
    return removedTrack;
  }

  async setArtistToNull(artistId: string): Promise<void> {
    const tracks = await this.repositoryService.tracks.findAll();
    for (const track of tracks) {
      if (track.artistId === artistId) {
        await this.repositoryService.tracks.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    }
  }

  async setAlbumToNull(albumId: string): Promise<void> {
    const tracks = await this.repositoryService.tracks.findAll();
    for (const track of tracks) {
      if (track.albumId === albumId) {
        await this.repositoryService.tracks.update(track.id, {
          ...track,
          albumId: null,
        });
      }
    }
  }
}
