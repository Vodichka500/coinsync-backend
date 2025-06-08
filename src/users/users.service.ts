import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import UserCreateInput = Prisma.UserCreateInput;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      console.error('Create user error:', error);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((error as any).code === 'P2002') {
        throw new BadRequestException('User with this data already exists.');
      }

      throw new InternalServerErrorException('Failed to create user.');
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('Find all users error:', error);
      throw new InternalServerErrorException('Failed to retrieve users.');
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Find user by email error:', error);
      throw new InternalServerErrorException('Failed to retrieve user.');
    }
  }
  async delete(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Delete user error:', error);
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
