import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [LoggerService, GlobalExceptionFilter, ResponseInterceptor],
  exports: [LoggerService, GlobalExceptionFilter, ResponseInterceptor],
})
export class CommonModule {}
