import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from '../repository/repository.module';
import { PasswordService } from './password.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule, RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
