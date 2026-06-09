import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth } from './auth';
import { validate } from './env.validation';
import { LeaveModule } from './leave/leave.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { MongodbModule } from './mongodb.module';
import { SlackModule } from './slack/slack.module';
import { AdminModule } from './admin/admin.module';

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
    MongodbModule,
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
        connection: Connection,
        mailService: MailService,
      ) => ({
        auth: auth(configService, connection, mailService),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
          rawBody: true,
        },
      }),
      inject: [ConfigService, getConnectionToken(), MailService], //Ensure that the correct connection is injected
    }),
    SlackModule,
    MailModule,
    LeaveModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
