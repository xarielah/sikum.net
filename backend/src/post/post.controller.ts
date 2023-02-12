import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Post as UserPost } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/strategies/local.strategy';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthenticatedGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getLastPosts(@Query() query: { amount: string }): Promise<UserPost[]> {
    const amount = query.amount;
    const regex = new RegExp(/^[1-9]?$|^20$/);
    if (!amount || +amount < 1 || +amount > 20 || !regex.test(amount))
      throw new BadRequestException(
        'Amount query must be a number between 1 and 20',
      );
    return await this.postService.getLastPosts(+amount);
  }

  @Get('/:id')
  async getPostById(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<UserPost> {
    return await this.postService.getPostById(id, session.passport.user);
  }

  @Post()
  async createNewPost(
    @Body(ValidationPipe) postDto: PostDto,
    @Session() session: any,
  ): Promise<UserPost> {
    return this.postService.createNewPost(postDto, session.passport.user);
  }

  @Delete('/:id')
  async deletePostById(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<void> {
    await this.postService.deletePostById(id, session.passport.user);
  }

  @Put('/:id')
  async updatePostById(
    @Param('id') id: string,
    @Body(ValidationPipe) postDto: PostDto,
    @Session() session: any,
  ): Promise<UserPost> {
    return await this.postService.updatePostById(
      id,
      postDto,
      session.passport.user,
    );
  }
  //? Have a block here that compares if user == owner || user.rule == 'ADMIN'
}
