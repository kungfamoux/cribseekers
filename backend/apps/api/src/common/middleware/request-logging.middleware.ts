import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      correlationId?: string;
      traceId?: string;
      startTime?: number;
    }
  }
}

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    req.startTime = startTime;

    // Generate or extract Request ID
    req.requestId = (req.headers['x-request-id'] as string) || randomUUID();

    // Generate or extract Correlation ID
    req.correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();

    // Generate or extract Trace ID
    req.traceId = (req.headers['x-trace-id'] as string) || randomUUID();

    // Set headers for response
    if (req.requestId) res.setHeader('X-Request-ID', req.requestId);
    if (req.correlationId) res.setHeader('X-Correlation-ID', req.correlationId);
    if (req.traceId) res.setHeader('X-Trace-ID', req.traceId);

    // Log request
    this.logRequest(req);

    // Log response on finish
    res.on('finish', () => {
      this.logResponse(req, res, startTime);
    });

    next();
  }

  private logRequest(req: Request) {
    const sanitizedBody = this.sanitizeBody(req.body);
    const sanitizedQuery = this.sanitizeQuery(req.query);

    this.logger.log({
      type: 'request',
      requestId: req.requestId,
      correlationId: req.correlationId,
      traceId: req.traceId,
      userId: (req.user as any)?.id || 'anonymous',
      ip: this.getClientIp(req),
      method: req.method,
      route: req.route?.path || req.path,
      url: req.url,
      userAgent: req.headers['user-agent'],
      body: sanitizedBody,
      query: sanitizedQuery,
      timestamp: new Date().toISOString(),
    });
  }

  private logResponse(req: Request, res: Response, startTime: number) {
    const duration = Date.now() - startTime;

    this.logger.log({
      type: 'response',
      requestId: req.requestId,
      correlationId: req.correlationId,
      traceId: req.traceId,
      userId: (req.user as any)?.id || 'anonymous',
      ip: this.getClientIp(req),
      method: req.method,
      route: req.route?.path || req.path,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date().toISOString(),
    });
  }

  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown'
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;

    const sensitiveFields = [
      'password',
      'otp',
      'token',
      'secret',
      'apiKey',
      'api_key',
      'accessToken',
      'access_token',
      'refreshToken',
      'refresh_token',
      'cardNumber',
      'card_number',
      'cvv',
      'pin',
      'ssn',
    ];

    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  private sanitizeQuery(query: any): any {
    if (!query) return null;

    const sensitiveFields = ['token', 'secret', 'apiKey', 'api_key', 'password'];

    const sanitized = { ...query };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
