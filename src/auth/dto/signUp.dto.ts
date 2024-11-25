import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's login",
  })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's password",
  })
  password: string;
}
