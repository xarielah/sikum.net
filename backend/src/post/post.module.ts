import { Module } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/strategies/local.strategy';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicService } from 'src/topic/topic.service';
import { UserService } from 'src/user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [
    FirebaseService,
    PostService,
    AuthenticatedGuard,
    PrismaService,
    UserService,
    TopicService,
  ],
})
export class PostModule {}
