import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimitService } from '../rate-limit.service';
import { RATE_LIMIT_METADATA } from '../rate-limit.constants';
import { RateLimitOptions } from '../interfaces/rate-limit.interface';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RateLimitGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<RateLimitOptions>(RATE_LIMIT_METADATA, context.getHandler());

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Determine identifier based on options
    let identifier = this.getIdentifier(request);

    if (!identifier) {
      identifier = request.ip || 'anonymous';
    }

    const scope = options.scope || 'global';

    const result = await this.rateLimitService.checkRateLimit(identifier!, scope, options);

    // Set rate limit headers
    response.setHeader('X-RateLimit-Limit', result.limit);
    response.setHeader('X-RateLimit-Remaining', result.remaining);
    response.setHeader('X-RateLimit-Reset', result.reset);

    if (!result.allowed) {
      this.logger.warn(`Rate limit exceeded for ${identifier} in scope ${scope}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Rate limit exceeded',
          error: 'Too Many Requests',
          retryAfter: result.reset - Math.floor(Date.now() / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  private getIdentifier(request: any): string | null {
    // Priority: userId > apiKey > ip
    if (request.user?.id) {
      return `user:${request.user.id}`;
    }

    if (request.headers?.['x-api-key']) {
      return `api_key:${request.headers['x-api-key']}`;
    }

    if (request.ip) {
      return `ip:${request.ip}`;
    }

    return null;
  }
}
