import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailServiceService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User) {
    console.log(user);

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Onbaording Team" <support@nestjs-blog.com>',
      subject: 'Welcome to NestJs Auth',
      template: './welcome',
      context: {
        name: user.username,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
