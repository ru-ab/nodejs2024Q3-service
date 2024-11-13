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
    return this.repositoryService.tracks.findOne(id);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | null> {
    return this.repositoryService.tracks.update(id, updateTrackDto);
  }

  async remove(id: string): Promise<Track | null> {
    return this.repositoryService.tracks.remove(id);
  }
}
