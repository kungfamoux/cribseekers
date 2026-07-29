import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PurposeService } from '../service/purpose.service';
import { CreatePurposeDto, UpdatePurposeDto, PurposeResponseDto } from '../dto/purpose.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Purposes')
@Controller('property-purposes')
export class PurposeController {
  constructor(private readonly purposeService: PurposeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new property purpose' })
  @ApiResponse({ status: 201, description: 'Property purpose created successfully', type: PurposeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBearerAuth()
  async create(@Body() dto: CreatePurposeDto): Promise<PurposeResponseDto> {
    return this.purposeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all property purposes' })
  @ApiResponse({ status: 200, description: 'Property purposes retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(@Query() pagination?: PaginationDto): Promise<{ data: PurposeResponseDto[]; meta: any }> {
    return this.purposeService.findAll(pagination);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active property purposes' })
  @ApiResponse({ status: 200, description: 'Active property purposes retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findActive(@Query() pagination?: PaginationDto): Promise<{ data: PurposeResponseDto[]; meta: any }> {
    return this.purposeService.findActive(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property purpose by ID' })
  @ApiResponse({ status: 200, description: 'Property purpose retrieved successfully', type: PurposeResponseDto })
  @ApiResponse({ status: 404, description: 'Property purpose not found' })
  @ApiParam({ name: 'id', description: 'Property purpose ID' })
  async findById(@Param('id') id: string): Promise<PurposeResponseDto> {
    return this.purposeService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property purpose' })
  @ApiResponse({ status: 200, description: 'Property purpose updated successfully', type: PurposeResponseDto })
  @ApiResponse({ status: 404, description: 'Property purpose not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property purpose ID' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdatePurposeDto): Promise<PurposeResponseDto> {
    return this.purposeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete property purpose' })
  @ApiResponse({ status: 204, description: 'Property purpose deleted successfully' })
  @ApiResponse({ status: 404, description: 'Property purpose not found' })
  @ApiParam({ name: 'id', description: 'Property purpose ID' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    return this.purposeService.delete(id);
  }
}
