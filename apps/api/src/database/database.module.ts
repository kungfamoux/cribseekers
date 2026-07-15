import { Module } from '@nestjs/common';
import { RedisModule } from './redis.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
  ],
  exports: [RedisModule, PrismaModule],
})
export class DatabaseModule {}
