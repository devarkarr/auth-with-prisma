import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from 'src/users/services/users.service';
import { HashingProvider } from './hashing-provider';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenProvider } from './generate-token-provider';

@Injectable()
export class LoginProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  async login(loginDto: LoginDto) {
    const existUser = await this.usersService.findByEmail(loginDto.email);

    let isEqual = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        loginDto.password,
        existUser.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the password',
      });
    }

    if (!isEqual) throw new UnauthorizedException('Password does not match');

    return await this.generateTokenProvider.generateToken(existUser);
  }
}
