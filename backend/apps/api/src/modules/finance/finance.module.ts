import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FinanceController } from './controller/finance.controller';
import { FinanceService } from './service/finance.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [FinanceController],
  providers: [FinanceService, PrismaService],
  exports: [FinanceService],
})
export class FinanceModule {}
