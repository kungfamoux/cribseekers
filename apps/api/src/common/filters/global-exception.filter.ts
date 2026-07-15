import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '@cribseekers/types';
import { mapPrismaException } from '../../database/database-exception.util';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const mappedException = mapPrismaException(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      mappedException instanceof HttpException
        ? mappedException.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      mappedException instanceof HttpException
        ? mappedException.message
        : 'Internal server error';

    const errorResponse: ApiError = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (mappedException instanceof HttpException) {
      const exceptionResponse = mappedException.getResponse();
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        errorResponse.details = exceptionResponse;
      }
    }

    this.logger.error(
      `${request.method} ${request.url}`,
      mappedException instanceof Error ? mappedException.stack : 'Unknown error',
      'GlobalExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
