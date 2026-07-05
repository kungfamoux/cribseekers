import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  providers: [LoggerService, GlobalExceptionFilter, ResponseInterceptor],
  exports: [LoggerService, GlobalExceptionFilter, ResponseInterceptor],
})
export class CommonModule {}
