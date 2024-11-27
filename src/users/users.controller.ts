import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AUTH_TYPE } from 'src/auth/enums/auth.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth('BearerAuth')
  @HttpCode(HttpStatus.OK)
  @Auth(AUTH_TYPE.Bearer)
  findAll() {
    return this.usersService.findAll();
  }
}
