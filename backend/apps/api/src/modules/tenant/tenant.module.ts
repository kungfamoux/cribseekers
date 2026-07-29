import { Module } from '@nestjs/common';
import { TenantController } from './controller/tenant.controller';
import { TenantService } from './service/tenant.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
