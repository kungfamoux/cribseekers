import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertyModerationService } from '../service/property-moderation.service';
import { ModerationActionDto } from '../dto/moderation-action.dto';
import { VerificationResponseDto } from '../dto/verification-response.dto';
import { VerificationFilterDto } from '../dto/verification-filter.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Moderation')
@Controller('property-moderation')
export class PropertyModerationController {
  constructor(private readonly moderationService: PropertyModerationService) {}

  @Post('action')
  @ApiOperation({ summary: 'Perform moderation action on property' })
  @ApiResponse({ status: 200, type: VerificationResponseDto })
  @ApiBearerAuth()
  async performModerationAction(@Body() dto: ModerationActionDto): Promise<VerificationResponseDto> {
    return this.moderationService.performModerationAction(dto, 'current-user-id');
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending moderations' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async getPendingModerations(
    @Query() filter: VerificationFilterDto,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.moderationService.getPendingModerations(filter, pagination);
  }

  @Get('reviewer/:reviewerId')
  @ApiOperation({ summary: 'Get moderations by reviewer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async getModerationsByReviewer(
    @Param('reviewerId') reviewerId: string,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.moderationService.getModerationsByReviewer(reviewerId, pagination);
  }
}
