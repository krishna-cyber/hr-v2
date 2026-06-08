import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  //if there is role based access contril use like this
  @Roles(['admin'])
  @Get('/test')
  getTest(): string {
    return 'This is a test endpoint for admin and hr roles.';
  }

  @AllowAnonymous()
  @Get('/test_mail')
  async sendTestEmail() {
    return await this.appService.sendTestEmail();
  }
}
