import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavsModule } from '../favs/favs.module';
import { IRepositoryService } from '../repository/repository.interfaces';
import { RepositoryModule } from '../repository/repository.module';
import { RepositoryService } from '../repository/repository.service';
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
  providers: [
    ArtistService,
    {
      provide: IRepositoryService,
      useClass: RepositoryService,
    },
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
