import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestType } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './strategies/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async handleRegistration(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.handleRegister(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleLogin(
    @Body() loginData: { username: string; password: string },
  ): Promise<{ username: string; email: string }> {
    return await this.authService.handleLogin(loginData);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/session')
  async handleSessionDeserialize(@Session() session: any): Promise<any> {
    return session.passport.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  async handleLogout(@Request() req: RequestType): Promise<void> {
    /**
     * This operation will also delete the session
     * record from postgreSQL using prisma integration
     * from main.ts file.
     */
    req.session.destroy((err: any) => {
      if (err) throw new InternalServerErrorException(err);
    });
  }

  @Post('/verify')
  async handleUserVerification(@Body() body: { token: string }): Promise<any> {
    return await this.authService.handleUserVerification(body.token);
  }
}
