import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as admin from 'firebase-admin';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';

const FRONT_DOMAIN = process.env.FRONT_DOMAIN ?? 'http://localhost:5173';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [FRONT_DOMAIN, `${FRONT_DOMAIN}/`],
      credentials: true,
    },
  });
  const configService = app.get(AppConfigService).getConfig();

  const sessionSecret = app.get(AppConfigService).getConfig().session.secret;

  const port = configService.app.port;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  // if (app.get('env') === 'production') {
  app.set('trust proxy', 'auto');
  // }

  app.use(
    session({
      name: 's.id',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 360000, // 1hour in seconds
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  const fbAdminConfig: ServiceAccount = {
    projectId: configService.firebase.projectId,
    clientEmail: configService.firebase.clientEmail,
    privateKey: configService.firebase.privateKey,
  };

  admin.initializeApp({
    credential: admin.credential.cert(fbAdminConfig),
    storageBucket: configService.firebase.storageBucket,
  });

  // app.enableCors({
  //   origin: [frontDomain, `${frontDomain}/`],
  //   credentials: true,
  // });

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
}
bootstrap();
