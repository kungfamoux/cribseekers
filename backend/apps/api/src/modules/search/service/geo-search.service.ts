import { Injectable, Logger } from '@nestjs/common';
import { SearchRepository } from '../repository/search.repository';
import { GeoSearchDto } from '../dto/geo-search.dto';
import { SearchResponseDto } from '../dto/search-response.dto';
import { SearchMapper } from '../mappers/search.mapper';
import { PaginationDto } from '../dto/pagination.dto';
import { SEARCH_CONSTANTS } from '../constants/search.constants';
import {
  InvalidRadiusException,
  InvalidCoordinatesException,
} from '../exceptions/search.exception';
import { PaginationOptions } from '../../../common/types/pagination.type';

@Injectable()
export class GeoSearchService {
  private readonly logger = new Logger(GeoSearchService.name);

  constructor(private readonly searchRepository: SearchRepository) {}

  async searchNearby(
    dto: GeoSearchDto,
    pagination?: PaginationDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching nearby properties at ${dto.latitude}, ${dto.longitude}`);

    // Validate coordinates
    this.validateCoordinates(dto.latitude, dto.longitude);

    // Validate radius
    this.validateRadius(dto.radius);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const filter = {
      latitude: dto.latitude,
      longitude: dto.longitude,
      radius: dto.radius,
    };

    const result = await this.searchRepository.searchNearby(filter, paginationOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  async searchByRadius(
    dto: GeoSearchDto,
    pagination?: PaginationDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    this.logger.log(`Searching properties within ${dto.radius}km radius`);

    this.validateCoordinates(dto.latitude, dto.longitude);
    this.validateRadius(dto.radius);

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const filter = {
      latitude: dto.latitude,
      longitude: dto.longitude,
      radius: dto.radius,
    };

    const result = await this.searchRepository.searchByRadius(filter, paginationOptions);

    return {
      data: result.data.map(r => SearchMapper.toResponseDto(r)),
      meta: result.meta,
    };
  }

  private validateCoordinates(latitude: number, longitude: number): void {
    if (
      latitude < SEARCH_CONSTANTS.MIN_LATITUDE ||
      latitude > SEARCH_CONSTANTS.MAX_LATITUDE
    ) {
      throw new InvalidCoordinatesException(
        `Latitude must be between ${SEARCH_CONSTANTS.MIN_LATITUDE} and ${SEARCH_CONSTANTS.MAX_LATITUDE}`,
      );
    }

    if (
      longitude < SEARCH_CONSTANTS.MIN_LONGITUDE ||
      longitude > SEARCH_CONSTANTS.MAX_LONGITUDE
    ) {
      throw new InvalidCoordinatesException(
        `Longitude must be between ${SEARCH_CONSTANTS.MIN_LONGITUDE} and ${SEARCH_CONSTANTS.MAX_LONGITUDE}`,
      );
    }
  }

  private validateRadius(radius: number): void {
    if (
      radius < SEARCH_CONSTANTS.MIN_SEARCH_RADIUS ||
      radius > SEARCH_CONSTANTS.MAX_SEARCH_RADIUS
    ) {
      throw new InvalidRadiusException(radius);
    }
  }
}
