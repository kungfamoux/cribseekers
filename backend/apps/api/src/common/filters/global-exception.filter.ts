import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { mapPrismaException } from '../../database/database-exception.util';
import { LoggerService } from '../logger/logger.service';

interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
  traceId?: string;
  errors?: any[];
}

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

    // RFC7807 Problem Details response
    const problemDetails: ProblemDetails = {
      type: this.getErrorType(status),
      title: this.getErrorTitle(status),
      status,
      detail: message,
      instance: request.url,
      timestamp: new Date().toISOString(),
      correlationId: request.correlationId,
      requestId: request.requestId,
      traceId: request.traceId,
    };

    // Add validation errors if present
    if (mappedException instanceof HttpException) {
      const exceptionResponse = mappedException.getResponse();
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        problemDetails.errors = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message];
      }
    }

    // Log error with correlation ID
    this.logger.errorWithContext(
      {
        type: 'error',
        correlationId: request.correlationId,
        requestId: request.requestId,
        traceId: request.traceId,
        userId: (request.user as any)?.id || 'anonymous',
        ip: request.ip,
        method: request.method,
        route: request.url,
        statusCode: status,
        message,
        stack: mappedException instanceof Error ? mappedException.stack : undefined,
      },
      'GlobalExceptionFilter',
    );

    // Don't expose stack traces in production
    if (process.env.NODE_ENV === 'production') {
      delete (problemDetails as any).stack;
    }

    response.status(status).json(problemDetails);
  }

  private getErrorType(status: number): string {
    const baseUrl = 'https://tools.ietf.org/html/rfc7231#section-6.';
    switch (status) {
      case 400:
        return `${baseUrl}5.1`;
      case 401:
        return `${baseUrl}3.1`;
      case 403:
        return `${baseUrl}5.4`;
      case 404:
        return `${baseUrl}5.2`;
      case 409:
        return `${baseUrl}5.8`;
      case 422:
        return `${baseUrl}5.1`;
      case 429:
        return `${baseUrl}6.4`;
      case 500:
        return `${baseUrl}6.1`;
      default:
        return 'about:blank';
    }
  }

  private getErrorTitle(status: number): string {
    switch (status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 409:
        return 'Conflict';
      case 422:
        return 'Unprocessable Entity';
      case 429:
        return 'Too Many Requests';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Error';
    }
  }
}
