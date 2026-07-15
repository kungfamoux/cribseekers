import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleResponseDto } from '../dto/role-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Role created successfully', type: RoleResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Role with name already exists' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Roles retrieved successfully', type: [RoleResponseDto] })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(@Query() paginationDto: PaginationDto): Promise<RoleResponseDto[]> {
    return this.roleService.findAll(paginationDto);
  }

  @Get('paginate')
  @ApiOperation({ summary: 'Get paginated roles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated roles retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async paginate(@Query() paginationDto: PaginationDto) {
    return this.roleService.paginate(paginationDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count all roles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role count retrieved successfully' })
  async count(): Promise<number> {
    return this.roleService.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role retrieved successfully', type: RoleResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  async findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.roleService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a role by name' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role retrieved successfully', type: RoleResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  @ApiParam({ name: 'name', description: 'Role name' })
  async findByName(@Param('name') name: string): Promise<RoleResponseDto> {
    return this.roleService.findByName(name);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get roles by type' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Roles retrieved successfully', type: [RoleResponseDto] })
  @ApiParam({ name: 'type', description: 'Role type' })
  async findByType(@Param('type') type: string): Promise<RoleResponseDto[]> {
    return this.roleService.findByType(type);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role updated successfully', type: RoleResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Cannot modify system roles' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Role with name already exists' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Role deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Cannot delete system roles' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.roleService.remove(id);
  }

  @Get(':id/exists')
  @ApiOperation({ summary: 'Check if a role exists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role existence checked successfully' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  async exists(@Param('id') id: string): Promise<boolean> {
    return this.roleService.exists(id);
  }
}
