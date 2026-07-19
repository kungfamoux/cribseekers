import { ForbiddenException } from '@nestjs/common';

export class ForbiddenOperationException extends ForbiddenException {
  constructor(operation: string) {
    super(`Operation ${operation} is not allowed`);
  }
}
