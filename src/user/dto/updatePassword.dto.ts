import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string; // new password
}
