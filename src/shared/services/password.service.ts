import { compare, hash } from 'bcrypt';

export class PasswordService {
  static async hashPassword(password: string) {
    return hash(password, +process.env.SALT_ROUNDS);
  }

  static async comparePasswords(password: string, hashPassword: string) {
    return compare(password, hashPassword);
  }
}
