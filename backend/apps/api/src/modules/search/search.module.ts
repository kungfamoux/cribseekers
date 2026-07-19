import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

// Controllers
import { SearchController } from './controller/search.controller';
import { GeoSearchController } from './controller/geo-search.controller';

// Services
import { SearchService } from './service/search.service';
import { GeoSearchService } from './service/geo-search.service';

// Repositories
import { SearchRepository } from './repository/search.repository';

// Mappers
import { SearchMapper } from './mappers/search.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [
    SearchController,
    GeoSearchController,
  ],
  providers: [
    // Services
    SearchService,
    GeoSearchService,
    // Repositories
    SearchRepository,
    // Mappers
    SearchMapper,
  ],
  exports: [
    SearchService,
    GeoSearchService,
    SearchRepository,
  ],
})
export class SearchModule {}
