import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, ApiMeta } from '@cribseekers/types';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const meta: ApiMeta = {
          timestamp: new Date().toISOString(),
          requestId: request.id || 'unknown',
          version: '1.0.0',
        };

        return {
          success: true,
          data,
          meta,
        };
      }),
    );
  }
}
