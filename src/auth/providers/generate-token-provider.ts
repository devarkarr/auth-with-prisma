import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUser } from '../interfaces/active-user-data';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async generateToken(user) {
    const [accessToken, refreshToken] = await Promise.all([
      // Generate Access Token with Email
      this.signToken<Partial<ActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),

      // Generate Refresh token without email
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
