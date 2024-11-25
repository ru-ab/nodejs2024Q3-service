import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: TokenPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'Secret',
      expiresIn: '60s',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'RefreshSecret',
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getAccessTokenPayload(accessToken: string): Promise<TokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        accessToken,
        {
          secret: 'Secret',
        },
      );
      return {
        login: payload.login,
        userId: payload.userId,
      };
    } catch {
      throw new ForbiddenException();
    }
  }

  async getRefreshTokenPayload(refreshToken: string): Promise<TokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        refreshToken,
        {
          secret: 'RefreshSecret',
        },
      );
      return {
        login: payload.login,
        userId: payload.userId,
      };
    } catch {
      throw new ForbiddenException();
    }
  }
}
