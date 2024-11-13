import { User as PrismaUser } from '@prisma/client';
import { User } from '../../user/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { IRepositoryResource } from '../repository.interfaces';

export class UserRepositoryResource implements IRepositoryResource<User> {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(this.convertPrismaUserToUser);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      return null;
    }
    return this.convertPrismaUserToUser(user);
  }

  async create<D extends User>(dto: Omit<D, 'id'>): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        version: dto.version,
        updatedAt: new Date(dto.updatedAt),
        createdAt: new Date(dto.createdAt),
      },
    });
    return this.convertPrismaUserToUser(newUser);
  }

  async update(id: string, dto: Partial<User>): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: Object.assign(
        {},
        dto.login ? { login: dto.login } : {},
        dto.password ? { password: dto.password } : {},
        dto.version ? { version: dto.version } : {},
        dto.updatedAt ? { updatedAt: new Date(dto.updatedAt) } : {},
        dto.createdAt ? { createdAt: new Date(dto.createdAt) } : {},
      ),
    });

    return this.convertPrismaUserToUser(updatedUser);
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.findOne(id);
    if (!removedUser) {
      return null;
    }
    await this.prismaService.user.deleteMany({ where: { id } });
    return removedUser;
  }

  private convertPrismaUserToUser(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      login: prismaUser.login,
      password: prismaUser.password,
      version: prismaUser.version,
      updatedAt: prismaUser.updatedAt.getTime(),
      createdAt: prismaUser.createdAt.getTime(),
    };
  }
}
