import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from '../favs/favs.service';
import { RepositoryService } from '../repository/repository.service';
import { Album } from './album.interfaces';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly repositoryService: RepositoryService<Album>,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.repositoryService.create(createAlbumDto);
  }

  findAll() {
    return this.repositoryService.findAll();
  }

  async findOne(id: string) {
    const album = await this.repositoryService.findOne(id);
    if (!album) {
      throw new NotFoundException();
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
    await this.favsService.removeAlbum(id);
  }
}
