import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private cryptSalt: number;

  constructor(private readonly configService: ConfigService) {
    this.cryptSalt = parseInt(
      this.configService.getOrThrow<string>('CRYPT_SALT'),
    );
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.cryptSalt;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async passwordIsValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
