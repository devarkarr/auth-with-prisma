import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { Auth } from './decorators/auth/auth.decorator';
import { AUTH_TYPE } from './enums/auth.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUser } from './decorators/auth/active-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(AUTH_TYPE.None)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @Auth(AUTH_TYPE.None)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth('BearerAuth')
  me(@ActiveUser() user) {
    return this.authService.me(user.sub);
  }
}
