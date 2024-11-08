import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User, UserWithoutPassword } from './user.interfaces';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: RepositoryService<User>) {}

  async getAll(): Promise<UserWithoutPassword[]> {
    const users = await this.repositoryService.findAll();
    const usersWithoutPassword = users.map((user) =>
      this.excludePasswordFromUser(user),
    );
    return usersWithoutPassword;
  }

  async getById(id: string): Promise<UserWithoutPassword> {
    const user = await this.repositoryService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async createUser(dto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.repositoryService.create({
      ...dto,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    let user = await this.repositoryService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }

    user = await this.repositoryService.update(id, {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    if (!user) {
      throw new NotFoundException();
    }

    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.repositoryService.remove(id);
    if (!user) {
      throw new NotFoundException();
    }
  }

  private excludePasswordFromUser(user: User): UserWithoutPassword {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }
}
