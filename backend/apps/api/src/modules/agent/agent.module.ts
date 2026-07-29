import { Module } from '@nestjs/common';
import { AgentController } from './controller/agent.controller';
import { AgentService } from './service/agent.service';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
