import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { IRepositoryService } from '../repository/repository.interfaces';
import { RepositoryService } from '../repository/repository.service';
import { TrackModule } from '../track/track.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: IRepositoryService,
      useClass: RepositoryService,
    },
  ],
  exports: [FavsService],
})
export class FavsModule {}
