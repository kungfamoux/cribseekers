import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheManagerService } from '../cache-manager.service';
import { CacheNamespace, CacheNamespaces } from '../cache.constants';
import {
  CACHE_KEY_METADATA,
  CACHE_TTL_METADATA,
  CACHE_NAMESPACE_METADATA,
  CACHE_OPTIONS_METADATA,
  CACHE_SKIP_METADATA,
} from '../decorators/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly cacheManager: CacheManagerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skipCache = this.reflector.get<boolean>(CACHE_SKIP_METADATA, context.getHandler());

    if (skipCache) {
      return next.handle();
    }

    const cacheKey = this.reflector.get<{ key: string }>(CACHE_KEY_METADATA, context.getHandler());
    
    if (!cacheKey) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const namespace = this.reflector.get<CacheNamespace>(
      CACHE_NAMESPACE_METADATA,
      context.getHandler(),
    ) || CacheNamespaces.PROPERTY;
    
    const ttl = this.reflector.get<number>(CACHE_TTL_METADATA, context.getHandler());
    const options = this.reflector.get<any>(CACHE_OPTIONS_METADATA, context.getHandler());

    const finalKey = this.generateKey(cacheKey.key, request);

    return this.handleCache(finalKey, namespace, ttl, options, next);
  }

  private handleCache(
    key: string,
    namespace: CacheNamespace,
    ttl?: number,
    options?: any,
    next?: CallHandler,
  ): Observable<any> {
    return new Observable((subscriber) => {
      this.cacheManager.get(key, namespace).then((cached) => {
        if (cached !== null) {
          this.logger.debug(`Cache hit for key: ${key}`);
          subscriber.next(cached);
          subscriber.complete();
          return;
        }

        this.logger.debug(`Cache miss for key: ${key}`);
        
        if (!next) {
          subscriber.next(null);
          subscriber.complete();
          return;
        }

        next.handle().pipe(
          tap((data) => {
            this.cacheManager.set(key, data, { ttl, ...options }, namespace).catch((error) => {
              this.logger.error(`Failed to cache data for key ${key}:`, error);
            });
          }),
          catchError((error) => {
            this.logger.error(`Error in cached handler for key ${key}:`, error);
            throw error;
          }),
        ).subscribe(subscriber);
      }).catch((error) => {
        this.logger.error(`Error checking cache for key ${key}:`, error);
        if (next) {
          next.handle().subscribe(subscriber);
        } else {
          subscriber.next(null);
          subscriber.complete();
        }
      });
    });
  }

  private generateKey(baseKey: string, request: any): string {
    const params = request.params || {};
    const query = request.query || {};
    const user = request.user?.id || 'anonymous';
    
    const keyParts = [
      baseKey,
      user,
      JSON.stringify(params),
      JSON.stringify(query),
    ];
    
    return keyParts.join(':');
  }
}
