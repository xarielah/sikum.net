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
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as UserPost } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/strategies/local.strategy';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { mimeTypeFilter } from './filters/mime-type.filter';
import {
  LastPosts,
  MyPosts,
  PaginatedPosts,
  PostsByTopic,
} from './types/post.types';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly firebaseService: FirebaseService,
  ) {}
  @Get('/')
  async getLastPosts(
    @Query() query: { amount?: string; page?: string },
  ): Promise<PaginatedPosts<LastPosts>> {
    // const amount = query.amount;
    // if (!amount || +amount < 1 || +amount > 20 || !regex.test(amount))
    //   throw new BadRequestException(
    //     'Amount query must be a number between 1 and 20',
    //   );
    // return await this.postService.getLastPosts(+amount);
    if (!query.page && !query.amount)
      throw new BadRequestException('Bad request - amount? page?');

    if (query.page) {
      return await this.postService.getPostsByPage(query.page);
    }
  }

  @Get('/topic/:topicId')
  @UseGuards(AuthenticatedGuard)
  async getPostsByTopic(
    @Param('topicId') topicId: string,
    @Query() query: { page: string },
  ): Promise<PaginatedPosts<PostsByTopic> & { topic: string }> {
    return await this.postService.getPostsByTopic(topicId, query.page);
  }

  @Get('/my-posts')
  @UseGuards(AuthenticatedGuard)
  async getMyPosts(
    @Session() session: any,
    @Query() query: { page: string },
  ): Promise<PaginatedPosts<MyPosts>> {
    return await this.postService.getMyPosts(session.passport.user, query.page);
  }

  @Get('/:id')
  @UseGuards(AuthenticatedGuard)
  async getPostById(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<UserPost> {
    return await this.postService.getPostById(id, session.passport.user);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: mimeTypeFilter,
    }),
  )
  async createNewPost(
    @Body() postDto: PostDto,
    @Session() session: any,
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: any,
  ): Promise<any> {
    // if (!file || req.fileError)
    //   throw new BadRequestException('File is missing or type not allowed');
    if (req.fileError) throw new BadRequestException(req.fileError as string);
    const uploadedFileURL = await this.firebaseService.uploadFile(file);

    //! Do some S3 service actions here to upload file and get it's download URL.
    return this.postService.createNewPost(
      { ...postDto, fileUrl: uploadedFileURL },
      session.passport.user,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthenticatedGuard)
  async deletePostById(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<void> {
    await this.postService.deletePostById(id, session.passport.user);
  }

  @Put('/:id')
  @UseGuards(AuthenticatedGuard)
  async updatePostById(
    @Param('id') id: string,
    @Body() postDto: PostDto,
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
