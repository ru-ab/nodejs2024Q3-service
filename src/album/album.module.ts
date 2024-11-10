import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumExistsRule } from './decorators/albumExists.decorator';

@Module({
  imports: [RepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumExistsRule],
  exports: [AlbumService],
})
export class AlbumModule {}
