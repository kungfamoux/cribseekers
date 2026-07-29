import { Module } from '@nestjs/common';
import { LandlordController } from './controller/landlord.controller';
import { LandlordService } from './service/landlord.service';

@Module({
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [LandlordService],
})
export class LandlordModule {}
