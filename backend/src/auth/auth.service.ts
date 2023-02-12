import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { SessionPayload, UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/config.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
  ) {}
  @UseGuards(LocalAuthGuard)

  /**
   * Registers a new user.
   * @param registerDto register data
   */
  async handleRegister(registerDto: RegisterDto): Promise<void> {
    const isUserTaken = await this.userService.getUser(registerDto.username);
    const isEmailTaken = await this.userService.getUser(registerDto.email);

    if (isEmailTaken || isUserTaken)
      throw new ConflictException('Username or email is already in use.');

    const hashedPassword = await argon2.hash(registerDto.password);

    try {
      await this.prisma.user.create({
        data: {
          ...registerDto,
          displayName: registerDto.username.toLowerCase(),
          email: registerDto.email.toLowerCase(),
          password: hashedPassword,
          verificationToken: this.jwtService.sign(
            {
              username: registerDto.username,
              email: registerDto.email,
            },
            { secret: this.appConfigService.getConfig().session.secret },
          ),
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Handles login logic of a user.
   * @param loginDto Login data
   * @returns access & refresh token
   */
  async handleLogin(loginDto: LoginDto): Promise<SessionPayload> {
    const isUserExists = await this.userService.getUser(
      loginDto.username.toLowerCase(),
    );
    if (!isUserExists) return null;

    const comparePasswords = await argon2.verify(
      isUserExists.password,
      loginDto.password,
    );

    if (!comparePasswords) return null;
    return {
      username: isUserExists.username,
      email: isUserExists.email,
      role: isUserExists.role,
      verified: isUserExists.verified,
      id: isUserExists.id,
    };
  }

  async handleUserVerification(token: string): Promise<any> {
    if (!token)
      throw new BadRequestException(
        'A token must be attached to this request.',
      );

    const foundUser = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!foundUser)
      throw new NotFoundException(`No user exists with this token.`);

    await this.prisma.user.update({
      where: { id: foundUser.id },
      data: { verificationToken: null, verified: true },
    });
  }
}
