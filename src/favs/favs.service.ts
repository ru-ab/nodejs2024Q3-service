import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '../album/album.interfaces';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { Track } from '../track/track.interfaces';
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

  async addTrack(id: string): Promise<Track | null> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      return null;
    }

    this.favorites.tracks.push(id);
    return track;
  }

  async removeTrack(id: string): Promise<string | null> {
    if (!this.favorites.tracks.includes(id)) {
      return null;
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return id;
  }

  async addAlbum(id: string): Promise<Album | null> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      return null;
    }

    this.favorites.albums.push(id);
    return album;
  }

  async removeAlbum(id: string): Promise<string | null> {
    if (!this.favorites.albums.includes(id)) {
      return null;
    }

    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    return id;
  }

  async addArtist(id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      return null;
    }
    this.favorites.artists.push(id);
    return artist;
  }

  async removeArtist(id: string): Promise<string | null> {
    if (!this.favorites.artists.includes(id)) {
      return null;
    }

    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    return id;
  }
}
