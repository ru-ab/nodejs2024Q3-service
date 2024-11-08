import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User, UserRepository, UserWithoutPassword } from './user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async getAll(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.getAll();
    const usersWithoutPassword = users.map((user) =>
      this.excludePasswordFromUser(user),
    );
    return usersWithoutPassword;
  }

  async getById(id: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async createUser(dto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.userRepository.createUser(dto);
    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    let user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }

    user = await this.userRepository.updateUser(id, {
      password: dto.newPassword,
      version: user.version + 1,
    });
    if (!user) {
      throw new NotFoundException();
    }

    const userWithoutPassword = this.excludePasswordFromUser(user);
    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.deleteUser(id);
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
