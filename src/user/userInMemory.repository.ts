import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserRepository } from './user.interfaces';

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  async getById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User | null> {
    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };
    return newUser;
  }
}
