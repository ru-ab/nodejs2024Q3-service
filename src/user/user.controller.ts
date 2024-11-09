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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users records',
    isArray: true,
    type: User,
  })
  async findAll() {
    const users = await this.userService.findAll();
    const usersWithoutPassword = users.map((user) =>
      this.userService.excludePasswordFromUser(user),
    );
    return usersWithoutPassword;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if user record exists',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if user ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: "Returns if user record does't exist",
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.excludePasswordFromUser(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'Returns if user has been created',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return this.userService.excludePasswordFromUser(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if user has been updated',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if user ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if user does not exist',
  })
  @ApiResponse({
    status: 403,
    description: 'Returns if old password is wrong',
  })
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
  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if user has been removed',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if user ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if user does not exist',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedUser = await this.userService.remove(id);
    if (!removedUser) {
      throw new NotFoundException('User not found');
    }
  }
}
