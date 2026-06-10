import { Inject, Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { CreateSlackDto } from './dto/create-slack.dto';
import { UpdateSlackDto } from './dto/update-slack.dto';

@Injectable()
export class SlackService {
  constructor(
    @Inject('SLACK_SERVICE') private readonly slackClient: WebClient,
  ) {}
  create(createSlackDto: CreateSlackDto) {
    return this.slackClient.chat.postMessage({
      channel: 'C0B6ATFQR46',
      text: 'Leave request has been approved',
    });
  }

  async sendMessageToPerson() {
    const response = await this.slackClient.users.lookupByEmail({
      email: 'tiwarikrishna54321@gmail.com',
    });

    if (response.ok && response.user?.id) {
      console.log('User ID:', response.user.id); // Debug log to check the retrieved user information
      await this.slackClient.chat.postMessage({
        channel: response.user?.id, // Use the conversation channel ID if available, otherwise fallback to user ID
        as_user: true,
        text: 'Leave request has been approved',
      });
    }
  }
  testSlack() {
    return this.slackClient.chat.postMessage({
      channel: 'C0B9K8A7E01',
      text: 'Leave request has been approved',
    });
  }
  findAll() {
    return `This action returns all slack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slack`;
  }

  update(id: number, updateSlackDto: UpdateSlackDto) {
    return `This action updates a #${id} slack`;
  }

  remove(id: number) {
    return `This action removes a #${id} slack`;
  }
}
