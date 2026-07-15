import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User with email already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with filtering and pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users retrieved successfully', type: [UserResponseDto] })
  @ApiQuery({ type: UserFilterDto, required: false })
  @ApiQuery({ type: PaginationDto, required: false })
  async findAll(
    @Query() filterDto: UserFilterDto,
    @Query() paginationDto: PaginationDto,
  ): Promise<UserResponseDto[]> {
    return this.userService.findAll(filterDto, paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search users by query' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search results retrieved successfully', type: [UserResponseDto] })
  @ApiQuery({ name: 'query', required: true, description: 'Search query' })
  @ApiQuery({ type: PaginationDto, required: false })
  async search(
    @Query('query') query: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<UserResponseDto[]> {
    return this.userService.search(query, paginationDto);
  }

  @Get('paginate')
  @ApiOperation({ summary: 'Get paginated users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated users retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async paginate(@Query() paginationDto: PaginationDto) {
    return this.userService.paginate(paginationDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count users with optional filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User count retrieved successfully' })
  @ApiQuery({ type: UserFilterDto, required: false })
  async count(@Query() filterDto?: UserFilterDto): Promise<number> {
    return this.userService.count(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'email', description: 'User email' })
  async findByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    return this.userService.findByEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated successfully', type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User with email already exists' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Delete(':id/soft')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User soft deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async softDelete(@Param('id') id: string): Promise<void> {
    return this.userService.softDelete(id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a soft deleted user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User restored successfully', type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async restore(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.restore(id);
  }

  @Get(':id/exists')
  @ApiOperation({ summary: 'Check if a user exists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User existence checked successfully' })
  @ApiParam({ name: 'id', description: 'User ID' })
  async exists(@Param('id') id: string): Promise<boolean> {
    return this.userService.exists(id);
  }
}
