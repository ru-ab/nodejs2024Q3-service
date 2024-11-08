import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.interfaces';
import { UserService } from './user.service';
import { UserInMemoryRepository } from './userInMemory.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserInMemoryRepository,
    },
  ],
})
export class UserModule {}
