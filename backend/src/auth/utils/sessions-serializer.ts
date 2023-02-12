import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, user: SessionUserData) => void) {
    const mutatedUser: SessionUserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      verified: user.verified,
      role: user.role,
    };
    done(null, mutatedUser);
  }

  async deserializeUser(
    user: User,
    done: (err, user: SessionUserData) => void,
  ) {
    const foundUser = await this.userService.getUser(user.id, 'id');
    if (!foundUser) return done(null, null);

    const mutatedUser: SessionUserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      verified: user.verified,
      role: user.role,
    };

    return done(null, mutatedUser);
  }
}

/**
 * Allows only certain fields to be passed as payload.
 */
interface SessionUserData {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  role: 'USER' | 'ADMIN';
}
