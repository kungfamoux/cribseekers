import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertyVerificationService } from '../service/property-verification.service';
import { SubmitPropertyDto } from '../dto/submit-property.dto';
import { ApprovePropertyDto } from '../dto/approve-property.dto';
import { RejectPropertyDto } from '../dto/reject-property.dto';
import { VerificationResponseDto } from '../dto/verification-response.dto';
import { VerificationHistoryDto } from '../dto/verification-history.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Verification')
@Controller('property-verification')
export class PropertyVerificationController {
  constructor(private readonly verificationService: PropertyVerificationService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit property for verification' })
  @ApiResponse({ status: 201, type: VerificationResponseDto })
  @ApiBearerAuth()
  async submitProperty(@Body() dto: SubmitPropertyDto): Promise<VerificationResponseDto> {
    return this.verificationService.submitProperty(dto, 'current-user-id');
  }

  @Post('approve')
  @ApiOperation({ summary: 'Approve property verification' })
  @ApiResponse({ status: 200, type: VerificationResponseDto })
  @ApiBearerAuth()
  async approveProperty(@Body() dto: ApprovePropertyDto): Promise<VerificationResponseDto> {
    return this.verificationService.approveProperty(dto, 'current-user-id');
  }

  @Post('reject')
  @ApiOperation({ summary: 'Reject property verification' })
  @ApiResponse({ status: 200, type: VerificationResponseDto })
  @ApiBearerAuth()
  async rejectProperty(@Body() dto: RejectPropertyDto): Promise<VerificationResponseDto> {
    return this.verificationService.rejectProperty(dto, 'current-user-id');
  }

  @Get(':propertyId/history')
  @ApiOperation({ summary: 'Get property verification history' })
  @ApiResponse({ status: 200, type: [VerificationHistoryDto] })
  @ApiBearerAuth()
  async getPropertyHistory(
    @Param('propertyId') propertyId: string,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.verificationService.getPropertyHistory(propertyId, pagination);
  }
}
