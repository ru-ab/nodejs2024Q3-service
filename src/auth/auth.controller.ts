import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signUp.dto';
import { LoginResponse } from './entities/loginResponse';
import { BadRequestToUnauthorizedFilter } from './filters/badRequestToUnauthorized.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Sign Up', description: 'Signs up a new user' })
  @ApiResponse({
    status: 201,
    description: 'Returns if user has been signed up',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns if user has been logged in',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  @ApiResponse({
    status: 403,
    description:
      'Returns if request body contains incorrect user password or user does not exist',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('/refresh')
  @HttpCode(200)
  @UseFilters(new BadRequestToUnauthorizedFilter())
  @ApiOperation({
    summary: 'Refresh Tokens',
    description: 'Returns a new tokens pair',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if new tokens have been generated',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Returns if refreshToken not exists or is not string',
  })
  @ApiResponse({
    status: 403,
    description: 'Returns if refreshToken is invalid',
  })
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
