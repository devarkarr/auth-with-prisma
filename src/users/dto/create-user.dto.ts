import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  googleId?: string;
}
