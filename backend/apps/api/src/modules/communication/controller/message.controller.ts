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
import { MessageService } from '../service/message.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageResponseDto } from '../dto/message-response.dto';
import { MessageSummaryDto } from '../dto/message-summary.dto';
import { MessageFilterDto } from '../dto/message-filter.dto';
import { ReactionDto } from '../dto/reaction.dto';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@ApiTags('Communication - Messages')
@Controller('communication/messages')
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a new message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Conversation blocked' })
  async create(@Body() dto: CreateMessageDto): Promise<MessageResponseDto> {
    return this.messageService.create(dto, 'current-user-id');
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages with filters' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiQuery({ type: MessageFilterDto, required: false })
  async findAll(
    @Query() filter?: MessageFilterDto,
    @Query() pagination?: PaginationOptions,
    @Query() sort?: SortOptions,
  ): Promise<{ data: MessageSummaryDto[]; meta: any }> {
    return this.messageService.findAll('current-user-id', filter, pagination, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get message by ID' })
  @ApiResponse({ status: 200, description: 'Message retrieved successfully', type: MessageResponseDto })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async findById(@Param('id') id: string): Promise<MessageResponseDto> {
    return this.messageService.findById(id, 'current-user-id');
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get message summary by ID' })
  @ApiResponse({ status: 200, description: 'Message summary retrieved successfully', type: MessageSummaryDto })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async findSummaryById(@Param('id') id: string): Promise<MessageSummaryDto> {
    return this.messageService.findSummaryById(id, 'current-user-id');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit message' })
  @ApiResponse({ status: 200, description: 'Message updated successfully', type: MessageResponseDto })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messageService.update(id, dto, 'current-user-id');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete message' })
  @ApiResponse({ status: 204, description: 'Message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.messageService.delete(id, 'current-user-id');
  }

  @Post(':id/reactions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add reaction to message' })
  @ApiResponse({ status: 200, description: 'Reaction added successfully', type: MessageResponseDto })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 409, description: 'Reaction already exists' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async addReaction(
    @Param('id') id: string,
    @Body() dto: ReactionDto,
  ): Promise<MessageResponseDto> {
    return this.messageService.addReaction({ ...dto, messageId: id }, 'current-user-id');
  }

  @Delete(':id/reactions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove reaction from message' })
  @ApiResponse({ status: 200, description: 'Reaction removed successfully', type: MessageResponseDto })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async removeReaction(@Param('id') id: string): Promise<MessageResponseDto> {
    return this.messageService.removeReaction(id, 'current-user-id');
  }

  @Post(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark message as read' })
  @ApiResponse({ status: 204, description: 'Message marked as read' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  async markAsRead(@Param('id') id: string): Promise<void> {
    return this.messageService.markAsRead(id, 'current-user-id');
  }
}
