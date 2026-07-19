import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebhookService } from '../service/webhook.service';
import { CreateWebhookDto, UpdateWebhookDto, WebhookResponseDto, WebhookDeliveryResponseDto } from '../dto/webhook.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @ApiOperation({ summary: 'Create webhook' })
  @ApiResponse({ status: 201, description: 'Webhook created successfully', type: WebhookResponseDto })
  async create(@Body() dto: CreateWebhookDto): Promise<WebhookResponseDto> {
    return this.webhookService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update webhook' })
  @ApiResponse({ status: 200, description: 'Webhook updated successfully', type: WebhookResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateWebhookDto): Promise<WebhookResponseDto> {
    return this.webhookService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete webhook' })
  @ApiResponse({ status: 200, description: 'Webhook deleted successfully', type: WebhookResponseDto })
  async delete(@Param('id') id: string): Promise<WebhookResponseDto> {
    return this.webhookService.delete(id);
  }

  @Post(':id/trigger')
  @ApiOperation({ summary: 'Trigger webhook' })
  @ApiResponse({ status: 200, description: 'Webhook triggered successfully', type: WebhookDeliveryResponseDto })
  async trigger(@Param('id') id: string, @Body('event') event: string, @Body('payload') payload: any): Promise<WebhookDeliveryResponseDto> {
    return this.webhookService.trigger(id, event, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get webhook by ID' })
  @ApiResponse({ status: 200, description: 'Webhook retrieved successfully', type: WebhookResponseDto })
  async findById(@Param('id') id: string): Promise<WebhookResponseDto> {
    return this.webhookService.findById(id);
  }

  @Get(':id/deliveries')
  @ApiOperation({ summary: 'Get webhook deliveries' })
  @ApiResponse({ status: 200, description: 'Webhook deliveries retrieved successfully' })
  async getDeliveries(
    @Param('id') id: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.webhookService.getDeliveries(id, { ...pagination, ...sort });
  }

  @Get('pending-retries')
  @ApiOperation({ summary: 'Get pending webhook retries' })
  @ApiResponse({ status: 200, description: 'Pending retries retrieved successfully' })
  async getPendingRetries(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.webhookService.getPendingRetries({ ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all webhooks' })
  @ApiResponse({ status: 200, description: 'Webhooks retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.webhookService.findAll(filter, { ...pagination, ...sort });
  }
}
