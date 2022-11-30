import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../data-access/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    return this.usersRepository.create(createUserDto, image);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(email: string) {
    return this.usersRepository.findOne(email);
  }

  update(updateUserDto: UpdateUserDto, image: Express.Multer.File) {
    return this.usersRepository.update(updateUserDto, image);
  }

  remove(email: string) {
    return this.usersRepository.delete(email);
  }
}
