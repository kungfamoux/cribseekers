import { SearchFilter, GeoSearchFilter, SortOptions, PaginationOptions } from '../types/search-filter.type';
import { SearchResult, SearchSuggestion } from '../types/search-result.type';
import { PaginationResult } from '../../../common/types/pagination.type';

export interface ISearchRepository {
  // Global search
  search(
    filter: SearchFilter,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  // Keyword search
  searchByKeyword(
    keyword: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  // Location-based searches
  searchByState(
    state: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByCity(
    city: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByLGA(
    lga: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByEstate(
    estate: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  // Geo search
  searchNearby(
    filter: GeoSearchFilter,
    pagination?: PaginationOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByRadius(
    filter: GeoSearchFilter,
    pagination?: PaginationOptions,
  ): Promise<PaginationResult<SearchResult>>;

  // Category/type searches
  searchByCategory(
    categoryId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByType(
    typeId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  searchByPurpose(
    purposeId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>>;

  // Featured and popular
  findFeatured(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>>;

  findRecent(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>>;

  findPopular(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>>;

  // Suggestions
  getSuggestions(query: string, limit?: number): Promise<SearchSuggestion[]>;

  // Count
  count(filter: SearchFilter): Promise<number>;
}
