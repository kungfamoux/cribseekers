import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { DuplicateEmailException } from '../exceptions/duplicate-email.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new DuplicateEmailException(createUserDto.email);
    }

    const user = new User();
    user.email = createUserDto.email;
    user.phoneNumber = createUserDto.phoneNumber;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.type = createUserDto.type || 'INDIVIDUAL';
    user.gender = createUserDto.gender;
    user.dateOfBirth = createUserDto.dateOfBirth ? new Date(createUserDto.dateOfBirth) : undefined;
    user.emailVerified = false;
    user.phoneVerified = false;
    user.failedLoginAttempts = 0;
    user.status = 'PENDING_VERIFICATION';

    const createdUser = await this.userRepository.create(user);
    return UserMapper.toResponseDto(createdUser);
  }

  async findAll(filterDto: UserFilterDto, paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    const filters: Partial<User> = {};
    if (filterDto.email) filters.email = filterDto.email;
    if (filterDto.phoneNumber) filters.phoneNumber = filterDto.phoneNumber;
    if (filterDto.status) filters.status = filterDto.status as any;
    if (filterDto.type) filters.type = filterDto.type as any;
    if (filterDto.emailVerified !== undefined) filters.emailVerified = filterDto.emailVerified;
    if (filterDto.phoneVerified !== undefined) filters.phoneVerified = filterDto.phoneVerified;

    const result = await this.userRepository.findMany(filters, paginationDto);
    return UserMapper.toResponseDtoList(result.data);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return UserMapper.toResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException(email);
    }
    return UserMapper.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }

    const updateData: Partial<User> = {};
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new DuplicateEmailException(updateUserDto.email);
      }
      updateData.email = updateUserDto.email;
    }
    if (updateUserDto.phoneNumber) updateData.phoneNumber = updateUserDto.phoneNumber;
    if (updateUserDto.password) updateData.password = updateUserDto.password;
    if (updateUserDto.firstName) updateData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) updateData.lastName = updateUserDto.lastName;
    if (updateUserDto.type) updateData.type = updateUserDto.type as any;
    if (updateUserDto.gender) updateData.gender = updateUserDto.gender as any;

    const updatedUser = await this.userRepository.update(id, updateData);
    return UserMapper.toResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    await this.userRepository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    await this.userRepository.softDelete(id);
  }

  async restore(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }

    const updatedUser = await this.userRepository.update(id, { deletedAt: undefined });
    return UserMapper.toResponseDto(updatedUser);
  }

  async search(query: string, paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    const result = await this.userRepository.search(query, paginationDto);
    return UserMapper.toResponseDtoList(result.data);
  }

  async exists(id: string): Promise<boolean> {
    return this.userRepository.exists(id);
  }

  async count(filters?: UserFilterDto): Promise<number> {
    const filterParams: Partial<User> = {};
    if (filters) {
      if (filters.email) filterParams.email = filters.email;
      if (filters.phoneNumber) filterParams.phoneNumber = filters.phoneNumber;
      if (filters.status) filterParams.status = filters.status as any;
      if (filters.type) filterParams.type = filters.type as any;
      if (filters.emailVerified !== undefined) filterParams.emailVerified = filters.emailVerified;
      if (filters.phoneVerified !== undefined) filterParams.phoneVerified = filters.phoneVerified;
    }
    return this.userRepository.count(filterParams);
  }

  async paginate(paginationDto: PaginationDto): Promise<{ data: UserResponseDto[]; meta: any }> {
    const result = await this.userRepository.paginate(paginationDto);
    return {
      data: UserMapper.toResponseDtoList(result.data),
      meta: result.meta,
    };
  }
}
