import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import db from 'src/db';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return db.createUser(createUserDto);
  }

  findAll() {
    return db.getAllUsers();
  }

  findOne(id: string) {
    return db.getUser(id);
  }

  update(id: string, newPassword: string) {
    return db.updateUser(id, newPassword);
  }

  remove(id: string) {
    return db.deleteUser(id);
  }
}
