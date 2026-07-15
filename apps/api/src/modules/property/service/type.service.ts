import { Injectable, Logger } from '@nestjs/common';
import { ITypeRepository } from '../interfaces/type.repository.interface';
import { CreateTypeDto, UpdateTypeDto, TypeResponseDto } from '../dto/type.dto';
import { TypeMapper } from '../mappers/type.mapper';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@Injectable()
export class TypeService {
  private readonly logger = new Logger(TypeService.name);

  constructor(private readonly typeRepository: ITypeRepository) {}

  async create(dto: CreateTypeDto): Promise<TypeResponseDto> {
    this.logger.log(`Creating type with name: ${dto.name}`);

    const createInput = TypeMapper.toCreateInput(dto);
    const type = await this.typeRepository.create(createInput);
    this.logger.log(`Type created with ID: ${type.id}`);

    return TypeMapper.toResponseDto(type);
  }

  async findById(id: string): Promise<TypeResponseDto> {
    this.logger.log(`Finding type with ID: ${id}`);

    const type = await this.typeRepository.findById(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }

    return TypeMapper.toResponseDto(type);
  }

  async findAll(
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<{ data: TypeResponseDto[]; meta: any }> {
    this.logger.log('Finding all types');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy || 'sortOrder',
      sortOrder: sort?.sortOrder || 'asc',
    };

    const result = await this.typeRepository.findMany({}, { ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((t) => TypeMapper.toResponseDto(t)),
      meta: result.meta,
    };
  }

  async findActive(pagination?: PaginationOptions): Promise<{ data: TypeResponseDto[]; meta: any }> {
    this.logger.log('Finding active types');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'sortOrder',
      sortOrder: 'asc',
    };

    const result = await this.typeRepository.findActive({ ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((t) => TypeMapper.toResponseDto(t)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdateTypeDto): Promise<TypeResponseDto> {
    this.logger.log(`Updating type with ID: ${id}`);

    const type = await this.typeRepository.findById(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }

    const updateInput = TypeMapper.toUpdateInput(dto);
    const updatedType = await this.typeRepository.update(id, updateInput);
    this.logger.log(`Type updated with ID: ${id}`);

    return TypeMapper.toResponseDto(updatedType);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting type with ID: ${id}`);

    const type = await this.typeRepository.findById(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }

    await this.typeRepository.delete(id);
    this.logger.log(`Type deleted with ID: ${id}`);
  }
}
