import { NotFoundException } from '@nestjs/common';

import { User } from '../../users/models/users.model';
import { ErrorMessages } from './error-msgs';

export function checkData(data: User | number) {
  if (!data) throw new NotFoundException(ErrorMessages.UserNotFound);
}
