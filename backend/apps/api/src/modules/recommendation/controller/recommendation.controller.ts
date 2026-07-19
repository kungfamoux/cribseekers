import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationService } from '../service/recommendation.service';
import { RecommendationRequestDto } from '../dto/recommendation-request.dto';
import { RecommendationResponseDto } from '../dto/recommendation-response.dto';
import { RecommendationFeedbackDto } from '../dto/recommendation-feedback.dto';
import { RecommendationPaginationDto } from '../dto/recommendation-pagination.dto';
import { RecommendationExplanationDto } from '../dto/recommendation-explanation.dto';

@ApiTags('Recommendations')
@Controller('recommendations')
@ApiBearerAuth()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @ApiOperation({ summary: 'Get personalized recommendations' })
  @ApiResponse({ status: 200, description: 'Recommendations retrieved successfully', type: RecommendationResponseDto })
  async getRecommendations(
    @Query() requestDto: RecommendationRequestDto,
    @Query() paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getRecommendations(userId, requestDto, paginationDto);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular recommendations' })
  @ApiResponse({ status: 200, description: 'Popular recommendations retrieved successfully', type: RecommendationResponseDto })
  async getPopular(
    @Query() requestDto: RecommendationRequestDto,
    @Query() paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    return this.recommendationService.getPopular(requestDto, paginationDto);
  }

  @Get('similar/:propertyId')
  @ApiOperation({ summary: 'Get similar property recommendations' })
  @ApiParam({ name: 'propertyId', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Similar recommendations retrieved successfully', type: RecommendationResponseDto })
  async getSimilarProperties(
    @Param('propertyId') propertyId: string,
    @Query() paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getSimilarProperties(propertyId, userId, paginationDto);
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Get location-based recommendations' })
  @ApiParam({ name: 'locationId', description: 'Location ID' })
  @ApiResponse({ status: 200, description: 'Location recommendations retrieved successfully', type: RecommendationResponseDto })
  async getLocationRecommendations(
    @Param('locationId') locationId: string,
    @Query() paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getLocationRecommendations(locationId, userId, paginationDto);
  }

  @Get('budget')
  @ApiOperation({ summary: 'Get budget-based recommendations' })
  @ApiResponse({ status: 200, description: 'Budget recommendations retrieved successfully', type: RecommendationResponseDto })
  async getBudgetRecommendations(
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query() paginationDto?: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getBudgetRecommendations(userId, minPrice, maxPrice, paginationDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get history-based recommendations' })
  @ApiResponse({ status: 200, description: 'History recommendations retrieved successfully', type: RecommendationResponseDto })
  async getHistoryRecommendations(
    @Query() paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getHistoryRecommendations(userId, paginationDto);
  }

  @Get('explanations/:propertyId')
  @ApiOperation({ summary: 'Get recommendation explanation' })
  @ApiParam({ name: 'propertyId', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'Recommendation explanation retrieved successfully', type: RecommendationExplanationDto })
  async getExplanation(
    @Param('propertyId') propertyId: string,
  ): Promise<RecommendationExplanationDto> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    return this.recommendationService.getExplanation(propertyId, userId);
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Submit recommendation feedback' })
  @ApiResponse({ status: 201, description: 'Feedback submitted successfully' })
  async saveFeedback(
    @Body() feedbackDto: RecommendationFeedbackDto,
  ): Promise<void> {
    const userId = 'current-user-id'; // TODO: Get from auth context
    await this.recommendationService.saveFeedback(userId, feedbackDto);
  }
}
