import { Module } from '@nestjs/common';
import { IRepositoryService } from './repository.interfaces';
import { RepositoryService } from './repository.service';

const repositoryServiceProvider = {
  provide: IRepositoryService,
  useClass: RepositoryService,
};

@Module({
  providers: [repositoryServiceProvider],
  exports: [repositoryServiceProvider],
})
export class RepositoryModule {}
