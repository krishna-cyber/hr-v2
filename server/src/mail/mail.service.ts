import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ForgotPasswordTemplateContext,
  OtpTemplateContext,
  VerifyEmailContext,
  WelcomeTemplateContext,
} from 'types/types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendWelcomeEmail(to: string, context: WelcomeTemplateContext) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Palmmind!',
      template: 'welcome',
      context: {
        firstName: context.firstName,
        email: context.email,
        password: context.password,
        loginUrl: context.loginUrl,
      },
    });
  }

  async sendVerifyEmail(to: string, context: VerifyEmailContext) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Palmmind!',
      template: 'verifyemail',
      context: {
        firstName: context.firstName,
        email: context.email,
        logiverificationlink: context.logiverificationlink,
      },
    });
  }

  async sendOtpEmail(to: string, context: OtpTemplateContext) {
    await this.mailerService.sendMail({
      to,
      subject: 'Your OTP Code',
      template: 'otp',
      context: {
        otp: context.otp,
      },
    });
  }

  async sendForgotPasswordEmail(
    to: string,
    context: ForgotPasswordTemplateContext,
  ) {
    await this.mailerService.sendMail({
      to,
      subject: 'Reset Your Password',
      template: 'forgot-password',
      context: {
        firstName: context.firstName,
        code: context.code,
      },
    });
  }
}
