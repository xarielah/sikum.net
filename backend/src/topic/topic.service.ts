import { Injectable, NotFoundException } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicDto } from './dto/topic.dto';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Returns topic data by id.
   * @param id string
   * @returns topic data
   */
  async getTopicById(id: string): Promise<Topic> {
    const foundTopic = await this.prisma.topic.findUnique({ where: { id } });
    if (!foundTopic)
      throw new NotFoundException(`Topic with id \"${id}\" was not found`);
    return foundTopic;
  }

  /**
   * Validates and then creates new topic data.
   * @param topicDto topic dto
   * @returns topic data
   */
  async createNewTopic(topicDto: TopicDto): Promise<Topic> {
    return this.prisma.topic.create({ data: topicDto });
  }

  /**
   * Delete a topic by it's id.
   * @param id topic id
   */
  async deleteTopicById(id: string): Promise<void> {
    const foundTopic = await this.getTopicById(id);
    this.prisma.topic.delete({ where: { id: foundTopic.id } });
  }
}
