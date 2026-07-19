import { SetMetadata } from '@nestjs/common';
import { RateLimitOptions } from '../interfaces/rate-limit.interface';
import { RATE_LIMIT_METADATA } from '../rate-limit.constants';

export const RateLimit = (options: RateLimitOptions) => {
  return SetMetadata(RATE_LIMIT_METADATA, options);
};
