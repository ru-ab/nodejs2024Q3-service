import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: RepositoryService<User>) {}

  async findAll(): Promise<User[]> {
    return this.repositoryService.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.repositoryService.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.repositoryService.create({
      ...dto,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
    return user;
  }

  async updatePassword(
    user: User,
    dto: UpdatePasswordDto,
  ): Promise<User | null> {
    const updatedUser = await this.repositoryService.update(user.id, {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User | null> {
    const removedUser = await this.repositoryService.remove(id);
    if (!removedUser) {
      return null;
    }
    return removedUser;
  }

  excludePasswordFromUser(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }
}
