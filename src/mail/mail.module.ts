import { Module } from '@nestjs/common';
import { MailServiceService } from './services/mail-service.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('appConfig.MAIL_HOST'),
          secure: false,
          port: config.get<number>('appConfig.MAIL_PORT'),
          auth: {
            user: config.get('appConfig.MAIL_USERNAME'),
            pass: config.get('appConfig.MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Auth" <no-repy@nestjs-blog.com>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({ inlineCssEnabled: true }),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailServiceService],
  exports: [MailServiceService],
})
export class MailModule {}
