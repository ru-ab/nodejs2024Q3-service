import { Module } from '@nestjs/common';
import { IRepositoryService } from './repository.interfaces';
import { RepositoryService } from './repository.service';
import { PrismaService } from './prisma.service';

const repositoryServiceProvider = {
  provide: IRepositoryService,
  useClass: RepositoryService,
};

@Module({
  providers: [PrismaService, repositoryServiceProvider],
  exports: [repositoryServiceProvider],
})
export class RepositoryModule {}
