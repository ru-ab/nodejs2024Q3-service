export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  createUser(dto: Pick<User, 'login' | 'password'>): Promise<User>;
  updateUser(id: string, dto: Partial<Omit<User, 'id'>>): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
}

export const UserRepository = Symbol('UserRepository');
