import { Module } from '@nestjs/common';
import { DeveloperController } from './controller/developer.controller';
import { DeveloperService } from './service/developer.service';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}
