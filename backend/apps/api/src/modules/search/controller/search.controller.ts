import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SearchService } from '../service/search.service';
import { PropertySearchDto } from '../dto/property-search.dto';
import { SearchResponseDto, SearchSuggestionDto } from '../dto/search-response.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { SortDto } from '../dto/sort.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Global property search' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PropertySearchDto, required: false })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async globalSearch(
    @Query() filter?: PropertySearchDto,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.globalSearch(filter || {}, pagination, sort);
  }

  @Get('keyword')
  @ApiOperation({ summary: 'Search by keyword' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ name: 'keyword', description: 'Search keyword' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async keywordSearch(
    @Query('keyword') keyword: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.keywordSearch(keyword, pagination, sort);
  }

  @Get('state/:state')
  @ApiOperation({ summary: 'Search by state' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async stateSearch(
    @Query('state') state: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.stateSearch(state, pagination, sort);
  }

  @Get('city/:city')
  @ApiOperation({ summary: 'Search by city' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async citySearch(
    @Query('city') city: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.citySearch(city, pagination, sort);
  }

  @Get('lga/:lga')
  @ApiOperation({ summary: 'Search by LGA' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async lgaSearch(
    @Query('lga') lga: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.lgaSearch(lga, pagination, sort);
  }

  @Get('estate/:estate')
  @ApiOperation({ summary: 'Search by estate' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async estateSearch(
    @Query('estate') estate: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.estateSearch(estate, pagination, sort);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Search by category' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async categorySearch(
    @Query('categoryId') categoryId: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.categorySearch(categoryId, pagination, sort);
  }

  @Get('type/:typeId')
  @ApiOperation({ summary: 'Search by type' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async typeSearch(
    @Query('typeId') typeId: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.typeSearch(typeId, pagination, sort);
  }

  @Get('purpose/:purposeId')
  @ApiOperation({ summary: 'Search by purpose' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: SortDto, required: false })
  async purposeSearch(
    @Query('purposeId') purposeId: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: SortDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.purposeSearch(purposeId, pagination, sort);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured properties' })
  @ApiResponse({ status: 200, description: 'Featured properties retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async featuredSearch(@Query() pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.featuredSearch(pagination);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent properties' })
  @ApiResponse({ status: 200, description: 'Recent properties retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async recentSearch(@Query() pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.recentSearch(pagination);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular properties' })
  @ApiResponse({ status: 200, description: 'Popular properties retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async popularSearch(@Query() pagination?: PaginationDto): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.searchService.popularSearch(pagination);
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get search suggestions' })
  @ApiResponse({ status: 200, description: 'Search suggestions retrieved successfully' })
  @ApiQuery({ name: 'query', description: 'Search query' })
  async getSuggestions(@Query('query') query: string): Promise<SearchSuggestionDto[]> {
    return this.searchService.getSuggestions(query);
  }
}
