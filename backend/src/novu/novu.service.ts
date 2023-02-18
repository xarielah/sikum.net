import { Inject, Injectable } from '@nestjs/common';
import { Novu } from '@novu/node/build/main/lib/novu';
import { AppConfigService } from 'src/config/config.service';
import { NOVU_INJECTION_TOKEN } from './novu.module';

@Injectable()
export class NovuService {
  constructor(
    @Inject(NOVU_INJECTION_TOKEN) private readonly novu: Novu,
    private readonly appConfigService: AppConfigService,
  ) {}

  async sendUserVerificationEmail(
    verificationToken: string,
    user: { id: string; email: string; name: string },
  ): Promise<void> {
    const frontDomain = this.appConfigService.getConfig().front.domain;
    const verificationUrl = `${frontDomain}/#/auth/verify/${verificationToken}`;

    await this.novu.trigger('verify-user', {
      to: {
        subscriberId: user.id,
        email: user.email,
      },
      payload: {
        name: user.name,
        verification_url: verificationUrl,
      },
    });
  }
}
