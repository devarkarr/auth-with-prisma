import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  PORT: process.env.PORT ?? 300,
}));
