import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LoginProvider } from './providers/login.provider.ts';
import { HashingProvider } from './providers/hashing-provider';
import { BcryptProvider } from './providers/bcrypt-provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokenProvider } from './providers/generate-token-provider';
import { GoogleAuthenticationController } from './social/google-authentication/google-authentication.controller';
import { GoogleAuthenticationService } from './social/services/google-authentication/google-authentication.service';

@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    LoginProvider,
    GenerateTokenProvider,
    GoogleAuthenticationController,
    GoogleAuthenticationService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
