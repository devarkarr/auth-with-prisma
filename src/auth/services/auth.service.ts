import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { LoginProvider } from '../providers/login.provider.ts';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginProvider: LoginProvider,
  ) {}

  register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  login(loginDto: LoginDto) {
    return this.loginProvider.login(loginDto);
  }
}
