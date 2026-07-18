import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  getRoot() {
    return {
      name: 'CribSeekers API',
      version: '1.0.0',
      description: 'Modern Nigerian real estate platform API',
      documentation: '/api/docs',
      health: '/api/health',
      status: 'operational',
    };
  }

  @Get('api')
  @ApiOperation({ summary: 'API information endpoint' })
  getApiInfo() {
    return {
      name: 'CribSeekers API',
      version: '1.0.0',
      description: 'Modern Nigerian real estate platform API',
      documentation: '/api/docs',
      health: '/api/health',
      endpoints: {
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        properties: '/api/v1/properties',
        inspections: '/api/v1/inspections',
        payments: '/api/v1/payments',
        notifications: '/api/v1/notifications',
        search: '/api/v1/search',
        recommendations: '/api/v1/recommendations',
      },
    };
  }
}
