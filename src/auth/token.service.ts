import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: TokenPayload) {
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
