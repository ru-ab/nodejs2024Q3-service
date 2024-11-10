import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { FavsModule } from '../favs/favs.module';
import { IRepositoryService } from '../repository/repository.interfaces';
import { RepositoryModule } from '../repository/repository.module';
import { RepositoryService } from '../repository/repository.service';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [
    RepositoryModule,
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: IRepositoryService,
      useClass: RepositoryService,
    },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
