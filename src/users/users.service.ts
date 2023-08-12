import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async update(id: string, newPassword: string) {
    const user = await this.prisma.user.update({
      data: { password: newPassword, version: { increment: 1 } },
      where: { id: id },
    });
    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
