import { ConfigFactory } from '@nestjs/config';

export const configFactory: ConfigFactory<{ config: IConfiguration }> = () => {
  console.log(
    '🚀 ~ file: config.factory.ts:12 ~ process.env.FRONT_DOMAIN',
    process.env.FRONT_DOMAIN,
  );
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
    },
  };
};

export interface AppConfig {
  port: number;
}

export interface FrontConfig {
  domain: string;
}

export interface SessionConfig {
  secret: string;
}

export interface NovuConfig {
  apiKey: string;
}

export interface IConfiguration {
  app: AppConfig;
  front: FrontConfig;
  session: SessionConfig;
  novu: NovuConfig;
}
