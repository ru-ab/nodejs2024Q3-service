import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RepositoryItem } from './repository.interfaces';

@Injectable({ scope: Scope.TRANSIENT })
export class RepositoryService<T extends RepositoryItem> {
  private items: T[] = [];

  create<D extends T>(dto: Omit<D, 'id'>): Promise<T> {
    const newItem = {
      id: randomUUID(),
      ...dto,
    } as unknown as T;

    this.items.push(newItem);
    return Promise.resolve(newItem);
  }

  findAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }

  findOne(id: string): Promise<T | null> {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      return Promise.resolve(null);
    }
    return Promise.resolve(item);
  }

  update(id: string, dto: Partial<T>): Promise<T | null> {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      return Promise.resolve(null);
    }

    const oldItem = this.items[itemIndex];
    const updatedItem: T = {
      ...oldItem,
      ...dto,
    };
    this.items[itemIndex] = updatedItem;

    return Promise.resolve(updatedItem);
  }

  async remove(id: string): Promise<T | null> {
    const item = await this.findOne(id);
    if (!item) {
      return Promise.resolve(null);
    }

    this.items = this.items.filter((item) => item.id !== id);
    return Promise.resolve(item);
  }
}
