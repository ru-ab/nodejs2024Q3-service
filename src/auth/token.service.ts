import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class TokenService {
  private jwtSecretKey: string;
  private jwtSecretRefreshKey: string;
  private tokenExpireTime: string;
  private tokenRefreshExpireTime: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtSecretKey = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
    this.jwtSecretRefreshKey = this.configService.getOrThrow<string>(
      'JWT_SECRET_REFRESH_KEY',
    );
    this.tokenExpireTime =
      this.configService.getOrThrow<string>('TOKEN_EXPIRE_TIME');
    this.tokenRefreshExpireTime = this.configService.getOrThrow<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
  }

  async generateTokens(payload: TokenPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecretKey,
      expiresIn: this.tokenExpireTime,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecretRefreshKey,
      expiresIn: this.tokenRefreshExpireTime,
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
          secret: this.jwtSecretKey,
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
          secret: this.jwtSecretRefreshKey,
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
