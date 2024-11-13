import { Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';
import { PrismaService } from './prisma.service';
import { Repository } from './repository';
import {
  IRepositoryResource,
  IRepositoryService,
} from './repository.interfaces';
import { AlbumRepositoryResource } from './resources/albumRepositoryResource';
import { ArtistRepositoryResource } from './resources/artistRepositoryResource';
import { TrackRepositoryResource } from './resources/trackRepositoryResource';
import { UserRepositoryResource } from './resources/userRepositoryResource';

@Injectable()
export class RepositoryService implements IRepositoryService {
  public users: IRepositoryResource<User>;
  public albums: IRepositoryResource<Album> = new Repository<Album>();
  public artists: IRepositoryResource<Artist> = new Repository<Artist>();
  public tracks: IRepositoryResource<Track> = new Repository<Track>();

  constructor(prismaService: PrismaService) {
    this.users = new UserRepositoryResource(prismaService);
    this.albums = new AlbumRepositoryResource(prismaService);
    this.artists = new ArtistRepositoryResource(prismaService);
    this.tracks = new TrackRepositoryResource(prismaService);
  }
}
