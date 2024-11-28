import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from '../services/google-authentication/google-authentication.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AUTH_TYPE } from 'src/auth/enums/auth.enum';

@Auth(AUTH_TYPE.None)
@ApiTags('Google Authentication')
@Controller()
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}


  @Post('auth/google-authentication')
  authentication(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
