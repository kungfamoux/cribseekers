import { Injectable, Logger } from '@nestjs/common';
import { SearchRepository } from '../repository/search.repository';
import { PropertySearchDto } from '../dto/property-search.dto';
import { SearchResponseDto, SearchSuggestionDto } from '../dto/search-response.dto';
import { SearchMapper } from '../mappers/search.mapper';
import { PaginationDto } from '../dto/pagination.dto';
import { SortDto } from '../dto/sort.dto';
import { SearchNotFoundException } from '../exceptions/search.exception';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';
import { CacheManagerService } from '../../../infrastructure/cache/cache-manager.service';
import { CacheNamespaces, CacheTags } from '../../../infrastructure/cache/cache.constants';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly cacheManager: CacheManagerService,
  ) {}

  async globalSearch(
    filter: PropertySearchDto,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log('Performing global property search');

    const cacheKey = this.cacheManager.generateHash({ filter, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('Global search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.search(filter, paginationOptions, sortOptions);

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 1800, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async keywordSearch(
    keyword: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by keyword: ${keyword}`);

    const cacheKey = this.cacheManager.generateHash({ keyword, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('Keyword search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByKeyword(keyword, paginationOptions, sortOptions);

    if (result.data.length === 0) {
      throw new SearchNotFoundException(keyword);
    }

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 1800, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async stateSearch(
    state: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by state: ${state}`);

    const cacheKey = this.cacheManager.generateHash({ state, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('State search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByState(state, paginationOptions, sortOptions);

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 3600, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async citySearch(
    city: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by city: ${city}`);

    const cacheKey = this.cacheManager.generateHash({ city, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('City search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByCity(city, paginationOptions, sortOptions);

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 3600, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async lgaSearch(
    lga: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by LGA: ${lga}`);

    const cacheKey = this.cacheManager.generateHash({ lga, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('LGA search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByLGA(lga, paginationOptions, sortOptions);

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 3600, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async estateSearch(
    estate: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by estate: ${estate}`);

    const cacheKey = this.cacheManager.generateHash({ estate, pagination, sort });
    const cached = await this.cacheManager.get<{ data: SearchResponseDto[]; meta: any }>(
      cacheKey,
      CacheNamespaces.PROPERTY_SEARCH,
    );

    if (cached) {
      this.logger.debug('Estate search cache hit');
      return cached;
    }

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByEstate(estate, paginationOptions, sortOptions);

    const response = {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };

    await this.cacheManager.set(
      cacheKey,
      response,
      { ttl: 3600, tags: [CacheTags.PROPERTY_UPDATE] },
      CacheNamespaces.PROPERTY_SEARCH,
    );

    return response;
  }

  async categorySearch(
    categoryId: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by category: ${categoryId}`);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByCategory(categoryId, paginationOptions, sortOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async typeSearch(
    typeId: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by type: ${typeId}`);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByType(typeId, paginationOptions, sortOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async purposeSearch(
    purposeId: string,
    pagination?: PaginationDto,
    sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching by purpose: ${purposeId}`);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    const result = await this.searchRepository.searchByPurpose(purposeId, paginationOptions, sortOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async featuredSearch(pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log('Searching featured properties');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const result = await this.searchRepository.findFeatured(paginationOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async recentSearch(pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log('Searching recent properties');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const result = await this.searchRepository.findRecent(paginationOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async popularSearch(pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log('Searching popular properties');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const result = await this.searchRepository.findPopular(paginationOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async getSuggestions(query: string): Promise<SearchSuggestionDto[]> {
    this.logger.log(`Getting search suggestions for: ${query}`);

    const suggestions = await this.searchRepository.getSuggestions(query);

    return suggestions.map(s => SearchMapper.toSuggestionDto(s));
  }
}
