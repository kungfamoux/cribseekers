import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { CacheModule } from '../../infrastructure/cache/cache.module';

// Controllers
import { PropertyController } from './controllers/property.controller';
import { PropertiesController } from './controllers/properties.controller';
import { CategoryController } from './controllers/category.controller';

// Services
import { PropertyService } from './service/property.service';
import { CategoryService } from './service/category.service';
import { TypeService } from './service/type.service';
import { PurposeService } from './service/purpose.service';

// Repositories
import { PropertyRepository } from './repository/property.repository';
import { CategoryRepository } from './repository/category.repository';
import { TypeRepository } from './repository/type.repository';
import { PurposeRepository } from './repository/purpose.repository';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [
    PropertyController,
    PropertiesController,
    CategoryController,
  ],
  providers: [
    // Services
    PropertyService,
    CategoryService,
    TypeService,
    PurposeService,
    // Repositories
    PropertyRepository,
    CategoryRepository,
    TypeRepository,
    PurposeRepository,
  ],
  exports: [
    PropertyService,
    CategoryService,
    TypeService,
    PurposeService,
    PropertyRepository,
    CategoryRepository,
    TypeRepository,
    PurposeRepository,
  ],
})
export class PropertyModule {}
