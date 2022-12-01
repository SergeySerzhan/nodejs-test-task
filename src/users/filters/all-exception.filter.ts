import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { ErrorMessages } from '../utils/error-msgs';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    switch ((exception as any)?.name) {
      case 'SequelizeUniqueConstraintError':
        super.catch(new BadRequestException(ErrorMessages.UniqueLogin), host);
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
