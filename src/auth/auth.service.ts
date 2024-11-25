import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signUp.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(dto: SignUpDto) {
    return this.userService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOneByLogin(dto.login);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordIsValid = await this.userService.passwordIsValid(
      dto.password,
      user.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    return this.tokenService.generateTokens(payload);
  }

  async refresh(dto: RefreshDto) {
    const payload = await this.tokenService.getRefreshTokenPayload(
      dto.refreshToken,
    );
    return this.tokenService.generateTokens(payload);
  }
}
