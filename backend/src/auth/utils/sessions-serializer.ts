import { PassportSerializer } from '@nestjs/passport';
import { SessionPayload, UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: any, user: SessionPayload) => void) {
    const mutatedUser: SessionPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      verified: user.verified,
      role: user.role,
    };
    done(null, mutatedUser);
  }

  async deserializeUser(
    user: any,
    done: (err: any, user: SessionPayload) => void,
  ) {
    const foundUser = await this.userService.getUser(user.id, 'id');
    if (!foundUser) return done(null, null);

    const mutatedUser: SessionPayload = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.firstName,
      email: foundUser.email,
      verified: foundUser.verified,
      role: foundUser.role,
    };

    return done(null, mutatedUser);
  }
}

/**
 * Allows only certain fields to be passed as payload.
 */
