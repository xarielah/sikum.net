import { ConfigFactory } from '@nestjs/config';

export const configFactory: ConfigFactory<{ config: IConfiguration }> = () => {
  console.log('Current CORS front domain: ', process.env.FRONT_DOMAIN);

  return {
    config: {
      app: {
        port: +process.env.APP_PORT || 3000,
      },
      front: {
        domain: process.env.FRONT_DOMAIN ?? 'http://localhost:5173',
      },
      session: {
        secret: process.env.SESSION_SECRET,
      },
      novu: {
        apiKey: process.env.NOVU_API_KEY,
      },
      back: {
        domain: process.env.BACK_DOMAIN ?? 'http://localhost:3000',
      },
      firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        storageBucket: process.env.FIREBASE_BUCKET,
      },
    },
  };
};

export interface AppConfig {
  port: number;
}

export interface FrontConfig {
  domain: string;
}

export interface BackConfig {
  domain: string;
}

export interface SessionConfig {
  secret: string;
}

export interface NovuConfig {
  apiKey: string;
}

export interface FirebaseConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  storageBucket: string;
}

export interface IConfiguration {
  app: AppConfig;
  front: FrontConfig;
  back: BackConfig;
  session: SessionConfig;
  novu: NovuConfig;
  firebase: FirebaseConfig;
}
