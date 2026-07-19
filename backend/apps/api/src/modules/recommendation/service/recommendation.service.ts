import { Injectable } from '@nestjs/common';
import { RecommendationRepository } from '../repository/recommendation.repository';
import { RecommendationMapper } from '../mappers/recommendation.mapper';
import { RecommendationRequestDto } from '../dto/recommendation-request.dto';
import { RecommendationResponseDto } from '../dto/recommendation-response.dto';
import { RecommendationFeedbackDto } from '../dto/recommendation-feedback.dto';
import { RecommendationPaginationDto } from '../dto/recommendation-pagination.dto';
import { RecommendationExplanationDto } from '../dto/recommendation-explanation.dto';
import { RecommendationNotFoundException } from '../exceptions/recommendation.exception';
import { CompositeRecommendationStrategy } from '../strategies/composite.strategy';
import { PopularStrategy } from '../strategies/popular.strategy';
import { SimilarPropertyStrategy } from '../strategies/similar-property.strategy';
import { BudgetStrategy } from '../strategies/budget.strategy';
import { LocationStrategy } from '../strategies/location.strategy';
import { FavoriteStrategy } from '../strategies/favorite.strategy';
import { RecentViewStrategy } from '../strategies/recent-view.strategy';
import { SearchHistoryStrategy } from '../strategies/search-history.strategy';
import { InspectionStrategy } from '../strategies/inspection.strategy';
import { RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { CacheManagerService } from '../../../infrastructure/cache/cache-manager.service';
import { CacheNamespaces, CacheTags } from '../../../infrastructure/cache/cache.constants';

@Injectable()
export class RecommendationService {
  private compositeStrategy: CompositeRecommendationStrategy;

  constructor(
    private readonly recommendationRepository: RecommendationRepository,
    private readonly cacheManager: CacheManagerService,
    _popularStrategy: PopularStrategy,
    _similarPropertyStrategy: SimilarPropertyStrategy,
    _budgetStrategy: BudgetStrategy,
    _locationStrategy: LocationStrategy,
    _favoriteStrategy: FavoriteStrategy,
    _recentViewStrategy: RecentViewStrategy,
    _searchHistoryStrategy: SearchHistoryStrategy,
    _inspectionStrategy: InspectionStrategy,
  ) {
    this.compositeStrategy = new CompositeRecommendationStrategy();
    this.compositeStrategy.registerStrategy(_popularStrategy);
    this.compositeStrategy.registerStrategy(_similarPropertyStrategy);
    this.compositeStrategy.registerStrategy(_budgetStrategy);
    this.compositeStrategy.registerStrategy(_locationStrategy);
    this.compositeStrategy.registerStrategy(_favoriteStrategy);
    this.compositeStrategy.registerStrategy(_recentViewStrategy);
    this.compositeStrategy.registerStrategy(_searchHistoryStrategy);
    this.compositeStrategy.registerStrategy(_inspectionStrategy);
  }

  async getRecommendations(
    userId: string,
    requestDto: RecommendationRequestDto,
    paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const cacheKey = this.cacheManager.generateHash({ userId, requestDto, paginationDto });
    const cached = await this.cacheManager.get<RecommendationResponseDto>(
      cacheKey,
      CacheNamespaces.AI_RECOMMENDATIONS,
    );

    if (cached) {
      return cached;
    }

    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const context: RecommendationContext = {
      userId,
      propertyId: requestDto.propertyId,
      locationId: requestDto.locationId,
      categoryId: requestDto.categoryId,
      typeId: requestDto.typeId,
      purposeId: requestDto.purposeId,
      minPrice: requestDto.minPrice,
      maxPrice: requestDto.maxPrice,
      minBedrooms: requestDto.minBedrooms,
      minBathrooms: requestDto.minBathrooms,
      state: requestDto.state,
      city: requestDto.city,
      excludeViewed: requestDto.excludeViewed,
      excludeFavorited: requestDto.excludeFavorited,
      excludeHidden: requestDto.excludeHidden,
      limit: limit * 2, // Get more for ranking
    };

    const items = await this.compositeStrategy.execute(context);

    const paginatedItems = items.slice(skip, skip + limit);

    const response = {
      data: paginatedItems.map(item => RecommendationMapper.toItemDto(item)),
      meta: {
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit),
        hasNextPage: page < Math.ceil(items.length / limit),
        hasPreviousPage: page > 1,
      },
    };

    // Cache recommendations with shorter TTL for freshness
    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 900, tags: [CacheTags.PROPERTY_UPDATE, CacheTags.USER_UPDATE] },
      CacheNamespaces.AI_RECOMMENDATIONS,
    );

    return response;
  }

  async getPopular(
    requestDto: RecommendationRequestDto,
    paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const { page = 1, limit = 20 } = paginationDto;

    const result = await this.recommendationRepository.getPopular(
      {
        categoryId: requestDto.categoryId,
        typeId: requestDto.typeId,
        purposeId: requestDto.purposeId,
        state: requestDto.state,
        city: requestDto.city,
      },
      { page, limit },
    );

    return {
      data: result.data.map(item => RecommendationMapper.toItemDto(item)),
      meta: result.meta,
    };
  }

  async getSimilarProperties(
    propertyId: string,
    userId: string,
    paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const { page = 1, limit = 20 } = paginationDto;

    const result = await this.recommendationRepository.getSimilarProperties(
      propertyId,
      userId,
      { page, limit },
    );

    return {
      data: result.data.map(item => RecommendationMapper.toItemDto(item)),
      meta: result.meta,
    };
  }

  async getLocationRecommendations(
    locationId: string,
    userId: string,
    paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const { page = 1, limit = 20 } = paginationDto;

    const result = await this.recommendationRepository.getByLocation(
      locationId,
      userId,
      { page, limit },
    );

    return {
      data: result.data.map(item => RecommendationMapper.toItemDto(item)),
      meta: result.meta,
    };
  }

  async getBudgetRecommendations(
    userId: string,
    minPrice?: number,
    maxPrice?: number,
    paginationDto?: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const { page = 1, limit = 20 } = paginationDto || {};

    const result = await this.recommendationRepository.getByBudget(
      userId,
      minPrice,
      maxPrice,
      { page, limit },
    );

    return {
      data: result.data.map(item => RecommendationMapper.toItemDto(item)),
      meta: result.meta,
    };
  }

  async getHistoryRecommendations(
    userId: string,
    paginationDto: RecommendationPaginationDto,
  ): Promise<RecommendationResponseDto> {
    const { page = 1, limit = 20 } = paginationDto;

    const result = await this.recommendationRepository.getByInspectionHistory(
      userId,
      { page, limit },
    );

    return {
      data: result.data.map(item => RecommendationMapper.toItemDto(item)),
      meta: result.meta,
    };
  }

  async getExplanation(
    propertyId: string,
    userId: string,
  ): Promise<RecommendationExplanationDto> {
    const explanation = await this.recommendationRepository.getExplanation(
      propertyId,
      userId,
    );

    if (!explanation) {
      throw new RecommendationNotFoundException(`Property ${propertyId}`);
    }

    return RecommendationMapper.toExplanationDto(explanation);
  }

  async saveFeedback(
    userId: string,
    feedbackDto: RecommendationFeedbackDto,
  ): Promise<void> {
    await this.recommendationRepository.saveFeedback({
      propertyId: feedbackDto.propertyId,
      userId,
      type: feedbackDto.type,
    });
  }
}
