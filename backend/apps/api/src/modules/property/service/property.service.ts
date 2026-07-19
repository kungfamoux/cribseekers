import { Injectable, Logger } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertySummaryDto } from '../dto/property-summary.dto';
import { PropertyMapper } from '../mappers/property.mapper';
import { PropertyFilterDto } from '../dto/property-filter.dto';
import { PropertySearchDto } from '../dto/property-search.dto';
import { PropertySortDto } from '../dto/property-sort.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { ListingType, PricePeriod } from '@prisma/client';
import {
  PropertyNotFoundException,
  PropertyAlreadyExistsException,
  PropertyStatusException,
  PropertyDeletedException,
  PropertyNotPublishedException,
  PropertyExpiredException,
  PropertyValidationException,
} from '../exceptions/property.exception';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';
import { CacheManagerService } from '../../../infrastructure/cache/cache-manager.service';
import { CacheNamespaces, CacheTags } from '../../../infrastructure/cache/cache.constants';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly cacheManager: CacheManagerService,
 ) {}

  async create(dto: CreatePropertyDto, userId: string): Promise<PropertyResponseDto> {
    this.logger.log(`Creating property with title: ${dto.title}`);

    const existingProperty = await this.propertyRepository.findOne({ title: dto.title });
    if (existingProperty) {
      throw new PropertyAlreadyExistsException(dto.title);
    }

    // Nigerian rental business rule: Default to YEARLY for rental properties if no price period supplied
    const createInput = PropertyMapper.toCreateInput(dto);
    if (dto.listingType === ListingType.RENT && !dto.pricePeriod) {
      createInput.pricePeriod = PricePeriod.YEARLY;
    }
    createInput.createdBy = userId;

    const property = await this.propertyRepository.create(createInput);
    this.logger.log(`Property created with ID: ${property.id}`);

    // Invalidate property search cache
    await this.cacheManager.invalidateByTag(CacheTags.PROPERTY_UPDATE);

    return PropertyMapper.toResponseDto(property);
  }

  async findById(id: string): Promise<PropertyResponseDto> {
    this.logger.log(`Finding property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    return PropertyMapper.toResponseDto(property);
  }

  async findSummaryById(id: string): Promise<PropertySummaryDto> {
    this.logger.log(`Finding property summary with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    return PropertyMapper.toSummaryDto(property);
  }

  async findAll(
    filter?: PropertyFilterDto,
    pagination?: PaginationDto,
    sort?: PropertySortDto,
  ): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    this.logger.log('Finding all properties with filters');

    // Generate cache key from filter, pagination, and sort
    const cacheKey = this.cacheManager.generateHash({ filter, pagination, sort });
    const cached = await this.cacheManager.get<{ data: PropertySummaryDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('Property search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
      skip: pagination?.skip,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const filters: any = {};
    if (filter) {
      if (filter.keyword) {
        filters.OR = [
          { title: { contains: filter.keyword, mode: 'insensitive' } },
          { description: { contains: filter.keyword, mode: 'insensitive' } },
        ];
      }
      if (filter.categoryId) filters.categoryId = filter.categoryId;
      if (filter.typeId) filters.typeId = filter.typeId;
      if (filter.purposeId) filters.purposeId = filter.purposeId;
      if (filter.listingType) filters.listingType = filter.listingType;
      if (filter.condition) filters.condition = filter.condition;
      if (filter.minBedrooms !== undefined) filters.bedrooms = { gte: filter.minBedrooms };
      if (filter.maxBedrooms !== undefined) filters.bedrooms = { ...filters.bedrooms, lte: filter.maxBedrooms };
      if (filter.minBathrooms !== undefined) filters.bathrooms = { gte: filter.minBathrooms };
      if (filter.maxBathrooms !== undefined) filters.bathrooms = { ...filters.bathrooms, lte: filter.maxBathrooms };
      if (filter.minPrice !== undefined) filters.price = { gte: filter.minPrice };
      if (filter.maxPrice !== undefined) filters.price = { ...filters.price, lte: filter.maxPrice };
      if (filter.featured !== undefined) filters.featured = filter.featured;
      if (filter.verified !== undefined) filters.verifiedAt = filter.verified ? { not: null } : null;
      if (filter.status) filters.status = filter.status;
      if (filter.visibility) filters.visibility = filter.visibility;
    }

    const result = await this.propertyRepository.findMany(filters, { ...paginationOptions, ...sortOptions });

    const response = {
      data: result.data.map((p) => PropertyMapper.toSummaryDto(p)),
      meta: result.meta,
    };

    // Cache the result with tags for invalidation
    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 3600, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async search(dto: PropertySearchDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    this.logger.log(`Searching properties with query: ${dto.query}`);

    const cacheKey = this.cacheManager.generateHash(dto);
    const cached = await this.cacheManager.get<{ data: PropertySummaryDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('Property keyword search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: dto.page,
      limit: dto.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    const filters: any = {
      OR: [
        { title: { contains: dto.query, mode: 'insensitive' } },
        { description: { contains: dto.query, mode: 'insensitive' } },
      ],
    };

    if (dto.state) {
      filters.OR.push({ location: { state: { contains: dto.state, mode: 'insensitive' } } });
    }
    if (dto.city) {
      filters.OR.push({ location: { city: { contains: dto.city, mode: 'insensitive' } } });
    }
    if (dto.listingType) filters.listingType = dto.listingType;
    if (dto.minPrice !== undefined) filters.price = { gte: dto.minPrice };
    if (dto.maxPrice !== undefined) filters.price = { ...filters.price, lte: dto.maxPrice };
    if (dto.minBedrooms !== undefined) filters.bedrooms = { gte: dto.minBedrooms };
    if (dto.maxBedrooms !== undefined) filters.bedrooms = { ...filters.bedrooms, lte: dto.maxBedrooms };
    if (dto.status) filters.status = dto.status;
    if (dto.visibility) filters.visibility = dto.visibility;

    const result = await this.propertyRepository.findMany(filters, { ...paginationOptions, ...sortOptions });

    const response = {
      data: result.data.map((p) => PropertyMapper.toSummaryDto(p)),
      meta: result.meta,
    };

    // Cache search results
    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 1800, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async findByOwner(
    ownerId: string,
    pagination?: PaginationDto,
    sort?: PropertySortDto,
  ): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    this.logger.log(`Finding properties for owner: ${ownerId}`);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.propertyRepository.findByOwner(ownerId, { ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((p) => PropertyMapper.toSummaryDto(p)),
      meta: result.meta,
    };
  }

  async findFeatured(pagination?: PaginationDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    this.logger.log('Finding featured properties');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'featuredUntil',
      sortOrder: 'desc',
    };

    const result = await this.propertyRepository.findFeatured({ ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((p) => PropertyMapper.toSummaryDto(p)),
      meta: result.meta,
    };
  }

  async findPublished(pagination?: PaginationDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    this.logger.log('Finding published properties');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    };

    const result = await this.propertyRepository.findPublished({ ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((p) => PropertyMapper.toSummaryDto(p)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdatePropertyDto, userId: string): Promise<PropertyResponseDto> {
    this.logger.log(`Updating property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (property.status === 'PUBLISHED' && dto.status === 'DRAFT') {
      throw new PropertyStatusException('Cannot change published property to draft');
    }

    // Nigerian rental business rule: Default to YEARLY for rental properties if no price period supplied
    const updateInput = PropertyMapper.toUpdateInput(dto);
    if (dto.listingType === ListingType.RENT && !dto.pricePeriod) {
      updateInput.pricePeriod = PricePeriod.YEARLY;
    }
    updateInput.updatedBy = userId;

    const updatedProperty = await this.propertyRepository.update(id, updateInput);
    this.logger.log(`Property updated with ID: ${id}`);

    // Invalidate cache for this property and related searches
    await this.cacheManager.del(id, CacheNamespaces.PROPERTY);
    await this.cacheManager.invalidateByTag(CacheTags.PROPERTY_UPDATE);

    return PropertyMapper.toResponseDto(updatedProperty);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (property.status === 'PUBLISHED') {
      throw new PropertyStatusException('Cannot delete published property. Unpublish first.');
    }

    await this.propertyRepository.softDelete(id);
    this.logger.log(`Property soft deleted with ID: ${id}`);

    // Invalidate cache for this property and related searches
    await this.cacheManager.del(id, CacheNamespaces.PROPERTY);
    await this.cacheManager.invalidateByTag(CacheTags.PROPERTY_DELETE);
  }

  async publish(id: string, userId: string): Promise<PropertyResponseDto> {
    this.logger.log(`Publishing property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (property.status === 'PUBLISHED') {
      throw new PropertyStatusException('Property is already published');
    }

    if (property.expiresAt && property.expiresAt < new Date()) {
      throw new PropertyExpiredException(id);
    }

    const updatedProperty = await this.propertyRepository.update(id, {
      status: 'PUBLISHED',
      publishedAt: new Date(),
      updatedBy: userId,
    });

    this.logger.log(`Property published with ID: ${id}`);
    return PropertyMapper.toResponseDto(updatedProperty);
  }

  async unpublish(id: string): Promise<PropertyResponseDto> {
    this.logger.log(`Unpublishing property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (property.status !== 'PUBLISHED') {
      throw new PropertyNotPublishedException(id);
    }

    const updatedProperty = await this.propertyRepository.update(id, {
      status: 'DRAFT',
      publishedAt: undefined,
    });

    this.logger.log(`Property unpublished with ID: ${id}`);
    return PropertyMapper.toResponseDto(updatedProperty);
  }

  async verify(id: string, userId: string): Promise<PropertyResponseDto> {
    this.logger.log(`Verifying property with ID: ${id}`);

    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (property.verifiedAt) {
      throw new PropertyStatusException('Property is already verified');
    }

    const updatedProperty = await this.propertyRepository.update(id, {
      verifiedAt: new Date(),
      verifiedBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`Property verified with ID: ${id}`);
    return PropertyMapper.toResponseDto(updatedProperty);
  }

  async incrementViews(id: string): Promise<void> {
    await this.propertyRepository.incrementViews(id);
  }

  async incrementInquiries(id: string): Promise<void> {
    await this.propertyRepository.incrementInquiries(id);
  }

  async checkOwnership(propertyId: string, userId: string): Promise<boolean> {
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new PropertyNotFoundException(propertyId);
    }
    return property.ownerId === userId;
  }

  async validatePropertyForPublishing(id: string): Promise<void> {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new PropertyNotFoundException(id);
    }

    if (property.deletedAt) {
      throw new PropertyDeletedException(id);
    }

    if (!property.title || property.title.trim().length < 3) {
      throw new PropertyValidationException('Property title is required and must be at least 3 characters');
    }

    if (!property.description || property.description.trim().length < 10) {
      throw new PropertyValidationException('Property description is required and must be at least 10 characters');
    }

    if (!property.price || property.price <= 0) {
      throw new PropertyValidationException('Property price is required and must be greater than 0');
    }

    // Nigerian rental business rule: Rental properties must have a valid price period
    if (property.listingType === ListingType.RENT && !property.pricePeriod) {
      throw new PropertyValidationException('Rental properties must have a price period');
    }

    if (!property.locationId) {
      throw new PropertyValidationException('Property location is required');
    }

    if (!property.categoryId) {
      throw new PropertyValidationException('Property category is required');
    }

    if (!property.typeId) {
      throw new PropertyValidationException('Property type is required');
    }

    if (!property.purposeId) {
      throw new PropertyValidationException('Property purpose is required');
    }
  }
}
