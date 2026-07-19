import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from '../dto/category.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully', type: CategoryResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBearerAuth()
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(@Query() pagination?: PaginationDto): Promise<{ data: CategoryResponseDto[]; meta: any }> {
    return this.categoryService.findAll(pagination);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active categories' })
  @ApiResponse({ status: 200, description: 'Active categories retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findActive(@Query() pagination?: PaginationDto): Promise<{ data: CategoryResponseDto[]; meta: any }> {
    return this.categoryService.findActive(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async findById(@Param('id') id: string): Promise<CategoryResponseDto> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
