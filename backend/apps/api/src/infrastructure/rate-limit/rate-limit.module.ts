import { Module, Global } from '@nestjs/common';
import { RateLimitService } from './rate-limit.service';
import { RedisModule } from '../../database/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [RateLimitService],
  exports: [RateLimitService],
})
export class RateLimitModule {}
