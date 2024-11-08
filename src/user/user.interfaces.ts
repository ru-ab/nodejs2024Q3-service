import { CreateUserDto } from './dto/createUser.dto';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  createUser(dto: CreateUserDto): Promise<User | null>;
}

export const UserRepository = Symbol('UserRepository');
