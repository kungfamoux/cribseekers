import { Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from '../dto/category.dto';
import { CategoryMapper } from '../mappers/category.mapper';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    this.logger.log(`Creating category with name: ${dto.name}`);

    const createInput = CategoryMapper.toCreateInput(dto);
    const category = await this.categoryRepository.create(createInput);
    this.logger.log(`Category created with ID: ${category.id}`);

    return CategoryMapper.toResponseDto(category);
  }

  async findById(id: string): Promise<CategoryResponseDto> {
    this.logger.log(`Finding category with ID: ${id}`);

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return CategoryMapper.toResponseDto(category);
  }

  async findAll(
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<{ data: CategoryResponseDto[]; meta: any }> {
    this.logger.log('Finding all categories');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: sort?.sortBy || 'sortOrder',
      sortOrder: sort?.sortOrder || 'asc',
    };

    const result = await this.categoryRepository.findMany({}, { ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((c) => CategoryMapper.toResponseDto(c)),
      meta: result.meta,
    };
  }

  async findActive(pagination?: PaginationOptions): Promise<{ data: CategoryResponseDto[]; meta: any }> {
    this.logger.log('Finding active categories');

    const paginationOptions: PaginationOptions = {
      page: pagination?.page,
      limit: pagination?.limit,
    };

    const sortOptions: SortOptions = {
      sortBy: 'sortOrder',
      sortOrder: 'asc',
    };

    const result = await this.categoryRepository.findActive({ ...paginationOptions, ...sortOptions });

    return {
      data: result.data.map((c) => CategoryMapper.toResponseDto(c)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    this.logger.log(`Updating category with ID: ${id}`);

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    const updateInput = CategoryMapper.toUpdateInput(dto);
    const updatedCategory = await this.categoryRepository.update(id, updateInput);
    this.logger.log(`Category updated with ID: ${id}`);

    return CategoryMapper.toResponseDto(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting category with ID: ${id}`);

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.delete(id);
    this.logger.log(`Category deleted with ID: ${id}`);
  }
}
