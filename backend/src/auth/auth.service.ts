import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { NovuService } from 'src/novu/novu.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly novuService: NovuService,
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
      const verificationToken = this.jwtService.sign(
        {
          username: registerDto.username,
          email: registerDto.email,
        },
        { secret: this.appConfigService.getConfig().session.secret },
      );

      const user = await this.prisma.user.create({
        data: {
          username: registerDto.username,
          firstName: registerDto.firstName,
          displayName: registerDto.username.toLowerCase(),
          email: registerDto.email.toLowerCase(),
          password: hashedPassword,
          verificationToken: verificationToken,
        },
      });

      const novuPayload = {
        name: user.firstName,
        email: user.email,
        id: user.id,
      };
      await this.novuService.sendUserVerificationEmail(
        verificationToken,
        novuPayload,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Handles login logic of a user.
   * @param loginDto Login data
   * @returns session payload
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
      name: isUserExists.firstName,
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
