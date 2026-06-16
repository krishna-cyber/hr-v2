import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  controllers: [SlackController],
  providers: [
    {
      provide: 'SLACK_SERVICE',
      useFactory: (configService: ConfigService) => {
        const token = configService.get<string>('SLACK_BOT_TOKEN');

        //use bot token here
        const slackService = new WebClient(token);
        return slackService;
      },
      inject: [ConfigService],
    },
    SlackService,
  ],
  exports: [SlackService],
})
export class SlackModule {}
