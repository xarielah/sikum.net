import { Module } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/strategies/local.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, AuthenticatedGuard, PrismaService, UserService],
})
export class PostModule {}
