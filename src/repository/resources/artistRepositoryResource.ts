import { Artist } from '../../artist/entities/artist.entity';
import { PrismaService } from '../prisma.service';
import { IRepositoryResource } from '../repository.interfaces';

export class ArtistRepositoryResource implements IRepositoryResource<Artist> {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    return this.prismaService.artist.findFirst({ where: { id } });
  }

  async create(dto: Omit<Artist, 'id'>): Promise<Artist> {
    return this.prismaService.artist.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<Artist>): Promise<Artist> {
    return this.prismaService.artist.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Artist> {
    return this.prismaService.artist.delete({ where: { id } });
  }
}
