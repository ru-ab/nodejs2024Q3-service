import { Inject, Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { IRepositoryService } from '../repository/repository.interfaces';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  async findAll() {
    const trackIds = await this.repositoryService.favs.tracks.findAll();
    const albumIds = await this.repositoryService.favs.albums.findAll();
    const artistIds = await this.repositoryService.favs.artists.findAll();

    const [tracks, albums, artists] = await Promise.all([
      Promise.all(
        trackIds.map(({ id }) => this.repositoryService.tracks.findOne(id)),
      ),
      Promise.all(
        albumIds.map(({ id }) => this.repositoryService.albums.findOne(id)),
      ),
      Promise.all(
        artistIds.map(({ id }) => this.repositoryService.artists.findOne(id)),
      ),
    ]);

    return { tracks, albums, artists };
  }

  async addTrack(id: string): Promise<Track | null> {
    const track = await this.repositoryService.tracks.findOne(id);
    if (!track) {
      return null;
    }

    await this.repositoryService.favs.tracks.create({ id });
    return track;
  }

  async removeTrack(id: string): Promise<string | null> {
    const trackItem = await this.repositoryService.favs.tracks.findOne(id);
    if (!trackItem) {
      return null;
    }

    await this.repositoryService.favs.tracks.remove(id);
    return id;
  }

  async addAlbum(id: string): Promise<Album | null> {
    const album = await this.repositoryService.albums.findOne(id);
    if (!album) {
      return null;
    }

    await this.repositoryService.favs.albums.create({ id });
    return album;
  }

  async removeAlbum(id: string): Promise<string | null> {
    const albumItem = await this.repositoryService.favs.albums.findOne(id);
    if (!albumItem) {
      return null;
    }

    await this.repositoryService.favs.albums.remove(id);
    return id;
  }

  async addArtist(id: string) {
    const artist = await this.repositoryService.artists.findOne(id);
    if (!artist) {
      return null;
    }

    await this.repositoryService.favs.artists.create({ id });
    return artist;
  }

  async removeArtist(id: string): Promise<string | null> {
    const artistItem = await this.repositoryService.favs.artists.findOne(id);
    if (!artistItem) {
      return null;
    }

    await this.repositoryService.favs.artists.remove(id);
    return id;
  }
}
