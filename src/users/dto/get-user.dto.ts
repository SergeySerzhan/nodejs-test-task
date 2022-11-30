import { IsNotEmpty, IsEmail } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
