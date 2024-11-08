import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updatTrack.dto';
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

  async findOne(id: string) {
    const track = await this.repositoryService.findOne(id);
    if (!track) {
      throw new NotFoundException();
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
}
