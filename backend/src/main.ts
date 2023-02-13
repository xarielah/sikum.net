import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './config/config.service';
// import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionSecret = app.get(AppConfigService).getConfig().session.secret;
  const frontDomain = app.get(AppConfigService).getConfig().front.domain;

  app.setGlobalPrefix('api');

  app.use(
    session({
      name: 's.id',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 360000, // 1hour in seconds
        sameSite: 'none',
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  app.enableCors({
    origin: [frontDomain, `${frontDomain}/`],
    credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
