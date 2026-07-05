import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        password: configService.get<string>('REDIS_PASSWORD'),
      }),
    }),
    PrismaModule,
  ],
  exports: [RedisModule, PrismaModule],
})
export class DatabaseModule {}
