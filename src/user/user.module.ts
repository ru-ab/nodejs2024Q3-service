import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PasswordService } from './password.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
