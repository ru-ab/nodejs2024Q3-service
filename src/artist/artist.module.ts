import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavsModule } from '../favs/favs.module';
import { RepositoryModule } from '../repository/repository.module';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    RepositoryModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
