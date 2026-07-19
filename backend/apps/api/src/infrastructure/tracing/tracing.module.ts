import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { TracingService } from './tracing.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TracingService],
  exports: [TracingService],
})
export class TracingModule {}
