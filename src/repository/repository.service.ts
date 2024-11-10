import { Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from './repository';
import {
  IRepositoryItem,
  IRepositoryResource,
  IRepositoryService,
} from './repository.interfaces';

@Injectable()
export class RepositoryService implements IRepositoryService {
  public users: IRepositoryResource<User> = new Repository<User>();
  public albums: IRepositoryResource<Album> = new Repository<Album>();
  public artists: IRepositoryResource<Artist> = new Repository<Artist>();
  public tracks: IRepositoryResource<Track> = new Repository<Track>();
  public favs: {
    albums: IRepositoryResource<IRepositoryItem>;
    artists: IRepositoryResource<IRepositoryItem>;
    tracks: IRepositoryResource<IRepositoryItem>;
  } = {
    albums: new Repository<IRepositoryItem>(),
    artists: new Repository<IRepositoryItem>(),
    tracks: new Repository<IRepositoryItem>(),
  };
}
