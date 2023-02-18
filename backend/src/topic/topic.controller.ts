import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Topic } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/strategies/local.strategy';
import { TopicDto } from './dto/topic.dto';
import { TopicService } from './topic.service';
import { SelectedTopicFields } from '../topic/topic.service';

@UseGuards(AuthenticatedGuard)
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/:id')
  async getTopicById(@Param('id') id: string): Promise<Topic> {
    return await this.topicService.getTopicById(id);
  }

  @Post()
  async createNewTopic(@Body() topicDto: TopicDto): Promise<Topic> {
    return await this.topicService.createNewTopic(topicDto);
  }

  @Delete('/:id')
  async deleteTopicById(@Param('id') id: string): Promise<void> {
    await await this.topicService.deleteTopicById(id);
  }

  @Get()
  async getAllTopics(): Promise<SelectedTopicFields[]> {
    return await this.topicService.getAllTopics();
  }
  // todo
  // Implement patch request for editing a topic
}
