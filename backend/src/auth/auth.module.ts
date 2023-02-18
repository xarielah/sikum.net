import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { NovuModule } from 'src/novu/novu.module';
import { NovuService } from 'src/novu/novu.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/sessions-serializer';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    NovuModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    LocalStrategy,
    SessionSerializer,
    NovuService,
  ],
})
export class AuthModule {}
