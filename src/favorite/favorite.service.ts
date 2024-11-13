import { Inject, Injectable } from '@nestjs/common';
import { Album, Track } from '@prisma/client';
import { IRepositoryService } from '../repository/repository.interfaces';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  async getFavorites() {
    const favorite = await this.getFavoriteOrCreate();
    return {
      albums: favorite.albums,
      artists: favorite.artists,
      tracks: favorite.tracks,
    };
  }

  async addTrack(id: string): Promise<Track | null> {
    const track = await this.repositoryService.tracks.findOne(id);
    if (!track || track.favoriteId) {
      return null;
    }
    const favorite = await this.getFavoriteOrCreate();
    await this.repositoryService.tracks.update(track.id, {
      favoriteId: favorite.id,
    });
    return track;
  }

  async removeTrack(id: string): Promise<string | null> {
    const track = await this.repositoryService.tracks.findOne(id);
    if (!track || !track.favoriteId) {
      return null;
    }
    await this.repositoryService.tracks.update(id, { favoriteId: null });
    return id;
  }

  async addAlbum(id: string): Promise<Album | null> {
    const album = await this.repositoryService.albums.findOne(id);
    if (!album || album.favoriteId) {
      return null;
    }
    const favorite = await this.getFavoriteOrCreate();
    await this.repositoryService.albums.update(album.id, {
      favoriteId: favorite.id,
    });
    return album;
  }

  async removeAlbum(id: string): Promise<string | null> {
    const album = await this.repositoryService.albums.findOne(id);
    if (!album || !album.favoriteId) {
      return null;
    }
    await this.repositoryService.albums.update(id, { favoriteId: null });
    return id;
  }

  async addArtist(id: string) {
    const artist = await this.repositoryService.artists.findOne(id);
    if (!artist || artist.favoriteId) {
      return null;
    }
    const favorite = await this.getFavoriteOrCreate();
    await this.repositoryService.artists.update(artist.id, {
      favoriteId: favorite.id,
    });
    return artist;
  }

  async removeArtist(id: string): Promise<string | null> {
    const artist = await this.repositoryService.artists.findOne(id);
    if (!artist || !artist.favoriteId) {
      return null;
    }
    await this.repositoryService.artists.update(id, { favoriteId: null });
    return id;
  }

  private async getFavoriteOrCreate() {
    const favorites = await this.repositoryService.favorites.findAll();
    if (!favorites.length) {
      return this.repositoryService.favorites.create();
    }
    return favorites[0];
  }
}
