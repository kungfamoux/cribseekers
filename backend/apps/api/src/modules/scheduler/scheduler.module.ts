import { Module, Global } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { RedisModule } from '../../database/redis.module';
import { SchedulerService } from './scheduler.service';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    RedisModule,
  ],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
