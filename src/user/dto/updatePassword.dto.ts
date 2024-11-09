import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  oldPassword: string; // previous password

  @IsString()
  @ApiProperty()
  newPassword: string; // new password
}
