import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { FileSizeValidator } from '../validators/file-size.validator';
import { MimeTypes } from '../utils/mime-types';
import { GetUserDto } from '../dto/get-user.dto';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizeValidator({
            fileType: [MimeTypes.jpg, MimeTypes.jpeg, MimeTypes.png],
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const user = this.usersService.create(createUserDto, image);
    return user;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('email')
  async findOne(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    return this.usersService.findOne(email);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizeValidator({
            fileType: [MimeTypes.jpg, MimeTypes.jpeg, MimeTypes.png],
          }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.usersService.update(updateUserDto, image);
  }

  @Delete()
  async remove(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    return this.usersService.remove(email);
  }

  @Post('pdf')
  async generatePdf(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    return this.usersService.generatePdf(email);
  }
}
