import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistExistsRule } from './decorators/artistExists.decorator';

@Module({
  imports: [RepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistExistsRule],
  exports: [ArtistService],
})
export class ArtistModule {}
