import { Exclude } from 'class-transformer';

export class UserEntity {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  pdf: any;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
