import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repositoryService.users.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.repositoryService.users.findOne(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.repositoryService.users.create({
      ...dto,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
  }

  async updatePassword(
    user: User,
    dto: UpdatePasswordDto,
  ): Promise<User | null> {
    return this.repositoryService.users.update(user.id, {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
  }

  async remove(id: string): Promise<User | null> {
    return this.repositoryService.users.remove(id);
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
