import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { ErrorMessages } from '../utils/error-msgs';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    switch ((exception as any)?.name) {
      case 'SequelizeUniqueConstraintError':
        super.catch(new BadRequestException(ErrorMessages.UniqueLogin), host);
        break;
      case 'TokenExpiredError':
        super.catch(new UnauthorizedException(), host);
        break;
      case 'JsonWebTokenError':
        super.catch(new ForbiddenException(), host);
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
