import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSlackDto } from './dto/create-slack.dto';

import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { SlackService } from './slack.service';

@Controller('api/slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  //Action when approved or rejected a leave request from slack
  @Post('leave-action')
  create(@Body() createSlackDto: CreateSlackDto) {
    return this.slackService.create(createSlackDto);
  }

  @AllowAnonymous()
  @Get('test')
  testSlack() {
    return this.slackService.sendMessageToPerson();
  }
}
