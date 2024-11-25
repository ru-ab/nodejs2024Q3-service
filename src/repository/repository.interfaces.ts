import { Album, Artist, Track } from '@prisma/client';
import { FavoriteRepositoryResource } from './resources/favoriteRepositoryResource';
import { UserRepositoryResource } from './resources/userRepositoryResource';

export interface IRepositoryItem {
  id: string;
}

export interface IRepositoryResource<T extends IRepositoryItem> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(dto: Partial<Omit<T, 'id'>>): Promise<T>;
  update(id: string, dto: Partial<T>): Promise<T | null>;
  remove(id: string): Promise<T | null>;
}

export interface IRepositoryService {
  users: UserRepositoryResource;
  albums: IRepositoryResource<Album>;
  artists: IRepositoryResource<Artist>;
  tracks: IRepositoryResource<Track>;
  favorites: FavoriteRepositoryResource;
}

export const IRepositoryService = Symbol('IRepositoryService');
