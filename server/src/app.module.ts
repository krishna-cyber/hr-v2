import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth } from './auth';
import { validate } from './env.validation';
import { LeaveModule } from './leave/leave.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { MongodbModule } from './mongodb.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      cache: true,
      validationOptions: {
        abortEarly: true,
      },
    }),
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        auth: auth(configService),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
          rawBody: true,
        },
      }),
      inject: [ConfigService],
    }),
    SlackModule,
    MailModule,
    LeaveModule,
    MongodbModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
