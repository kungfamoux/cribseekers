import { Injectable, Logger } from '@nestjs/common';
import { PurposeRepository } from '../repository/purpose.repository';
import { CreatePurposeDto, UpdatePurposeDto, PurposeResponseDto } from '../dto/purpose.dto';
import { PurposeMapper } from '../mappers/purpose.mapper';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@Injectable()
export class PurposeService {
  private readonly logger = new Logger(PurposeService.name);

  constructor(private readonly purposeRepository: PurposeRepository) {}

  async create(dto: CreatePurposeDto): Promise<PurposeResponseDto> {
    this.logger.log(`Creating purpose with name: ${dto.name}`);

    const createInput = PurposeMapper.toCreateInput(dto);
    const purpose = await this.purposeRepository.create(createInput);
    this.logger.log(`Purpose created with ID: ${purpose.id}`);

    return PurposeMapper.toResponseDto(purpose);
  }

  async findById(id: string): Promise<PurposeResponseDto> {
    this.logger.log(`Finding purpose with ID: ${id}`);

    const purpose = await this.purposeRepository.findById(id);
    if (!purpose) {
      throw new Error(`Purpose with ID ${id} not found`);
    }

    return PurposeMapper.toResponseDto(purpose);
  }

  async findAll(
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<{ data: PurposeResponseDto[]; meta: any }> {
    this.logger.log('Finding all purposes');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy || 'sortOrder',
      sortOrder: sort?.sortOrder || 'asc',
    };

    const result = await this.purposeRepository.findMany({}, { ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((p) => PurposeMapper.toResponseDto(p)),
      meta: result.meta,
    };
  }

  async findActive(pagination?: PaginationOptions): Promise<{ data: PurposeResponseDto[]; meta: any }> {
    this.logger.log('Finding active purposes');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'sortOrder',
      sortOrder: 'asc',
    };

    const result = await this.purposeRepository.findActive({ ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((p) => PurposeMapper.toResponseDto(p)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdatePurposeDto): Promise<PurposeResponseDto> {
    this.logger.log(`Updating purpose with ID: ${id}`);

    const purpose = await this.purposeRepository.findById(id);
    if (!purpose) {
      throw new Error(`Purpose with ID ${id} not found`);
    }

    const updateInput = PurposeMapper.toUpdateInput(dto);
    const updatedPurpose = await this.purposeRepository.update(id, updateInput);
    this.logger.log(`Purpose updated with ID: ${id}`);

    return PurposeMapper.toResponseDto(updatedPurpose);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting purpose with ID: ${id}`);

    const purpose = await this.purposeRepository.findById(id);
    if (!purpose) {
      throw new Error(`Purpose with ID ${id} not found`);
    }

    await this.purposeRepository.delete(id);
    this.logger.log(`Purpose deleted with ID: ${id}`);
  }
}
