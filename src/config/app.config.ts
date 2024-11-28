import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  PORT: process.env.PORT ?? 300,
  API_VERSION: process.env.API_VERSION,
}));
