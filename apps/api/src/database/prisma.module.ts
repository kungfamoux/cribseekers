import { Module, Global } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '../config/config.module';
import { PrismaService } from './prisma.service';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  imports: [ConfigModule, CommonModule],
  providers: [PrismaService, TransactionService],
  exports: [PrismaService, TransactionService],
})
export class PrismaModule {}
