import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserRepository } from './user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  getAll() {
    return this.userRepository.getAll();
  }

  getById(id: string) {
    return this.userRepository.getById(id);
  }

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.createUser(dto);
    if (!user) {
      return null;
    }

    const userWithoutPassword: Omit<User, 'password'> = {
      id: user.id,
      login: user.login,
      version: user.version,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };

    return userWithoutPassword;
  }
}
