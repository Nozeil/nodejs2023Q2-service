import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    const serializedUser = new User(user);

    return serializedUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    const users = this.usersService.findAll();
    const serializedUsers = users.map((user) => new User(user));

    return serializedUsers;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    const serializedUser = new User(user);

    return serializedUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    const { oldPassword, newPassword } = updateUserDto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    }

    const updatedUser = this.usersService.update(id, newPassword);

    const serializedUser = new User(updatedUser);

    return serializedUser;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.remove(id);
  }
}
