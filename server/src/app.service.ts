import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendTestEmail() {
    await this.mailerService.sendWelcomeEmail('tiwarikrishna54321@gmail.com', {
      firstName: 'Krishna',
      email: 'tiwarikrishna54321@gmail.com',
      password: '12345678',
      loginUrl: 'https://www.google.com',
    });
  }
}
