import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { FavsModule } from '../favs/favs.module';
import { IRepositoryService } from '../repository/repository.interfaces';
import { RepositoryModule } from '../repository/repository.module';
import { RepositoryService } from '../repository/repository.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    RepositoryModule,
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: IRepositoryService,
      useClass: RepositoryService,
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}
