import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { BlockedConversationService } from '../service/blocked-conversation.service';
import { BlockConversationDto } from '../dto/block-conversation.dto';

@ApiTags('Communication - Blocked Conversations')
@Controller('communication/blocked')
@ApiBearerAuth()
export class BlockedConversationController {
  constructor(private readonly blockedConversationService: BlockedConversationService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Block a conversation' })
  @ApiResponse({ status: 204, description: 'Conversation blocked successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 409, description: 'Conversation already blocked' })
  async block(@Body() dto: BlockConversationDto): Promise<void> {
    return this.blockedConversationService.blockConversation(dto, 'current-user-id');
  }

  @Delete(':conversationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Unblock a conversation' })
  @ApiResponse({ status: 204, description: 'Conversation unblocked successfully' })
  @ApiResponse({ status: 404, description: 'Blocked conversation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiParam({ name: 'conversationId', description: 'Conversation ID' })
  async unblock(@Param('conversationId') conversationId: string): Promise<void> {
    return this.blockedConversationService.unblockConversation(conversationId, 'current-user-id');
  }
}
