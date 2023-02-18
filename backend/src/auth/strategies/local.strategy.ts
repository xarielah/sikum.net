import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CanActivate } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { SessionPayload } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<SessionPayload> {
    const user = await this.authService.handleLogin({ username, password });
    if (!user)
      throw new UnauthorizedException(
        'Username or password are wrong, try again.',
      );

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role.toString(),
      id: user.id,
      verified: user.verified,
    };
  }
}

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated();
  }
}
