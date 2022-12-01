import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '../dto/login.dto';
import { UsersRepository } from 'src/users/data-access/users.repository';
import { PasswordService } from 'src/shared/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne(email);

    if (!user || !PasswordService.comparePasswords(password, user.password))
      return;

    return this.jwtService.signAsync({ email });
  }
}
