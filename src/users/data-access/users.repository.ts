import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(
    createUserDto: CreateUserDto,
    image: Express.Multer.File,
  ): Promise<User> {
    const user = await this.userModel.create({
      ...createUserDto,
      image: image.buffer,
    });
    return user ? user.toJSON() : user;
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findByPk(email);
    return user ? user.toJSON() : user;
  }

  async update(
    updateUserDto: UpdateUserDto,
    image?: Express.Multer.File,
  ): Promise<User> {
    const email = updateUserDto.updatedEmail;

    const updateUser = { ...updateUserDto };
    delete updateUser.updatedEmail;
    if (image) updateUser.image = image.buffer.toString('base64');

    const [, updatedUsers] = await this.userModel.update(updateUser, {
      where: { email },
      returning: true,
    });

    return updatedUsers[0] ? updatedUsers[0].toJSON() : updatedUsers[0];
  }

  async delete(email: string) {
    return this.userModel.destroy({ where: { email } });
  }
}
