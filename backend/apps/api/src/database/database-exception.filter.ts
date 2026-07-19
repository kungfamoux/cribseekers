import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { mapPrismaException } from './database-exception.util';
import { LoggerService } from '../common/logger/logger.service';

type PrismaException =
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError
  | PrismaClientInitializationError
  | PrismaClientRustPanicError;

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: PrismaException, _host: ArgumentsHost): void {
    const mappedException = mapPrismaException(exception);

    this.logger.error(
      mappedException.message,
      exception instanceof Error ? exception.stack : undefined,
      DatabaseExceptionFilter.name,
    );

    throw mappedException;
  }
}
