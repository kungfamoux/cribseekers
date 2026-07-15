import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    const user = new User();
    user.id = prismaUser.id;
    user.email = prismaUser.email;
    user.phoneNumber = prismaUser.phoneNumber || undefined;
    user.password = prismaUser.password;
    user.firstName = prismaUser.firstName;
    user.lastName = prismaUser.lastName;
    user.type = prismaUser.type;
    user.status = prismaUser.status;
    user.gender = prismaUser.gender || undefined;
    user.dateOfBirth = prismaUser.dateOfBirth || undefined;
    user.emailVerified = prismaUser.emailVerified;
    user.phoneVerified = prismaUser.phoneVerified;
    user.lastLoginAt = prismaUser.lastLoginAt || undefined;
    user.failedLoginAttempts = prismaUser.failedLoginAttempts;
    user.lockedUntil = prismaUser.lockedUntil || undefined;
    user.createdAt = prismaUser.createdAt;
    user.updatedAt = prismaUser.updatedAt;
    user.deletedAt = prismaUser.deletedAt || undefined;
    user.createdBy = prismaUser.createdBy || undefined;
    user.updatedBy = prismaUser.updatedBy || undefined;
    return user;
  }

  static toResponseDto(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.phoneNumber = user.phoneNumber;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.type = user.type;
    dto.status = user.status;
    dto.gender = user.gender;
    dto.dateOfBirth = user.dateOfBirth;
    dto.emailVerified = user.emailVerified;
    dto.phoneVerified = user.phoneVerified;
    dto.lastLoginAt = user.lastLoginAt;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }

  static toDomainList(prismaUsers: PrismaUser[]): User[] {
    return prismaUsers.map(user => this.toDomain(user));
  }

  static toResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map(user => this.toResponseDto(user));
  }
}
