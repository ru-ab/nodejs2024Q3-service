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
export class ArtistExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject(IRepositoryService)
    private readonly repositoryService: IRepositoryService,
  ) {}

  async validate(artistId: string | null) {
    if (!artistId) {
      return true;
    }

    const artist = await this.repositoryService.artists.findOne(artistId);
    if (!artist) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Artist with artistId not found';
  }
}

export function ArtistExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ArtistExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ArtistExistsRule,
    });
  };
}
