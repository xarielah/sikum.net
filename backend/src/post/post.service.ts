import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicService } from 'src/topic/topic.service';
import { UserService } from 'src/user/user.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
  ) {}

  /**
   * Gets a post by id only for owner or admin.
   * @param id post id
   * @returns post
   */
  async getPostById(id: string, user: any): Promise<Post> {
    const foundPost = await this.prisma.post.findUnique({
      where: { id: id },
      select: {
        createdAt: true,
        updatedAt: true,
        title: true,
        id: true,
        description: true,
        fileUrl: true,
        ownerId: true,
        owner: {
          select: {
            username: true,
          },
        },
        topic: {
          select: {
            label: true,
          },
        },
      },
    });
    const foundUser = await this.userService.getUser(user.id, 'id');

    if (!foundUser) throw new ForbiddenException();
    if (!foundPost)
      throw new NotFoundException(`Post with id \"${id}\" wasn't found.`);
    if (foundPost.ownerId !== user.id && foundUser.role !== 'ADMIN')
      throw new ForbiddenException();

    return foundPost as unknown as Post;
  }

  /**
   * Creates a new post for authenticated user.
   * @param postDto post data
   */
  async createNewPost(postDto: PostDto, user: User): Promise<Post> {
    const foundUser = await this.userService.getUser(user.username);
    const foundTopic = await this.topicService.getTopicById(postDto.topicId);

    return this.prisma.post.create({
      data: { ...postDto, ownerId: foundUser.id, topicId: foundTopic.id },
    });
  }

  /**
   * Deletes a post for owner or admin.
   * @param id string
   */
  async deletePostById(id: string, user: any) {
    const foundPost = await this.getPostById(id, user);
    await this.prisma.post.delete({ where: { id: foundPost.id } });
  }

  /**
   * Update a post only for user or admin.
   * @param id string
   * @param postDto post data
   */
  async updatePostById(id: string, postDto: PostDto, user: any) {
    const foundPost = await this.getPostById(id, user);
    return await this.prisma.post.update({
      where: { id: foundPost.id },
      data: { ...postDto },
    });
  }

  /**
   * Gets latest posts limited to nine
   * @returns posts array
   */
  async getLastPosts(amount: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      take: amount,
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        fileUrl: true,
        createdAt: true,
        ownerId: true,
        topic: {
          select: {
            label: true,
            id: true,
          },
        },
        owner: {
          select: {
            username: true,
          },
        },
      },
    }) as unknown as Post[];
  }
}
