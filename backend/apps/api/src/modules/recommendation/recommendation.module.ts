import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

// Controllers
import { RecommendationController } from './controller/recommendation.controller';

// Services
import { RecommendationService } from './service/recommendation.service';
import { RecommendationEngineService } from './service/recommendation-engine.service';

// Repositories
import { RecommendationRepository } from './repository/recommendation.repository';

// Mappers
import { RecommendationMapper } from './mappers/recommendation.mapper';

// Strategies
import { PopularStrategy } from './strategies/popular.strategy';
import { SimilarPropertyStrategy } from './strategies/similar-property.strategy';
import { BudgetStrategy } from './strategies/budget.strategy';
import { LocationStrategy } from './strategies/location.strategy';
import { FavoriteStrategy } from './strategies/favorite.strategy';
import { RecentViewStrategy } from './strategies/recent-view.strategy';
import { SearchHistoryStrategy } from './strategies/search-history.strategy';
import { InspectionStrategy } from './strategies/inspection.strategy';
import { CompositeRecommendationStrategy } from './strategies/composite.strategy';

// Providers
import { DefaultRecommendationProvider } from './providers/default-recommendation.provider';

@Module({
  imports: [PrismaModule],
  controllers: [
    RecommendationController,
  ],
  providers: [
    // Services
    RecommendationService,
    RecommendationEngineService,
    // Repositories
    RecommendationRepository,
    // Mappers
    RecommendationMapper,
    // Strategies
    PopularStrategy,
    SimilarPropertyStrategy,
    BudgetStrategy,
    LocationStrategy,
    FavoriteStrategy,
    RecentViewStrategy,
    SearchHistoryStrategy,
    InspectionStrategy,
    CompositeRecommendationStrategy,
    // Providers
    DefaultRecommendationProvider,
  ],
  exports: [
    RecommendationService,
    RecommendationEngineService,
    RecommendationRepository,
  ],
})
export class RecommendationModule {}
