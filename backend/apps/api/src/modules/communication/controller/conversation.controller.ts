import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ConversationService } from '../service/conversation.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { ConversationResponseDto } from '../dto/conversation-response.dto';
import { ConversationSummaryDto } from '../dto/conversation-summary.dto';
import { ConversationFilterDto } from '../dto/conversation-filter.dto';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@ApiTags('Communication - Conversations')
@Controller('communication/conversations')
@ApiBearerAuth()
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully', type: ConversationResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conversation already exists' })
  async create(@Body() dto: CreateConversationDto): Promise<ConversationResponseDto> {
    return this.conversationService.create(dto, 'current-user-id');
  }

  @Get()
  @ApiOperation({ summary: 'Get all conversations for current user' })
  @ApiResponse({ status: 200, description: 'Conversations retrieved successfully' })
  @ApiQuery({ type: ConversationFilterDto, required: false })
  async findAll(
    @Query() filter?: ConversationFilterDto,
    @Query() pagination?: PaginationOptions,
    @Query() sort?: SortOptions,
  ): Promise<{ data: ConversationSummaryDto[]; meta: any }> {
    return this.conversationService.findAll('current-user-id', filter, pagination, sort);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search conversations' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ name: 'query', description: 'Search query' })
  async search(
    @Query('query') query: string,
    @Query() pagination?: PaginationOptions,
  ): Promise<{ data: ConversationSummaryDto[]; meta: any }> {
    return this.conversationService.search(query, 'current-user-id', pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get conversation by ID' })
  @ApiResponse({ status: 200, description: 'Conversation retrieved successfully', type: ConversationResponseDto })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async findById(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.findById(id, 'current-user-id');
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get conversation summary by ID' })
  @ApiResponse({ status: 200, description: 'Conversation summary retrieved successfully', type: ConversationSummaryDto })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async findSummaryById(@Param('id') id: string): Promise<ConversationSummaryDto> {
    return this.conversationService.findSummaryById(id, 'current-user-id');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update conversation' })
  @ApiResponse({ status: 200, description: 'Conversation updated successfully', type: ConversationResponseDto })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConversationDto,
  ): Promise<ConversationResponseDto> {
    return this.conversationService.update(id, dto, 'current-user-id');
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive conversation' })
  @ApiResponse({ status: 200, description: 'Conversation archived successfully', type: ConversationResponseDto })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async archive(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.archive(id, 'current-user-id');
  }

  @Post(':id/unarchive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unarchive conversation' })
  @ApiResponse({ status: 200, description: 'Conversation unarchived successfully', type: ConversationResponseDto })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async unarchive(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationService.unarchive(id, 'current-user-id');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete conversation' })
  @ApiResponse({ status: 204, description: 'Conversation deleted successfully' })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.conversationService.delete(id, 'current-user-id');
  }
}
