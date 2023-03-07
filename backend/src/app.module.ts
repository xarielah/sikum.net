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
import { NovuService } from './novu/novu.service';
import { NovuModule } from './novu/novu.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    AppConfigModule,
    PassportModule.register({ session: true }),
    PostModule,
    NovuModule,
    FirebaseModule,
  ],
  controllers: [AppController, TopicController],
  providers: [AppService, TopicService, NovuService],
})
export class AppModule {}
