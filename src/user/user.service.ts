import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRepositoryService } from '../repository/repository.interfaces';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './entities/user.entity';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
    private readonly passwordService: PasswordService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repositoryService.users.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.repositoryService.users.findOne(id);
  }

  async findOneByLogin(login: string): Promise<User | null> {
    return this.repositoryService.users.findOneByLogin(login);
  }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    const newUser = await this.repositoryService.users.create({
      ...dto,
      password: hashedPassword,
      version: 1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });

    return this.excludePasswordFromUser(newUser);
  }

  async updatePassword(
    userId: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordIsValid = await this.passwordService.passwordIsValid(
      dto.oldPassword,
      user.password,
    );
    if (!passwordIsValid) {
      throw new ForbiddenException('Wrong old password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      dto.newPassword,
    );

    const updatedUser = await this.repositoryService.users.update(user.id, {
      password: hashedPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    return this.excludePasswordFromUser(updatedUser);
  }

  async remove(id: string): Promise<User | null> {
    return this.repositoryService.users.remove(id);
  }

  async passwordIsValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.passwordService.passwordIsValid(password, hashedPassword);
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
