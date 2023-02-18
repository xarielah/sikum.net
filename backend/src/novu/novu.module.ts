import { Module } from '@nestjs/common';
import { Novu } from '@novu/node';
import { AppConfigService } from 'src/config/config.service';

export const NOVU_INJECTION_TOKEN = 'NOVU';

const novuFactory = {
  provide: NOVU_INJECTION_TOKEN,
  useFactory: (config: AppConfigService) => {
    const apiKey = config.getConfig().novu.apiKey;
    return new Novu(apiKey);
  },
  inject: [AppConfigService],
};

@Module({
  providers: [novuFactory, AppConfigService],
  exports: [novuFactory],
})
export class NovuModule {}
