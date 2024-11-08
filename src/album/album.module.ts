import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from '../favs/favs.module';
import { RepositoryModule } from '../repository/repository.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => FavsModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
