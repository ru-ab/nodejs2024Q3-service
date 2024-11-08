import { randomUUID } from 'crypto';
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

  async createUser(
    dto: Pick<User, 'login' | 'password'>,
  ): Promise<User | null> {
    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(
    id: string,
    dto: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      return null;
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...dto,
    };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) {
      return null;
    }

    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
