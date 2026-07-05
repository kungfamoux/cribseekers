import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static registerAsync(options: any) {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_OPTIONS',
          useValue: options,
        },
      ],
    };
  }
}
