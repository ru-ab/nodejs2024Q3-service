import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';

export interface IRepositoryItem {
  id: string;
}

export interface IRepositoryResource<T extends IRepositoryItem> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create<D extends T>(dto: Omit<D, 'id'>): Promise<T>;
  update(id: string, dto: Partial<T>): Promise<T | null>;
  remove(id: string): Promise<T | null>;
}

export interface IRepositoryService {
  users: IRepositoryResource<User>;
  albums: IRepositoryResource<Album>;
  artists: IRepositoryResource<Artist>;
  tracks: IRepositoryResource<Track>;
  favs: {
    albums: IRepositoryResource<IRepositoryItem>;
    artists: IRepositoryResource<IRepositoryItem>;
    tracks: IRepositoryResource<IRepositoryItem>;
  };
}

export const IRepositoryService = Symbol('IRepositoryService');
