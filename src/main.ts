import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { createSwaggerDocument } from './docs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * global validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * swagger configuration
   */
  createSwaggerDocument(app);
  /**
   * cors
   */
  app.enableCors();

  // /*
  //  * Setup cloudinary
  //  * */
  const configService = app.get(ConfigService);
  cloudinary.config({
    cloud_name: configService.get<string>('appConfig.CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get<string>('appConfig.CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('appConfig.CLOUDINARY_API_SECRET'),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
