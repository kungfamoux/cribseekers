import { Module } from '@nestjs/common';
import { BuyerController } from './controller/buyer.controller';
import { BuyerService } from './service/buyer.service';

@Module({
  controllers: [BuyerController],
  providers: [BuyerService],
  exports: [BuyerService],
})
export class BuyerModule {}
