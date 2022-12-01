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
  HttpCode,
  HttpStatus,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { FileSizeValidator } from '../validators/file-size.validator';
import { MimeTypes } from '../../shared/utils/mime-types';
import { GetUserDto } from '../dto/get-user.dto';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { checkData } from '../../shared/utils/check-data';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserEntity } from '../entities/user.entity';

@Controller({ path: 'users', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
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
    const user = await this.usersService.create(createUserDto, image);
    return new UserEntity(user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get('email')
  @UseGuards(AuthGuard)
  async findOne(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    const user = await this.usersService.findOne(email);

    checkData(user);

    return new UserEntity(user);
  }

  @Patch()
  @UseGuards(AuthGuard)
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
    const user = await this.usersService.update(updateUserDto, image);

    checkData(user);

    return new UserEntity(user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    const numberOfDeletedUsers = await this.usersService.remove(email);

    checkData(numberOfDeletedUsers);

    return;
  }

  @Post('pdf')
  @UseGuards(AuthGuard)
  async generatePdf(@Body() getUserDto: GetUserDto) {
    const { email } = getUserDto;
    const user = await this.usersService.generatePdf(email);
    const result = !user || !user.pdf || user.pdf.length === 0 ? false : true;
    return { result };
  }
}
