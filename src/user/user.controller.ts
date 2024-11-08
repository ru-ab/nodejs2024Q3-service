import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    const usersWithoutPassword = users.map((user) =>
      this.userService.excludePasswordFromUser(user),
    );
    return usersWithoutPassword;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.excludePasswordFromUser(user);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return this.userService.excludePasswordFromUser(user);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    const updatedUser = await this.userService.updatePassword(user, dto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return this.userService.excludePasswordFromUser(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedUser = await this.userService.remove(id);
    if (!removedUser) {
      throw new NotFoundException('User not found');
    }
  }
}
