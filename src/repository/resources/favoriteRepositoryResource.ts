import { Favorite } from '../../favorite/entities/favorite.entity';
import { PrismaService } from '../prisma.service';

const include = {
  albums: {
    select: {
      id: true,
      name: true,
      year: true,
      artistId: true,
    },
  },
  artists: {
    select: {
      id: true,
      name: true,
      grammy: true,
    },
  },
  tracks: {
    select: {
      id: true,
      name: true,
      duration: true,
      albumId: true,
      artistId: true,
    },
  },
};

export class FavoriteRepositoryResource {
  constructor(private readonly prismaService: PrismaService) {}
  async create(): Promise<Favorite> {
    return this.prismaService.favorite.create({
      data: {},
      include,
    });
  }

  async findAll(): Promise<Favorite[]> {
    return this.prismaService.favorite.findMany({
      include,
    });
  }
}
