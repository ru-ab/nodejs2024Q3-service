import { Track } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IRepositoryResource } from '../repository.interfaces';

export class TrackRepositoryResource implements IRepositoryResource<Track> {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    return this.prismaService.track.findFirst({ where: { id } });
  }

  async create(dto: Omit<Track, 'id'>): Promise<Track> {
    return this.prismaService.track.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<Track>): Promise<Track | null> {
    const track = await this.findOne(id);
    if (!track) {
      return null;
    }
    return this.prismaService.track.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Track | null> {
    const track = await this.findOne(id);
    if (!track) {
      return null;
    }
    return this.prismaService.track.delete({ where: { id } });
  }
}
