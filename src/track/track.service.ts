import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './track.interfaces';

@Injectable()
export class TrackService {
  constructor(
    private readonly repositoryService: RepositoryService<Track>,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.repositoryService.create(createTrackDto);
  }

  findAll() {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<Track | null> {
    const track = await this.repositoryService.findOne(id);
    if (!track) {
      return null;
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.repositoryService.update(
      id,
      updateTrackDto,
    );
    if (!updatedTrack) {
      throw new NotFoundException();
    }
    return updatedTrack;
  }

  async remove(id: string) {
    const removedTrack = await this.repositoryService.remove(id);
    if (!removedTrack) {
      throw new NotFoundException();
    }
    await this.favsService.removeTrack(id);
  }

  async setArtistToNull(artistId: string) {
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

  async setAlbumToNull(albumId: string) {
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
