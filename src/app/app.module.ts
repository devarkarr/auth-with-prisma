import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import enviromentValidation from 'src/config/enviroment.validation';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from 'src/auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from 'src/common/data-response/data-response.interceptor';

@Module({
  imports: [
    /**
     * modules
     */
    UsersModule,
    AuthModule,
    /**
     * app configuration
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    /**
     * database
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        type: 'postgres', // configService.get('database.type'),
        autoLoadEntities: true, //configService.get('database.autoLoadEntities'),
        synchronize: true, // configService.get('database.synchronize'),
        port: 5432, //  configService.get('database.port'),
        host: 'localhost', // configService.get('database.host'),
        username: 'postgres', // configService.get('database.user'),
        password: '123456', //configService.get('database.password'),
        database: 'auth', // configService.get('database.name'),
      }),
    }),
    /**
     * jwt configuration
     */
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * global guard
     */
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    /**
     * global data response transform
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
