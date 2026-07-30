import { Module } from '@nestjs/common';
import { FinanceController } from './controller/finance.controller';
import { FinanceService } from './service/finance.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
