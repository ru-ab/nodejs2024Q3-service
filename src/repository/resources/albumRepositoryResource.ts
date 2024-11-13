import { PrismaService } from '../prisma.service';
import { IRepositoryResource } from '../repository.interfaces';
import { Album } from '../../album/entities/album.entity';

export class AlbumRepositoryResource implements IRepositoryResource<Album> {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.prismaService.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    return this.prismaService.album.findFirst({ where: { id } });
  }

  async create(dto: Omit<Album, 'id'>): Promise<Album> {
    return this.prismaService.album.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<Album>): Promise<Album> {
    return this.prismaService.album.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Album> {
    return this.prismaService.album.delete({ where: { id } });
  }
}
