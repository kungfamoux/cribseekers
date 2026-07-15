import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeyService } from '../service/api-key.service';
import { CreateApiKeyDto, RotateApiKeyDto, ApiKeyResponseDto } from '../dto/api-key.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('API Keys')
@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @ApiOperation({ summary: 'Create API key' })
  @ApiResponse({ status: 201, description: 'API key created successfully', type: ApiKeyResponseDto })
  async create(@Body() dto: CreateApiKeyDto): Promise<ApiKeyResponseDto> {
    return this.apiKeyService.create(dto);
  }

  @Put(':id/rotate')
  @ApiOperation({ summary: 'Rotate API key' })
  @ApiResponse({ status: 200, description: 'API key rotated successfully', type: ApiKeyResponseDto })
  async rotate(@Param('id') id: string, @Body() dto: RotateApiKeyDto): Promise<ApiKeyResponseDto> {
    const newKey = this.generateApiKey();
    return this.apiKeyService.rotate(id, newKey, dto.reason);
  }

  @Put(':id/revoke')
  @ApiOperation({ summary: 'Revoke API key' })
  @ApiResponse({ status: 200, description: 'API key revoked successfully', type: ApiKeyResponseDto })
  async revoke(@Param('id') id: string): Promise<ApiKeyResponseDto> {
    return this.apiKeyService.revoke(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete API key' })
  @ApiResponse({ status: 200, description: 'API key deleted successfully', type: ApiKeyResponseDto })
  async delete(@Param('id') id: string): Promise<ApiKeyResponseDto> {
    return this.apiKeyService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get API key by ID' })
  @ApiResponse({ status: 200, description: 'API key retrieved successfully', type: ApiKeyResponseDto })
  async findById(@Param('id') id: string): Promise<ApiKeyResponseDto> {
    return this.apiKeyService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get API keys by user ID' })
  @ApiResponse({ status: 200, description: 'API keys retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.apiKeyService.findByUserId(userId, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all API keys' })
  @ApiResponse({ status: 200, description: 'API keys retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.apiKeyService.findAll(filter, { ...pagination, ...sort });
  }

  private generateApiKey(): string {
    return `csk_${Buffer.from(Date.now().toString()).toString('base64')}`;
  }
}
