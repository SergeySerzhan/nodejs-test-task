import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../data-access/users.repository';
import { PasswordService } from '../../shared/services/password.service';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    return this.usersRepository.create(
      {
        ...createUserDto,
        password: await PasswordService.hashPassword(createUserDto.password),
      },
      image.buffer.toString('base64'),
    );
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(email: string) {
    return this.usersRepository.findOne(email);
  }

  async update(updateUserDto: UpdateUserDto, image: Express.Multer.File) {
    return this.usersRepository.update(updateUserDto, image);
  }

  async remove(email: string) {
    return this.usersRepository.delete(email);
  }

  async generatePdf(email: string) {
    const user = await this.usersRepository.findOne(email);
    if (!user) return user;

    const pdf = new PDFDocument();

    pdf.text(`${user.firstName} ${user.lastName}`);
    pdf.image(Buffer.from(user.image, 'base64'), {
      fit: [100, 100],
      align: 'center',
      valign: 'center',
    });
    pdf.end();

    async function readableToBuffer(readable: any) {
      let buffer = Buffer.alloc(0);

      for await (const chunk of readable) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
    }

    const pdfBuffer = await readableToBuffer(pdf);
    return this.usersRepository.update({ pdf: pdfBuffer, updatedEmail: email });
  }
}
