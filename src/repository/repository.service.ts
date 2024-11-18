import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { PrismaService } from './prisma.service';
import {
  IRepositoryResource,
  IRepositoryService,
} from './repository.interfaces';
import { AlbumRepositoryResource } from './resources/albumRepositoryResource';
import { ArtistRepositoryResource } from './resources/artistRepositoryResource';
import { FavoriteRepositoryResource } from './resources/favoriteRepositoryResource';
import { TrackRepositoryResource } from './resources/trackRepositoryResource';
import { UserRepositoryResource } from './resources/userRepositoryResource';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class RepositoryService implements IRepositoryService {
  public users: IRepositoryResource<User>;
  public albums: IRepositoryResource<Album>;
  public artists: IRepositoryResource<Artist>;
  public tracks: IRepositoryResource<Track>;
  public favorites: FavoriteRepositoryResource;

  constructor(prismaService: PrismaService) {
    this.users = new UserRepositoryResource(prismaService);
    this.albums = new AlbumRepositoryResource(prismaService);
    this.artists = new ArtistRepositoryResource(prismaService);
    this.tracks = new TrackRepositoryResource(prismaService);
    this.favorites = new FavoriteRepositoryResource(prismaService);
  }
}
