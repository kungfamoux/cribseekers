import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TypeService } from '../service/type.service';
import { CreateTypeDto, UpdateTypeDto, TypeResponseDto } from '../dto/type.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Types')
@Controller('property-types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new property type' })
  @ApiResponse({ status: 201, description: 'Property type created successfully', type: TypeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBearerAuth()
  async create(@Body() dto: CreateTypeDto): Promise<TypeResponseDto> {
    return this.typeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all property types' })
  @ApiResponse({ status: 200, description: 'Property types retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(@Query() pagination?: PaginationDto): Promise<{ data: TypeResponseDto[]; meta: any }> {
    return this.typeService.findAll(pagination);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active property types' })
  @ApiResponse({ status: 200, description: 'Active property types retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findActive(@Query() pagination?: PaginationDto): Promise<{ data: TypeResponseDto[]; meta: any }> {
    return this.typeService.findActive(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property type by ID' })
  @ApiResponse({ status: 200, description: 'Property type retrieved successfully', type: TypeResponseDto })
  @ApiResponse({ status: 404, description: 'Property type not found' })
  @ApiParam({ name: 'id', description: 'Property type ID' })
  async findById(@Param('id') id: string): Promise<TypeResponseDto> {
    return this.typeService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property type' })
  @ApiResponse({ status: 200, description: 'Property type updated successfully', type: TypeResponseDto })
  @ApiResponse({ status: 404, description: 'Property type not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property type ID' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateTypeDto): Promise<TypeResponseDto> {
    return this.typeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete property type' })
  @ApiResponse({ status: 204, description: 'Property type deleted successfully' })
  @ApiResponse({ status: 404, description: 'Property type not found' })
  @ApiParam({ name: 'id', description: 'Property type ID' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    return this.typeService.delete(id);
  }
}
