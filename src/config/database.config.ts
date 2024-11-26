import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.x,
  synchronize: process.env.SYNC == 'true' ? true : false,
  autoLoadEntities: process.env.AUTOLOADENTITIES == 'true' ? true : false,
}));
