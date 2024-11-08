import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  private favorites: {
    tracks: string[];
    albums: string[];
    artists: string[];
  } = {
    tracks: [],
    albums: [],
    artists: [],
  };

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async findAll() {
    const [tracks, albums, artists] = await Promise.all([
      Promise.all(
        this.favorites.tracks.map((id) => this.trackService.findOne(id)),
      ),
      Promise.all(
        this.favorites.albums.map((id) => this.albumService.findOne(id)),
      ),
      Promise.all(
        this.favorites.artists.map((id) => this.artistService.findOne(id)),
      ),
    ]);

    return { tracks, albums, artists };
  }

  async addTrack(id: string) {
    try {
      await this.trackService.findOne(id);
      this.favorites.tracks.push(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: string): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  async addAlbum(id: string) {
    try {
      await this.albumService.findOne(id);
      return this.favorites.albums.push(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbum(id: string): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  async addArtist(id: string) {
    try {
      await this.artistService.findOne(id);
      return this.favorites.artists.push(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: string): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
