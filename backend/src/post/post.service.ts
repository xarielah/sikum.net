import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicService } from 'src/topic/topic.service';
import { UserService } from 'src/user/user.service';
import { PostDto } from './dto/post.dto';
import {
  LastPosts,
  MyPosts,
  PaginatedPosts,
  PostsByTopic,
} from './types/post.types';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
  ) {}

  private testIfNumber(data: string): void {
    const regex = new RegExp(/^[1-9]?$|^20$/);
    if (!regex.test(data))
      throw new BadRequestException('Argument needs to be a number.');
  }

  async getMyPosts(user: any, page: string): Promise<PaginatedPosts<MyPosts>> {
    const foundUser = await this.userService.getUser(user.id, 'id');
    this.testIfNumber(page);

    const resultsPerPage = 5;

    const count = await this.prisma.post.count({
      where: { ownerId: foundUser.id },
    });

    const posts = (await this.prisma.post.findMany({
      skip: (+page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: { ownerId: foundUser.id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        topic: { select: { id: true, label: true } },
      },
    })) as unknown as MyPosts;

    return {
      count,
      posts,
      resultsPerPage,
    };
  }

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
            id: true,
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

  async getPostsByTopic(
    topicId: string,
    page: string,
  ): Promise<PaginatedPosts<PostsByTopic> & { topic: string }> {
    this.testIfNumber(page);

    const foundTopic = await this.topicService.getTopicById(topicId);
    const resultsPerPage = 5;

    const count = await this.prisma.post.count({
      where: { topicId: foundTopic.id },
    });

    const posts = (await this.prisma.post.findMany({
      skip: (+page - 1) * resultsPerPage,
      take: resultsPerPage,
      where: { topicId: foundTopic.id },
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { username: true, id: true } },
        topic: { select: { id: true, label: true } },
      },
    })) as unknown as PostsByTopic;

    return {
      topic: foundTopic.label,
      count,
      resultsPerPage,
      posts,
    };
  }

  /**
   * Creates a new post for authenticated user.
   * @param postDto post data
   */
  async createNewPost(postDto: PostDto, user: User): Promise<Post> {
    const foundUser = await this.userService.getUser(user.username);
    if (!foundUser.verified)
      throw new BadRequestException(
        'User is not verified and cannot create new posts',
      );
    const foundTopic = await this.topicService.getTopicById(postDto.topicId);

    const tags = postDto.tags
      ? JSON.parse(postDto.tags as unknown as string)
      : [];

    delete postDto.file;
    const postData = {
      ...postDto,
      tags: tags,
    };

    return this.prisma.post.create({
      data: { ...postData, ownerId: foundUser.id, topicId: foundTopic.id },
    });
  }

  /**
   * Gets an array of posts sorted by creation date.
   * Skips 10 every page, if page is the first - it skips nothing.
   * @param page page number
   * @returns array of posts
   */
  async getPostsByPage(page: string): Promise<PaginatedPosts<LastPosts>> {
    this.testIfNumber(page);

    const resultsPerPage = 5;

    const count = await this.prisma.post.count();
    const posts = (await this.prisma.post.findMany({
      skip: (+page - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: { createdAt: 'desc' },
      include: {
        topic: { select: { id: true, label: true } },
        owner: { select: { username: true, id: true } },
      },
    })) as unknown as LastPosts;

    return { count, posts, resultsPerPage };
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
