import { Module, Global } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  providers: [
    CacheManagerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheManagerService],
})
export class CacheModule {}
