import { Module } from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { RepositoryModule } from '../repository/repository.module';
import { RepositoryService } from '../repository/repository.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IRepositoryService,
      useClass: RepositoryService,
    },
  ],
})
export class UserModule {}
