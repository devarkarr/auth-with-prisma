import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  secret: process.env.JWT_SECRET,
  accessTokenTtl: parseInt(process.env.JWT_EXPIRESIN, 10),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESHTOKENTTL, 10),
}));
