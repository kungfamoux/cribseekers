import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PermissionService } from '../service/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionResponseDto } from '../dto/permission-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Permission created successfully', type: PermissionResponseDto })
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<PermissionResponseDto> {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions with pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissions retrieved successfully', type: [PermissionResponseDto] })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PermissionResponseDto[]> {
    return this.permissionService.findAll(paginationDto);
  }

  @Get('paginate')
  @ApiOperation({ summary: 'Get paginated permissions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated permissions retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async paginate(@Query() paginationDto: PaginationDto) {
    return this.permissionService.paginate(paginationDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count all permissions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission count retrieved successfully' })
  async count(): Promise<number> {
    return this.permissionService.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission retrieved successfully', type: PermissionResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permission not found' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  async findOne(@Param('id') id: string): Promise<PermissionResponseDto> {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission updated successfully', type: PermissionResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permission not found' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Permission deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Permission not found' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(id);
  }

  @Get(':id/exists')
  @ApiOperation({ summary: 'Check if a permission exists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Permission existence checked successfully' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  async exists(@Param('id') id: string): Promise<boolean> {
    return this.permissionService.exists(id);
  }
}
