import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from '../favs/favs.module';
import { RepositoryModule } from '../repository/repository.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => FavsModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
