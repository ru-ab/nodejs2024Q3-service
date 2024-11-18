import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [RepositoryModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
