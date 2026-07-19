import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TypingService } from '../service/typing.service';
import { TypingDto } from '../dto/typing.dto';

@ApiTags('Communication - Typing')
@Controller('communication/typing')
@ApiBearerAuth()
export class TypingController {
  constructor(private readonly typingService: TypingService) {}

  @Post('start')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Start typing indicator' })
  @ApiResponse({ status: 204, description: 'Typing indicator started' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async startTyping(@Body() dto: TypingDto): Promise<void> {
    return this.typingService.startTyping(dto, 'current-user-id');
  }

  @Post('stop')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Stop typing indicator' })
  @ApiResponse({ status: 204, description: 'Typing indicator stopped' })
  async stopTyping(@Body() dto: TypingDto): Promise<void> {
    return this.typingService.stopTyping(dto, 'current-user-id');
  }
}
