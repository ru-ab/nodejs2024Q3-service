import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
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
    return removedTrack;
  }
}
