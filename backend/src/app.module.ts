import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppConfigModule } from './config/config.module';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from './post/post.module';
import { TopicController } from './topic/topic.controller';
import { TopicService } from './topic/topic.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    AppConfigModule,
    PassportModule.register({ session: true }),
    PostModule,
  ],
  controllers: [AppController, TopicController],
  providers: [AppService, TopicService],
})
export class AppModule {}
