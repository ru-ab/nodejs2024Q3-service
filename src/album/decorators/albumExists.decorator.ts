import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { IRepositoryService } from '../../repository/repository.interfaces';

@ValidatorConstraint({ async: true })
@Injectable()
export class AlbumExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  async validate(albumId: string | null) {
    if (!albumId) {
      return true;
    }

    const album = await this.repositoryService.albums.findOne(albumId);
    if (!album) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Album with albumId not found';
  }
}

export function AlbumExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'AlbumExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AlbumExistsRule,
    });
  };
}
