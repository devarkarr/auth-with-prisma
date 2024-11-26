import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { createSwaggerDocument } from './docs/swagger';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
