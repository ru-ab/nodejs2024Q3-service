import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from '../favs/favs.module';
import { RepositoryModule } from '../repository/repository.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => FavsModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
