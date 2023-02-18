import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get a user by their id or email or username based if type 'id' supplied.
   * @param type username OR email OR id
   * @param uniqueKey username OR email OR id
   * @returns User or null
   */
  async getUser(
    uniqueKey: string,
    type?: 'id',
  ): Promise<UserSessionPayload | null> {
    if (type === 'id') {
      const foundUniqueUser = await this.prisma.user.findUnique({
        where: { id: uniqueKey },
        select: {
          username: true,
          email: true,
          firstName: true,
          role: true,
          id: true,
          verified: true,
          password: true,
        },
      });

      if (!foundUniqueUser) return null;
      return foundUniqueUser;
    }

    const foundUser = await this.prisma.user.findFirst({
      where: { OR: [{ username: uniqueKey }, { email: uniqueKey }] },
    });

    if (!foundUser) return null;
    return foundUser;
  }
}

type UserSessionPayload = {
  username: string;
  email: string;
  firstName?: string;
  role: string;
  id: string;
  verified: boolean;
  password?: string;
};

export type SessionPayload = {
  name?: string;
} & UserSessionPayload;
