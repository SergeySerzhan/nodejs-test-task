import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { ErrorMessages } from '../../shared/utils/error-msgs';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);

    if (!token) throw new UnauthorizedException(ErrorMessages.UserLoginError);

    return { token };
  }
}
